// All copy for /labs. Edit text here; layout lives in src/pages/LabsPage.tsx.

export type LabStatus = "Live" | "In development" | "Retired";

export interface LabItem {
  name: string;
  status: LabStatus;
  description: string;
  /** Internal path ("/x") or external URL. Omit when there is no link. */
  link?: string;
}

export const statusOrder: LabStatus[] = ["Live", "In development", "Retired"];

export const seo = {
  title: "Bizooma Labs | Things We've Built",
  description:
    "The products and internal tools Bizooma has built — live, in development, and retired. We list the retired ones on purpose.",
  url: "https://bizooma.com/labs",
};

export const hero = {
  eyebrow: "BIZOOMA LABS",
  title: "Things we've built",
  lede: "Most marketing companies advise on technology. We ship it.",
  sub: "These are the products and internal tools Bizooma has built. Some are live and in use, some are still being worked on, and some we retired. We list the retired ones on purpose, because a catalog where everything is a success is a catalog nobody believes.",
};

// [[text]] marks the link to the framework page.
export const intro = {
  paragraphs: [
    "Building our own software is how we know whether the advice we give is any good. When we tell a firm that a workflow is worth automating, or that a channel is worth the investment, it is because we have built the thing and watched what happened — not because we read about it.",
    "Pillar six of [[our framework]] says most internal software dies, and that the real discipline is writing the kill criteria before the first line of code. This page is us taking our own advice in public.",
  ],
  frameworkLink: "/order-of-operations",
};

export const processDiagram = {
  ariaLabel: "How a Labs project runs: a problem we keep hitting leads to kill criteria written first, then the thinnest version that works, then we run it on ourselves, and it ends either kept or retired.",
  steps: [
    { label: "A problem we keep hitting" },
    { label: "Kill criteria, written first" },
    { label: "MVP", sub: "The thinnest version that works" },
    { label: "We run it on ourselves" },
  ] as { label: string; sub?: string }[],
  outcomes: { kept: "Kept", retired: "Retired" },
};

export const items: LabItem[] = [
  { name: "Claude Cowork", status: "Live", description: "A curated library of Claude skills and tutorials built for law firms and nonprofits — intake triage, drafting, grant writing, donor cultivation.", link: "/claude-cowork" },
  { name: "Causeio", status: "Live", description: "An all-in-one marketing and engagement platform for nonprofits: donor management, volunteer coordination, campaigns and grant tracking.", link: "https://causeio.com" },
  { name: "Quickie QR", status: "In development", description: "Dynamic QR codes whose destination and content can be changed after printing, with scan analytics." },
  { name: "Signature Pop", status: "Live", description: "Turns company email signatures into a managed marketing channel with campaign targeting." },
  { name: "Branded Books", status: "Live", description: "Branded activity and coloring books firms give to clients and families — a physical marketing object in a mostly digital category." },
  { name: "WordPress Plugins", status: "Live", description: "Custom plugins including Roadmap Flow, built for client sites where an off-the-shelf plugin did not exist.", link: "/wordpress-plugins" },
  { name: "CatchJar", status: "In development", description: "A chatbot builder for customer support and lead capture. Previously Support Bots; being rebuilt and renamed." },
  { name: "NPO Bots", status: "Retired", description: "Conversational intake and engagement for nonprofits. The useful parts went into Causeio, so the standalone tool was retired rather than maintained twice." },
  { name: "Lead Scraper CRM", status: "Retired", description: "Lead sourcing and verification with a lightweight pipeline attached." },
  { name: "MVP Soft Launch", status: "Live", description: "A structured launch checklist and platform directory for getting a new product in front of its first audience." },
  { name: "AEO Analyzer", status: "Retired", description: "Checked how a site appeared in AI-generated answers. The useful parts were absorbed into Amicus Edge, so the standalone tool was retired rather than maintained twice." },
];

// No /products route exists yet, so the closing paragraph carries no link.
export const close = {
  title: "What this page is for",
  text: "If something here solves a problem you have, ask us about it. If it is retired, ask anyway — we will tell you what we learned and what we would use instead. The products we actively sell are on the products page.",
};
