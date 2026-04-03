
import { Button } from "@/components/ui/button";
import { Bot, Sparkles, MessageSquareText } from "lucide-react";

const ChatbotsHero = () => {
  const scrollToContact = () => {
    const el = document.getElementById("chatbot-types");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-[80vh] flex items-center pt-20 section-padding bg-gradient-to-br from-legal-primary via-legal-secondary to-legal-primary text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-legal-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-sm font-medium">
              <Sparkles className="w-4 h-4 text-legal-accent" />
              Strategy-First Chatbot Development
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Custom AI Chatbots Built for <span className="text-legal-accent">Your Business</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/80 max-w-xl">
              Every organization has different goals, workflows, and customer journeys.
              We don't install generic bots — we design conversational experiences that
              integrate with your operations and drive measurable results.
            </p>
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-legal-accent hover:bg-legal-accent/90 text-legal-dark font-semibold text-lg px-8"
            >
              Explore Chatbot Types
            </Button>
          </div>

          <div className="hidden lg:flex justify-center">
            <div className="relative">
              {/* Floating chat cards */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 animate-float">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-legal-primary/10 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-legal-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-legal-dark text-sm">Support Bot</p>
                    <p className="text-xs text-gray-400">Online</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-100 rounded-xl rounded-tl-sm p-3">
                    <p className="text-sm text-gray-700">How can I help you today?</p>
                  </div>
                  <div className="bg-legal-primary text-white rounded-xl rounded-tr-sm p-3 ml-6">
                    <p className="text-sm">I need to schedule a consultation</p>
                  </div>
                  <div className="bg-gray-100 rounded-xl rounded-tl-sm p-3">
                    <p className="text-sm text-gray-700">I'd be happy to help! Let me pull up available times...</p>
                  </div>
                </div>
              </div>

              {/* Small floating badge */}
              <div className="absolute -top-4 -right-4 bg-legal-accent text-legal-dark rounded-xl shadow-lg p-3 animate-float" style={{ animationDelay: "1s" }}>
                <MessageSquareText className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatbotsHero;
