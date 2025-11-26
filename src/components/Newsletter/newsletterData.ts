export interface NewsletterTopic {
  date: string; // ISO format "2025-10-07"
  topic: string;
  description: string;
  link?: string; // URL for published newsletters
  isPublished: boolean;
}

export const newsletterTopics: NewsletterTopic[] = [
  // October 2025
  {
    date: "2025-10-14",
    topic: "Not getting calls? PPC not performing? This could be why.",
    description: "Google rolled out a global redesign of how it displays paid search results.",
    link: "https://us14.campaign-archive.com/?u=621f128c71e19e8d9b92ff1e3&id=6445ecdbfe",
    isPublished: true,
  },
  {
    date: "2025-10-21",
    topic: "ChatGPT",
    description: "Something exciting that's about to reshape how law firms use AI — and potentially make money from it",
    link: "https://us14.campaign-archive.com/?u=621f128c71e19e8d9b92ff1e3&id=ea9f9e777f",
    isPublished: true,
  },
  {
    date: "2025-10-29",
    topic: "AI Overview",
    description: "How AI Is Reshaping Search",
    link: "https://us14.campaign-archive.com/?u=621f128c71e19e8d9b92ff1e3&id=105c086b96",
    isPublished: true,
  },
  
  // November 2025
  {
    date: "2025-11-03",
    topic: "Exact Match Domain",
    description: "Why Your Exact-Match Domain Deserves Its Own Landing Page",
    link: "https://us14.campaign-archive.com/?u=621f128c71e19e8d9b92ff1e3&id=208ba7748e",
    isPublished: true,
  },
  {
    date: "2025-11-14",
    topic: "Video Chatbots for Engagement",
    description: "How Video Chatbots Are Changing Client Intake for Law Firms",
    link: "https://us14.campaign-archive.com/?u=621f128c71e19e8d9b92ff1e3&id=be62fdd0a3",
    isPublished: true,
  },
  {
    date: "2025-11-18",
    topic: "Mobile Apps are a Powerful Marketing Channel",
    description: "Your app can become a powerful growth engine that keeps delivering, even when other channels slow down.",
    link: "https://us14.campaign-archive.com/?u=621f128c71e19e8d9b92ff1e3&id=870c602e73",
    isPublished: true,
  },
  {
    date: "2025-11-25",
    topic: "How AI Is Redefining Marketing",
    description: "How AI Is Redefining Marketing Departments—and Why Law Firms Must Adapt Now",
    link: "https://us14.campaign-archive.com/?u=621f128c71e19e8d9b92ff1e3&id=0492e6b5c7",
    isPublished: true,
  },
  
  // December 2025
  {
    date: "2025-12-02",
    topic: "Google Business Profile Optimization",
    description: "Maximize your visibility on Google Maps and local search results.",
    isPublished: false,
  },
  {
    date: "2025-12-09",
    topic: "Using Email Automation to Nurture Leads",
    description: "Building drip campaigns, follow-up sequences, and client education workflows that improve sign-on rates.",
    isPublished: false,
  },
  {
    date: "2025-12-16",
    topic: "The Impact of Page Speed & Core Web Vitals",
    description: "Why law firms lose cases due to slow sites and how to fix technical performance issues.",
    isPublished: false,
  },
  {
    date: "2025-12-23",
    topic: "How to Use Schema Markup to Win Featured Snippets",
    description: "The most important schema types for attorneys—FAQ, How-To, Article, Organization, Attorney—and why they matter.",
    isPublished: false,
  },
  {
    date: "2025-12-30",
    topic: "Voice SEO & Ask Engine Optimization (AEO)",
    description: "How voice search and answer engines like ChatGPT, Perplexity, and Alexa are changing client discovery, and how law firms can adapt their content.",
    isPublished: false,
  },
];
