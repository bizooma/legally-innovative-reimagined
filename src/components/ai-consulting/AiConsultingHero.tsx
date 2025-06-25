
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Zap, TrendingUp } from "lucide-react";

const AiConsultingHero = () => {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-legal-primary via-legal-secondary to-legal-primary overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Transform Your Law Firm with 
              <span className="text-legal-accent block">AI Consulting</span>
            </h1>
            <p className="text-xl mb-8 text-legal-light leading-relaxed">
              Leverage artificial intelligence to streamline operations, enhance client experiences, 
              and drive innovation in your legal practice with our expert consulting services.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-legal-accent hover:bg-legal-accent/90 text-legal-dark font-semibold"
              >
                Start AI Transformation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-legal-primary"
              >
                Schedule Consultation
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-legal-accent mb-2">85%</div>
                <div className="text-sm text-legal-light">Efficiency Increase</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-legal-accent mb-2">60%</div>
                <div className="text-sm text-legal-light">Cost Reduction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-legal-accent mb-2">95%</div>
                <div className="text-sm text-legal-light">Client Satisfaction</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-legal-accent/20 rounded-lg p-4 flex items-center justify-center">
                  <Bot className="w-12 h-12 text-legal-accent" />
                </div>
                <div className="bg-legal-accent/20 rounded-lg p-4 flex items-center justify-center">
                  <Zap className="w-12 h-12 text-legal-accent" />
                </div>
                <div className="bg-legal-accent/20 rounded-lg p-4 flex items-center justify-center">
                  <TrendingUp className="w-12 h-12 text-legal-accent" />
                </div>
                <div className="bg-legal-accent/20 rounded-lg p-4 flex items-center justify-center">
                  <ArrowRight className="w-12 h-12 text-legal-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiConsultingHero;
