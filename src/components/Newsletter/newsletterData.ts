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
    topic: "Email Marketing for Lawyers",
    description: "Build and nurture your email list to generate more leads and referrals.",
    isPublished: false,
  },
  {
    date: "2025-11-25",
    topic: "Year-End Marketing Planning",
    description: "Strategic planning tips to make 2026 your best year yet.",
    isPublished: false,
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
    topic: "Video Marketing for Law Firms",
    description: "How to use video content to build trust and attract more clients.",
    isPublished: false,
  },
  {
    date: "2025-12-16",
    topic: "Holiday Marketing Ideas",
    description: "Creative marketing strategies for the holiday season and beyond.",
    isPublished: false,
  },
  {
    date: "2025-12-23",
    topic: "Digital Marketing Trends 2026",
    description: "Stay ahead of the curve with emerging trends in legal marketing.",
    isPublished: false,
  },
  {
    date: "2025-12-30",
    topic: "New Year, New Strategy",
    description: "Set your law firm up for success with a comprehensive marketing roadmap.",
    isPublished: false,
  },
];
