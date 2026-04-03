
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const ChatbotsHero = () => {
  const agentContainerRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    const el = document.getElementById("chatbot-types");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!agentContainerRef.current) return;

    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://agent.d-id.com/v2/index.js";
    script.setAttribute("data-mode", "fabio");
    script.setAttribute("data-client-key", "Z29vZ2xlLW9hdXRoMnwxMDc0NjQ2Njc4OTg3MTA5ODM4ODA6b0ZNWUp4Xy1oV01PYzJtVFFQYkhP");
    script.setAttribute("data-agent-id", "v2_agt_aHkCdBDR");
    script.setAttribute("data-name", "did-agent");
    script.setAttribute("data-monitor", "true");
    script.setAttribute("data-orientation", "horizontal");
    script.setAttribute("data-position", "right");
    script.setAttribute("data-open-mode", "expanded");

    agentContainerRef.current.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

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

          <div className="hidden lg:flex justify-center" ref={agentContainerRef}>
            <div className="w-full min-h-[400px] rounded-2xl overflow-hidden" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatbotsHero;
