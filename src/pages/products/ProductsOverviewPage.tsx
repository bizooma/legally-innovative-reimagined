import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { overview as c } from '@/content/products/overview';
import { EditorialShell, EditorialHeroSection } from './ProductLayout';

export default function ProductsOverviewPage() {
  const [before, after] = c.intro.split(c.labsLabel);
  return <EditorialShell title={c.seoTitle} description={c.hero.lede} path="/products"><EditorialHeroSection hero={c.hero} /><section className="product-band"><div className="product-inner"><p className="product-prose">{before}<Link to="/labs" className="product-link">{c.labsLabel}</Link>{after}</p></div></section><section className="product-band product-soft"><div className="product-inner product-grid product-grid-shelf">{c.items.map(item => <Link key={item.name} to={item.href} className="product-shelf-item"><h2>{item.name}</h2><p>{item.description}</p><ArrowUpRight aria-hidden className="h-5 w-5" /></Link>)}</div></section><section className="product-band product-inverted"><div className="product-inner"><Link className="product-link text-lg inline-flex items-center gap-3" to="/labs">{c.closing}<ArrowUpRight className="h-5 w-5 shrink-0" /></Link></div></section></EditorialShell>;
}