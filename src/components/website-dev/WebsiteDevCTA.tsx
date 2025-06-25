
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Calendar } from "lucide-react";

const WebsiteDevCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-legal-secondary to-legal-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Your Online Presence?
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto text-legal-light">
          Join hundreds of law firms who have increased their client acquisition 
          with our professional website development services.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg" 
            className="bg-legal-accent hover:bg-legal-accent/90 text-legal-dark font-semibold"
          >
            Get Free Quote
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-legal-primary"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Schedule Consultation
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-legal-primary"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call Now
          </Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-2xl font-bold mb-2">30-Day</div>
            <div className="text-legal-light">Launch Guarantee</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-2">24/7</div>
            <div className="text-legal-light">Support Available</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-2">100%</div>
            <div className="text-legal-light">Satisfaction Guaranteed</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebsiteDevCTA;
