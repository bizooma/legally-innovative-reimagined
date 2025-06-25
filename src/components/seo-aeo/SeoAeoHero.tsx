
import { Button } from "@/components/ui/button";
import { Search, Mic, TrendingUp } from "lucide-react";

const SeoAeoHero = () => {
  return (
    <section className="bg-gradient-to-br from-legal-primary via-legal-primary to-legal-dark text-white py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              SEO, AEO & Voice SEO for <span className="text-white">Law Firms</span>
            </h1>
            <p className="text-xl mb-8 text-legal-light leading-relaxed">
              Dominate search results with comprehensive SEO, Answer Engine Optimization (AEO), 
              and Voice SEO strategies designed specifically for legal practices. Get found by 
              clients wherever they search.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-white hover:bg-gray-100 text-legal-primary px-8 py-4 text-lg"
              >
                Get Free SEO Audit
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-legal-primary px-8 py-4 text-lg"
              >
                View Case Studies
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-white">500%</div>
                <div className="text-sm text-legal-light">Organic Traffic Growth</div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Mic className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-white">75%</div>
                <div className="text-sm text-legal-light">Voice Search Ready</div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-white">#1</div>
                <div className="text-sm text-legal-light">Local Rankings</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1932&auto=format&fit=crop" 
                alt="SEO and digital marketing for law firms"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full bg-white/20 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeoAeoHero;
