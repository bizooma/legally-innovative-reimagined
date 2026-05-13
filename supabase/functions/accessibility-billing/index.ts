import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Unauthorized" }, 401);

    const supa = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await supa.auth.getUser();
    if (userErr || !userData.user) return json({ error: "Unauthorized" }, 401);
    const user = userData.user;

    const body = await req.json().catch(() => ({}));
    const action: "info" | "portal" = body.action ?? "info";
    const origin = body.origin || req.headers.get("origin") || "";

    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
    const { data: membership } = await admin
      .from("acc_organization_members")
      .select("organization_id, role, acc_organizations:organization_id(id, name, plan, stripe_customer_id, stripe_subscription_id, subscription_status)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    if (!membership) return json({ error: "No organization found" }, 400);
    const org = (membership as any).acc_organizations;
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2024-06-20" });

    if (action === "portal") {
      if (!org.stripe_customer_id) return json({ error: "No Stripe customer" }, 400);
      const session = await stripe.billingPortal.sessions.create({
        customer: org.stripe_customer_id,
        return_url: `${origin}/accessibility/billing`,
      });
      return json({ url: session.url });
    }

    // info
    if (!org.stripe_customer_id) {
      return json({ org: { name: org.name, plan: org.plan }, subscription: null, invoices: [] });
    }

    const subs = await stripe.subscriptions.list({ customer: org.stripe_customer_id, status: "all", limit: 1, expand: ["data.default_payment_method", "data.items.data.price.product"] });
    const sub = subs.data[0];
    const invoicesList = await stripe.invoices.list({ customer: org.stripe_customer_id, limit: 12 });

    const subscription = sub
      ? {
          id: sub.id,
          status: sub.status,
          current_period_end: sub.current_period_end,
          cancel_at_period_end: sub.cancel_at_period_end,
          amount: sub.items.data[0]?.price?.unit_amount ?? null,
          currency: sub.items.data[0]?.price?.currency ?? "usd",
          interval: sub.items.data[0]?.price?.recurring?.interval ?? null,
          product_name: (sub.items.data[0]?.price?.product as any)?.name ?? "Accessibility Layer",
          payment_method: (() => {
            const pm: any = sub.default_payment_method;
            if (!pm || typeof pm === "string") return null;
            return pm.card ? { brand: pm.card.brand, last4: pm.card.last4, exp: `${pm.card.exp_month}/${pm.card.exp_year}` } : null;
          })(),
        }
      : null;

    const invoices = invoicesList.data.map((i) => ({
      id: i.id,
      number: i.number,
      status: i.status,
      amount_paid: i.amount_paid,
      currency: i.currency,
      created: i.created,
      hosted_invoice_url: i.hosted_invoice_url,
      invoice_pdf: i.invoice_pdf,
    }));

    return json({ org: { name: org.name, plan: org.plan }, subscription, invoices });
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});

function json(b: unknown, status = 200) {
  return new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}