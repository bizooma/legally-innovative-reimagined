import type { ServicePageContent } from "./types";

export const aiMarketing: ServicePageContent = {
  slug: "ai-marketing",
  seo: {
    title: "AI Marketing & Automation | Bizooma",
    description: "Automating the work your team repeats — with the governance to do it safely. For law firms and nonprofits.",
  },
  hero: {
    eyebrow: "SERVICES",
    title: "AI Marketing & Automation",
    lede: "Automating the work your team repeats — with the governance to do it safely.",
    sub: "Not a chatbot bolted onto your website. The operational work underneath it.",
  },
  argument: {
    title: "A chatbot is not a strategy",
    paragraphs: [
      "Most \u201cAI marketing\u201d means installing a prebuilt bot, loading it with a few canned answers, and hoping. It fails for a reason that has nothing to do with the technology: a bot pointed at nothing in particular produces confident, plausible, unsourced answers, and checking them costs more than doing the work yourself.",
      "The same tools pointed at your own material behave completely differently. Your intake questions, your service descriptions, your documented processes, your actual answers to the questions people actually ask. That is the difference between a system your team trusts and a pilot that quietly gets switched off.",
      "For a law firm there is a second layer, and it is not optional. AI use is a supervision question with a bar number attached — approved systems, scoped permissions, logged use, documented verification, a named human on every workflow. We build that in from the start, because retrofitting governance onto a system people already rely on is how organizations end up with a policy nobody follows.",
    ],
  },
  work: {
    title: "The work",
    items: [
      "Mapping the workflows your team repeats, scored on impact and risk",
      "Intake triage and routing, with a human checkpoint where it matters",
      "Follow-up and nurture sequences that run without anyone remembering to send them",
      "Content production grounded in your own material, not generic output",
      "Custom assistants trained on your services, processes and FAQs",
      "An acceptable-use policy, approved tool list, and audit trail",
      "Staff training, so the people using it understand what it can and cannot be trusted with",
    ],
  },
  lawFirms: {
    title: "For law firms",
    paragraph: "The highest-value automation in a firm is rarely client-facing. It is the repeated internal work — opening a matter, triaging an inquiry, chasing a document, drafting the same status update for the fortieth time.",
    bullets: [
      "Intake triage and conflict-aware routing",
      "Matter-opening and document collection",
      "Client status updates that go out without being asked for",
      "Billing narrative review before invoices go out",
    ],
  },
  nonprofits: {
    title: "For nonprofits",
    paragraph: "Nonprofits run on a smaller team doing more jobs, which makes the repetitive work more expensive, not less. The goal is giving hours back to people who are already stretched.",
    bullets: [
      "Donor cultivation and acknowledgement sequences",
      "Volunteer recruitment, scheduling and reminders",
      "Grant research, deadline tracking and reporting prompts",
      "Answering the same program questions without a person doing it each time",
    ],
  },
  framework: {
    line: "This service is how we deliver pillar three of our framework — the AI workforce, on a leash.",
    linkLabel: "Read the framework",
    href: "/order-of-operations",
  },
  cta: {
    title: "Start with what your team already does",
    paragraph: "The fastest way into this is an audit of the work you repeat. We score it on impact and risk and give you a build order, not a wishlist.",
    buttonLabel: "Get in touch",
    href: "/#contact",
  },
};
