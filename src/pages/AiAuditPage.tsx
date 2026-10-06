import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import auditPreview from "@/assets/ai-audit-preview.png";
import trackerPreview from "@/assets/ai-tracker-preview.png";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { aiAudit as c } from "@/content/products/aiAudit";
import { EditorialShell, EditorialHeroSection, TextBand, FeatureBand, EditorialButton } from "./products/ProductLayout";

async function startAiAuditCheckout() {
  try {
    const { data, error } = await supabase.functions.invoke("create-ai-audit-checkout", {
      body: { origin: window.location.origin },
    });
    if (error || (data as any)?.error || !(data as any)?.url) {
      throw new Error((data as any)?.error || error?.message || "Could not start checkout");
    }
    const url = (data as any).url as string;
    try {
      if (window.top && window.top !== window.self) {
        window.top.location.href = url;
        return;
      }
    } catch {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    window.location.href = url;
  } catch (err: any) {
    toast({ title: "Checkout failed", description: err.message ?? String(err), variant: "destructive" });
  }
}


export default function AiAuditPage() {
  const [preview, setPreview] = useState<{ src: string; alt: string } | null>(null);
  const [checkingOut, setCheckingOut] = useState(false);
  const checkout = async () => { setCheckingOut(true); await startAiAuditCheckout(); setCheckingOut(false); };
  const images = [auditPreview, trackerPreview];
  return <EditorialShell title={c.seoTitle} description={c.hero.lede} path="/ai-audit">
    <EditorialHeroSection hero={c.hero} />
    <TextBand band={c.argument} />
    <FeatureBand title="What you get" items={c.features} />
    <section className="product-band"><div className="product-inner">
      <h2 className="product-heading">{c.tiersTitle}</h2>
      <div className="product-grid">{c.tiers.map(tier => <div className="product-tier" key={tier.title}>
        <h3>{tier.title}</h3><p>{tier.paragraph}</p>
        {!tier.href && <p className="font-semibold text-xl">{tier.price}</p>}
        {tier.href ? <EditorialButton href={tier.href}>{tier.label}</EditorialButton> : <Button className="product-button" disabled={checkingOut} onClick={checkout}>{tier.label}<ArrowRight className="ml-2 h-4 w-4" /></Button>}
      </div>)}</div>
    </div></section>
    <section className="product-band product-soft"><div className="product-inner product-grid">
      {c.previews.map((item, i) => <div key={item.title}><h2 className="font-playfair text-2xl mb-5">{item.title}</h2>
        <Button variant="ghost" className="product-preview" onClick={() => setPreview({ src: images[i], alt: item.alt })} aria-label={`Enlarge ${item.title} preview`}><img src={images[i]} alt={item.alt} loading="lazy" /></Button>
      </div>)}
    </div></section>
    <section className="product-band product-inverted"><div className="product-inner"><p className="product-prose mb-6">{c.framework.paragraph}</p><Link className="product-link" to={c.framework.href}>{c.framework.label}</Link></div></section>
    <TextBand band={c.audience} />
    <Dialog open={Boolean(preview)} onOpenChange={open => { if (!open) setPreview(null); }}><DialogContent className="max-w-6xl w-[95vw] p-3"><DialogTitle>{preview?.alt}</DialogTitle><DialogDescription className="sr-only">Enlarged spreadsheet preview</DialogDescription>{preview && <img src={preview.src} alt={preview.alt} className="w-full h-auto" />}</DialogContent></Dialog>
  </EditorialShell>;
}
