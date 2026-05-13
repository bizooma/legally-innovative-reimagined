import { useEffect, useMemo, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gauge, Shield, AlertTriangle, AlertCircle, CheckCircle2, FileText, ScanLine, Globe, Calendar, Loader2, MousePointerClick, Users, Info } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { useAccessibilityOrg } from "@/hooks/useAccessibilityOrg";

type Ctx = ReturnType<typeof useAccessibilityOrg>;
type Site = { id: string; name: string; url: string; current_score: number | null; last_scan_at: string | null };
type Scan = { id: string; score: number | null; wcag_aa_pct: number | null; pages_scanned: number | null; completed_at: string | null; started_at: string | null; summary: any | null };
type Issue = { id: string; rule_id: string; title: string; severity: string; status: string };
type WidgetEvent = { event_type: string; feature_key: string | null; session_hash: string | null; created_at: string };

const riskBand = (score: number | null) => {
  if (score == null) return "—";
  if (score >= 90) return "Low";
  if (score >= 70) return "Medium";
  if (score >= 50) return "High";
  return "Critical";
};

export default function AccessibilityDashboard() {
  const ctx = useOutletContext<Ctx>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sites, setSites] = useState<Site[]>([]);
  const [scans, setScans] = useState<Scan[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [events, setEvents] = useState<WidgetEvent[]>([]);
  const [scanningAll, setScanningAll] = useState(false);

  const load = async () => {
    if (!ctx.org) return;
    setLoading(true);
    const orgId = ctx.org.id;
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const [{ data: w }, { data: s }, { data: i }, { data: e }] = await Promise.all([
      supabase.from("acc_websites").select("id, name, url, current_score, last_scan_at").eq("organization_id", orgId).order("created_at", { ascending: false }),
      supabase.from("acc_scans").select("id, score, wcag_aa_pct, pages_scanned, completed_at, started_at, summary").eq("organization_id", orgId).order("started_at", { ascending: false }).limit(30),
      supabase.from("acc_accessibility_issues").select("id, rule_id, title, severity, status").eq("organization_id", orgId).limit(1000),
      supabase.from("acc_widget_events").select("event_type, feature_key, session_hash, created_at").eq("organization_id", orgId).gte("created_at", since).limit(5000),
    ]);
    setSites((w as any) ?? []);
    setScans((s as any) ?? []);
    setIssues((i as any) ?? []);
    setEvents((e as any) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [ctx.org?.id]);

  const stats = useMemo(() => {
    const scored = sites.filter((s) => s.current_score != null);
    const avgScore = scored.length ? Math.round(scored.reduce((a, s) => a + (s.current_score ?? 0), 0) / scored.length) : null;
    const wcagScans = scans.filter((s) => s.wcag_aa_pct != null);
    const wcag = wcagScans.length ? Math.round(wcagScans.reduce((a, s) => a + Number(s.wcag_aa_pct ?? 0), 0) / wcagScans.length) : null;
    const open = issues.filter((i) => i.status === "open");
    const critical = open.filter((i) => i.severity === "critical").length;
    const warnings = open.filter((i) => ["serious", "moderate", "high", "medium"].includes(i.severity)).length;
    const resolved = issues.filter((i) => i.status === "resolved").length;
    const pages = scans.reduce((a, s) => a + (s.pages_scanned ?? 0), 0);
    const lastScanAt = scans.find((s) => s.completed_at)?.completed_at ?? scans[0]?.started_at ?? null;
    return { avgScore, wcag, critical, warnings, resolved, pages, risk: riskBand(avgScore), lastScanAt };
  }, [sites, scans, issues]);

  const trend = useMemo(() => {
    return [...scans]
      .filter((s) => s.score != null && (s.completed_at || s.started_at))
      .reverse()
      .map((s) => ({
        date: new Date(s.completed_at ?? s.started_at!).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
        score: s.score,
      }));
  }, [scans]);

  const topViolations = useMemo(() => {
    const map = new Map<string, { rule_id: string; title: string; count: number; severity: string }>();
    issues.filter((i) => i.status === "open").forEach((i) => {
      const k = i.rule_id;
      const cur = map.get(k);
      if (cur) cur.count++;
      else map.set(k, { rule_id: i.rule_id, title: i.title, count: 1, severity: i.severity });
    });
    return [...map.values()].sort((a, b) => b.count - a.count).slice(0, 5);
  }, [issues]);

  const widgetStats = useMemo(() => {
    const opens = events.filter((e) => e.event_type === "open").length;
    const sessions = new Set(events.filter((e) => e.session_hash).map((e) => e.session_hash!)).size;
    const featureCounts = new Map<string, number>();
    events.filter((e) => e.event_type === "feature_on" && e.feature_key).forEach((e) => {
      featureCounts.set(e.feature_key!, (featureCounts.get(e.feature_key!) ?? 0) + 1);
    });
    const topFeatures = [...featureCounts.entries()]
      .map(([feature, count]) => ({ feature, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
    return { opens, sessions, topFeatures };
  }, [events]);

  const runScan = async () => {
    if (sites.length === 0) { navigate("/accessibility/websites"); return; }
    if (sites.length > 1) { navigate("/accessibility/websites"); return; }
    setScanningAll(true);
    const { data, error } = await supabase.functions.invoke("run-accessibility-scan", { body: { website_id: sites[0].id } });
    setScanningAll(false);
    if (error) { toast({ title: "Scan failed", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Scan complete", description: `Score ${data.score} • ${data.issues_count} issues` });
    load();
  };

  const cards = [
    { label: "Accessibility Score", value: stats.avgScore ?? "—", icon: Gauge },
    { label: "WCAG 2.1 AA", value: stats.wcag != null ? `${stats.wcag}%` : "—", icon: Shield },
    { label: "Critical issues", value: String(stats.critical), icon: AlertTriangle },
    { label: "Warnings", value: String(stats.warnings), icon: AlertCircle },
    { label: "Resolved", value: String(stats.resolved), icon: CheckCircle2 },
    { label: "ADA risk", value: stats.risk, icon: Shield },
    { label: "Widget opens (30d)", value: String(widgetStats.opens), icon: MousePointerClick },
    { label: "Unique visitors (30d)", value: String(widgetStats.sessions), icon: Users },
    { label: "Last scan", value: stats.lastScanAt ? new Date(stats.lastScanAt).toLocaleDateString() : "Never", icon: Calendar },
  ];

  const latestScan = scans.find((s) => s.completed_at) ?? scans[0];
  const spaWarning = !!latestScan?.summary?.spa_warning;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Compliance health across your websites.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => navigate("/accessibility/reports")}>
            <FileText className="h-4 w-4" /> Generate report
          </Button>
          <Button className="gap-2" onClick={runScan} disabled={scanningAll}>
            {scanningAll ? <Loader2 className="h-4 w-4 animate-spin" /> : <ScanLine className="h-4 w-4" />} Run new scan
          </Button>
        </div>
      </div>

      {spaWarning && !loading && (
        <Card className="border-amber-500/40 bg-amber-50/50 dark:bg-amber-950/20">
          <CardContent className="pt-6 flex gap-3">
            <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-sm">
              <div className="font-semibold text-amber-900 dark:text-amber-200">Limited scan results — JavaScript-rendered site detected</div>
              <p className="text-amber-900/80 dark:text-amber-200/80 mt-1">
                Your site appears to render content with JavaScript (React, Vue, Next.js, etc.). Our static scanner only sees the initial HTML shell, so the score and issue counts may be artificially high. Real accessibility issues in the rendered DOM are not detected. Headless-browser scanning is on the roadmap — until then, treat these results as a baseline check on your HTML shell.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="text-sm text-muted-foreground flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Loading…</div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cards.map((s) => (
              <Card key={s.label}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{s.label}</span>
                    <s.icon className="h-4 w-4" />
                  </div>
                  <div className="text-3xl font-bold mt-2">{s.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Accessibility score over time</h3>
                {trend.length === 0 ? (
                  <div className="h-56 rounded-lg border flex items-center justify-center text-sm text-muted-foreground">
                    No scan data yet — run your first scan to see trends.
                  </div>
                ) : (
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trend} margin={{ top: 5, right: 12, left: -12, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="date" fontSize={11} stroke="hsl(var(--muted-foreground))" />
                        <YAxis domain={[0, 100]} fontSize={11} stroke="hsl(var(--muted-foreground))" />
                        <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                        <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Top violations</h3>
                {topViolations.length === 0 ? (
                  <div className="text-sm text-muted-foreground text-center py-8 border rounded-lg">
                    No open violations.
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {topViolations.map((v) => (
                      <li key={v.rule_id} className="flex items-center justify-between gap-2 text-sm border rounded-md px-3 py-2">
                        <div className="min-w-0">
                          <div className="font-medium truncate">{v.title}</div>
                          <div className="text-[10px] uppercase text-muted-foreground">{v.rule_id} • {v.severity}</div>
                        </div>
                        <Badge variant="secondary">{v.count}</Badge>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Most-used widget features (30d)</h3>
              {widgetStats.topFeatures.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center py-8 border rounded-lg">
                  No widget activity yet — install the snippet on your site to start collecting usage.
                </div>
              ) : (
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={widgetStats.topFeatures} margin={{ top: 5, right: 12, left: -12, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="feature" fontSize={11} stroke="hsl(var(--muted-foreground))" />
                      <YAxis fontSize={11} stroke="hsl(var(--muted-foreground))" allowDecimals={false} />
                      <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                      <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Websites</h3>
                <Button size="sm" variant="outline" className="gap-2" onClick={() => navigate("/accessibility/websites")}>
                  <Globe className="h-4 w-4" /> {sites.length === 0 ? "Add website" : "Manage websites"}
                </Button>
              </div>
              {sites.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center py-8 border rounded-lg">
                  No websites yet — add your first domain to begin scanning.
                </div>
              ) : (
                <ul className="divide-y">
                  {sites.slice(0, 5).map((s) => (
                    <li key={s.id} className="flex items-center gap-3 py-3">
                      <div className="h-9 w-9 rounded-md bg-primary/10 text-primary flex items-center justify-center"><Globe className="h-4 w-4" /></div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{s.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{s.url}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold tabular-nums">{s.current_score ?? "—"}</div>
                        <div className="text-[10px] uppercase text-muted-foreground">Score</div>
                      </div>
                      <div className="text-xs text-muted-foreground w-28 text-right">
                        {s.last_scan_at ? new Date(s.last_scan_at).toLocaleDateString() : "Never scanned"}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}