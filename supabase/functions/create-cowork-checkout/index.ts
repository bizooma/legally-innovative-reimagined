import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const PRODUCTS: Record<string, { productId: string; name: string }> = {
  law: { productId: "prod_UaBRul3ISt7UPq", name: "Law Firm CoWork OS" },
  nonprofit: { productId: "prod_UaBkpiIRWBrF00", name: "Nonprofit CoWork OS" },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { product, origin } = await req.json().catch(() => ({ product: "", origin: "" }));
    const cfg = PRODUCTS[product as string];
    if (!cfg) {
      return new Response(JSON.stringify({ error: "Invalid product" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const siteOrigin = origin || req.headers.get("origin") || "";

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2024-06-20" });

    const prices = await stripe.prices.list({ product: cfg.productId, active: true, limit: 10 });
    const price = prices.data.find((p) => !p.recurring) ?? prices.data[0];
    if (!price) {
      return new Response(JSON.stringify({ error: `No active price configured for ${cfg.name}` }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: price.id, quantity: 1 }],
      success_url: `${siteOrigin}/claude-cowork/success?session_id={CHECKOUT_SESSION_ID}&product=${product}`,
      cancel_url: `${siteOrigin}/claude-cowork`,
      allow_promotion_codes: true,
      metadata: { product, productId: cfg.productId },
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