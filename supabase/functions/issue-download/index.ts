import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const BUCKET = "downloads";
const EXPIRY_SECONDS = 300;

// Which files each purchased product entitles. Anything not listed is refused.
const ENTITLEMENTS: Record<string, string[]> = {
  "ai-audit": ["AI_Workflow_Audit_LawFirm_Final.xlsx", "Law_Firm_AI_Implementation_Tracker_Final.xlsx"],
  law: ["law-firm-cowork-os.zip"],
  nonprofit: ["nonprofit-cowork-os.zip"],
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const body = await req.json().catch(() => null);
  const sessionId = typeof body?.session_id === "string" ? body.session_id.trim() : "";
  const file = typeof body?.file === "string" ? body.file.trim() : "";
  if (!sessionId || !file) return json({ error: "session_id and file are required" }, 400);
  if (!/^cs_[A-Za-z0-9_]{10,255}$/.test(sessionId)) return json({ error: "Invalid session" }, 400);

  let session: Stripe.Checkout.Session;
  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2024-06-20" });
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return json({ error: "We couldn't verify this purchase" }, 404);
  }

  if (session.payment_status !== "paid") return json({ error: "This purchase has not been paid" }, 402);

  const allowed = ENTITLEMENTS[session.metadata?.product ?? ""];
  if (!allowed) return json({ error: "Unknown product" }, 403);
  if (!allowed.includes(file)) return json({ error: "This file is not part of your purchase" }, 403);

  try {
    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
    const { data, error } = await admin.storage.from(BUCKET).createSignedUrl(file, EXPIRY_SECONDS, { download: true });
    if (error || !data?.signedUrl) return json({ error: "Download is temporarily unavailable" }, 503);
    return json({ url: data.signedUrl });
  } catch {
    return json({ error: "Download is temporarily unavailable" }, 503);
  }
});
