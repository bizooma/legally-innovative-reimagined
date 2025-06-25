
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Calendar, CheckCircle } from "lucide-react";

const AiConsultingCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-legal-secondary to-legal-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Your Law Firm with AI?
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto text-legal-light">
          Join forward-thinking law firms that are already leveraging AI to improve efficiency, 
          reduce costs, and deliver better client experiences.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg" 
            className="bg-legal-accent hover:bg-legal-accent/90 text-legal-dark font-semibold"
          >
            Start Your AI Journey
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-legal-primary"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Free Consultation
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-legal-primary"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call Expert
          </Button>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
          <div>
            <div className="text-2xl font-bold mb-2">Free</div>
            <div className="text-legal-light">Initial Consultation</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-2">30-Day</div>
            <div className="text-legal-light">Implementation Timeline</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-2">24/7</div>
            <div className="text-legal-light">Ongoing Support</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-2">ROI</div>
            <div className="text-legal-light">Guarantee</div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">What's Included in Your Free Consultation:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-legal-accent mr-3" />
              <span className="text-legal-light">Current Process Assessment</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-legal-accent mr-3" />
              <span className="text-legal-light">AI Opportunity Identification</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-legal-accent mr-3" />
              <span className="text-legal-light">Custom ROI Projections</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-legal-accent mr-3" />
              <span className="text-legal-light">Implementation Roadmap</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiConsultingCTA;
