export interface HomeCard { name: string; description: string; href: string }
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
      ],
      footnote: 'Two of the five products we sell, working on our own site.',
    },
  },
  argument: {
    title: 'Two things, one argument',
    paragraphs: [
      'Most agencies serving professional organizations advise on technology they have never built. Most software companies sell tools without understanding the work they are supposed to fit into. We do both, which sounds like a lack of focus right up until you see what it is for.',
      'When we tell a firm that a workflow is worth automating, or that a channel is worth the money, it is because we built the thing and watched what happened. The products are not a side business. They are the reason the advice is any good.',
    ],
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
    items: [
      { name: 'DataRightsOS', description: 'Privacy, consent and data-rights compliance from one embed.', href: '/products/datarightsos' },
      { name: 'LexGuild', description: 'One member platform for bar associations.', href: '/products/lexguild' },
      { name: 'Amicus Edge', description: 'Self-serve marketing tools for firms that run their own.', href: '/products/amicus-edge' },
      { name: 'Ava', description: 'An AI receptionist that answers the calls you miss.', href: '/ai-receptionist' },
      { name: 'Accessibility Layer', description: 'ADA and WCAG monitoring with a visitor-facing widget.', href: '/accessibility-layer' },
    ] as HomeCard[],
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
