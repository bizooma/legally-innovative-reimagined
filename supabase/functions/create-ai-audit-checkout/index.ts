import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// TODO: replace with the real Stripe product ID once provided.
const PRODUCT_ID = Deno.env.get("AI_AUDIT_PRODUCT_ID") || "prod_Ufp44IXinO3MqU";
const PRODUCT_NAME = "AI Audit + Implementation Toolkit";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { origin } = await req.json().catch(() => ({ origin: "" }));
    const siteOrigin = origin || req.headers.get("origin") || "";

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2024-06-20" });

    const prices = await stripe.prices.list({ product: PRODUCT_ID, active: true, limit: 10 });
    const price = prices.data.find((p) => !p.recurring) ?? prices.data[0];
    if (!price) {
      return new Response(JSON.stringify({ error: `No active price configured for ${PRODUCT_NAME}` }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: price.id, quantity: 1 }],
      success_url: `${siteOrigin}/ai-audit/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteOrigin}/ai-audit`,
      allow_promotion_codes: true,
      metadata: { productId: PRODUCT_ID, product: "ai-audit" },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});