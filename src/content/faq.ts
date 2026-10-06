export interface FaqLink { label: string; href: string }
export interface FaqItem {
  question: string;
  /** Plain answer text. Any `links` labels found in the text render as links. */
  answer: string;
  links?: FaqLink[];
}
export interface FaqCategory { category: string; questions: FaqItem[] }

export const faq: { seoTitle: string; description: string; eyebrow: string; title: string; lede: string; categories: FaqCategory[] } = {
  seoTitle: 'Frequently Asked Questions | Bizooma',
  description: 'Answers to common questions about Bizooma’s AI marketing, SEO and AEO, websites and apps, lead generation, and how we work with law firms and nonprofits.',
  eyebrow: 'FAQ',
  title: 'Frequently asked questions',
  lede: 'Common questions about what we do and how we work with law firms and nonprofits.',
  categories: [
    {
      category: 'AI Marketing & Automation',
      questions: [
        {
          question: 'How can AI consulting benefit my organization?',
          answer: 'AI consulting can benefit your organization by identifying opportunities to automate repetitive tasks, enhance client and supporter interactions through intelligent systems, and provide data-driven insights for better decision-making. We analyze your specific needs and implement AI solutions that increase efficiency and reduce operational costs.',
        },
        {
          question: 'What is the typical timeline for implementing AI solutions?',
          answer: 'The implementation timeline varies based on the complexity of your needs, but typically ranges from 4-12 weeks. We begin with a thorough assessment (1-2 weeks), followed by solution design (1-3 weeks), implementation (2-6 weeks), and training (1-2 weeks). Throughout the process, we work closely with your team to ensure minimal disruption to your operations.',
        },
        {
          question: 'How can an AI chatbot benefit my organization?',
          answer: 'An AI chatbot provides immediate 24/7 response to inquiries, qualifying leads by collecting key information, answering common questions, scheduling consultations, and reducing administrative workload. This gives visitors instant engagement while ensuring your organization never misses an opportunity, even outside business hours. Our chatbots can be trained on your specific services to provide relevant, helpful responses.',
        },
        {
          question: 'Can AI chatbots handle sensitive information securely?',
          answer: 'Yes. Our AI chatbots are built with security measures that respect confidentiality requirements, including encryption, secure data storage, and clear disclaimers — for law firms, that includes disclaimers about attorney-client privilege. The chatbots can be configured to collect only necessary preliminary information before connecting someone with a real person, maintaining the appropriate balance between automation and personal service.',
        },
      ],
    },
    {
      category: 'SEO & AEO',
      questions: [
        {
          question: "What's the difference between SEO and AEO?",
          answer: 'SEO (Search Engine Optimization) focuses on ranking your website in traditional search results by optimizing for keywords, content quality, and technical factors. AEO (Answer Engine Optimization) targets AI assistants, voice searches and featured snippets by structuring content to directly answer the questions people ask. Both matter – SEO drives overall visibility while AEO makes you citable when someone asks an assistant instead of searching.',
        },
        {
          question: 'How long does it take to see results from SEO efforts?',
          answer: 'SEO is typically a medium to long-term strategy, with initial improvements visible within 3-6 months. You may see some ranking improvements for less competitive keywords within the first few months, while more competitive keywords may take 6-12 months to show significant movement. We set realistic expectations and report monthly on the measures that matter to you.',
        },
        {
          question: 'Why is Google Business Profile important?',
          answer: "Google Business Profile significantly impacts local search visibility. When people search for services in your area, a well-optimized profile increases your chances of appearing in the 'Local Pack' results. It also provides essential information like your location, hours, contact details, and reviews, all of which influence how people decide who to contact.",
        },
        {
          question: 'How do you optimize a Google Business Profile?',
          answer: 'We optimize your Google Business Profile by ensuring complete and accurate information, selecting the most relevant categories, adding high-quality photos of your office and team, using local keywords in your description, actively managing and responding to reviews, regularly posting updates, and using available features like Q&A and booking links to maximize engagement.',
        },
      ],
    },
    {
      category: 'Websites & Apps',
      questions: [
        {
          question: 'How long does it take to develop a professional website?',
          answer: 'A professional website typically takes 6-10 weeks to develop, depending on the complexity and features required. This includes discovery and planning (1-2 weeks), design (2-3 weeks), development (2-4 weeks), and testing/launch (1 week). We prioritize sites that help a visitor finish what they came to do, not just sites that look impressive.',
        },
        {
          question: 'Will my website be mobile-responsive and SEO-friendly?',
          answer: 'Absolutely. All our websites are built with mobile-responsiveness as a core feature, ensuring a good experience across all devices. We also implement SEO best practices during development, including proper heading structure, schema markup, optimized page speed, and accessible design so your site performs well in search.',
        },
        {
          question: 'What types of mobile apps can you develop?',
          answer: "We develop mobile applications including client and member portals for updates and document sharing, appointment scheduling systems, secure messaging platforms, billing and payment apps, and custom management solutions. Each app is designed around your organization's specific workflows and branding.",
        },
        {
          question: 'Do you develop for both iOS and Android platforms?',
          answer: "Yes, we develop mobile applications for both iOS and Android. We use cross-platform development frameworks when appropriate to optimize development time and costs, while still creating native-feeling experiences tailored to each platform's design guidelines.",
        },
      ],
    },
    {
      category: 'Lead Generation & Intake',
      questions: [
        {
          question: 'What lead generation methods are most effective?',
          answer: 'The most effective methods include landing pages with strong calls-to-action, targeted PPC campaigns for high-intent keywords, educational content that addresses common questions, strategic email nurture campaigns, and reputation management that leverages genuine reviews. We build multi-channel systems tailored to your services and the people you serve.',
        },
        {
          question: 'How do you qualify and nurture leads?',
          answer: "Our qualification and nurturing process uses intake forms that assess fit and urgency, automated email sequences with relevant information based on each person's needs, retargeting to maintain visibility, and CRM integration to track every touchpoint. This keeps your team's time on the most promising inquiries while still providing value to everyone who contacts you.",
        },
      ],
    },
    {
      category: 'Working with Bizooma',
      questions: [
        {
          question: 'Do you work with nonprofits as well as law firms?',
          answer: 'Yes. Both are organizations where trust is the product, the team is smaller than the workload, and compliance is not optional. The work rhymes more than people expect.',
        },
        {
          question: 'Do we have to use your software to work with you?',
          answer: 'No. We build our own products because it keeps us honest about what software can and cannot do, but every service we offer works on whatever you already run.',
        },
        {
          question: 'Where do we start?',
          answer: 'Most organizations start with an AI Readiness Audit, which scores the work your team repeats and gives you a ranked build order. If you would rather read first, the whole methodology is published.',
          links: [
            { label: 'AI Readiness Audit', href: '/ai-audit' },
            { label: 'published', href: '/order-of-operations' },
          ],
        },
      ],
    },
  ],
};
