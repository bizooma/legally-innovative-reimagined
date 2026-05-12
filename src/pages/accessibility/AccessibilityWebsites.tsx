import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Globe, Plus, ScanLine, Loader2, ExternalLink, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { useAccessibilityOrg } from "@/hooks/useAccessibilityOrg";

type Ctx = ReturnType<typeof useAccessibilityOrg>;
type Website = { id: string; name: string; url: string; current_score: number | null; last_scan_at: string | null; verification_status: string };

export default function AccessibilityWebsites() {
  const ctx = useOutletContext<Ctx>();
  const [sites, setSites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [scanningId, setScanningId] = useState<string | null>(null);

  const load = async () => {
    if (!ctx.org) return;
    setLoading(true);
    const { data } = await supabase
      .from("acc_websites")
      .select("id, name, url, current_score, last_scan_at, verification_status")
      .eq("organization_id", ctx.org.id)
      .order("created_at", { ascending: false });
    setSites((data as any) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [ctx.org?.id]);

  const add = async () => {
    if (!ctx.org) return;
    setBusy(true);
    let normalized = url.trim();
    if (!/^https?:\/\//i.test(normalized)) normalized = "https://" + normalized;
    const { error } = await supabase.from("acc_websites").insert({
      organization_id: ctx.org.id, name: name.trim() || normalized, url: normalized,
    });
    setBusy(false);
    if (error) { toast({ title: "Could not add website", description: error.message, variant: "destructive" }); return; }
    setName(""); setUrl(""); setOpen(false);
    await load();
  };

  const remove = async (id: string) => {
    if (!confirm("Remove this website? Scan history will be retained.")) return;
    const { error } = await supabase.from("acc_websites").delete().eq("id", id);
    if (error) toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    else load();
  };

  const scan = async (id: string) => {
    setScanningId(id);
    const { data, error } = await supabase.functions.invoke("run-accessibility-scan", { body: { website_id: id } });
    setScanningId(null);
    if (error) { toast({ title: "Scan failed", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Scan complete", description: `Score ${data.score} • ${data.issues_count} issues` });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Websites</h1>
          <p className="text-sm text-muted-foreground">Add, verify, and monitor the domains you protect.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" /> Add website</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add a website</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div className="space-y-1.5"><Label>Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Marketing site" /></div>
              <div className="space-y-1.5"><Label>URL</Label><Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="example.com" /></div>
              <Button className="w-full" onClick={add} disabled={busy || !url.trim()}>{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add website"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-sm text-muted-foreground flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Loading…</div>
      ) : sites.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-sm text-muted-foreground">
          <Globe className="h-8 w-8 mx-auto mb-3 opacity-40" />
          No websites yet. Add your first domain to begin scanning.
        </CardContent></Card>
      ) : (
        <div className="grid gap-3">
          {sites.map((s) => (
            <Card key={s.id}>
              <CardContent className="py-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center"><Globe className="h-5 w-5" /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">{s.name}</span>
                    <Badge variant={s.verification_status === "verified" ? "default" : "secondary"}>{s.verification_status}</Badge>
                  </div>
                  <a href={s.url} target="_blank" rel="noreferrer" className="text-xs text-muted-foreground hover:underline inline-flex items-center gap-1">{s.url} <ExternalLink className="h-3 w-3" /></a>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold tabular-nums">{s.current_score ?? "—"}</div>
                  <div className="text-[10px] uppercase text-muted-foreground tracking-wide">Score</div>
                </div>
                <Button size="sm" variant="outline" className="gap-2" disabled={scanningId === s.id} onClick={() => scan(s.id)}>
                  {scanningId === s.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <ScanLine className="h-4 w-4" />} Scan
                </Button>
                <Button size="icon" variant="ghost" onClick={() => remove(s.id)}><Trash2 className="h-4 w-4" /></Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}