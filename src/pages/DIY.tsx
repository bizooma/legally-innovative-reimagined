import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DIYHeader } from "@/components/diy/DIYHeader";
import { ResourceGrid } from "@/components/diy/ResourceGrid";
import { ProductPromotion } from "@/components/diy/ProductPromotion";
import { ConsultationCTA } from "@/components/diy/ConsultationCTA";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { VALID_DOWNLOAD_BUCKETS, RESOURCE_FILES } from "@/config/documentConfig";
import { toast } from "@/components/ui/use-toast";

const DIY = () => {
  const [bucketsAvailable, setBucketsAvailable] = useState<string[]>([]);
  const [isCheckingBuckets, setIsCheckingBuckets] = useState(true);

  // Check if the required buckets exist when the component mounts
  useEffect(() => {
    const checkBuckets = async () => {
      setIsCheckingBuckets(true);
      try {
        console.log("Checking available buckets...");
        const { data: buckets, error } = await supabase.storage.listBuckets();
        
        if (error) {
          console.error("Error checking buckets:", error);
          toast({
            title: "Storage Connection Error",
            description: "Could not connect to storage. Some downloads may not be available.",
            variant: "destructive",
          });
          return;
        }
        
        if (!buckets || buckets.length === 0) {
          console.warn("No storage buckets found");
          toast({
            title: "Storage Configuration Issue",
            description: "No storage buckets found. Downloads will not be available.",
            variant: "destructive",
          });
          return;
        }
        
        const bucketNames = buckets.map(b => b.name);
        console.log("Available buckets:", bucketNames);
        setBucketsAvailable(bucketNames);
        
        // Check if our required buckets exist
        const missingBuckets = VALID_DOWNLOAD_BUCKETS.filter(
          bucketName => !bucketNames.includes(bucketName)
        );
        
        if (missingBuckets.length > 0) {
          console.warn(`Warning: The following buckets do not exist: ${missingBuckets.join(', ')}`);
          toast({
            title: "Some Resources Unavailable",
            description: `Some download resources may not be available due to storage configuration.`,
            variant: "destructive",
          });
        }
      } catch (err) {
        console.error("Failed to check buckets:", err);
        toast({
          title: "Storage Connection Error",
          description: "Failed to check storage availability. Some features may not work properly.",
          variant: "destructive",
        });
      } finally {
        setIsCheckingBuckets(false);
      }
    };
    
    checkBuckets();
  }, []);

  const resources = [
    {
      title: "Law Firm Digital Marketing Checklist",
      description: "Essential marketing considerations when promoting your law practice online.",
      bucketName: "downloads",
      fileName: RESOURCE_FILES.LAW_FIRM_MARKETING_CHECKLIST,
      displayName: "Law Firm Digital Marketing Checklist.pdf",
      buttonText: "Download Checklist"
    },
    {
      title: "Legal Marketing GDPR Compliance Guide",
      description: "A practical guide to understanding and implementing GDPR requirements in legal marketing.",
      bucketName: "downloads",
      fileName: RESOURCE_FILES.GDPR_GUIDE,
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
              
              {isCheckingBuckets ? (
                <div className="flex justify-center items-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-legal-primary"></div>
                  <span className="ml-3 text-legal-primary">Loading resources...</span>
                </div>
              ) : (
                <ResourceGrid resources={resources} />
              )}
              
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
