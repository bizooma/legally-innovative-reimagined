import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code2, Copy, ExternalLink } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { useAccessibilityOrg } from "@/hooks/useAccessibilityOrg";

type Ctx = ReturnType<typeof useAccessibilityOrg>;

export default function AccessibilityWidgetPage() {
  const ctx = useOutletContext<Ctx>();
  const origin = typeof window !== "undefined" ? window.location.origin : "https://app.example.com";
  const slug = ctx.org?.slug ?? "";
  const snippet = `<!-- Bizooma Accessibility Widget -->\n<script src="${origin}/accessibility-widget.js" data-org="${slug}" defer></script>`;
  const [siteUrl, setSiteUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!ctx.org) return;
    supabase.from("acc_websites").select("url").eq("organization_id", ctx.org.id).limit(1).maybeSingle()
      .then(({ data }) => setSiteUrl((data as any)?.url ?? null));
  }, [ctx.org?.id]);

  const copy = async () => {
    await navigator.clipboard.writeText(snippet);
    toast({ title: "Copied", description: "Embed snippet copied to clipboard." });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Widget</h1>
        <p className="text-sm text-muted-foreground">Embed the floating accessibility widget on any site.</p>
      </div>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2"><Code2 className="h-4 w-4" /><span className="font-medium">Install snippet</span></div>
          {siteUrl && (
            <p className="text-xs text-muted-foreground">Paste this into the site you registered: <span className="font-mono">{siteUrl}</span></p>
          )}
          <pre className="text-xs bg-muted/50 rounded p-3 overflow-x-auto"><code>{snippet}</code></pre>
          <div className="flex gap-2">
            <Button onClick={copy} className="gap-2" disabled={!slug}><Copy className="h-4 w-4" /> Copy snippet</Button>
            <Button asChild variant="outline" className="gap-2"><a href="/accessibility-widget.js" target="_blank" rel="noreferrer">View source <ExternalLink className="h-4 w-4" /></a></Button>
          </div>
          <p className="text-xs text-muted-foreground">Place the snippet just before the closing &lt;/body&gt; tag. The widget loads asynchronously and adds zero render-blocking resources.</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-3">
          <div className="font-medium">Live preview</div>
          <p className="text-xs text-muted-foreground">The widget is currently embedded on this page in the bottom-right corner.</p>
          <iframe title="Widget preview" srcDoc={`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Preview</title><style>body{font-family:Inter,system-ui;padding:24px;color:#111}</style></head><body><h1>Sample page</h1><p>This iframe is loading the live widget script.</p><script src="${origin}/accessibility-widget.js"></script></body></html>`} className="w-full h-96 rounded-md border" />
        </CardContent>
      </Card>
    </div>
  );
}