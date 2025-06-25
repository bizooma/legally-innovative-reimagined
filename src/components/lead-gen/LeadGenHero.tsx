
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Users, TrendingUp } from "lucide-react";

const LeadGenHero = () => {
  return (
    <section className="bg-gradient-to-br from-legal-primary via-legal-primary to-legal-dark text-white py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Lead Generation Systems for <span className="text-legal-accent">Law Firms</span>
            </h1>
            <p className="text-xl mb-8 text-legal-light leading-relaxed">
              Transform your law practice with automated lead generation systems that capture, 
              nurture, and convert high-quality prospects into loyal clients. Stop chasing leads 
              and start attracting them.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-legal-accent hover:bg-legal-accent/90 text-white px-8 py-4 text-lg"
              >
                Get Lead Generation Audit
                <ArrowRight className="w-5 h-5 ml-2" />
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
                  <Target className="w-8 h-8 text-legal-accent" />
                </div>
                <div className="text-2xl font-bold text-legal-accent">400%</div>
                <div className="text-sm text-legal-light">Lead Quality Score</div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-legal-accent" />
                </div>
                <div className="text-2xl font-bold text-legal-accent">24/7</div>
                <div className="text-sm text-legal-light">Lead Capture</div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-8 h-8 text-legal-accent" />
                </div>
                <div className="text-2xl font-bold text-legal-accent">85%</div>
                <div className="text-sm text-legal-light">Conversion Rate</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1932&auto=format&fit=crop" 
                alt="Lead generation for law firms"
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

export default LeadGenHero;
