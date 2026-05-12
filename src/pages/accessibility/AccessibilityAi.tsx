import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { useAccessibilityOrg } from "@/hooks/useAccessibilityOrg";

type Ctx = ReturnType<typeof useAccessibilityOrg>;
type Rec = { id: string; title: string; message: string; category: string; priority: string; estimated_impact: string | null; created_at: string; website_id: string };

export default function AccessibilityAi() {
  const ctx = useOutletContext<Ctx>();
  const [recs, setRecs] = useState<Rec[]>([]);
  const [websites, setWebsites] = useState<{ id: string; name: string }[]>([]);
  const [generating, setGenerating] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!ctx.org) return;
    setLoading(true);
    const [{ data: r }, { data: s }] = await Promise.all([
      supabase.from("acc_ai_recommendations").select("*").eq("organization_id", ctx.org.id).order("created_at", { ascending: false }).limit(50),
      supabase.from("acc_websites").select("id, name").eq("organization_id", ctx.org.id),
    ]);
    setRecs((r as any) ?? []);
    setWebsites((s as any) ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, [ctx.org?.id]);

  const generate = async (websiteId: string) => {
    setGenerating(websiteId);
    const { error } = await supabase.functions.invoke("accessibility-ai-recs", { body: { website_id: websiteId } });
    setGenerating(null);
    if (error) { toast({ title: "AI failed", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Recommendations generated" });
    load();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AI Recommendations</h1>
        <p className="text-sm text-muted-foreground">Prioritized insights generated from your scan results.</p>
      </div>

      <Card>
        <CardContent className="py-4">
          <div className="text-sm font-medium mb-3">Generate for a website</div>
          {websites.length === 0 ? (
            <p className="text-sm text-muted-foreground">Add a website first.</p>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {websites.map((w) => (
                <Button key={w.id} size="sm" variant="outline" disabled={generating === w.id} onClick={() => generate(w.id)} className="gap-2">
                  {generating === w.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />} {w.name}
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {loading ? (
        <div className="text-sm text-muted-foreground flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Loading…</div>
      ) : recs.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-sm text-muted-foreground"><Sparkles className="h-8 w-8 mx-auto mb-3 opacity-40" />No recommendations yet — generate one above.</CardContent></Card>
      ) : (
        <div className="grid gap-3">
          {recs.map((r) => (
            <Card key={r.id}>
              <CardContent className="py-4 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold">{r.title}</span>
                  <Badge variant="outline">{r.category}</Badge>
                  <Badge variant="secondary">{r.priority}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{r.message}</p>
                {r.estimated_impact && <p className="text-xs"><span className="font-medium">Impact:</span> {r.estimated_impact}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}