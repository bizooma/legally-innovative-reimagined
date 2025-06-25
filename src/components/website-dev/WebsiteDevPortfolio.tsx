
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const WebsiteDevPortfolio = () => {
  const portfolioItems = [
    {
      title: "Personal Injury Law Firm",
      description: "Modern, conversion-focused website with integrated lead capture forms",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1932&auto=format&fit=crop",
      features: ["Responsive Design", "Lead Generation", "Client Portal"]
    },
    {
      title: "Corporate Law Practice",
      description: "Professional, sophisticated design reflecting corporate expertise",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1932&auto=format&fit=crop",
      features: ["Custom CMS", "Document Library", "Team Profiles"]
    },
    {
      title: "Family Law Attorney",
      description: "Approachable, trust-building design for sensitive legal matters",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1932&auto=format&fit=crop",
      features: ["Online Scheduling", "Resource Center", "Multilingual"]
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Our Portfolio
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore some of our recent website development projects for law firms 
            across various practice areas.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {portfolioItems.map((item, index) => (
            <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="relative">
                <AspectRatio ratio={16/10}>
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="absolute inset-0 bg-legal-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button variant="outline" className="bg-white text-legal-primary">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </AspectRatio>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-legal-dark">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.features.map((feature, featureIndex) => (
                    <span 
                      key={featureIndex}
                      className="bg-legal-primary/10 text-legal-primary px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button size="lg" className="bg-legal-primary hover:bg-legal-secondary text-white">
            View Full Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WebsiteDevPortfolio;
