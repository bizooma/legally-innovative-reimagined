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
    topic: "Voice Search Optimization for Lawyers",
    description: "Strategies to optimize your law firm's online presence for voice search queries.",
    link: "#",
    isPublished: true,
  },
  {
    date: "2025-10-21",
    topic: "Client Retention Strategies",
    description: "Proven techniques to keep your clients coming back and referring others.",
    isPublished: false,
  },
  {
    date: "2025-10-28",
    topic: "Local SEO Mastery",
    description: "Dominate local search results and attract more clients in your area.",
    isPublished: false,
  },
  
  // November 2025
  {
    date: "2025-11-04",
    topic: "Social Media Marketing for Law Firms",
    description: "Effective social media strategies that comply with legal ethics guidelines.",
    isPublished: false,
  },
  {
    date: "2025-11-11",
    topic: "Content Marketing That Converts",
    description: "Create compelling legal content that attracts and converts potential clients.",
    isPublished: false,
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
