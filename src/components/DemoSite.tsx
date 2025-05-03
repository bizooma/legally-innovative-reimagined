
import { Button } from "@/components/ui/button";
import { ArrowRight, Monitor, Users, Database, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const DemoSite = () => {
  return (
    <section id="demo-site" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Demo <span className="highlight-text">Site</span>
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Experience our capabilities firsthand through our demonstration site at <a href="https://amicusedge.com" className="text-legal-primary font-semibold hover:underline" target="_blank" rel="noopener noreferrer">amicusedge.com</a>. This interactive showcase highlights the powerful features and solutions we provide to legal practices.
          </p>
          <p className="text-lg text-gray-700">
            Our demo environment illustrates how our marketing and AI automation tools work together to transform your firm's digital presence and operational efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-legal-light rounded-full flex items-center justify-center mb-6">
                  <Monitor className="h-6 w-6 text-legal-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-legal-dark">Interactive Dashboard</h3>
                  <p className="text-gray-700">
                    Navigate through our intuitive dashboard that provides real-time analytics, client management tools, and marketing performance metrics all in one central location.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-legal-light rounded-full flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-legal-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-legal-dark">Lead Management</h3>
                  <p className="text-gray-700">
                    See how our system captures, qualifies, and nurtures leads through automated workflows designed specifically for legal practices, increasing conversion rates and client acquisition.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-legal-light rounded-full flex items-center justify-center mb-6">
                  <Database className="h-6 w-6 text-legal-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-legal-dark">AI Document Automation</h3>
                  <p className="text-gray-700">
                    Explore our AI-powered document generation and management system that streamlines client intake, contract creation, and case documentation, saving your firm valuable time.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-legal-light rounded-full flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-legal-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-legal-dark">Secure Client Portal</h3>
                  <p className="text-gray-700">
                    Test our secure client portal that facilitates confidential communication, document sharing, and case updates between your firm and clients, enhancing client satisfaction.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button 
            className="bg-legal-primary hover:bg-legal-secondary text-white px-8 py-6 rounded-md text-lg"
            onClick={() => window.open("https://calendly.com/joe-bizooma/30min", "_blank", "noopener,noreferrer")}
          >
            Request a Personalized Demo <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DemoSite;
