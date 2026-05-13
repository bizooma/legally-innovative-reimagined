import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const FREQ_DAYS: Record<string, number> = { daily: 1, weekly: 7, monthly: 30 };

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const admin = createClient(supabaseUrl, serviceKey);

  const nowIso = new Date().toISOString();
  const { data: due, error } = await admin
    .from("acc_websites")
    .select("id, scan_frequency, next_scan_at")
    .neq("scan_frequency", "off")
    .or(`next_scan_at.is.null,next_scan_at.lte.${nowIso}`)
    .limit(20);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  const results: any[] = [];
  for (const w of (due ?? [])) {
    try {
      const r = await fetch(`${supabaseUrl}/functions/v1/run-accessibility-scan`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${serviceKey}`, apikey: serviceKey },
        body: JSON.stringify({ website_id: w.id, scheduled: true }),
      });
      const body = await r.json().catch(() => ({}));
      const days = FREQ_DAYS[w.scan_frequency] ?? 7;
      const next = new Date(Date.now() + days * 86400 * 1000).toISOString();
      await admin.from("acc_websites").update({ next_scan_at: next }).eq("id", w.id);
      results.push({ id: w.id, ok: r.ok, score: body?.score ?? null });
    } catch (e) {
      results.push({ id: w.id, ok: false, error: String(e) });
    }
  }

  return new Response(JSON.stringify({ processed: results.length, results }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});