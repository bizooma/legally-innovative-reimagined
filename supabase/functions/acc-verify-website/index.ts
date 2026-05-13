import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function fetchWithTimeout(url: string, ms = 8000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, {
      signal: ctrl.signal,
      redirect: "follow",
      headers: { "User-Agent": "BizoomaAccessibilityVerifier/1.0" },
    });
  } finally {
    clearTimeout(t);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return json({ error: "Unauthorized" }, 401);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } }
  );

  const token = authHeader.replace("Bearer ", "");
  const { data: claims, error: cErr } = await supabase.auth.getClaims(token);
  if (cErr || !claims?.claims) return json({ error: "Unauthorized" }, 401);

  let body: { website_id?: string };
  try { body = await req.json(); } catch { return json({ error: "Invalid JSON" }, 400); }
  const websiteId = (body.website_id || "").trim();
  if (!websiteId) return json({ error: "website_id is required" }, 400);

  // RLS will scope this — admins of the org can read.
  const { data: site, error: sErr } = await supabase
    .from("acc_websites")
    .select("id, url, verification_token")
    .eq("id", websiteId)
    .maybeSingle();
  if (sErr) return json({ error: sErr.message }, 400);
  if (!site) return json({ error: "Website not found or access denied" }, 404);

  const verifyToken = site.verification_token as string;
  let baseUrl: URL;
  try { baseUrl = new URL(site.url); } catch { return json({ error: "Invalid website URL" }, 400); }

  const adminClient = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  let verified = false;
  let method: string | null = null;
  let lastError: string | null = null;

  // Method 1: meta tag on the homepage
  try {
    const resp = await fetchWithTimeout(baseUrl.toString());
    if (resp.ok) {
      const html = await resp.text();
      const re = new RegExp(
        `<meta[^>]+name=["']bizooma-verify["'][^>]+content=["']${verifyToken.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`,
        "i"
      );
      if (re.test(html)) { verified = true; method = "meta"; }
    } else {
      lastError = `Homepage returned HTTP ${resp.status}`;
    }
  } catch (e) {
    lastError = `Homepage fetch failed: ${String(e)}`;
  }

  // Method 2: well-known file
  if (!verified) {
    const wellKnown = new URL(`/.well-known/bizooma-${verifyToken}.txt`, baseUrl);
    try {
      const resp = await fetchWithTimeout(wellKnown.toString());
      if (resp.ok) {
        const text = (await resp.text()).trim();
        if (text === verifyToken) { verified = true; method = "well-known"; lastError = null; }
        else lastError = "Well-known file content did not match token";
      } else if (!lastError) {
        lastError = `Well-known returned HTTP ${resp.status}`;
      }
    } catch (e) {
      if (!lastError) lastError = `Well-known fetch failed: ${String(e)}`;
    }
  }

  const now = new Date().toISOString();
  const update: Record<string, unknown> = {
    verification_last_checked_at: now,
    verification_last_error: verified ? null : lastError,
  };
  if (verified) {
    update.verification_status = "verified";
    update.verified_at = now;
    // Auto-add the site's own host to allowed_domains if list is empty
    const { data: cur } = await adminClient
      .from("acc_websites").select("allowed_domains").eq("id", websiteId).maybeSingle();
    const domains = (cur?.allowed_domains as string[] | null) ?? [];
    if (domains.length === 0) update.allowed_domains = [baseUrl.hostname.replace(/^www\./, "")];
  }

  const { error: uErr } = await adminClient
    .from("acc_websites").update(update).eq("id", websiteId);
  if (uErr) return json({ error: uErr.message }, 500);

  return json({ verified, method, error: verified ? null : lastError, token: verifyToken });
});