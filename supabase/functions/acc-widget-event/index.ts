import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const VALID_EVENTS = new Set(["open", "close", "feature_on", "feature_off", "reset", "view"]);
const MAX_BODY = 4096;

function ok() {
  return new Response(JSON.stringify({ ok: true }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
function bad(msg: string, status = 400) {
  return new Response(JSON.stringify({ ok: false, error: msg }), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return bad("Method not allowed", 405);

  const text = await req.text();
  if (!text || text.length > MAX_BODY) return bad("Payload too large");
  let body: any;
  try { body = JSON.parse(text); } catch { return bad("Invalid JSON"); }

  const slug = String(body.org || "").trim().toLowerCase().slice(0, 80);
  const event_type = String(body.event_type || "").trim().slice(0, 32);
  if (!slug || !VALID_EVENTS.has(event_type)) return bad("Invalid event");
  const feature_key = body.feature_key ? String(body.feature_key).slice(0, 32) : null;
  const session_hash = body.session_hash ? String(body.session_hash).slice(0, 64) : null;
  const page_url = body.page_url ? String(body.page_url).slice(0, 500) : null;

  const originHeader = req.headers.get("Origin") || req.headers.get("Referer") || "";
  let referrer_host: string | null = null;
  try { referrer_host = originHeader ? new URL(originHeader).hostname.replace(/^www\./, "") : null; } catch {}

  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );

  const { data: org } = await admin
    .from("acc_organizations").select("id").eq("slug", slug).maybeSingle();
  if (!org) return ok(); // silently drop unknown orgs

  const { data: site } = await admin
    .from("acc_websites")
    .select("id, allowed_domains")
    .eq("organization_id", org.id)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (!site) return ok();

  // Domain allowlist enforcement (mirrors acc-widget-config)
  const allowed = (site.allowed_domains as string[] | null) ?? [];
  if (allowed.length > 0 && referrer_host) {
    const ok = allowed.some((d) => {
      const norm = (d || "").toLowerCase().replace(/^www\./, "");
      return referrer_host === norm || referrer_host!.endsWith("." + norm);
    });
    if (!ok) return bad("Origin not allowed", 403);
  }

  await admin.from("acc_widget_events").insert({
    organization_id: org.id,
    website_id: site.id,
    event_type,
    feature_key,
    session_hash,
    page_url,
    referrer_host,
  });

  return ok();
});