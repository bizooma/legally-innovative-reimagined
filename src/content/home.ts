import drosImg from '@/assets/datarightsos-consent-log.webp.asset.json';
import lexguildImg from '@/assets/lexguild-dashboard.webp.asset.json';
import amicusImg from '@/assets/amicus-edge-dashboard.webp.asset.json';
import accessibilityImg from '@/assets/accessibility-layer-widget.webp.asset.json';
export interface HomeCard { name: string; description: string; href: string }
export interface HomeProductCard extends HomeCard { qualifier: string; extra?: string; featured?: boolean; image: string | null; imageAlt: string; phonePanel?: { label: string; href: string; caption: string } }
export const home = {
  hero: {
    eyebrow: 'WHERE MARKETING MEETS CODE + AI',
    title: 'Serious marketing & software for law firms and nonprofits',
    lede: 'Search, websites, intake and automation — plus whatever we have to build when nothing off the shelf fits.',
    primary: { label: 'See what we do', href: '/services' },
    secondary: { label: 'Read our framework', href: '/order-of-operations' },
    phone: { label: '904-331-8130', href: 'tel:+19043318130' },
    office: 'Office: Jacksonville, FL',
    proof: {
      heading: 'Running on our own software',
      items: [
        { before: '', label: 'Ava', href: '/ai-receptionist', after: " answers the phone number above. Call it — you'll be talking to our AI receptionist, not a menu." },
        { before: '', label: 'DataRightsOS', href: '/products/datarightsos', after: ' powers the privacy center in the corner of this page.' },
        { before: '', label: 'Biz', href: '', after: ', the assistant in the corner, runs on an engine we built and maintain.' },
      ],
      footnote: 'Three of the things we make, working on our own site.',
    },
  },
  argument: {
    title: 'Two things, one argument',
    paragraphs: [
      'Most agencies serving professional organizations advise on technology they have never built. Most software companies sell tools without understanding the work they are supposed to fit into. We do both, which sounds like a lack of focus right up until you see what it is for.',
      'When we tell a firm that a workflow is worth automating, or that a channel is worth the money, it is because we built the thing and watched what happened. The products are not a side business. They are the reason the advice is any good.',
    ],
  },
  argumentDiagram: {
    ariaLabel: 'Diagram: agencies, which advise on technology they have never built, and software companies, which sell tools without understanding the work, both lead into Bizooma, which builds the software and runs the marketing.',
    sources: [
      { label: 'Agencies', caption: 'Advise on technology they have never built' },
      { label: 'Software companies', caption: 'Sell tools without understanding the work' },
    ],
    result: { label: 'Bizooma', caption: 'Builds the software. Runs the marketing.' },
  },
  services: {
    title: 'What we do',
    items: [
      { name: 'AI Marketing & Automation', description: 'Automating the work your team repeats, with the governance to do it safely.', href: '/services/ai-marketing' },
      { name: 'SEO & AEO', description: 'Being findable in search and citable by AI assistants.', href: '/services/seo-aeo' },
      { name: 'Websites & Apps', description: 'Sites that help a visitor finish what they came to do.', href: '/services/websites-and-apps' },
      { name: 'Lead Generation & Intake', description: 'Catching what you paid to attract.', href: '/services/lead-generation' },
    ] as HomeCard[],
    footnote: { before: 'Not sure where to start? Begin with an ', label: 'AI Readiness Audit', after: '.', href: '/ai-audit' },
  },
  products: {
    title: 'Software we built and sell',
    placeholder: 'Product screenshot',
    cardLink: 'Learn more',
    items: [
      { name: 'DataRightsOS', qualifier: 'RUNNING ON THIS SITE', description: 'Privacy, consent and data-rights compliance from one embed.', extra: 'The privacy center you can see in the corner of this page is the product.', featured: true, href: '/products/datarightsos', image: drosImg.url, imageAlt: 'DataRightsOS consent log showing visitor consent records and GPC detection' },
      { name: 'LexGuild', qualifier: 'FOR BAR ASSOCIATIONS', description: 'One member platform for bar associations.', href: '/products/lexguild', image: lexguildImg.url, imageAlt: 'LexGuild bar association dashboard showing member, mentorship and forum activity' },
      { name: 'Amicus Edge', qualifier: 'SELF-SERVE, NO RETAINER', description: 'Self-serve marketing tools for firms that run their own.', href: '/products/amicus-edge', image: amicusImg.url, imageAlt: 'Amicus Edge dashboard overview showing tool counts and quick actions' },
      { name: 'Ava', qualifier: 'ANSWERS OUR PHONE LINE', description: 'An AI receptionist that answers the calls you miss.', href: '/ai-receptionist', image: null, imageAlt: '', phonePanel: { label: '904-331-8130', href: 'tel:+19043318130', caption: 'CALL IT' } },
      { name: 'Accessibility Layer', qualifier: 'FROM $25/MO', description: 'ADA and WCAG monitoring with a visitor-facing widget.', href: '/accessibility-layer', image: accessibilityImg.url, imageAlt: 'Accessibility Layer widget settings showing appearance options and feature toggles' },
    ] as HomeProductCard[],
    footnote: { label: "Everything else we've built, including what we retired.", href: '/labs' },
  },
  framework: {
    title: 'We published the whole methodology',
    paragraph: 'Order of Operations is our framework for what a law firm has to build to survive AI, and the order it has to be built in. Six pillars, a ninety-day move for each, and the four things that kill all six. It is free, it is complete, and we did not hold the useful parts back for a sales call.',
    button: { label: 'Read the framework', href: '/order-of-operations' },
  },
  testimonialsTitle: 'What our clients say',
  whoWeAre: {
    title: 'A small team that ships',
    paragraph: 'Bizooma is a veteran-owned company based in Jacksonville, Florida, with a US-based team. We have been building on the web since 1998 and we still write the code ourselves.',
    link: { label: 'More about us', href: '/about' },
  },
  publishingLine: { before: 'We also publish ', label: 'Moving Jacksonville Forward', href: 'https://movingjaxforward.com', after: ', a weekly brief on what is being built in the city.' },
  newsletterPromise: 'Working through one pillar of the framework at a time, with the failure modes.',
  newsletterCards: [
    { title: 'Weekly insights', description: 'One pillar at a time, working through the framework.' },
    { title: 'Early access', description: "New tools, templates and resources before they're announced." },
  ],
};
