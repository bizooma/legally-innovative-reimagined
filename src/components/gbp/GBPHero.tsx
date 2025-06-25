
import { Button } from "@/components/ui/button";
import { MapPin, Users, Star } from "lucide-react";

const GBPHero = () => {
  return (
    <section className="bg-gradient-to-br from-legal-primary via-legal-primary to-legal-dark text-white py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Google Business Profile <span className="text-legal-accent">Optimization</span> for Law Firms
            </h1>
            <p className="text-xl mb-8 text-legal-light leading-relaxed">
              Dominate local search results and attract more qualified clients with professional 
              Google Business Profile optimization. Our proven strategies help law firms increase 
              visibility, build trust, and convert searches into clients.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-legal-accent hover:bg-legal-accent/90 text-white px-8 py-4 text-lg"
              >
                Get Free GBP Audit
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-legal-primary px-8 py-4 text-lg"
              >
                View Success Stories
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-8 h-8 text-legal-accent" />
                </div>
                <div className="text-2xl font-bold text-legal-accent">250%</div>
                <div className="text-sm text-legal-light">Local Visibility Increase</div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-legal-accent" />
                </div>
                <div className="text-2xl font-bold text-legal-accent">180%</div>
                <div className="text-sm text-legal-light">More Profile Views</div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Star className="w-8 h-8 text-legal-accent" />
                </div>
                <div className="text-2xl font-bold text-legal-accent">4.8/5</div>
                <div className="text-sm text-legal-light">Average Star Rating</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=1932&auto=format&fit=crop" 
                alt="Google Business Profile optimization for law firms"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full bg-legal-accent/20 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GBPHero;
