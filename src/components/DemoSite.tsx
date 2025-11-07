import { Button } from "@/components/ui/button";
import { ArrowRight, Monitor, Users, Database, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import diyMarketingBg from "@/assets/diy-marketing-bg.jpg";
import nonprofitVolunteersBg from "@/assets/nonprofit-volunteers-bg.jpg";
import { trackCalendarClick } from "@/utils/gtmTracking";

interface DemoSiteProps {
  targetAudience?: string;
  backgroundImage?: string;
}

const DemoSite = ({ targetAudience = "Law Firms", backgroundImage }: DemoSiteProps) => {
  const bgImage = backgroundImage || diyMarketingBg;
  return <section id="demo-site" className="section-padding relative overflow-hidden" style={{
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${bgImage}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}>
      <div className="container mx-auto">
        <div className="text-left max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            DIY Digital Marketing<br /><span className="text-legal-accent">Platform for {targetAudience}</span>
          </h2>
          <p className="text-lg text-white/90 mb-4">
            Experience our comprehensive SaaS marketing platform firsthand at <a href="https://amicusedge.com" className="text-white font-semibold underline hover:text-white/90 transition-colors" target="_blank" rel="noopener noreferrer">amicusedge.com</a>. AmicusEdge is an AI-powered legal technology platform featuring video chatbots, QR code generators, SEO/AEO analyzers, and voice search simulators - all integrated into one powerful marketing solution.
          </p>
          <p className="text-lg text-white/90">
            Our platform streamlines workflows, automates repetitive tasks, and enhances client engagement through cutting-edge AI technology designed specifically for modern companies looking to thrive in the digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="border border-white/20 shadow-lg hover:shadow-xl transition-shadow bg-white/10 backdrop-blur-md">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
                  <Monitor className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-white">AI Video Chatbots</h3>
                  <p className="text-white/90">
                    Deploy intelligent video chatbots on your website to engage potential clients 24/7, qualify leads automatically, and provide instant responses to common legal questions while you focus on practicing law.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-white/20 shadow-lg hover:shadow-xl transition-shadow bg-white/10 backdrop-blur-md">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-white">SEO/AEO Optimization</h3>
                  <p className="text-white/90">
                    Boost your online visibility with our advanced SEO and Answer Engine Optimization (AEO) tools that help your business rank higher in search results and voice search queries, driving more qualified leads to your practice.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-white/20 shadow-lg hover:shadow-xl transition-shadow bg-white/10 backdrop-blur-md">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
                  <Database className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-white">Document Automation & QR Tools</h3>
                  <p className="text-white/90">
                    Automate document drafting including wills, trusts, and legal forms while using QR code generators to create seamless client intake processes and streamline your practice operations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-white/20 shadow-lg hover:shadow-xl transition-shadow bg-white/10 backdrop-blur-md">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-white">Voice Search & Analytics</h3>
                  <p className="text-white/90">
                    Stay ahead of the curve with voice search simulators and comprehensive analytics that track your digital marketing performance, helping you understand and optimize your firm's online presence.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button 
            className="bg-legal-primary hover:bg-legal-secondary text-white px-8 py-6 rounded-md text-lg" 
            onClick={() => {
              trackCalendarClick('Demo Site Section');
              window.open("https://calendly.com/joe-bizooma/30min", "_blank", "noopener,noreferrer");
            }}
          >
            Request a Personalized Demo <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>;
};
export default DemoSite;