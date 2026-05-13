import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, ShieldCheck, ShieldAlert, Download, FileText, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { useAccessibilityOrg } from "@/hooks/useAccessibilityOrg";

type Ctx = ReturnType<typeof useAccessibilityOrg>;
type Site = { id: string; name: string; url: string; current_score: number | null };
type Scan = { id: string; score: number | null; wcag_aa_pct: number | null; completed_at: string | null; started_at: string | null; pages_scanned: number | null };
type Issue = { id: string; severity: string; status: string };

const riskFromScore = (s: number | null) => {
  if (s == null) return { label: "Unknown", color: "bg-muted text-muted-foreground", desc: "Run a scan to assess your ADA exposure." };
  if (s >= 90) return { label: "Low", color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400", desc: "Strong WCAG conformance. Continue monthly monitoring." };
  if (s >= 70) return { label: "Medium", color: "bg-amber-500/10 text-amber-700 dark:text-amber-400", desc: "Notable issues remain. Address criticals to reduce demand-letter exposure." };
  if (s >= 50) return { label: "High", color: "bg-orange-500/10 text-orange-700 dark:text-orange-400", desc: "Elevated risk of complaints. Prioritize fixes within 30 days." };
  return { label: "Critical", color: "bg-destructive/10 text-destructive", desc: "Material compliance gaps. Remediate immediately." };
};

export default function AccessibilityCompliance() {
  const ctx = useOutletContext<Ctx>();
  const [loading, setLoading] = useState(true);
  const [sites, setSites] = useState<Site[]>([]);
  const [scans, setScans] = useState<Scan[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    (async () => {
      if (!ctx.org) return;
      setLoading(true);
      const orgId = ctx.org.id;
      const [{ data: w }, { data: s }, { data: i }] = await Promise.all([
        supabase.from("acc_websites").select("id, name, url, current_score").eq("organization_id", orgId),
        supabase.from("acc_scans").select("id, score, wcag_aa_pct, completed_at, started_at, pages_scanned").eq("organization_id", orgId).order("started_at", { ascending: false }).limit(30),
        supabase.from("acc_accessibility_issues").select("id, severity, status").eq("organization_id", orgId).limit(2000),
      ]);
      setSites((w as any) ?? []); setScans((s as any) ?? []); setIssues((i as any) ?? []);
      setLoading(false);
    })();
  }, [ctx.org?.id]);

  const summary = useMemo(() => {
    const scored = sites.filter((s) => s.current_score != null);
    const avgScore = scored.length ? Math.round(scored.reduce((a, s) => a + (s.current_score ?? 0), 0) / scored.length) : null;
    const wcagScans = scans.filter((s) => s.wcag_aa_pct != null);
    const wcag = wcagScans.length ? Math.round(wcagScans.reduce((a, s) => a + Number(s.wcag_aa_pct ?? 0), 0) / wcagScans.length) : null;
    const open = issues.filter((i) => i.status === "open");
    const critical = open.filter((i) => i.severity === "critical").length;
    const serious = open.filter((i) => ["serious", "high"].includes(i.severity)).length;
    const lastScan = scans.find((s) => s.completed_at)?.completed_at ?? scans[0]?.started_at ?? null;
    const totalScans = scans.length;
    return { avgScore, wcag, critical, serious, lastScan, totalScans, risk: riskFromScore(avgScore) };
  }, [sites, scans, issues]);

  const downloadStatement = () => {
    const orgName = ctx.org?.name ?? "Our organization";
    const site = sites[0];
    const today = new Date().toLocaleDateString();
    const wcagPct = summary.wcag ?? 0;
    const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Accessibility Statement — ${orgName}</title>
<style>body{font-family:system-ui,-apple-system,sans-serif;max-width:780px;margin:40px auto;padding:0 20px;line-height:1.6;color:#1a1a1a}h1{border-bottom:2px solid #7A0A0A;padding-bottom:8px}h2{margin-top:32px;color:#7A0A0A}small{color:#666}</style></head><body>
<h1>Accessibility Statement</h1>
<p><small>Last updated: ${today}</small></p>
<p>${orgName} is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.</p>
<h2>Conformance status</h2>
<p>The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. ${site ? `<strong>${site.url}</strong>` : "Our website"} is <strong>${wcagPct >= 95 ? "fully" : "partially"} conformant</strong> with WCAG 2.1 level AA. Current automated conformance: <strong>${wcagPct}%</strong>.</p>
<h2>Compatibility with browsers and assistive technology</h2>
<p>Our website is designed to be compatible with the following assistive technologies: recent versions of JAWS, NVDA, VoiceOver, TalkBack, and Dragon NaturallySpeaking, in combination with current major browsers.</p>
<h2>Technical specifications</h2>
<p>Accessibility relies on the following technologies: HTML, WAI-ARIA, CSS, and JavaScript.</p>
<h2>Assessment approach</h2>
<p>${orgName} assessed the accessibility of this website using automated continuous monitoring via the Accessibility Layer platform, supplemented by manual review of high-traffic pages.</p>
<h2>Feedback</h2>
<p>We welcome your feedback on the accessibility of this site. Please contact us if you encounter accessibility barriers.</p>
</body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "accessibility-statement.html";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  if (loading) {
    return <div className="text-sm text-muted-foreground flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Loading…</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Compliance Center</h1>
        <p className="text-sm text-muted-foreground">Your WCAG 2.1 AA conformance and ADA risk posture.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between text-xs text-muted-foreground"><span>WCAG 2.1 AA conformance</span><ShieldCheck className="h-4 w-4" /></div>
            <div className="text-3xl font-bold mt-2">{summary.wcag != null ? `${summary.wcag}%` : "—"}</div>
            <div className="text-xs text-muted-foreground mt-1">Across {summary.totalScans} scans</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between text-xs text-muted-foreground"><span>ADA risk</span><Shield className="h-4 w-4" /></div>
            <div className="mt-2"><Badge className={summary.risk.color + " text-base px-3 py-1"}>{summary.risk.label}</Badge></div>
            <div className="text-xs text-muted-foreground mt-2">{summary.risk.desc}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between text-xs text-muted-foreground"><span>Open critical / serious</span><ShieldAlert className="h-4 w-4" /></div>
            <div className="text-3xl font-bold mt-2">{summary.critical} <span className="text-base text-muted-foreground font-normal">/ {summary.serious}</span></div>
            <div className="text-xs text-muted-foreground mt-1">Highest-risk open issues</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-3">
          <h3 className="font-semibold">Accessibility statement</h3>
          <p className="text-sm text-muted-foreground">Generate an audit-ready statement using your current scan data. Host it at <code>/accessibility-statement</code> on your site as evidence of good-faith compliance efforts.</p>
          <Button onClick={downloadStatement} className="gap-2"><Download className="h-4 w-4" /> Download statement (HTML)</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Audit trail</h3>
          {scans.length === 0 ? (
            <div className="text-sm text-muted-foreground text-center py-8 border rounded-lg">No scans on record yet.</div>
          ) : (
            <ul className="divide-y">
              {scans.slice(0, 10).map((s) => (
                <li key={s.id} className="flex items-center gap-3 py-3 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{new Date((s.completed_at ?? s.started_at)!).toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">{s.pages_scanned ?? 0} pages • WCAG {s.wcag_aa_pct ?? "—"}%</div>
                  </div>
                  <Badge variant="secondary" className="gap-1">
                    {(s.score ?? 0) >= 90 ? <CheckCircle2 className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                    Score {s.score ?? "—"}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}