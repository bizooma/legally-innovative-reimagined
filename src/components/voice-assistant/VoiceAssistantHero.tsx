
import { Button } from "@/components/ui/button";
import { Mic, MessageSquare, Volume2 } from "lucide-react";

const VoiceAssistantHero = () => {
  return (
    <section className="bg-gradient-to-br from-legal-primary via-legal-primary to-legal-dark text-white py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Voice Assistant Marketing for <span className="text-legal-accent">Law Firms</span>
            </h1>
            <p className="text-xl mb-8 text-legal-light leading-relaxed">
              Reach clients where they are with custom voice applications for Amazon Alexa and Google Assistant. 
              Provide legal guidance, answer common questions, and capture leads through voice technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-legal-accent hover:bg-legal-accent/90 text-white px-8 py-4 text-lg"
              >
                Start Voice Assistant Project
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-legal-primary px-8 py-4 text-lg"
              >
                Hear Demo Skills
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Mic className="w-8 h-8 text-legal-accent" />
                </div>
                <div className="text-2xl font-bold text-legal-accent">24/7</div>
                <div className="text-sm text-legal-light">Voice Availability</div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="w-8 h-8 text-legal-accent" />
                </div>
                <div className="text-2xl font-bold text-legal-accent">90%</div>
                <div className="text-sm text-legal-light">Query Success Rate</div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Volume2 className="w-8 h-8 text-legal-accent" />
                </div>
                <div className="text-2xl font-bold text-legal-accent">50M+</div>
                <div className="text-sm text-legal-light">Voice Device Users</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="/lovable-uploads/414ce62c-05f7-4a1a-a76e-328c8a4fb9fb.png" 
                alt="Voice assistant marketing for law firms"
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

export default VoiceAssistantHero;
