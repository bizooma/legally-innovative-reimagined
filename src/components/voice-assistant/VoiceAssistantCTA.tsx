
import { Button } from "@/components/ui/button";
import { ArrowRight, Mic, Calendar } from "lucide-react";

const VoiceAssistantCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-legal-secondary to-legal-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Pioneer Voice Marketing for Your Law Firm?
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto text-legal-light">
          Join the small group of forward-thinking law firms using voice technology to 
          reach clients in innovative ways and gain competitive advantage in your market.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg" 
            className="bg-legal-accent hover:bg-legal-accent/90 text-legal-dark font-semibold"
          >
            Start Voice Project
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-legal-primary"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Schedule Voice Demo
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-legal-primary"
          >
            <Mic className="w-5 h-5 mr-2" />
            Hear Sample Skills
          </Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-2xl font-bold mb-2">Free</div>
            <div className="text-legal-light">Voice Strategy Consultation</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-2">30-Day</div>
            <div className="text-legal-light">Development Timeline</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-2">Expert</div>
            <div className="text-legal-light">Voice Technology Team</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoiceAssistantCTA;
