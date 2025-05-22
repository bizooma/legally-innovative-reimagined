
export const getAEOProductData = () => {
  const features = [
    { text: "Comprehensive legal audio search optimization tools" },
    { text: "Legal voice search keyword research and analysis" },
    { text: "Actionable insights with detailed reporting for attorney marketing" }
  ];

  const learnMoreContent = [
    "AEO Analyzer helps law firms optimize their online presence for voice search, which is rapidly growing with the popularity of smart speakers and voice assistants like Alexa, Google Assistant, and Siri.",
    "Our platform provides tools to analyze how your legal content performs in audio search results, identify legal voice search keywords, and optimize your content to better answer the questions potential clients are asking through voice.",
    "Get a competitive edge with detailed analytics, competitor analysis, and actionable recommendations tailored specifically for law firm marketing and audio search engine optimization."
  ];

  const trialItems = [
    "7-day free trial for legal marketers",
    "No credit card required",
    "Cancel anytime"
  ];

  return {
    title: "Supercharge Your Law Firm's SEO with AEO Analyzer",
    description: "Optimize your law firm's website for audio search engines and drive more targeted client inquiries with our powerful AEO (Audio Engine Optimization) platform. Stay ahead of competing firms in the voice search era.",
    features,
    benefits: [],
    primaryButtonText: "Explore AEO Analyzer",
    primaryButtonLink: "https://aeoanalyzer.com",
    learnMoreContent,
    trialItems,
    trialButtonText: "Start Free Trial",
    trialButtonLink: "https://aeoanalyzer.com/signup",
    colorScheme: "blue" as const
  };
};

export const getTaskBossProductData = () => {
  const features = [
    { text: "Smart legal marketing task prioritization and organization" },
    { text: "Seamless collaboration tools for marketing and legal teams" },
    { text: "Marketing campaign deadline tracking and automated reminders" }
  ];

  const learnMoreContent = [
    "TaskBossPro is designed specifically for legal marketing professionals who need to manage multiple complex campaigns simultaneously. Our intuitive interface makes it easy to create tasks, assign them to team members, and track progress in real-time.",
    "With features like custom workflows, document attachments, time tracking, and detailed reporting, TaskBossPro helps legal marketing teams improve productivity and ensure that critical marketing deliverables are completed on time.",
    "Our platform integrates seamlessly with popular calendars, email clients, and other legal marketing software to create a unified workflow that adapts to your existing processes."
  ];

  const trialItems = [
    "14-day free trial for legal marketers",
    "No credit card required",
    "Full feature access"
  ];

  return {
    title: "Streamline Your Law Firm Marketing with TaskBossPro",
    description: "Take control of your legal marketing projects with our powerful task management platform. TaskBossPro helps law firm marketers organize, track, and complete marketing campaigns efficiently, saving valuable time and reducing stress.",
    features,
    benefits: [],
    primaryButtonText: "Explore TaskBossPro",
    primaryButtonLink: "https://taskbosspro.com",
    learnMoreContent,
    trialItems,
    trialButtonText: "Start Free Trial",
    trialButtonLink: "https://taskbosspro.com/signup",
    colorScheme: "purple" as const
  };
};
