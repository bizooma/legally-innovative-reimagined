import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Loader2, FileBarChart2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import type { useAccessibilityOrg } from "@/hooks/useAccessibilityOrg";

type Ctx = ReturnType<typeof useAccessibilityOrg>;
type Report = { id: string; type: string; format: string; created_at: string; period_start: string | null; period_end: string | null };

export default function AccessibilityReports() {
  const ctx = useOutletContext<Ctx>();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<Report[]>([]);
  const [generating, setGenerating] = useState(false);

  const load = async () => {
    if (!ctx.org) return;
    setLoading(true);
    const { data } = await supabase
      .from("acc_reports")
      .select("id, type, format, created_at, period_start, period_end")
      .eq("organization_id", ctx.org.id)
      .order("created_at", { ascending: false })
      .limit(50);
    setReports((data as any) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [ctx.org?.id]);

  const generateReport = async () => {
    if (!ctx.org) return;
    setGenerating(true);
    try {
      const orgId = ctx.org.id;
      const [{ data: sites }, { data: scans }, { data: issues }] = await Promise.all([
        supabase.from("acc_websites").select("id, name, url, current_score").eq("organization_id", orgId),
        supabase.from("acc_scans").select("id, score, wcag_aa_pct, pages_scanned, completed_at, started_at").eq("organization_id", orgId).order("started_at", { ascending: false }).limit(10),
        supabase.from("acc_accessibility_issues").select("id, rule_id, title, severity, status, page_url").eq("organization_id", orgId).limit(500),
      ]);

      const open = (issues ?? []).filter((i: any) => i.status === "open");
      const critical = open.filter((i: any) => i.severity === "critical").length;
      const serious = open.filter((i: any) => ["serious", "high"].includes(i.severity)).length;
      const moderate = open.filter((i: any) => ["moderate", "medium"].includes(i.severity)).length;
      const minor = open.filter((i: any) => ["minor", "low"].includes(i.severity)).length;
      const resolved = (issues ?? []).filter((i: any) => i.status === "resolved").length;
      const scored = (sites ?? []).filter((s: any) => s.current_score != null);
      const avgScore = scored.length ? Math.round(scored.reduce((a: number, s: any) => a + s.current_score, 0) / scored.length) : 0;
      const wcagScans = (scans ?? []).filter((s: any) => s.wcag_aa_pct != null);
      const wcag = wcagScans.length ? Math.round(wcagScans.reduce((a: number, s: any) => a + Number(s.wcag_aa_pct), 0) / wcagScans.length) : 0;

      const doc = new jsPDF({ unit: "pt", format: "letter" });
      const W = doc.internal.pageSize.getWidth();
      let y = 50;

      doc.setFillColor(122, 10, 10);
      doc.rect(0, 0, W, 80, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20).setFont("helvetica", "bold");
      doc.text("Accessibility Report", 40, 45);
      doc.setFontSize(11).setFont("helvetica", "normal");
      doc.text(ctx.org!.name, 40, 65);
      y = 110;

      doc.setTextColor(20, 20, 20);
      doc.setFontSize(9).setFont("helvetica", "normal");
      doc.text(`Generated: ${new Date().toLocaleString()}`, 40, y); y += 24;

      doc.setFontSize(13).setFont("helvetica", "bold").text("Executive Summary", 40, y); y += 18;
      doc.setFontSize(10).setFont("helvetica", "normal");
      const lines = [
        `Accessibility Score:  ${avgScore}/100`,
        `WCAG 2.1 AA Conformance:  ${wcag}%`,
        `Websites monitored:  ${(sites ?? []).length}`,
        `Scans on record:  ${(scans ?? []).length}`,
        `Open issues:  ${open.length}  (Critical ${critical} • Serious ${serious} • Moderate ${moderate} • Minor ${minor})`,
        `Resolved issues:  ${resolved}`,
      ];
      lines.forEach((l) => { doc.text(l, 50, y); y += 16; });
      y += 10;

      doc.setFontSize(13).setFont("helvetica", "bold").text("Top Open Violations", 40, y); y += 18;
      const counts = new Map<string, { title: string; severity: string; count: number }>();
      open.forEach((i: any) => {
        const c = counts.get(i.rule_id);
        if (c) c.count++; else counts.set(i.rule_id, { title: i.title, severity: i.severity, count: 1 });
      });
      const top = [...counts.values()].sort((a, b) => b.count - a.count).slice(0, 12);
      doc.setFontSize(10).setFont("helvetica", "normal");
      if (top.length === 0) { doc.text("No open violations.", 50, y); y += 16; }
      top.forEach((v) => {
        if (y > 720) { doc.addPage(); y = 50; }
        doc.setFont("helvetica", "bold").text(`${v.count}×`, 50, y);
        doc.setFont("helvetica", "normal");
        const wrapped = doc.splitTextToSize(`${v.title} [${v.severity}]`, W - 120);
        doc.text(wrapped, 80, y);
        y += 14 * wrapped.length + 4;
      });
      y += 10;

      if (y > 660) { doc.addPage(); y = 50; }
      doc.setFontSize(13).setFont("helvetica", "bold").text("Scan History", 40, y); y += 18;
      doc.setFontSize(10).setFont("helvetica", "normal");
      (scans ?? []).slice(0, 12).forEach((s: any) => {
        if (y > 720) { doc.addPage(); y = 50; }
        const d = new Date(s.completed_at ?? s.started_at).toLocaleDateString();
        doc.text(`${d}    Score ${s.score ?? "—"}    WCAG ${s.wcag_aa_pct ?? "—"}%    ${s.pages_scanned ?? 0} pages`, 50, y);
        y += 14;
      });

      doc.setFontSize(8).setTextColor(120, 120, 120);
      doc.text("Generated by Accessibility Layer • bizooma", 40, doc.internal.pageSize.getHeight() - 24);

      const filename = `accessibility-report-${new Date().toISOString().slice(0, 10)}.pdf`;
      doc.save(filename);

      await supabase.from("acc_reports").insert({
        organization_id: orgId,
        type: "accessibility_summary",
        format: "pdf",
        period_end: new Date().toISOString().slice(0, 10),
      });
      toast({ title: "Report generated", description: filename });
      load();
    } catch (e: any) {
      toast({ title: "Generation failed", description: e?.message, variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-sm text-muted-foreground">Executive summaries and historical comparisons.</p>
        </div>
        <Button onClick={generateReport} disabled={generating} className="gap-2">
          {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileBarChart2 className="h-4 w-4" />}
          Generate report
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Past reports</h3>
          {loading ? (
            <div className="text-sm text-muted-foreground flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Loading…</div>
          ) : reports.length === 0 ? (
            <div className="text-sm text-muted-foreground text-center py-8 border rounded-lg">
              No reports yet — click "Generate report" to create your first PDF summary.
            </div>
          ) : (
            <ul className="divide-y">
              {reports.map((r) => (
                <li key={r.id} className="flex items-center gap-3 py-3 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate capitalize">{r.type.replace(/_/g, " ")}</div>
                    <div className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()}</div>
                  </div>
                  <Badge variant="secondary" className="uppercase">{r.format}</Badge>
                  <Button size="sm" variant="ghost" className="gap-1" onClick={generateReport} disabled={generating}>
                    <Download className="h-3.5 w-3.5" /> Re-export
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}