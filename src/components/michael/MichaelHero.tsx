
import { Button } from "@/components/ui/button";

const MichaelHero = () => {
  const scrollToCalendly = () => {
    const calendlySection = document.querySelector('.calendly-inline-widget');
    if (calendlySection) {
      calendlySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-br from-legal-dark via-legal-primary to-legal-accent text-white section-padding pt-20 md:pt-24">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6">
          Transform Your Law Firm with AI Technology
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Partner with us to leverage cutting-edge digital solutions that drive growth, 
          streamline operations, and enhance client experiences.
        </p>
        <Button 
          size="lg" 
          className="bg-white text-legal-dark hover:bg-gray-100 text-lg px-8 py-4"
          onClick={scrollToCalendly}
        >
          Schedule a Meeting
        </Button>
      </div>
    </section>
  );
};

export default MichaelHero;
