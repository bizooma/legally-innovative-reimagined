import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone, Users, Zap } from "lucide-react";
import appDemo from "@/assets/app-demo.png";

const MobileAppHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-legal-primary via-legal-secondary to-legal-dark text-white py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=1932&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
              <Smartphone className="w-12 h-12 text-legal-accent" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Mobile App Development for
            <span className="text-legal-accent block mt-2">Law Firms</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-legal-light max-w-3xl mx-auto leading-relaxed">
            Custom iOS and Android applications that connect you with clients, 
            streamline your practice, and set you apart from the competition.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-legal-accent hover:bg-legal-accent/90 text-legal-dark font-semibold text-lg px-8 py-4"
            >
              Start Your App Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-legal-primary text-lg px-8 py-4"
            >
              View App Examples
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <Users className="w-8 h-8 text-legal-accent mx-auto mb-3" />
              <div className="text-lg font-semibold mb-2">Client Focused</div>
              <div className="text-legal-light">Built for legal client needs</div>
            </div>
            <div className="text-center">
              <Zap className="w-8 h-8 text-legal-accent mx-auto mb-3" />
              <div className="text-lg font-semibold mb-2">Fast & Secure</div>
              <div className="text-legal-light">Optimized performance & security</div>
            </div>
            <div className="text-center">
              <Smartphone className="w-8 h-8 text-legal-accent mx-auto mb-3" />
              <div className="text-lg font-semibold mb-2">Cross-Platform</div>
              <div className="text-legal-light">iOS and Android compatibility</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppHero;
