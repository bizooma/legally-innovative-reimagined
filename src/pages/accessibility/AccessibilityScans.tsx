import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ScanLine } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { useAccessibilityOrg } from "@/hooks/useAccessibilityOrg";

type Ctx = ReturnType<typeof useAccessibilityOrg>;
type Scan = { id: string; status: string; score: number | null; total_issues: number | null; pages_scanned: number | null; started_at: string | null; completed_at: string | null; website_id: string };

export default function AccessibilityScans() {
  const ctx = useOutletContext<Ctx>();
  const [scans, setScans] = useState<Scan[]>([]);
  const [websites, setWebsites] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ctx.org) return;
    (async () => {
      setLoading(true);
      const [{ data: scanData }, { data: siteData }] = await Promise.all([
        supabase.from("acc_scans").select("id, status, score, total_issues, pages_scanned, started_at, completed_at, website_id").eq("organization_id", ctx.org!.id).order("started_at", { ascending: false }).limit(50),
        supabase.from("acc_websites").select("id, name").eq("organization_id", ctx.org!.id),
      ]);
      setScans((scanData as any) ?? []);
      const map: Record<string, string> = {};
      (siteData ?? []).forEach((s: any) => (map[s.id] = s.name));
      setWebsites(map);
      setLoading(false);
    })();
  }, [ctx.org?.id]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Scans</h1>
        <p className="text-sm text-muted-foreground">Recent automated WCAG checks across your sites.</p>
      </div>
      {loading ? (
        <div className="text-sm text-muted-foreground flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Loading…</div>
      ) : scans.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-sm text-muted-foreground"><ScanLine className="h-8 w-8 mx-auto mb-3 opacity-40" />No scans yet. Run one from the Websites page.</CardContent></Card>
      ) : (
        <Card><CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
              <tr><th className="text-left p-3">Website</th><th className="text-left p-3">Status</th><th className="text-right p-3">Score</th><th className="text-right p-3">Issues</th><th className="text-right p-3">Pages</th><th className="text-right p-3">When</th></tr>
            </thead>
            <tbody>
              {scans.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="p-3 font-medium">{websites[s.website_id] ?? "—"}</td>
                  <td className="p-3"><Badge variant={s.status === "completed" ? "default" : s.status === "failed" ? "destructive" : "secondary"}>{s.status}</Badge></td>
                  <td className="p-3 text-right tabular-nums">{s.score ?? "—"}</td>
                  <td className="p-3 text-right tabular-nums">{s.total_issues ?? 0}</td>
                  <td className="p-3 text-right tabular-nums">{s.pages_scanned ?? 0}</td>
                  <td className="p-3 text-right text-muted-foreground text-xs">{s.completed_at ? new Date(s.completed_at).toLocaleString() : s.started_at ? new Date(s.started_at).toLocaleString() : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent></Card>
      )}
    </div>
  );
}