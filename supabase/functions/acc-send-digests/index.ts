import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const FREQ_DAYS: Record<string, number> = { weekly: 7, monthly: 30 };

function fmtDate(d: string | null) {
  return d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Never";
}

function scoreColor(s: number | null) {
  if (s == null) return "#6b7280";
  if (s >= 90) return "#16a34a";
  if (s >= 70) return "#ca8a04";
  if (s >= 50) return "#ea580c";
  return "#dc2626";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const resendKey = Deno.env.get("RESEND_API_KEY");
  const fromAddress = Deno.env.get("ACC_DIGEST_FROM") || "Bizooma Accessibility <accessibility@notifications.bizooma.com>";
  if (!resendKey) {
    return new Response(JSON.stringify({ error: "RESEND_API_KEY not configured" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  const admin = createClient(supabaseUrl, serviceKey);

  const { data: orgs, error } = await admin
    .from("acc_organizations")
    .select("id, name, digest_email, digest_frequency, digest_last_sent_at")
    .neq("digest_frequency", "off")
    .not("digest_email", "is", null);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  const now = Date.now();
  const results: any[] = [];

  for (const org of (orgs ?? [])) {
    const days = FREQ_DAYS[org.digest_frequency] ?? 7;
    const due = !org.digest_last_sent_at || (now - new Date(org.digest_last_sent_at).getTime()) >= days * 86400 * 1000;
    if (!due) continue;

    const sinceIso = new Date(now - days * 86400 * 1000).toISOString();

    const [{ data: sites }, { data: scans }, { data: issues }] = await Promise.all([
      admin.from("acc_websites").select("id, name, url, current_score, last_scan_at").eq("organization_id", org.id),
      admin.from("acc_scans").select("id, score, started_at, website_id").eq("organization_id", org.id).gte("started_at", sinceIso),
      admin.from("acc_accessibility_issues").select("severity, status, created_at, resolved_at").eq("organization_id", org.id),
    ]);

    const sitesArr = sites ?? [];
    const issuesArr = issues ?? [];
    const open = issuesArr.filter((i: any) => i.status === "open");
    const critical = open.filter((i: any) => i.severity === "critical").length;
    const serious = open.filter((i: any) => i.severity === "serious").length;
    const resolvedRecent = issuesArr.filter((i: any) => i.resolved_at && new Date(i.resolved_at).getTime() >= new Date(sinceIso).getTime()).length;
    const newRecent = issuesArr.filter((i: any) => new Date(i.created_at).getTime() >= new Date(sinceIso).getTime() && i.status === "open").length;
    const scanCount = (scans ?? []).length;
    const scored = sitesArr.filter((s: any) => s.current_score != null);
    const avgScore = scored.length ? Math.round(scored.reduce((a: number, s: any) => a + s.current_score, 0) / scored.length) : null;

    const periodLabel = org.digest_frequency === "monthly" ? "Monthly" : "Weekly";
    const sitesRows = sitesArr.map((s: any) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-family:Inter,Arial,sans-serif;font-size:13px;color:#111;">${s.name}<br><span style="color:#6b7280;font-size:11px;">${s.url}</span></td>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-family:Inter,Arial,sans-serif;font-size:18px;font-weight:600;color:${scoreColor(s.current_score)};">${s.current_score ?? "—"}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-family:Inter,Arial,sans-serif;font-size:12px;color:#6b7280;">${fmtDate(s.last_scan_at)}</td>
      </tr>`).join("");

    const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#f7f7f8;font-family:Inter,Arial,sans-serif;color:#111;">
      <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
        <div style="padding:24px 28px;border-bottom:1px solid #e5e7eb;">
          <div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.08em;">${periodLabel} accessibility digest</div>
          <div style="font-size:22px;font-weight:700;margin-top:6px;">${org.name}</div>
        </div>
        <div style="padding:24px 28px;">
          <table width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:20px;">
            <tr>
              <td style="padding:12px;background:#f9fafb;border-radius:8px;text-align:center;">
                <div style="font-size:11px;color:#6b7280;text-transform:uppercase;">Avg score</div>
                <div style="font-size:24px;font-weight:700;color:${scoreColor(avgScore)};">${avgScore ?? "—"}</div>
              </td>
              <td style="width:8px;"></td>
              <td style="padding:12px;background:#f9fafb;border-radius:8px;text-align:center;">
                <div style="font-size:11px;color:#6b7280;text-transform:uppercase;">Critical</div>
                <div style="font-size:24px;font-weight:700;color:#dc2626;">${critical}</div>
              </td>
              <td style="width:8px;"></td>
              <td style="padding:12px;background:#f9fafb;border-radius:8px;text-align:center;">
                <div style="font-size:11px;color:#6b7280;text-transform:uppercase;">Serious</div>
                <div style="font-size:24px;font-weight:700;color:#ea580c;">${serious}</div>
              </td>
              <td style="width:8px;"></td>
              <td style="padding:12px;background:#f9fafb;border-radius:8px;text-align:center;">
                <div style="font-size:11px;color:#6b7280;text-transform:uppercase;">Scans</div>
                <div style="font-size:24px;font-weight:700;color:#111;">${scanCount}</div>
              </td>
            </tr>
          </table>
          <p style="font-size:13px;color:#374151;margin:0 0 16px;">In the last ${days} days: <strong>${newRecent}</strong> new issues opened, <strong>${resolvedRecent}</strong> resolved.</p>
          <h3 style="font-size:14px;margin:20px 0 8px;">Websites</h3>
          <table width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb;border-radius:8px;border-collapse:separate;border-spacing:0;">
            ${sitesRows || `<tr><td style="padding:14px;color:#6b7280;font-size:13px;">No websites yet.</td></tr>`}
          </table>
        </div>
        <div style="padding:16px 28px;background:#f9fafb;border-top:1px solid #e5e7eb;font-size:11px;color:#6b7280;">
          You're receiving this because email digests are enabled for ${org.name}. Manage in your dashboard.
        </div>
      </div></body></html>`;

    try {
      const resp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: fromAddress,
          to: [org.digest_email],
          subject: `${periodLabel} accessibility digest — ${org.name}`,
          html,
        }),
      });
      const body = await resp.json().catch(() => ({}));
      if (resp.ok) {
        await admin.from("acc_organizations").update({ digest_last_sent_at: new Date().toISOString() }).eq("id", org.id);
        results.push({ org: org.id, sent: true });
      } else {
        results.push({ org: org.id, sent: false, error: body });
      }
    } catch (e) {
      results.push({ org: org.id, sent: false, error: String(e) });
    }
  }

  return new Response(JSON.stringify({ processed: results.length, results }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});