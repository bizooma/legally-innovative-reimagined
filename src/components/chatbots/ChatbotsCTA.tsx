
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ChatbotsCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-legal-secondary to-legal-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Build Your Custom Chatbot?
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto text-white/80">
          Tell us about your business and we'll recommend the right chatbot
          strategy — no cookie-cutter solutions, no wasted budget.
        </p>
        <Button
          size="lg"
          className="bg-legal-accent hover:bg-legal-accent/90 text-legal-dark font-semibold text-lg px-8"
          onClick={() => {
            window.location.href = "/#contact";
          }}
        >
          Book a Consultation
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </section>
  );
};

export default ChatbotsCTA;
