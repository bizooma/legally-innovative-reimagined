import { MapPin } from "lucide-react";
import MeetJoe from "@/components/MeetJoe";
import { EditorialShell, EditorialButton } from "@/pages/products/ProductLayout";
import { about as c } from "@/content/about";

export default function AboutPage() {
  return (
    <EditorialShell title={c.seoTitle} description={c.description} path="/about">
      <section className="product-inverted product-hero"><div className="product-inner">
        <p className="product-eyebrow">{c.hero.eyebrow}</p><h1>{c.hero.title}</h1><p className="product-lede">{c.hero.lede}</p>
      </div></section>
      {c.sections.map((s, i) => (
        <section key={s.title} className={`product-band ${i % 2 ? 'product-soft' : ''}`}><div className="product-inner">
          <h2 className="product-heading">{s.title}</h2>
          <div className="product-prose">{s.paragraphs.map((p) => <p key={p}>{p}</p>)}</div>
        </div></section>
      ))}
      <MeetJoe />
      <section className="product-band"><div className="product-inner">
        <h2 className="product-heading">{c.locations.title}</h2>
        <div className="product-grid sm:grid-cols-2 max-w-3xl">
          {c.locations.offices.map((o) => (
            <div key={o.city} className="product-shelf-item">
              <h3 className="flex items-center gap-2"><MapPin aria-hidden className="h-5 w-5 shrink-0" />{o.city}</h3>
              <p>{o.lines.map((l) => <span key={l} className="block">{l}</span>)}</p>
              <p className="text-sm font-semibold">{o.note}</p>
            </div>
          ))}
        </div>
      </div></section>
      <section className="product-band product-inverted"><div className="product-inner">
        <h2 className="product-heading">{c.cta.title}</h2>
        <EditorialButton href={c.cta.href}>{c.cta.label}</EditorialButton>
      </div></section>
    </EditorialShell>
  );
}
