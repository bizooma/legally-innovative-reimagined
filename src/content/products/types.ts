export interface EditorialHero { eyebrow: string; title: string; lede: string; sub: string }
export interface EditorialBand { title: string; paragraphs: string[] }
export interface ProductContent {
  slug: string;
  seoTitle: string;
  hero: EditorialHero;
  problem: EditorialBand;
  features: string[];
  audience: string[];
  proof?: EditorialBand;
  pricing?: EditorialBand;
  cta: { title: string; paragraph: string; label: string; href: string; secondary?: { label: string; href: string } };
}