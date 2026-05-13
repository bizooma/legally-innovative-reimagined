import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Code2, Copy, ExternalLink, Loader2, Save, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { useAccessibilityOrg } from "@/hooks/useAccessibilityOrg";

type Ctx = ReturnType<typeof useAccessibilityOrg>;

const ALL_FEATURES: { key: string; label: string }[] = [
  { key: "large", label: "Larger Text" },
  { key: "xl", label: "Huge Text" },
  { key: "contrast", label: "High Contrast" },
  { key: "invert", label: "Invert Colors" },
  { key: "grayscale", label: "Grayscale" },
  { key: "dyslexia", label: "Dyslexia Font" },
  { key: "links", label: "Highlight Links" },
  { key: "pause", label: "Pause Animations" },
  { key: "cursor", label: "Big Cursor" },
];

const POSITIONS = ["bottom-right", "bottom-left", "bottom-center", "top-right", "top-left"] as const;

const ALL_LANGUAGES: { code: string; label: string }[] = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "pt", label: "Português" },
  { code: "de", label: "Deutsch" },
];

type Settings = {
  position: string;
  primary_color: string;
  logo_url: string | null;
  hide_branding: boolean;
  enabled_features: Record<string, boolean>;
  custom_css: string | null;
  default_language: string;
  available_languages: string[];
  statement_url: string | null;
};

const DEFAULTS: Settings = {
  position: "bottom-right",
  primary_color: "#7A0A0A",
  logo_url: null,
  hide_branding: false,
  enabled_features: ALL_FEATURES.reduce((acc, f) => ({ ...acc, [f.key]: true }), {}),
  custom_css: null,
  default_language: "auto",
  available_languages: ["en", "es", "fr", "pt", "de"],
  statement_url: null,
};

export default function AccessibilityWidgetPage() {
  const ctx = useOutletContext<Ctx>();
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const slug = ctx.org?.slug ?? "";
  const snippet = `<!-- Bizooma Accessibility Widget -->\n<script src="${origin}/accessibility-widget.js" data-org="${slug}" defer></script>`;

  const [siteUrl, setSiteUrl] = useState<string | null>(null);
  const [websiteId, setWebsiteId] = useState<string | null>(null);
  const [widgetEnabled, setWidgetEnabled] = useState<boolean>(true);
  const [togglingEnabled, setTogglingEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [s, setS] = useState<Settings>(DEFAULTS);
  const [previewKey, setPreviewKey] = useState(0);

  useEffect(() => {
    if (!ctx.org) return;
    (async () => {
      setLoading(true);
      const { data: site } = await supabase
        .from("acc_websites")
        .select("id, url, widget_enabled")
        .eq("organization_id", ctx.org!.id)
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle();
      setSiteUrl((site as any)?.url ?? null);
      setWebsiteId((site as any)?.id ?? null);
      setWidgetEnabled((site as any)?.widget_enabled !== false);
      if ((site as any)?.id) {
        const { data: existing } = await supabase
          .from("acc_widget_settings")
          .select("position, primary_color, logo_url, hide_branding, enabled_features, custom_css, default_language, available_languages, statement_url")
          .eq("website_id", (site as any).id)
          .maybeSingle();
        if (existing) {
          setS({
            position: (existing as any).position || DEFAULTS.position,
            primary_color: (existing as any).primary_color || DEFAULTS.primary_color,
            logo_url: (existing as any).logo_url ?? null,
            hide_branding: !!(existing as any).hide_branding,
            enabled_features: { ...DEFAULTS.enabled_features, ...((existing as any).enabled_features || {}) },
            custom_css: (existing as any).custom_css ?? null,
            default_language: (existing as any).default_language || DEFAULTS.default_language,
            available_languages: ((existing as any).available_languages && (existing as any).available_languages.length)
              ? (existing as any).available_languages
              : DEFAULTS.available_languages,
            statement_url: (existing as any).statement_url ?? null,
          });
        }
      }
      setLoading(false);
    })();
  }, [ctx.org?.id]);

  const copy = async () => {
    await navigator.clipboard.writeText(snippet);
    toast({ title: "Copied", description: "Embed snippet copied to clipboard." });
  };

  const save = async () => {
    if (!websiteId) {
      toast({ title: "Add a website first", description: "Register a site under Websites before customizing the widget.", variant: "destructive" });
      return;
    }
    setSaving(true);
    const payload = {
      website_id: websiteId,
      position: s.position,
      primary_color: s.primary_color,
      logo_url: s.logo_url || null,
      hide_branding: s.hide_branding,
      enabled_features: s.enabled_features,
      custom_css: s.custom_css || null,
      default_language: s.default_language,
      available_languages: s.available_languages.length ? s.available_languages : ["en"],
      statement_url: s.statement_url || null,
    };
    const { error } = await supabase
      .from("acc_widget_settings")
      .upsert(payload, { onConflict: "website_id" });
    setSaving(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Saved", description: "Widget settings updated. Live sites refresh within ~1 minute." });
    setPreviewKey((k) => k + 1);
  };

  const toggleFeature = (k: string, v: boolean) => {
    setS((prev) => ({ ...prev, enabled_features: { ...prev.enabled_features, [k]: v } }));
  };

  const toggleWidgetEnabled = async (v: boolean) => {
    if (!websiteId) return;
    setTogglingEnabled(true);
    const { error } = await supabase
      .from("acc_websites")
      .update({ widget_enabled: v })
      .eq("id", websiteId);
    setTogglingEnabled(false);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    setWidgetEnabled(v);
    toast({ title: v ? "Widget enabled" : "Widget disabled", description: v ? "The widget will appear on your site within ~1 minute." : "The widget will stop appearing on your site within ~1 minute." });
    setPreviewKey((k) => k + 1);
  };

  const previewSrcDoc = useMemo(() => {
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Preview</title><style>body{font-family:Inter,system-ui;padding:24px;color:#111}</style></head><body><h1>Sample page</h1><p>This iframe is loading the live widget for <strong>${slug || "your org"}</strong>.</p><script src="${origin}/accessibility-widget.js" data-org="${slug}"></script></body></html>`;
  }, [origin, slug, previewKey]);

  if (loading) {
    return <div className="text-sm text-muted-foreground flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Loading widget settings…</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Widget</h1>
        <p className="text-sm text-muted-foreground">Embed the floating accessibility widget on your site and customize how it looks.</p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2"><Code2 className="h-4 w-4" /><span className="font-medium">Install snippet</span></div>
          <div className="flex items-center justify-between rounded-md border p-3">
            <div>
              <div className="text-sm font-medium">Widget enabled</div>
              <div className="text-xs text-muted-foreground">Master switch — turn the floating widget on or off across your site without removing the snippet.</div>
            </div>
            <Switch checked={widgetEnabled} disabled={!websiteId || togglingEnabled} onCheckedChange={toggleWidgetEnabled} />
          </div>
          {siteUrl && (
            <p className="text-xs text-muted-foreground">Paste this just before <code>&lt;/body&gt;</code> on <span className="font-mono">{siteUrl}</span></p>
          )}
          <pre className="text-xs bg-muted/50 rounded p-3 overflow-x-auto"><code>{snippet}</code></pre>
          <div className="flex gap-2">
            <Button onClick={copy} className="gap-2" disabled={!slug}><Copy className="h-4 w-4" /> Copy snippet</Button>
            <Button asChild variant="outline" className="gap-2"><a href="/accessibility-widget.js" target="_blank" rel="noreferrer">View source <ExternalLink className="h-4 w-4" /></a></Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6 space-y-5">
            <div className="font-medium">Appearance</div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Primary color</Label>
                <div className="flex gap-2">
                  <Input type="color" value={s.primary_color} onChange={(e) => setS({ ...s, primary_color: e.target.value })} className="w-14 p-1 h-10" />
                  <Input value={s.primary_color} onChange={(e) => setS({ ...s, primary_color: e.target.value })} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Position</Label>
                <select
                  value={s.position}
                  onChange={(e) => setS({ ...s, position: e.target.value })}
                  className="w-full h-10 rounded-md border bg-background px-3 text-sm"
                >
                  {POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Logo URL (optional)</Label>
              <Input
                placeholder="https://example.com/logo.svg"
                value={s.logo_url ?? ""}
                onChange={(e) => setS({ ...s, logo_url: e.target.value })}
              />
              <p className="text-[11px] text-muted-foreground">Replaces the default icon inside the floating button.</p>
            </div>

            <div className="space-y-1.5">
              <Label>Accessibility Statement URL (optional)</Label>
              <Input
                placeholder="https://yoursite.com/accessibility-statement"
                value={s.statement_url ?? ""}
                onChange={(e) => setS({ ...s, statement_url: e.target.value })}
              />
              <p className="text-[11px] text-muted-foreground">Where the "Accessibility Statement" button in the widget footer should link. Defaults to <span className="font-mono">/accessibility-statement</span> on your own site.</p>
            </div>

            <div className="flex items-center justify-between rounded-md border p-3">
              <div>
                <div className="text-sm font-medium">Hide "Powered by Bizooma"</div>
                <div className="text-xs text-muted-foreground">White-label the widget footer.</div>
              </div>
              <Switch checked={s.hide_branding} onCheckedChange={(v) => setS({ ...s, hide_branding: v })} />
            </div>

            <div className="space-y-1.5">
              <Label>Custom CSS (advanced)</Label>
              <Textarea
                rows={4}
                placeholder=".bz-acc-btn { box-shadow: none; }"
                value={s.custom_css ?? ""}
                onChange={(e) => setS({ ...s, custom_css: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="font-medium">Enabled features</div>
            <p className="text-xs text-muted-foreground">Visitors see only the toggles you enable.</p>
            <div className="grid grid-cols-1 gap-2">
              {ALL_FEATURES.map((f) => (
                <div key={f.key} className="flex items-center justify-between rounded-md border p-2.5">
                  <span className="text-sm">{f.label}</span>
                  <Switch
                    checked={s.enabled_features[f.key] !== false}
                    onCheckedChange={(v) => toggleFeature(f.key, v)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="font-medium">Languages</div>
          <p className="text-xs text-muted-foreground">
            Choose which languages visitors can switch between in the widget, and the default to load.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Default language</Label>
              <select
                value={s.default_language}
                onChange={(e) => setS({ ...s, default_language: e.target.value })}
                className="w-full h-10 rounded-md border bg-background px-3 text-sm"
              >
                <option value="auto">Auto (detect from visitor's browser)</option>
                {ALL_LANGUAGES.filter((l) => s.available_languages.includes(l.code)).map((l) => (
                  <option key={l.code} value={l.code}>{l.label}</option>
                ))}
              </select>
              <p className="text-[11px] text-muted-foreground">
                "Auto" picks the closest match to the visitor's browser language, falling back to English.
              </p>
            </div>
            <div className="space-y-1.5">
              <Label>Available languages</Label>
              <div className="grid grid-cols-1 gap-1.5 rounded-md border p-2">
                {ALL_LANGUAGES.map((l) => {
                  const checked = s.available_languages.includes(l.code);
                  return (
                    <label key={l.code} className="flex items-center justify-between text-sm px-1.5 py-1">
                      <span>{l.label} <span className="text-xs text-muted-foreground">({l.code})</span></span>
                      <Switch
                        checked={checked}
                        onCheckedChange={(v) => {
                          const next = v
                            ? Array.from(new Set([...s.available_languages, l.code]))
                            : s.available_languages.filter((c) => c !== l.code);
                          const finalList = next.length ? next : ["en"];
                          const default_language =
                            s.default_language !== "auto" && !finalList.includes(s.default_language)
                              ? "auto"
                              : s.default_language;
                          setS({ ...s, available_languages: finalList, default_language });
                        }}
                      />
                    </label>
                  );
                })}
              </div>
              <p className="text-[11px] text-muted-foreground">
                Visitors can switch between any language enabled here from inside the widget.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={save} disabled={saving || !websiteId} className="gap-2">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save changes
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-3">
          <div className="font-medium flex items-center gap-2"><Eye className="h-4 w-4" /> Live preview</div>
          <p className="text-xs text-muted-foreground">Reflects the saved configuration. Save changes, then the iframe will reload.</p>
          <iframe key={previewKey} title="Widget preview" srcDoc={previewSrcDoc} className="w-full h-96 rounded-md border" />
        </CardContent>
      </Card>
    </div>
  );
}
