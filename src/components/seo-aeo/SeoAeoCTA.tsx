
import { Button } from "@/components/ui/button";
import { CheckCircle, Search, Mic, TrendingUp } from "lucide-react";

const SeoAeoCTA = () => {
  const features = [
    "Comprehensive SEO audit and strategy",
    "Answer Engine Optimization (AEO)",
    "Voice SEO implementation",
    "Local and national SEO",
    "Monthly performance reports",
    "Ongoing optimization and support"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-legal-primary to-legal-dark text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Dominate Search Results?
          </h2>
          <p className="text-xl mb-12 text-legal-light">
            Don't let potential clients find your competitors instead of you. 
            Start your comprehensive SEO strategy today.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-legal-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Traditional SEO</h3>
              <p className="text-legal-light">Rank higher on Google & Bing</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-legal-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Answer Engines</h3>
              <p className="text-legal-light">Get featured in AI responses</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mic className="w-8 h-8 text-legal-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Voice Search</h3>
              <p className="text-legal-light">Capture voice query traffic</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-bold mb-6">What's Included:</h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-legal-accent flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-legal-accent hover:bg-legal-accent/90 text-white px-8 py-4 text-lg"
            >
              Get Free SEO Audit
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-legal-primary px-8 py-4 text-lg"
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeoAeoCTA;
