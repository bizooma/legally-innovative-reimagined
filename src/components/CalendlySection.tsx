import { useEffect } from "react";

declare global {
  interface Window {
    Calendly: any;
  }
}

const CalendlySection = () => {
  useEffect(() => {
    if (!window.Calendly) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-foreground mb-4">
          Schedule Your <span className="text-primary">Free Consultation</span>
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-8">
          Ready to transform your law firm with technology? Book a free consultation to discuss your needs.
        </p>
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/joe-bizooma/30min"
          style={{ minWidth: '320px', height: '700px' }}
        />
      </div>
    </section>
  );
};

export default CalendlySection;
