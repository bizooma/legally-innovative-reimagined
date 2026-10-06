
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Users, TrendingUp } from "lucide-react";

const LeadGenHero = () => {
  return (
    <section className="bg-gradient-to-br from-legal-primary via-legal-primary to-legal-dark text-white py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Lead Generation Systems for <span className="text-white">Law Firms</span>
            </h1>
            <p className="text-xl mb-8 text-legal-light leading-relaxed">
              Transform your law practice with automated lead generation systems that capture, 
              nurture, and convert high-quality prospects into loyal clients. Stop chasing leads 
              and start attracting them.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white hover:bg-gray-100 text-legal-primary px-8 py-4 text-lg"
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

          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1932&auto=format&fit=crop" 
                alt="Lead generation for law firms"
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

export default LeadGenHero;
