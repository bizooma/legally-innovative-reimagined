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
      const [{ data: org }, { data: sites }, { data: scans }, { data: issues }, { data: scanPages }] = await Promise.all([
        supabase.from("acc_organizations").select("name, brand_color, logo_url").eq("id", orgId).maybeSingle(),
        supabase.from("acc_websites").select("id, name, url, current_score, last_scan_at").eq("organization_id", orgId),
        supabase.from("acc_scans").select("id, score, wcag_aa_pct, pages_scanned, completed_at, started_at, website_id").eq("organization_id", orgId).order("started_at", { ascending: false }).limit(20),
        supabase.from("acc_accessibility_issues").select("id, rule_id, title, description, severity, status, page_url, wcag_reference, element_html, suggested_fix, website_id").eq("organization_id", orgId).limit(2000),
        supabase.from("acc_scan_pages").select("scan_id, url, score, issue_count").limit(1000),
      ]);

      const orgName = org?.name ?? ctx.org!.name;
      const brand = (org?.brand_color ?? "#7A0A0A").replace("#", "");
      const brandRGB: [number, number, number] = [
        parseInt(brand.slice(0, 2), 16) || 122,
        parseInt(brand.slice(2, 4), 16) || 10,
        parseInt(brand.slice(4, 6), 16) || 10,
      ];

      const allIssues = (issues ?? []) as any[];
      const open = allIssues.filter((i) => i.status === "open");
      const sev = (s: string) => {
        if (s === "critical") return "critical";
        if (["serious", "high"].includes(s)) return "serious";
        if (["moderate", "medium"].includes(s)) return "moderate";
        return "minor";
      };
      const sevCount = { critical: 0, serious: 0, moderate: 0, minor: 0 };
      open.forEach((i) => sevCount[sev(i.severity) as keyof typeof sevCount]++);
      const resolved = allIssues.filter((i) => i.status === "resolved").length;
      const sitesArr = (sites ?? []) as any[];
      const scansArr = (scans ?? []) as any[];
      const scored = sitesArr.filter((s) => s.current_score != null);
      const avgScore = scored.length ? Math.round(scored.reduce((a, s) => a + s.current_score, 0) / scored.length) : 0;
      const wcagScans = scansArr.filter((s) => s.wcag_aa_pct != null);
      const wcag = wcagScans.length ? Math.round(wcagScans.reduce((a, s) => a + Number(s.wcag_aa_pct), 0) / wcagScans.length) : 0;
      const totalPages = scansArr.reduce((a, s) => a + (s.pages_scanned ?? 0), 0);

      const riskBand = avgScore >= 90 ? { label: "LOW", color: [22, 163, 74] as [number, number, number] }
        : avgScore >= 70 ? { label: "MEDIUM", color: [202, 138, 4] as [number, number, number] }
        : avgScore >= 50 ? { label: "ELEVATED", color: [234, 88, 12] as [number, number, number] }
        : { label: "CRITICAL", color: [220, 38, 38] as [number, number, number] };

      const doc = new jsPDF({ unit: "pt", format: "letter" });
      const W = doc.internal.pageSize.getWidth();
      const H = doc.internal.pageSize.getHeight();
      const M = 48;

      // Helpers
      const setFill = (c: [number, number, number]) => doc.setFillColor(c[0], c[1], c[2]);
      const setText = (c: [number, number, number]) => doc.setTextColor(c[0], c[1], c[2]);
      const sevColor = (s: string): [number, number, number] => {
        const n = sev(s);
        if (n === "critical") return [220, 38, 38];
        if (n === "serious") return [234, 88, 12];
        if (n === "moderate") return [202, 138, 4];
        return [100, 116, 139];
      };
      const ensureSpace = (need: number) => {
        if (y + need > H - 60) { addPage(); }
      };
      const drawFooter = (pageNum: number) => {
        doc.setDrawColor(230); doc.setLineWidth(0.5);
        doc.line(M, H - 40, W - M, H - 40);
        doc.setFontSize(8).setFont("helvetica", "normal"); setText([130, 130, 130]);
        doc.text(`${orgName} • Accessibility Compliance Report`, M, H - 24);
        doc.text(`Page ${pageNum}`, W - M, H - 24, { align: "right" });
      };
      let pageNum = 1;
      const drawHeader = () => {
        setFill(brandRGB); doc.rect(0, 0, W, 6, "F");
        setText([60, 60, 60]); doc.setFontSize(8).setFont("helvetica", "bold");
        doc.text(orgName.toUpperCase(), M, 28);
        doc.setFont("helvetica", "normal"); setText([130, 130, 130]);
        doc.text(`Generated ${new Date().toLocaleDateString()}`, W - M, 28, { align: "right" });
        doc.setDrawColor(230); doc.line(M, 38, W - M, 38);
      };
      const addPage = () => {
        drawFooter(pageNum);
        doc.addPage(); pageNum++;
        drawHeader();
        y = 60;
      };

      // ===== COVER =====
      setFill(brandRGB); doc.rect(0, 0, W, H, "F");
      // diagonal accent
      doc.setFillColor(255, 255, 255, 0.04 as any);
      setText([255, 255, 255]);
      doc.setFontSize(11).setFont("helvetica", "bold");
      doc.text("ACCESSIBILITY COMPLIANCE REPORT", M, 110);
      doc.setLineWidth(1.5); doc.setDrawColor(255, 255, 255);
      doc.line(M, 122, M + 60, 122);

      doc.setFontSize(34).setFont("helvetica", "bold");
      const titleLines = doc.splitTextToSize(orgName, W - M * 2);
      doc.text(titleLines, M, 170);

      doc.setFontSize(11).setFont("helvetica", "normal");
      doc.text("WCAG 2.1 Level AA Audit & Remediation Roadmap", M, 170 + titleLines.length * 38 + 6);

      // Big score ring on cover
      const cx = W - 180, cy = 360, r = 90;
      doc.setFillColor(255, 255, 255); doc.circle(cx, cy, r, "F");
      const arcColor = riskBand.color;
      // Approximate ring with thick stroke segments
      doc.setDrawColor(arcColor[0], arcColor[1], arcColor[2]);
      doc.setLineWidth(14);
      doc.circle(cx, cy, r - 8, "S");
      setText([20, 20, 20]); doc.setFontSize(48).setFont("helvetica", "bold");
      doc.text(String(avgScore), cx, cy + 6, { align: "center" });
      setText([100, 100, 100]); doc.setFontSize(9).setFont("helvetica", "normal");
      doc.text("OUT OF 100", cx, cy + 26, { align: "center" });

      // Risk band pill
      setFill(arcColor);
      doc.roundedRect(cx - 60, cy + 50, 120, 26, 13, 13, "F");
      setText([255, 255, 255]); doc.setFontSize(11).setFont("helvetica", "bold");
      doc.text(`${riskBand.label} RISK`, cx, cy + 67, { align: "center" });

      // Cover stats strip
      setText([255, 255, 255]); doc.setFontSize(10).setFont("helvetica", "normal");
      const cStats = [
        { l: "WCAG 2.1 AA", v: `${wcag}%` },
        { l: "Websites", v: String(sitesArr.length) },
        { l: "Pages scanned", v: String(totalPages) },
        { l: "Open issues", v: String(open.length) },
      ];
      let sx = M;
      cStats.forEach((s) => {
        doc.setFontSize(9).setFont("helvetica", "normal"); setText([255, 255, 255, 0.7] as any);
        setText([200, 200, 200]); doc.text(s.l.toUpperCase(), sx, H - 130);
        setText([255, 255, 255]); doc.setFontSize(20).setFont("helvetica", "bold");
        doc.text(s.v, sx, H - 105);
        sx += (W - M * 2) / 4;
      });

      setText([220, 220, 220]); doc.setFontSize(8).setFont("helvetica", "normal");
      doc.text(`Prepared by Bizooma Accessibility Layer • ${new Date().toLocaleDateString(undefined, { dateStyle: "long" })}`, M, H - 60);

      // ===== PAGE 2: EXECUTIVE SUMMARY =====
      doc.addPage(); pageNum++;
      drawHeader();
      let y = 70;
      setText([20, 20, 20]); doc.setFontSize(20).setFont("helvetica", "bold");
      doc.text("Executive Summary", M, y); y += 28;

      doc.setFontSize(10).setFont("helvetica", "normal"); setText([55, 65, 81]);
      const summary = sitesArr.length === 0
        ? `No websites have been added yet. Add a website and run a scan to populate this report.`
        : `${orgName} operates ${sitesArr.length} monitored ${sitesArr.length === 1 ? "website" : "websites"} and has completed ${scansArr.length} accessibility ${scansArr.length === 1 ? "scan" : "scans"} covering ${totalPages} unique pages. The current portfolio-wide accessibility score is ${avgScore}/100, placing the organization in the ${riskBand.label.toLowerCase()} legal-risk band under the ADA and WCAG 2.1 Level AA. ${open.length} active issues remain across ${sevCount.critical} critical, ${sevCount.serious} serious, ${sevCount.moderate} moderate, and ${sevCount.minor} minor findings. ${resolved} previously identified issues have been resolved.`;
      const sumLines = doc.splitTextToSize(summary, W - M * 2);
      doc.text(sumLines, M, y); y += sumLines.length * 13 + 18;

      // KPI cards
      const kpis = [
        { l: "Score", v: String(avgScore), sub: "/100" },
        { l: "WCAG AA", v: `${wcag}%`, sub: "conformance" },
        { l: "Critical", v: String(sevCount.critical), sub: "open" },
        { l: "Resolved", v: String(resolved), sub: "to date" },
      ];
      const cw = (W - M * 2 - 12 * 3) / 4;
      kpis.forEach((k, i) => {
        const x = M + i * (cw + 12);
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(x, y, cw, 70, 6, 6, "F");
        doc.setDrawColor(229, 231, 235); doc.setLineWidth(0.5);
        doc.roundedRect(x, y, cw, 70, 6, 6, "S");
        setText([107, 114, 128]); doc.setFontSize(8).setFont("helvetica", "bold");
        doc.text(k.l.toUpperCase(), x + 12, y + 20);
        setText(brandRGB); doc.setFontSize(22).setFont("helvetica", "bold");
        doc.text(k.v, x + 12, y + 46);
        setText([107, 114, 128]); doc.setFontSize(8).setFont("helvetica", "normal");
        doc.text(k.sub, x + 12, y + 60);
      });
      y += 90;

      // Severity bar chart
      ensureSpace(180);
      setText([20, 20, 20]); doc.setFontSize(13).setFont("helvetica", "bold");
      doc.text("Open issues by severity", M, y); y += 16;
      const maxSev = Math.max(1, sevCount.critical, sevCount.serious, sevCount.moderate, sevCount.minor);
      const barOrder = [
        { k: "Critical", v: sevCount.critical, c: [220, 38, 38] as [number, number, number] },
        { k: "Serious", v: sevCount.serious, c: [234, 88, 12] as [number, number, number] },
        { k: "Moderate", v: sevCount.moderate, c: [202, 138, 4] as [number, number, number] },
        { k: "Minor", v: sevCount.minor, c: [100, 116, 139] as [number, number, number] },
      ];
      barOrder.forEach((b) => {
        setText([55, 65, 81]); doc.setFontSize(9).setFont("helvetica", "normal");
        doc.text(b.k, M, y + 11);
        const barX = M + 70, barW = W - M * 2 - 110;
        doc.setFillColor(243, 244, 246); doc.rect(barX, y + 2, barW, 14, "F");
        setFill(b.c); doc.rect(barX, y + 2, (b.v / maxSev) * barW, 14, "F");
        setText([20, 20, 20]); doc.setFont("helvetica", "bold");
        doc.text(String(b.v), W - M, y + 11, { align: "right" });
        y += 22;
      });
      y += 10;

      // ===== PAGE: WEBSITE BREAKDOWN =====
      ensureSpace(140);
      setText([20, 20, 20]); doc.setFontSize(13).setFont("helvetica", "bold");
      doc.text("Website portfolio", M, y); y += 16;
      if (sitesArr.length === 0) {
        setText([107, 114, 128]); doc.setFontSize(10).setFont("helvetica", "normal");
        doc.text("No websites configured.", M, y); y += 18;
      } else {
        // header row
        setText([107, 114, 128]); doc.setFontSize(8).setFont("helvetica", "bold");
        doc.text("WEBSITE", M, y);
        doc.text("SCORE", W - M - 220, y);
        doc.text("OPEN ISSUES", W - M - 140, y);
        doc.text("LAST SCAN", W - M, y, { align: "right" });
        y += 6;
        doc.setDrawColor(229, 231, 235); doc.line(M, y, W - M, y); y += 12;
        sitesArr.forEach((s) => {
          ensureSpace(40);
          const siteOpen = open.filter((i) => i.website_id === s.id).length;
          const sColor: [number, number, number] = (s.current_score ?? 0) >= 90 ? [22, 163, 74] : (s.current_score ?? 0) >= 70 ? [202, 138, 4] : (s.current_score ?? 0) >= 50 ? [234, 88, 12] : [220, 38, 38];
          setText([20, 20, 20]); doc.setFontSize(10).setFont("helvetica", "bold");
          doc.text(doc.splitTextToSize(s.name, 280)[0], M, y);
          setText([107, 114, 128]); doc.setFontSize(8).setFont("helvetica", "normal");
          doc.text(doc.splitTextToSize(s.url, 280)[0], M, y + 12);
          setText(sColor); doc.setFontSize(14).setFont("helvetica", "bold");
          doc.text(String(s.current_score ?? "—"), W - M - 220, y + 6);
          setText([20, 20, 20]); doc.setFontSize(11).setFont("helvetica", "normal");
          doc.text(String(siteOpen), W - M - 140, y + 6);
          setText([107, 114, 128]); doc.setFontSize(9);
          doc.text(s.last_scan_at ? new Date(s.last_scan_at).toLocaleDateString() : "Never", W - M, y + 6, { align: "right" });
          y += 30;
          doc.setDrawColor(243, 244, 246); doc.line(M, y - 4, W - M, y - 4);
        });
      }
      y += 12;

      // ===== TOP VIOLATIONS =====
      ensureSpace(80);
      setText([20, 20, 20]); doc.setFontSize(13).setFont("helvetica", "bold");
      doc.text("Top open violations", M, y); y += 16;
      const counts = new Map<string, { rule_id: string; title: string; severity: string; wcag?: string; count: number; sample?: string }>();
      open.forEach((i) => {
        const c = counts.get(i.rule_id);
        if (c) c.count++;
        else counts.set(i.rule_id, { rule_id: i.rule_id, title: i.title, severity: i.severity, wcag: i.wcag_reference, count: 1, sample: i.element_html });
      });
      const top = [...counts.values()].sort((a, b) => b.count - a.count).slice(0, 10);
      if (top.length === 0) {
        setText([107, 114, 128]); doc.setFontSize(10).setFont("helvetica", "normal");
        doc.text("No open violations — excellent work.", M, y); y += 18;
      } else {
        top.forEach((v) => {
          ensureSpace(60);
          // severity pill
          const sc = sevColor(v.severity);
          setFill(sc); doc.roundedRect(M, y - 9, 56, 14, 7, 7, "F");
          setText([255, 255, 255]); doc.setFontSize(7).setFont("helvetica", "bold");
          doc.text(sev(v.severity).toUpperCase(), M + 28, y, { align: "center" });
          setText([20, 20, 20]); doc.setFontSize(10).setFont("helvetica", "bold");
          const title = doc.splitTextToSize(v.title, W - M - 140);
          doc.text(title, M + 64, y);
          setText(brandRGB); doc.setFontSize(11).setFont("helvetica", "bold");
          doc.text(`${v.count}×`, W - M, y, { align: "right" });
          setText([107, 114, 128]); doc.setFontSize(8).setFont("helvetica", "normal");
          doc.text(`${v.rule_id}${v.wcag ? "  •  " + v.wcag : ""}`, M + 64, y + 12);
          y += 12 + title.length * 12;
          if (v.sample) {
            const snippet = v.sample.replace(/\s+/g, " ").slice(0, 200);
            doc.setFillColor(248, 250, 252);
            const snipLines = doc.splitTextToSize(snippet, W - M * 2 - 16);
            doc.rect(M, y, W - M * 2, snipLines.length * 10 + 12, "F");
            setText([71, 85, 105]); doc.setFontSize(8).setFont("courier", "normal");
            doc.text(snipLines, M + 8, y + 12);
            y += snipLines.length * 10 + 18;
          } else {
            y += 4;
          }
          doc.setDrawColor(243, 244, 246); doc.line(M, y, W - M, y); y += 10;
        });
      }

      // ===== REMEDIATION ROADMAP =====
      ensureSpace(180);
      y += 8;
      setText([20, 20, 20]); doc.setFontSize(13).setFont("helvetica", "bold");
      doc.text("Remediation roadmap", M, y); y += 16;

      const phases = [
        { name: "Phase 1 — Immediate (0–30 days)", desc: `Resolve all ${sevCount.critical} critical findings. These are the highest legal-risk items most likely to cause assistive-technology blockers.`, color: [220, 38, 38] as [number, number, number] },
        { name: "Phase 2 — Short-term (30–60 days)", desc: `Address ${sevCount.serious} serious findings. These materially impact users with disabilities but are typically lower-effort fixes.`, color: [234, 88, 12] as [number, number, number] },
        { name: "Phase 3 — Mid-term (60–90 days)", desc: `Resolve ${sevCount.moderate} moderate findings and re-scan to confirm remediation. Establish a regression baseline.`, color: [202, 138, 4] as [number, number, number] },
        { name: "Phase 4 — Ongoing", desc: `Enable scheduled scans, address ${sevCount.minor} minor findings opportunistically, and review each new release with the embedded widget enabled.`, color: [100, 116, 139] as [number, number, number] },
      ];
      phases.forEach((p) => {
        ensureSpace(60);
        setFill(p.color); doc.rect(M, y - 8, 4, 36, "F");
        setText([20, 20, 20]); doc.setFontSize(10).setFont("helvetica", "bold");
        doc.text(p.name, M + 14, y);
        setText([55, 65, 81]); doc.setFontSize(9).setFont("helvetica", "normal");
        const dl = doc.splitTextToSize(p.desc, W - M * 2 - 14);
        doc.text(dl, M + 14, y + 14);
        y += 14 + dl.length * 11 + 14;
      });

      // ===== METHODOLOGY / DISCLAIMER =====
      ensureSpace(120);
      y += 4;
      setText([20, 20, 20]); doc.setFontSize(13).setFont("helvetica", "bold");
      doc.text("Methodology & disclaimer", M, y); y += 16;
      setText([55, 65, 81]); doc.setFontSize(9).setFont("helvetica", "normal");
      const meth = `Scans are performed by the Bizooma Accessibility Layer crawler, which discovers pages via sitemap.xml and same-origin breadth-first crawl, respects robots.txt, and analyzes each page against a rule set derived from WCAG 2.1 Level AA success criteria. Issues are categorized by severity (critical, serious, moderate, minor) consistent with axe-core conventions. The accessibility score is a weighted aggregate calibrated so that fully-conforming pages reach 100. This automated audit detects approximately 30–40% of WCAG issues; the remainder require manual review with assistive technology. This report is informational and does not constitute legal advice.`;
      const ml = doc.splitTextToSize(meth, W - M * 2);
      doc.text(ml, M, y); y += ml.length * 11 + 6;

      drawFooter(pageNum);

      const filename = `accessibility-report-${orgName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${new Date().toISOString().slice(0, 10)}.pdf`;
      doc.save(filename);

      await supabase.from("acc_reports").insert({
        organization_id: orgId,
        type: "accessibility_compliance",
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