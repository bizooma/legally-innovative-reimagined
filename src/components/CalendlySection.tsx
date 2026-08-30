import CalendlyEmbed from "@/components/integrations/CalendlyEmbed";

const CalendlySection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-foreground mb-4">
          Schedule Your <span className="text-primary">Free Consultation</span>
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-8">
          Ready to transform your law firm with technology? Book a free consultation to discuss your needs.
        </p>
        <CalendlyEmbed
          url="https://calendly.com/joe-bizooma/30min"
          label="Book your free consultation"
        />
      </div>
    </section>
  );
};

export default CalendlySection;

