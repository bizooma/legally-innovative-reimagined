
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Calendar } from "lucide-react";

const LeadGenCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-legal-secondary to-legal-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Generate More Qualified Leads?
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto text-legal-light">
          Stop waiting for clients to find you. Our proven lead generation systems 
          will help you attract, nurture, and convert high-quality prospects into loyal clients.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg" 
            className="bg-white hover:bg-gray-100 text-legal-primary font-semibold"
          >
            Get Lead Generation Audit
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-legal-primary"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Schedule Strategy Call
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
            <div className="text-2xl font-bold mb-2">Free</div>
            <div className="text-legal-light">Lead Generation Audit</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-2">30-Day</div>
            <div className="text-legal-light">Results Guarantee</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-2">24/7</div>
            <div className="text-legal-light">Lead Capture System</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadGenCTA;
