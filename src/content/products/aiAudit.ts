import type { EditorialHero, EditorialBand } from './types';
export const aiAudit: {
  seoTitle: string; hero: EditorialHero; argument: EditorialBand; features: string[];
  tiersTitle: string; tiers: { title: string; paragraph: string; price: string; label: string; href?: string }[];
  framework: { paragraph: string; label: string; href: string };
  audience: EditorialBand; previews: { title: string; alt: string }[];
} = {
  seoTitle: 'AI Readiness Audit | Bizooma',
  hero: { eyebrow: 'AI READINESS AUDIT', title: 'Find out which work to automate first', lede: 'We score the work your team repeats on impact and risk, then hand you a ranked build order.', sub: 'The same methodology as our published framework, applied to your operation.' },
  argument: { title: 'Most AI programs stall for the same reason', paragraphs: [
    'They start in the middle. Somebody buys a tool, points it at nothing in particular, and asks people to use it. The output needs so much checking that it is slower than doing the work, the pilot ends, and the conclusion drawn is that AI is overhyped.',
    'The actual finding is almost always that the foundation was not there. What gets automated was never chosen deliberately, nobody owns the output, and no one defined what a human still has to check.',
    'An audit fixes the order. Every repeated workflow scored on two axes — how much time and money it costs, and how much damage a wrong answer does. The ones that are high impact and low risk get built first. The ones that are high risk get a human checkpoint designed before anything is built. The rest wait.'
  ] },
  features: ['Every repeated workflow in your operation, inventoried', 'Each scored on impact and risk, with the reasoning shown', 'A ranked build order, so the first project is the one most likely to succeed', 'A named owner and defined human checkpoint for each workflow that needs one', 'An acceptable-use policy and approved-tool list you can actually enforce', 'An implementation tracker, so the plan survives first contact with a busy quarter'],
  tiersTitle: 'Two ways to do it',
  tiers: [
    { title: 'Do it yourself', paragraph: 'The audit and implementation tracker as spreadsheets, with the scoring model built in and worked examples throughout. For organizations that want the method and have someone to run it.', price: '$19.95 one-time', label: 'Buy both spreadsheets' },
    { title: 'Do it with us', paragraph: 'We run the audit with your team: interviews, inventory, scoring, the build order, the policy, and a working session on the first project. For organizations that would rather have it done than learn to do it.', price: 'Book a call', label: 'Book a call', href: '/#contact' }
  ],
  framework: { paragraph: 'This audit is pillar three of our framework, delivered. The framework is published in full and free to read — if you would rather run it yourself from the source, start there.', label: 'Read the framework', href: '/order-of-operations' },
  audience: { title: "Who it's for", paragraphs: ['Law firms and nonprofits.'] },
  previews: [ { title: 'Law Firm AI Audit', alt: 'AI Workflow Audit spreadsheet preview' }, { title: 'AI Workflow Implementation Tracker', alt: 'AI Workflow Implementation Tracker spreadsheet preview' } ]
};