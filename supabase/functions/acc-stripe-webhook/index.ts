import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

// No CORS — Stripe calls this server-to-server.
const ACTIVE = new Set(["active", "trialing", "past_due"]);

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2024-06-20" });
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  if (!webhookSecret) return new Response("Webhook secret not configured", { status: 500 });

  const sig = req.headers.get("stripe-signature");
  const raw = await req.text();
  if (!sig) return new Response("Missing signature", { status: 400 });

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(raw, sig, webhookSecret);
  } catch (e) {
    console.error("Signature verification failed", e);
    return new Response(`Webhook Error: ${(e as Error).message}`, { status: 400 });
  }

  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );

  async function syncSubscription(sub: Stripe.Subscription) {
    const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id;
    const orgFromMeta = (sub.metadata as any)?.organization_id || null;

    let orgId: string | null = orgFromMeta;
    if (!orgId) {
      const { data } = await admin
        .from("acc_organizations").select("id").eq("stripe_customer_id", customerId).maybeSingle();
      orgId = data?.id ?? null;
    }
    if (!orgId) { console.warn("No org for customer", customerId); return; }

    const status = sub.status;
    const isActive = ACTIVE.has(status);

    await admin.from("acc_organizations").update({
      stripe_customer_id: customerId,
      stripe_subscription_id: sub.id,
      subscription_status: status,
    }).eq("id", orgId);

    // Flip widget_enabled on every site for this org based on active state
    await admin.from("acc_websites").update({ widget_enabled: isActive }).eq("organization_id", orgId);

    console.log("Synced org", orgId, "status", status, "widget", isActive);
  }

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
      case "customer.subscription.paused":
      case "customer.subscription.resumed":
        await syncSubscription(event.data.object as Stripe.Subscription);
        break;
      case "invoice.payment_failed":
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const subId = invoice.subscription;
        if (typeof subId === "string") {
          const sub = await stripe.subscriptions.retrieve(subId);
          await syncSubscription(sub);
        }
        break;
      }
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode === "subscription" && typeof session.subscription === "string") {
          const sub = await stripe.subscriptions.retrieve(session.subscription);
          await syncSubscription(sub);
        }
        break;
      }
      default:
        // ignore other events
        break;
    }
  } catch (e) {
    console.error("Handler error", e);
    return new Response(`Handler error: ${(e as Error).message}`, { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
  });
});