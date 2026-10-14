// Shared shape for the four service pages. Copy lives in the sibling files.

export interface AudienceBand {
  title: string;
  paragraph: string;
  bullets: string[];
}

export interface SelectedWorkEntry {
  category: string;
  name: string;
  descriptor: string;
  url: string;
}

export interface ServicePageContent {
  slug: string;
  seo: { title: string; description: string };
  hero: { eyebrow: string; title: string; lede: string; sub: string };
  argument: { title: string; paragraphs: string[] };
  work: { title: string; items: string[] };
  /** Optional. Categories render in first-appearance order. */
  selectedWork?: { title: string; entries: SelectedWorkEntry[] };
  lawFirms: AudienceBand;
  nonprofits: AudienceBand;
  framework: { line: string; linkLabel: string; href: string };
  cta: { title: string; paragraph: string; buttonLabel: string; href: string };
}
