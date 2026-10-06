
import { Button } from "@/components/ui/button";
import { Mic, MessageSquare, Volume2 } from "lucide-react";

const VoiceAssistantHero = () => {
  return (
    <section className="bg-gradient-to-br from-legal-primary via-legal-primary to-legal-dark text-white py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Voice Assistant Marketing for <span className="text-white">Law Firms</span>
            </h1>
            <p className="text-xl mb-8 text-legal-light leading-relaxed">
              Reach clients where they are with custom voice applications for Amazon Alexa and Google Assistant. 
              Provide legal guidance, answer common questions, and capture leads through voice technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white hover:bg-gray-100 text-legal-primary px-8 py-4 text-lg"
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

          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="/lovable-uploads/414ce62c-05f7-4a1a-a76e-328c8a4fb9fb.png" 
                alt="Voice assistant marketing for law firms"
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

export default VoiceAssistantHero;
