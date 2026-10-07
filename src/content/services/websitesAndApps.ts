import type { ServicePageContent } from "./types";

export const websitesAndApps: ServicePageContent = {
  slug: "websites-and-apps",
  seo: {
    title: "Websites & Apps | Bizooma",
    description: "A site should help a visitor do the thing they came to do. Websites and apps for law firms and nonprofits.",
  },
  hero: {
    eyebrow: "SERVICES",
    title: "Websites & Apps",
    lede: "A site should help a visitor do the thing they came to do.",
    sub: "Most professional websites describe the organization instead. We build the other kind.",
  },
  argument: {
    title: "Your website is not a brochure",
    paragraphs: [
      "Most professional-services websites are organized around the organization: who we are, what we do, our team, our values. The visitor did not come for any of that. They came with a problem and a question about whether you can help, and the site makes them read three pages and then find a phone number.",
      "The fix is rarely a redesign. It is deciding what the site is for — one or two things a visitor should be able to finish without speaking to anyone — and then removing whatever is in the way. Book the consultation. Upload the document. Check whether they qualify. Start the application. Give.",
      "Apps are a separate question and the honest answer is usually no. An app earns its place only when there is a genuinely recurring interaction — something a person does repeatedly over weeks or months. For most organizations that does not exist, and we will tell you so. Where it does exist, an app does things a website cannot: notifications, offline access, and a permanent place on someone's home screen.",
    ],
  },
  work: {
    title: "The work",
    items: [
      "Websites built on a clear decision about what the site is for",
      "Conversion work on existing sites, which is usually cheaper than rebuilding",
      "Accessibility built in, not retrofitted after a complaint",
      "Native and cross-platform mobile apps where a recurring interaction justifies one",
      "App Store and Play Store submission and release management",
      "Client and member portals with status, documents and messaging",
      "Performance, Core Web Vitals, and the technical foundations SEO depends on",
    ],
  },
  lawFirms: {
    title: "For law firms",
    paragraph: "The two things most firm sites fail at are the same two things that decide whether an enquiry becomes a matter — making it easy to start, and making it clear what happens next.",
    bullets: [
      "Consultation booking without a phone call",
      "Intake forms that collect what you actually need the first time",
      "Secure document upload and collection",
      "Client portals with real matter status",
    ],
  },
  nonprofits: {
    title: "For nonprofits",
    paragraph: "Nonprofit sites usually carry more jobs than any other kind — donate, volunteer, apply, attend, learn, report — and the common failure is making all six equally prominent, which makes none of them work.",
    bullets: [
      "Giving flows, including recurring giving",
      "Volunteer signup and scheduling",
      "Program applications and eligibility checking",
      "Event registration and attendee communication",
    ],
  },
  framework: {
    line: "This service is where pillars five and six of our framework meet — owning the relationship after the click, and building only what you cannot buy.",
    linkLabel: "Read the framework",
    href: "/order-of-operations",
  },
  cta: {
    title: "Start with what the site is for",
    paragraph: "Before anything gets designed, we agree on the one or two things a visitor should be able to finish on their own. Everything after that is in service of those.",
    buttonLabel: "Get in touch",
    href: "/#contact",
  },
};
