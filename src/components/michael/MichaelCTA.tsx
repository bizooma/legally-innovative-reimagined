
import { Button } from "@/components/ui/button";

const MichaelCTA = () => {
  return (
    <section className="bg-legal-dark text-white section-padding">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Grow Your Law Firm?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Don't let your competitors get ahead. Start your digital transformation today 
          and see the difference technology can make for your practice.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-legal-primary hover:bg-legal-primary/90 text-white"
          >
            Get Started Today
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-legal-dark"
          >
            View Our Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MichaelCTA;
