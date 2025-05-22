
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DIYHeader } from "@/components/diy/DIYHeader";
import { ResourceGrid } from "@/components/diy/ResourceGrid";
import { ProductPromotion } from "@/components/diy/ProductPromotion";
import { ConsultationCTA } from "@/components/diy/ConsultationCTA";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { VALID_DOWNLOAD_BUCKETS } from "@/config/documentConfig";

const DIY = () => {
  // Check if the required buckets exist when the component mounts
  useEffect(() => {
    const checkBuckets = async () => {
      try {
        const { data: buckets, error } = await supabase.storage.listBuckets();
        
        if (error) {
          console.error("Error checking buckets:", error);
          return;
        }
        
        const bucketNames = buckets.map(b => b.name);
        console.log("Available buckets:", bucketNames);
        
        // Check if our required buckets exist
        VALID_DOWNLOAD_BUCKETS.forEach(bucketName => {
          if (!bucketNames.includes(bucketName)) {
            console.warn(`Warning: Bucket "${bucketName}" does not exist. Downloads may fail.`);
          }
        });
      } catch (err) {
        console.error("Failed to check buckets:", err);
      }
    };
    
    checkBuckets();
  }, []);

  const resources = [
    {
      title: "Law Firm Marketing NDA Template",
      description: "A specialized non-disclosure agreement template for marketing agencies and law firms.",
      bucketName: "downloads",
      fileName: "law-firm-marketing-nda.pdf",
      buttonText: "Download Template"
    },
    {
      title: "Legal Marketing Service Agreement",
      description: "Protect your marketing agency with our professional service agreement template for legal clients.",
      bucketName: "downloads",
      fileName: "legal-marketing-service-agreement.pdf",
      buttonText: "Download Template"
    },
    {
      title: "Law Firm Digital Marketing Checklist",
      description: "Essential marketing considerations when promoting your law practice online.",
      bucketName: "downloads",
      fileName: "law-firm-digital-marketing-checklist.pdf",
      displayName: "Law Firm Digital Marketing Checklist.pdf",
      buttonText: "Download Checklist"
    },
    {
      title: "Legal Marketing GDPR Compliance Guide",
      description: "A practical guide to understanding and implementing GDPR requirements in legal marketing.",
      bucketName: "downloads",
      fileName: "legal-gdpr-guide.pdf",
      buttonText: "Download Guide"
    }
  ];

  const aeoFeatures = [
    { text: "Comprehensive legal audio search optimization tools" },
    { text: "Legal voice search keyword research and analysis" },
    { text: "Actionable insights with detailed reporting for attorney marketing" }
  ];

  const aeoLearnMoreContent = [
    "AEO Analyzer helps law firms optimize their online presence for voice search, which is rapidly growing with the popularity of smart speakers and voice assistants like Alexa, Google Assistant, and Siri.",
    "Our platform provides tools to analyze how your legal content performs in audio search results, identify legal voice search keywords, and optimize your content to better answer the questions potential clients are asking through voice.",
    "Get a competitive edge with detailed analytics, competitor analysis, and actionable recommendations tailored specifically for law firm marketing and audio search engine optimization."
  ];

  const aeoTrialItems = [
    "7-day free trial for legal marketers",
    "No credit card required",
    "Cancel anytime"
  ];

  const taskBossFeatures = [
    { text: "Smart legal marketing task prioritization and organization" },
    { text: "Seamless collaboration tools for marketing and legal teams" },
    { text: "Marketing campaign deadline tracking and automated reminders" }
  ];

  const taskBossLearnMoreContent = [
    "TaskBossPro is designed specifically for legal marketing professionals who need to manage multiple complex campaigns simultaneously. Our intuitive interface makes it easy to create tasks, assign them to team members, and track progress in real-time.",
    "With features like custom workflows, document attachments, time tracking, and detailed reporting, TaskBossPro helps legal marketing teams improve productivity and ensure that critical marketing deliverables are completed on time.",
    "Our platform integrates seamlessly with popular calendars, email clients, and other legal marketing software to create a unified workflow that adapts to your existing processes."
  ];

  const taskBossTrialItems = [
    "14-day free trial for legal marketers",
    "No credit card required",
    "Full feature access"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <DIYHeader 
              title="DIY Legal Marketing Resources"
              description="Welcome to our DIY legal marketing resources section. As marketing specialists for law firms, we've created these tools, templates, and guides to help you promote your legal practice more effectively."
            />
            
            <div className="prose prose-lg max-w-none mb-12">
              <h2 className="text-2xl font-semibold text-legal-primary mt-8 mb-4">
                Free Marketing Templates & Resources
              </h2>
              
              <ResourceGrid resources={resources} />
              
              <ProductPromotion
                title="Supercharge Your Law Firm's SEO with AEO Analyzer"
                description="Optimize your law firm's website for audio search engines and drive more targeted client inquiries with our powerful AEO (Audio Engine Optimization) platform. Stay ahead of competing firms in the voice search era."
                features={aeoFeatures}
                benefits={[]}
                primaryButtonText="Explore AEO Analyzer"
                primaryButtonLink="https://aeoanalyzer.com"
                learnMoreContent={aeoLearnMoreContent}
                trialItems={aeoTrialItems}
                trialButtonText="Start Free Trial"
                trialButtonLink="https://aeoanalyzer.com/signup"
                colorScheme="blue"
              />
              
              <ProductPromotion
                title="Streamline Your Law Firm Marketing with TaskBossPro"
                description="Take control of your legal marketing projects with our powerful task management platform. TaskBossPro helps law firm marketers organize, track, and complete marketing campaigns efficiently, saving valuable time and reducing stress."
                features={taskBossFeatures}
                benefits={[]}
                primaryButtonText="Explore TaskBossPro"
                primaryButtonLink="https://taskbosspro.com"
                learnMoreContent={taskBossLearnMoreContent}
                trialItems={taskBossTrialItems}
                trialButtonText="Start Free Trial"
                trialButtonLink="https://taskbosspro.com/signup"
                colorScheme="purple"
              />
              
              <ConsultationCTA
                title="Need Custom Legal Marketing Solutions?"
                description="While these DIY resources are helpful for many legal marketing situations, more complex marketing strategies often require professional guidance. Contact us today to discuss your law firm's specific marketing needs."
                buttonText="Free Consultation"
                buttonLink="https://calendly.com/joe-bizooma/30min"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DIY;
