import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Globe, Plus, ScanLine, Loader2, ExternalLink, Trash2, CalendarClock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { useAccessibilityOrg } from "@/hooks/useAccessibilityOrg";

type Ctx = ReturnType<typeof useAccessibilityOrg>;

const PLAN_LIMITS: Record<string, number> = {
  starter: 1,
  professional: 5,
  agency: 25,
  enterprise: Infinity,
};
const limitFor = (plan?: string | null) => PLAN_LIMITS[plan ?? "starter"] ?? 1;

type Website = {
  id: string; name: string; url: string;
  current_score: number | null; last_scan_at: string | null;
  allowed_domains: string[] | null;
  scan_frequency: string;
  next_scan_at: string | null;
};

export default function AccessibilityWebsites() {
  const ctx = useOutletContext<Ctx>();
  const siteLimit = limitFor((ctx.org as any)?.plan);
  const [sites, setSites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [scanningId, setScanningId] = useState<string | null>(null);
  const [manageSite, setManageSite] = useState<Website | null>(null);
  const [domainsDraft, setDomainsDraft] = useState("");
  const [savingDomains, setSavingDomains] = useState(false);

  const load = async () => {
    if (!ctx.org) return;
    setLoading(true);
    const { data } = await supabase
      .from("acc_websites")
      .select("id, name, url, current_score, last_scan_at, allowed_domains, scan_frequency, next_scan_at")
      .eq("organization_id", ctx.org.id)
      .order("created_at", { ascending: false });
    setSites((data as any) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [ctx.org?.id]);

  const add = async () => {
    if (!ctx.org) return;
    if (sites.length >= siteLimit) {
      toast({ title: "Website limit reached", description: `Your plan includes ${siteLimit === Infinity ? "unlimited" : siteLimit} website${siteLimit === 1 ? "" : "s"}. Upgrade to add more.`, variant: "destructive" });
      return;
    }
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

  const openManage = (s: Website) => {
    setManageSite(s);
    setDomainsDraft((s.allowed_domains ?? []).join("\n"));
  };

  const saveDomains = async () => {
    if (!manageSite) return;
    const list = domainsDraft.split(/[\n,]/).map((d) => d.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "")).filter(Boolean);
    setSavingDomains(true);
    const { error } = await supabase.from("acc_websites").update({ allowed_domains: list }).eq("id", manageSite.id);
    setSavingDomains(false);
    if (error) { toast({ title: "Save failed", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Allowed domains updated" });
    setManageSite(null);
    load();
  };

  const updateFrequency = async (id: string, freq: string) => {
    const next = freq === "off" ? null : new Date(Date.now() + 60 * 1000).toISOString();
    const { error } = await supabase.from("acc_websites").update({ scan_frequency: freq, next_scan_at: next }).eq("id", id);
    if (error) { toast({ title: "Could not update schedule", description: error.message, variant: "destructive" }); return; }
    toast({ title: freq === "off" ? "Scheduled scans paused" : `Scans scheduled ${freq}` });
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
          <DialogTrigger asChild><Button className="gap-2" disabled={sites.length >= siteLimit}><Plus className="h-4 w-4" /> Add website</Button></DialogTrigger>
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
              <CardContent className="py-4 flex items-center gap-4 flex-wrap">
                <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center"><Globe className="h-5 w-5" /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">{s.name}</span>
                  </div>
                  <a href={s.url} target="_blank" rel="noreferrer" className="text-xs text-muted-foreground hover:underline inline-flex items-center gap-1">{s.url} <ExternalLink className="h-3 w-3" /></a>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold tabular-nums">{s.current_score ?? "—"}</div>
                  <div className="text-[10px] uppercase text-muted-foreground tracking-wide">Score</div>
                </div>
                <Button size="sm" variant="outline" onClick={() => openManage(s)}>Manage</Button>
                <Select value={s.scan_frequency} onValueChange={(v) => updateFrequency(s.id, v)}>
                  <SelectTrigger className="h-9 w-[130px]"><CalendarClock className="h-3.5 w-3.5 mr-1" /><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="off">Manual only</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm" variant="outline" className="gap-2" disabled={scanningId === s.id} onClick={() => scan(s.id)}>
                  {scanningId === s.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <ScanLine className="h-4 w-4" />} Scan
                </Button>
                <Button size="icon" variant="ghost" onClick={() => remove(s.id)}><Trash2 className="h-4 w-4" /></Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!manageSite} onOpenChange={(o) => !o && setManageSite(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>{manageSite?.name}</DialogTitle></DialogHeader>
          {manageSite && (
            <div className="space-y-6">
              <section className="space-y-2">
                <h3 className="text-sm font-semibold">Allowed domains</h3>
                <p className="text-xs text-muted-foreground">
                  Only these hostnames may load the widget. One per line. Subdomains are included automatically (e.g. <code>example.com</code> covers <code>www.example.com</code> and <code>blog.example.com</code>). Leave blank to allow any.
                </p>
                <textarea
                  value={domainsDraft}
                  onChange={(e) => setDomainsDraft(e.target.value)}
                  rows={4}
                  className="w-full font-mono text-xs bg-background border rounded-md px-3 py-2"
                  placeholder="example.com&#10;staging.example.com"
                />
                <div className="flex justify-end">
                  <Button size="sm" onClick={saveDomains} disabled={savingDomains}>
                    {savingDomains ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save domains"}
                  </Button>
                </div>
              </section>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}