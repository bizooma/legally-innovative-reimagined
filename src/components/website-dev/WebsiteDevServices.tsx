
import { Card, CardContent } from "@/components/ui/card";
import { Code, Palette, Search, Shield, Smartphone, Users } from "lucide-react";

const WebsiteDevServices = () => {
  const services = [
    {
      icon: Palette,
      title: "Custom Design",
      description: "Unique, professional designs tailored to your firm's brand and practice areas"
    },
    {
      icon: Code,
      title: "Responsive Development",
      description: "Mobile-first development ensuring perfect display on all devices"
    },
    {
      icon: Search,
      title: "SEO Optimization",
      description: "Built-in SEO best practices to improve your search engine rankings"
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "ADA compliant, secure hosting, and legal ethics compliance"
    },
    {
      icon: Users,
      title: "Client Portals",
      description: "Secure client login areas for document sharing and communication"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimization",
      description: "Fast-loading, mobile-optimized sites for on-the-go clients"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Comprehensive Website Development Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From initial design concepts to ongoing maintenance, we provide end-to-end 
            website development services specifically designed for law firms.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-legal-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <service.icon className="w-8 h-8 text-legal-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-legal-dark">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebsiteDevServices;
