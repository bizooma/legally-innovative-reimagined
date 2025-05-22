import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const DIY = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTaskBossOpen, setIsTaskBossOpen] = useState(false);

  const downloadFile = async (bucketName: string, fileName: string, displayName: string) => {
    try {
      console.log(`Attempting to download ${fileName} from bucket ${bucketName}`);
      
      const { data, error } = await supabase.storage
        .from(bucketName)
        .download(fileName);
      
      if (error) {
        toast({
          title: "Download failed",
          description: error.message,
          variant: "destructive",
        });
        console.error("Error downloading file:", error);
        return;
      }
      
      if (data) {
        // Create a URL for the file and trigger download
        const url = URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = displayName || fileName;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        toast({
          title: "Download started",
          description: `${displayName || fileName} is downloading.`,
        });
      }
    } catch (error) {
      console.error("Unexpected error downloading file:", error);
      toast({
        title: "Download failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-legal-dark">
              DIY Legal Marketing Resources
            </h1>
            
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-lg text-gray-700 mb-6">
                Welcome to our DIY legal marketing resources section. As marketing specialists for law firms, 
                we've created these tools, templates, and guides to help you promote your legal practice more effectively.
              </p>
              
              <h2 className="text-2xl font-semibold text-legal-primary mt-8 mb-4">
                Free Marketing Templates & Resources
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-12">
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-3">Law Firm Marketing NDA Template</h3>
                  <p className="text-gray-600 mb-4">A specialized non-disclosure agreement template for marketing agencies and law firms.</p>
                  <Button className="bg-legal-primary hover:bg-legal-secondary">Download Template</Button>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-3">Legal Marketing Service Agreement</h3>
                  <p className="text-gray-600 mb-4">Protect your marketing agency with our professional service agreement template for legal clients.</p>
                  <Button className="bg-legal-primary hover:bg-legal-secondary">Download Template</Button>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-3">Law Firm Digital Marketing Checklist</h3>
                  <p className="text-gray-600 mb-4">Essential marketing considerations when promoting your law practice online.</p>
                  <Button 
                    className="bg-legal-primary hover:bg-legal-secondary"
                    onClick={() => downloadFile("downloads", "digital-marketing-checklist.pdf", "Law Firm Digital Marketing Checklist.pdf")}
                  >
                    Download Checklist
                  </Button>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-3">Legal Marketing GDPR Compliance Guide</h3>
                  <p className="text-gray-600 mb-4">A practical guide to understanding and implementing GDPR requirements in legal marketing.</p>
                  <Button className="bg-legal-primary hover:bg-legal-secondary">Download Guide</Button>
                </div>
              </div>
              
              {/* AEO Analyzer Promotional Section - Moved below templates */}
              <section className="mb-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl overflow-hidden shadow-lg border border-blue-100">
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-center gap-8">
                    <div className="md:w-3/5">
                      <h2 className="text-2xl md:text-3xl font-bold text-legal-dark mb-4">
                        Supercharge Your Law Firm's SEO with AEO Analyzer
                      </h2>
                      <p className="text-gray-700 mb-6">
                        Optimize your law firm's website for audio search engines and drive more targeted client inquiries with our powerful 
                        AEO (Audio Engine Optimization) platform. Stay ahead of competing firms in the voice search era.
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-start gap-2">
                          <div className="rounded-full bg-legal-primary p-1 text-white mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                          <p className="text-gray-700">Comprehensive legal audio search optimization tools</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="rounded-full bg-legal-primary p-1 text-white mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                          <p className="text-gray-700">Legal voice search keyword research and analysis</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="rounded-full bg-legal-primary p-1 text-white mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                          <p className="text-gray-700">Actionable insights with detailed reporting for attorney marketing</p>
                        </div>
                      </div>
                      <div className="mt-8 flex flex-wrap gap-4">
                        <Button 
                          className="bg-legal-primary hover:bg-legal-secondary text-white"
                          onClick={() => window.open("https://aeoanalyzer.com", "_blank")}
                        >
                          Explore AEO Analyzer <ExternalLink className="ml-1 h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => setIsOpen(!isOpen)}
                          className="border-legal-primary text-legal-primary hover:bg-legal-primary/10"
                        >
                          Learn More
                        </Button>
                      </div>
                      
                      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-6">
                        <CollapsibleContent className="text-gray-700 space-y-4 border-t border-blue-100 pt-4 mt-4 animate-accordion-down">
                          <p>
                            AEO Analyzer helps law firms optimize their online presence for voice search, which is rapidly growing 
                            with the popularity of smart speakers and voice assistants like Alexa, Google Assistant, and Siri.
                          </p>
                          <p>
                            Our platform provides tools to analyze how your legal content performs in audio search results, identify legal voice 
                            search keywords, and optimize your content to better answer the questions potential clients are asking through voice.
                          </p>
                          <p>
                            Get a competitive edge with detailed analytics, competitor analysis, and actionable recommendations 
                            tailored specifically for law firm marketing and audio search engine optimization.
                          </p>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                    
                    <div className="md:w-2/5">
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-legal-dark">Ready to try AEO Analyzer for your law firm?</h3>
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-2 text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            <span>7-day free trial for legal marketers</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            <span>No credit card required</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            <span>Cancel anytime</span>
                          </div>
                        </div>
                        <Button 
                          className="w-full bg-legal-primary hover:bg-legal-secondary text-white"
                          onClick={() => window.open("https://aeoanalyzer.com/signup", "_blank")}
                        >
                          Start Free Trial
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* TaskBossPro Promotional Section - Moved below AEO */}
              <section className="mb-16 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl overflow-hidden shadow-lg border border-purple-100">
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-center gap-8">
                    <div className="md:w-3/5">
                      <h2 className="text-2xl md:text-3xl font-bold text-legal-dark mb-4">
                        Streamline Your Law Firm Marketing with TaskBossPro
                      </h2>
                      <p className="text-gray-700 mb-6">
                        Take control of your legal marketing projects with our powerful task management platform. TaskBossPro helps 
                        law firm marketers organize, track, and complete marketing campaigns efficiently, saving valuable time and reducing stress.
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-start gap-2">
                          <div className="rounded-full bg-purple-600 p-1 text-white mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                          <p className="text-gray-700">Smart legal marketing task prioritization and organization</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="rounded-full bg-purple-600 p-1 text-white mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                          <p className="text-gray-700">Seamless collaboration tools for marketing and legal teams</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="rounded-full bg-purple-600 p-1 text-white mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                          <p className="text-gray-700">Marketing campaign deadline tracking and automated reminders</p>
                        </div>
                      </div>
                      <div className="mt-8 flex flex-wrap gap-4">
                        <Button 
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={() => window.open("https://taskbosspro.com", "_blank")}
                        >
                          Explore TaskBossPro <ExternalLink className="ml-1 h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => setIsTaskBossOpen(!isTaskBossOpen)}
                          className="border-purple-600 text-purple-600 hover:bg-purple-600/10"
                        >
                          Learn More
                        </Button>
                      </div>
                      
                      <Collapsible open={isTaskBossOpen} onOpenChange={setIsTaskBossOpen} className="mt-6">
                        <CollapsibleContent className="text-gray-700 space-y-4 border-t border-purple-100 pt-4 mt-4 animate-accordion-down">
                          <p>
                            TaskBossPro is designed specifically for legal marketing professionals who need to manage multiple complex campaigns 
                            simultaneously. Our intuitive interface makes it easy to create tasks, assign them to team members, 
                            and track progress in real-time.
                          </p>
                          <p>
                            With features like custom workflows, document attachments, time tracking, and detailed reporting, 
                            TaskBossPro helps legal marketing teams improve productivity and ensure that critical marketing deliverables are completed on time.
                          </p>
                          <p>
                            Our platform integrates seamlessly with popular calendars, email clients, and other legal marketing software 
                            to create a unified workflow that adapts to your existing processes.
                          </p>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                    
                    <div className="md:w-2/5">
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-legal-dark">Try TaskBossPro For Your Law Firm Marketing</h3>
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-2 text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            <span>14-day free trial for legal marketers</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            <span>No credit card required</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            <span>Full feature access</span>
                          </div>
                        </div>
                        <Button 
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={() => window.open("https://taskbosspro.com/signup", "_blank")}
                        >
                          Start Free Trial
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              <div className="bg-legal-light/30 p-6 rounded-lg border border-legal-light mt-12">
                <h3 className="text-xl font-semibold mb-3">Need Custom Legal Marketing Solutions?</h3>
                <p>
                  While these DIY resources are helpful for many legal marketing situations, more complex marketing strategies 
                  often require professional guidance. Contact us today to discuss your law firm's specific marketing needs.
                </p>
                <Button 
                  className="bg-legal-primary hover:bg-legal-secondary mt-4"
                  onClick={() => window.open("https://calendly.com/joe-bizooma/30min", "_blank")}
                >
                  Free Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DIY;
