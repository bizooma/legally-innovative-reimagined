export interface EditorialCta { label: string; href: string; external?: boolean }
export interface EditorialHero { eyebrow: string; title: string; lede: string; sub: string; cta?: EditorialCta; secondaryCta?: EditorialCta }
/** `link` turns the first occurrence of `text` inside the paragraphs into a link. */
export interface EditorialBand { title: string; paragraphs: string[]; link?: { text: string; href: string } }
export interface ProductContent {
  slug: string;
  /** Overrides the default /products/{slug} path (for legacy URLs). */
  path?: string;
  seoTitle: string;
  /** Overrides the default meta description (hero lede). */
  seoDescription?: string;
  jsonLd?: Record<string, unknown>;
  hero: EditorialHero;
  problem: EditorialBand;
  features: string[];
  audience: string[];
  proof?: EditorialBand;
  pricing?: EditorialBand;
  cta: { title: string; paragraph: string; label: string; href: string; secondary?: { label: string; href: string } };
}
