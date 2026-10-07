import { useState } from "react";
import { Check, Shield } from "lucide-react";
import { EditorialShell, EditorialHeroSection, EditorialButton } from "@/pages/products/ProductLayout";
import PrivacyLawDialogs from "@/components/accessibility-layer/PrivacyLawDialogs";
import { accessibilityLayer as c } from "@/content/products/accessibilityLayer";

function Checks({ items, single = false }: { items: string[]; single?: boolean }) {
  return <ul className={`product-features ${single ? "!grid-cols-1" : ""}`}>{items.map(i => <li key={i}><Check aria-hidden className="h-4 w-4" /><span>{i}</span></li>)}</ul>;
}

export default function AccessibilityLayerPage() {
  const [ccpaOpen, setCcpaOpen] = useState(false);
  const [cpraOpen, setCpraOpen] = useState(false);
  return (
    <EditorialShell title={c.seoTitle} description={c.seoDescription} path={c.path}>
      <EditorialHeroSection hero={c.hero} />

      <section className="product-band product-soft"><div className="product-inner">
        <h2 className="product-heading">{c.features.title}</h2>
        <p className="product-prose mb-10">{c.features.intro}</p>
        <div className="product-grid lg:!grid-cols-4 gap-x-10">
          {c.features.groups.map(g => <div key={g.title}><h3 className="font-semibold text-lg mb-2">{g.title}</h3><Checks items={g.items} single /></div>)}
        </div>
      </div></section>

      <section className="product-band"><div className="product-inner grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="min-w-0">
          <p className="product-eyebrow">{c.widget.eyebrow}</p>
          <h2 className="product-heading">{c.widget.title}</h2>
          <p className="product-prose mb-6">{c.widget.paragraph}</p>
          <pre className="overflow-x-auto rounded border p-4 text-xs" style={{ borderColor: 'var(--editorial-rule)' }}><code>{c.widget.snippet}</code></pre>
        </div>
        <figure className="min-w-0 rounded border p-6" style={{ borderColor: 'var(--editorial-rule)' }}>
          <div className="mb-4"><div className="font-semibold">{c.widget.panelTitle}</div><div className="text-xs opacity-70">{c.widget.panelSub}</div></div>
          <div className="grid grid-cols-2 gap-2">{c.widget.panelOptions.map(o => <div key={o} className="rounded border p-3 text-sm" style={{ borderColor: 'var(--editorial-rule)' }}>{o}</div>)}</div>
        </figure>
      </div></section>

      <section className="product-band product-soft"><div className="product-inner grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="min-w-0">
          <p className="product-eyebrow">{c.dashboard.eyebrow}</p>
          <h2 className="product-heading">{c.dashboard.title}</h2>
          <p className="product-prose mb-6">{c.dashboard.paragraph}</p>
          <Checks items={c.dashboard.items} />
          <div className="mt-8"><EditorialButton href={c.dashboard.cta.href}>{c.dashboard.cta.label}</EditorialButton></div>
        </div>
        <figure className="min-w-0">
          <div className="rounded-t border border-dashed p-6" style={{ borderColor: 'var(--editorial-rule)' }} aria-label="Example dashboard interface">
            <div className="mb-4 flex items-center justify-between text-sm"><span className="font-semibold">{c.dashboard.mock.title}</span><span className="opacity-70">{c.dashboard.mock.range}</span></div>
            <div className="grid grid-cols-3 gap-3">{c.dashboard.mock.tiles.map(t => <div key={t.label} className="rounded border p-3" style={{ borderColor: 'var(--editorial-rule)' }}><div className="text-xs opacity-70">{t.label}</div><div className="text-2xl font-bold mt-1">{t.value}</div></div>)}</div>
          </div>
          <figcaption className="rounded-b border border-t-0 border-dashed px-6 py-3 text-sm italic opacity-80" style={{ borderColor: 'var(--editorial-rule)' }}>{c.dashboard.mockCaption}</figcaption>
        </figure>
      </div></section>

      <section className="product-band"><div className="product-inner">
        <h2 className="product-heading">{c.pricing.title}</h2>
        <p className="product-prose mb-10">{c.pricing.intro}</p>
        <div className="max-w-md rounded border-2 p-8" style={{ borderColor: 'var(--editorial-oxblood)' }}>
          <p className="product-eyebrow !mb-3">{c.pricing.badge}</p>
          <h3 className="font-semibold text-lg">{c.pricing.plan}</h3>
          <div className="mt-3"><span className="text-5xl font-bold">{c.pricing.price}</span><span className="opacity-70">{c.pricing.period}</span></div>
          <p className="text-sm opacity-80 mt-2">{c.pricing.tagline}</p>
          <div className="my-6"><Checks items={c.pricing.items} /></div>
          <EditorialButton href={c.pricing.cta.href}>{c.pricing.cta.label}</EditorialButton>
          <p className="text-xs opacity-70 mt-3">{c.pricing.footnote}</p>
        </div>
      </div></section>

      <section className="product-band product-soft"><div className="product-inner">
        <h2 className="product-heading">{c.faqTitle}</h2>
        <div className="max-w-3xl">{c.faqs.map(f => <div key={f.q} className="border-t py-6" style={{ borderColor: 'var(--editorial-rule)' }}><h3 className="font-semibold text-lg mb-2">{f.q}</h3><p className="leading-relaxed">{f.a}</p></div>)}</div>
      </div></section>

      <section className="product-band product-inverted"><div className="product-inner">
        <h2 className="product-heading">{c.cta.title}</h2>
        <p className="product-prose mb-8">{c.cta.paragraph}</p>
        <EditorialButton href={c.cta.href}>{c.cta.label}</EditorialButton>
      </div></section>

      <section className="product-band"><div className="product-inner">
        <p className="product-eyebrow">{c.privacy.eyebrow}</p>
        <h2 className="product-heading">{c.privacy.title}</h2>
        <p className="product-prose mb-6">{c.privacy.paragraph}</p>
        <ul className="mb-8 flex flex-wrap gap-2">{c.privacy.tags.map(t => <li key={t} className="rounded-full border px-3 py-1 text-xs" style={{ borderColor: 'var(--editorial-rule)' }}>{t}</li>)}</ul>
        <div className="flex flex-wrap gap-6">
          <button type="button" className="product-link inline-flex items-center gap-2 text-left" onClick={() => setCcpaOpen(true)}><Shield className="h-4 w-4 shrink-0" />{c.privacy.ccpaLabel}</button>
          <button type="button" className="product-link inline-flex items-center gap-2 text-left" onClick={() => setCpraOpen(true)}><Shield className="h-4 w-4 shrink-0" />{c.privacy.cpraLabel}</button>
        </div>
      </div></section>

      <PrivacyLawDialogs ccpaOpen={ccpaOpen} setCcpaOpen={setCcpaOpen} cpraOpen={cpraOpen} setCpraOpen={setCpraOpen} />
    </EditorialShell>
  );
}
