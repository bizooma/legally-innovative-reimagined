
import { Card } from "@/components/ui/card";
import { useEffect } from "react";

const MichaelCalendlySection = () => {
  useEffect(() => {
    // Check if Calendly script is already loaded
    if (!window.Calendly) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.head.appendChild(script);
      
      script.onload = () => {
        console.log('Calendly script loaded successfully');
      };
      
      script.onerror = () => {
        console.error('Failed to load Calendly script');
      };
    } else {
      console.log('Calendly already loaded');
    }
  }, []);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Schedule Your <span className="highlight-text">Free Consultation</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Ready to transform your law firm with technology? Book a free consultation 
            to discuss your needs and discover how we can help you grow.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 shadow-xl">
            {/* Calendly inline widget */}
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/joe-bizooma/30min" 
              style={{minWidth:'320px', height:'700px'}}
            ></div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MichaelCalendlySection;
