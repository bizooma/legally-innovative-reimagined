import type { ProductContent } from './types';

export const ava: ProductContent = {
  slug: 'ava',
  path: '/ai-receptionist',
  seoTitle: 'AI Receptionist for Law Firms & Small Business | Bizooma',
  seoDescription: 'An AI receptionist that answers every call 24/7, qualifies callers, and hands your team a clean summary. Built and trained on your business by Bizooma.',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Bizooma - AI Receptionist',
    url: 'https://bizooma.com/ai-receptionist',
    telephone: '+1-904-331-8130',
    description: 'An AI receptionist that answers every call 24/7, qualifies callers, and hands your team a clean summary. Built and trained on your business by Bizooma.',
    serviceType: 'AI Receptionist',
    provider: { '@type': 'Organization', name: 'Bizooma Digital Marketing Agency', url: 'https://bizooma.com' },
  },
  hero: {
    eyebrow: 'PRODUCTS',
    title: 'Ava',
    lede: 'Never miss another call.',
    sub: 'Calls come in after hours, during court, on weekends, and while the line is already busy — and the caller simply moves on to the next name on the list. Our AI receptionist answers on the first ring, every time, and sounds like it works for you because it was trained on your business.',
    cta: { label: 'Get a Consultation', href: '/#contact' },
  },
  problem: {
    title: 'Built for your business, not from a template',
    paragraphs: [
      "A generic answering bot reads a script and frustrates people. We build yours around a knowledge base written specifically for your business — your services, your intake process, your pricing rules, and the things it is not allowed to say. It routes existing clients differently from new prospects, flags urgent calls, and when it doesn't know something, it says so instead of guessing.",
    ],
  },
  features: [
    'Answers instantly, 24/7 — no hold music, no voicemail, no after-hours gap.',
    "Understands what the caller needs — it's trained on your services, hours, and the questions your callers actually ask.",
    'Captures contact details accurately — phone numbers and email addresses are read back and confirmed on the call, so the lead you get is a lead you can actually reach.',
    'Hands off cleanly — your team gets a structured summary: who called, what they wanted, how urgent it is, and how to reach them.',
    'Trained on your specific services and FAQs',
    'Routes existing clients differently from new leads',
    'Flags urgent calls for immediate attention',
    'Never invents answers outside its knowledge base',
  ],
  audience: [
    'Law firms — capture intake calls after hours and route urgent matters immediately.',
    'Nonprofits — answer donor and volunteer questions without adding staff.',
    'Small business — stop losing jobs to the competitor who picked up first.',
  ],
  proof: {
    title: 'We answer our own phone with it',
    paragraphs: ["Every call to Bizooma's main line is handled by Ava. Call 904-331-8130 and you will be talking to the same system we build for clients. That is how we know it holds up."],
    link: { text: '904-331-8130', href: 'tel:+19043318130' },
  },
  cta: {
    title: 'Hear it for yourself',
    paragraph: "Call our main line and you'll be talking to one. Then book a call and we'll scope one for your business.",
    label: 'Get in Touch',
    href: '/#contact',
  },
};
