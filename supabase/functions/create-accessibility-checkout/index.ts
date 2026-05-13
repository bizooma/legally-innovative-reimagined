import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const PRODUCT_ID = Deno.env.get("ACC_STRIPE_PRODUCT_ID") || "prod_UVbwWOouagCn5r";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const supa = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await supa.auth.getUser();
    if (userErr || !userData.user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const user = userData.user;

    const { origin } = await req.json().catch(() => ({ origin: "" }));
    const siteOrigin = origin || req.headers.get("origin") || "";

    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
    const { data: membership } = await admin
      .from("acc_organization_members")
      .select("organization_id, role, acc_organizations:organization_id(id, name, stripe_customer_id)")
      .eq("user_id", user.id)
      .in("role", ["owner", "admin"])
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    if (!membership) return new Response(JSON.stringify({ error: "No organization found" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const org = (membership as any).acc_organizations;

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2024-06-20" });

    // Find an active recurring price for the configured product
    const prices = await stripe.prices.list({ product: PRODUCT_ID, active: true, limit: 10 });
    const price = prices.data.find((p) => p.recurring) ?? prices.data[0];
    if (!price) return new Response(JSON.stringify({ error: "No active price configured for product" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    let customerId = org.stripe_customer_id as string | null;
    if (!customerId) {
      const existing = await stripe.customers.list({ email: user.email!, limit: 1 });
      customerId = existing.data[0]?.id ?? (await stripe.customers.create({ email: user.email!, metadata: { organization_id: org.id } })).id;
      await admin.from("acc_organizations").update({ stripe_customer_id: customerId }).eq("id", org.id);
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [{ price: price.id, quantity: 1 }],
      success_url: `${siteOrigin}/accessibility/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteOrigin}/accessibility-layer`,
      metadata: { organization_id: org.id, user_id: user.id },
      subscription_data: { metadata: { organization_id: org.id, user_id: user.id } },
    });

    return new Response(JSON.stringify({ url: session.url }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});