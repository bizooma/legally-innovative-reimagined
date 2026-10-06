import type { EditorialHero } from './types';
export const overview: { seoTitle: string; hero: EditorialHero; intro: string; labsLabel: string; closing: string; items: { name: string; description: string; href: string }[] } = {
  seoTitle: 'Products | Bizooma',
  hero: { eyebrow: 'PRODUCTS', title: 'Software we built and sell', lede: 'Five products, each built because the work kept repeating and nothing on the market fit.', sub: 'We also build for clients. These are the ones we run ourselves.' },
  intro: 'Building our own software is how we know whether the advice we give is worth paying for. Each of these started as a problem we hit repeatedly — for a client, or for us — and kept going because it kept being useful. The things that did not keep being useful are on the Labs page, listed honestly.',
  labsLabel: 'Labs page', closing: "Everything else we've built, including what we retired.",
  items: [
    { name: 'DataRightsOS', description: 'Privacy, consent and data-rights compliance from a single embed.', href: '/products/datarightsos' },
    { name: 'LexGuild', description: 'One member platform for bar associations: mentorship, wellness, sponsorships, referrals.', href: '/products/lexguild' },
    { name: 'Amicus Edge', description: 'Self-serve marketing tools for firms that run their own.', href: '/products/amicus-edge' },
    { name: 'Ava', description: 'An AI receptionist that answers every call, including the ones you miss.', href: '/ai-receptionist' },
    { name: 'Bizooma Accessibility Layer', description: 'ADA and WCAG monitoring with a visitor-facing accessibility widget.', href: '/accessibility-layer' }
  ]
};