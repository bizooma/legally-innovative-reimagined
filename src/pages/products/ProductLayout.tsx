import type { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileFooterNav from '@/components/MobileFooterNav';
import { Button } from '@/components/ui/button';
import type { EditorialHero, EditorialBand, ProductContent } from '@/content/products/types';

export function EditorialShell({ title, description, path, children }: { title: string; description: string; path: string; children: ReactNode }) {
  return <div className="product-editorial min-h-screen"><Helmet><title>{title}</title><meta name="description" content={description} /><link rel="canonical" href={`https://bizooma.com${path}`} /><meta property="og:title" content={title} /><meta property="og:description" content={description} /><meta property="og:type" content="website" /><meta name="twitter:card" content="summary_large_image" /></Helmet><Navbar /><main>{children}</main><Footer /><MobileFooterNav /></div>;
}
export function EditorialHeroSection({ hero }: { hero: EditorialHero }) {
  return <section className="product-inverted product-hero"><div className="product-inner"><p className="product-eyebrow">{hero.eyebrow}</p><h1>{hero.title}</h1><p className="product-lede">{hero.lede}</p><p className="product-sub">{hero.sub}</p></div></section>;
}
export function TextBand({ band, inverted = false }: { band: EditorialBand; inverted?: boolean }) {
  return <section className={`product-band ${inverted ? 'product-inverted' : ''}`}><div className="product-inner"><h2 className="product-heading">{band.title}</h2><div className="product-prose">{band.paragraphs.map(p => <p key={p}>{p}</p>)}</div></div></section>;
}
export function FeatureBand({ title, items }: { title: string; items: string[] }) {
  return <section className="product-band product-soft"><div className="product-inner"><h2 className="product-heading">{title}</h2><ul className="product-features">{items.map(item => <li key={item}><Check aria-hidden className="h-4 w-4" /><span>{item}</span></li>)}</ul></div></section>;
}
export function EditorialButton({ href, children }: { href: string; children: ReactNode }) {
  return <Button asChild className="product-button"><a href={href}>{children}<ArrowRight className="ml-2 h-4 w-4 shrink-0" /></a></Button>;
}
export default function ProductPage({ content: c }: { content: ProductContent }) {
  return <EditorialShell title={c.seoTitle} description={c.hero.lede} path={`/products/${c.slug}`}><EditorialHeroSection hero={c.hero} /><TextBand band={c.problem} /><FeatureBand title="What it does" items={c.features} /><TextBand band={{ title: "Who it's for", paragraphs: c.audience }} />{c.proof && <TextBand band={c.proof} inverted />}{c.pricing && <TextBand band={c.pricing} />}<section className="product-band product-inverted"><div className="product-inner"><h2 className="product-heading">{c.cta.title}</h2><p className="product-prose mb-8">{c.cta.paragraph}</p><div className="flex flex-wrap items-center gap-6"><EditorialButton href={c.cta.href}>{c.cta.label}</EditorialButton>{c.cta.secondary && <a className="product-link" href={c.cta.secondary.href}>{c.cta.secondary.label}</a>}</div></div></section></EditorialShell>;
}