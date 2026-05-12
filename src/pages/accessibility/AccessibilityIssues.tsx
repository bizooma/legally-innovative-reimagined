import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { useAccessibilityOrg } from "@/hooks/useAccessibilityOrg";

type Ctx = ReturnType<typeof useAccessibilityOrg>;
type Issue = {
  id: string; title: string; description: string | null; severity: string; status: string;
  rule_id: string; wcag_reference: string | null; page_url: string; suggested_fix: string | null;
  element_html: string | null; created_at: string;
};

const sevColor = (s: string) =>
  s === "critical" ? "bg-destructive text-destructive-foreground" :
  s === "serious" || s === "high" ? "bg-orange-600 text-white" :
  s === "moderate" || s === "medium" ? "bg-yellow-500 text-black" :
  "bg-muted text-foreground";

export default function AccessibilityIssues() {
  const ctx = useOutletContext<Ctx>();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"open" | "all">("open");

  const load = async () => {
    if (!ctx.org) return;
    setLoading(true);
    let q = supabase.from("acc_accessibility_issues").select("*").eq("organization_id", ctx.org.id).order("created_at", { ascending: false }).limit(200);
    if (filter === "open") q = q.eq("status", "open");
    const { data } = await q;
    setIssues((data as any) ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, [ctx.org?.id, filter]);

  const resolve = async (id: string) => {
    const { error } = await supabase.from("acc_accessibility_issues").update({ status: "resolved", resolved_at: new Date().toISOString() }).eq("id", id);
    if (error) toast({ title: "Update failed", description: error.message, variant: "destructive" });
    else load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Issues</h1>
          <p className="text-sm text-muted-foreground">All accessibility findings across your sites.</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant={filter === "open" ? "default" : "outline"} onClick={() => setFilter("open")}>Open</Button>
          <Button size="sm" variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>All</Button>
        </div>
      </div>

      {loading ? (
        <div className="text-sm text-muted-foreground flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Loading…</div>
      ) : issues.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-sm text-muted-foreground"><AlertCircle className="h-8 w-8 mx-auto mb-3 opacity-40" />No issues — run a scan to populate this view.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {issues.map((i) => (
            <Card key={i.id}>
              <CardContent className="py-4 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded ${sevColor(i.severity)}`}>{i.severity}</span>
                  <span className="font-semibold">{i.title}</span>
                  {i.wcag_reference && <Badge variant="outline" className="text-[10px]">{i.wcag_reference}</Badge>}
                  <Badge variant="secondary" className="text-[10px]">{i.rule_id}</Badge>
                  <div className="flex-1" />
                  {i.status === "open" && (
                    <Button size="sm" variant="ghost" className="gap-1" onClick={() => resolve(i.id)}>
                      <CheckCircle2 className="h-4 w-4" /> Mark resolved
                    </Button>
                  )}
                </div>
                {i.description && <p className="text-sm text-muted-foreground">{i.description}</p>}
                {i.suggested_fix && <p className="text-sm"><span className="font-medium">Fix:</span> {i.suggested_fix}</p>}
                {i.element_html && <pre className="text-xs bg-muted/40 rounded p-2 overflow-x-auto"><code>{i.element_html}</code></pre>}
                <div className="text-xs text-muted-foreground truncate">{i.page_url}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}