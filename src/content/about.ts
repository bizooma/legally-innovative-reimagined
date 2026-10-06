import type { EditorialHero } from './products/types';
export const about: { seoTitle: string; description: string; hero: Omit<EditorialHero, 'sub'>; sections: { title: string; paragraphs: string[] }[]; affiliations: { title: string; items: { name: string; href: string; logo: 'amarillo' | 'clay' }[] }; locations: { title: string; offices: { city: string; lines: string[]; note: string }[] }; cta: { title: string; label: string; href: string } } = {
  seoTitle: 'About Bizooma | Veteran-Owned Marketing & Software',
  description: 'Bizooma is a veteran-owned, US-based marketing and software company building on the web since 1998, for law firms and nonprofits.',
  hero: { eyebrow: 'ABOUT', title: 'A small team that ships', lede: 'Veteran-owned, US-based, and building on the web since 1998.' },
  sections: [
    {
      title: 'What we do and why',
      paragraphs: [
        'Our mission is to empower businesses with intelligent AI-driven marketing and software solutions that drive measurable growth. We bridge the gap between traditional marketing and cutting-edge AI technology to deliver exceptional results.',
        'Our vision is to become the leading provider of AI-powered marketing and automation solutions for law firms and nonprofits—transforming how they attract, engage, and convert their ideal clients through intelligent technology.',
      ],
    },
    {
      title: 'Veteran-owned, US-based',
      paragraphs: [
        'As a veteran owned company, our values include dedication, integrity, accessibility, innovation, and exceptional quality to every project, with an entirely U.S.-based team committed to your success.',
      ],
    },
  ],
  affiliations: {
    title: 'Bizooma is a proud member of',
    items: [
      { name: 'Amarillo Chamber of Commerce', href: 'https://web.amarillo-chamber.org/Marketing/Bizooma,-LLC-12876', logo: 'amarillo' },
      { name: 'Clay Chamber of Commerce', href: 'https://www.claychamber.com/', logo: 'clay' },
    ],
  },
  locations: {
    title: 'Where we are',
    offices: [
      { city: 'Jacksonville, FL', lines: ['200 N Laura St', 'Jacksonville, FL 32202'], note: 'By appointment' },
      { city: 'Amarillo, TX', lines: ['600 S Tyler St, Suite 2100', 'Amarillo, TX 79101'], note: 'By appointment' },
    ],
  },
  cta: { title: 'Work with us', label: 'Work with us', href: '/#contact' },
};
