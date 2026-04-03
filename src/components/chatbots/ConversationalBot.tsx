
import { useEffect, useRef } from "react";
import { Mic, MessageSquare } from "lucide-react";

const features = [
  "Natural, human-like voice conversations powered by AI",
  "Understands context and responds intelligently to complex questions",
  "Available 24/7 to engage visitors and answer inquiries",
  "Seamlessly integrates with your website and brand voice",
  "Learns from your business data to provide accurate responses",
];

const ConversationalBot = () => {
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the ElevenLabs widget script
    const script = document.createElement("script");
    script.src = "https://elevenlabs.io/convai-widget/index.js";
    script.async = true;
    document.body.appendChild(script);

    // Create the widget element
    script.onload = () => {
      if (widgetContainerRef.current && !widgetContainerRef.current.querySelector("elevenlabs-convai")) {
        const widget = document.createElement("elevenlabs-convai");
        widget.setAttribute("agent-id", "cylHD3Ay9g1H7eGVdSdj");
        widgetContainerRef.current.appendChild(widget);
      }
    };

    return () => {
      script.remove();
    };
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Mic className="w-4 h-4" />
            AI Voice Agent
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Conversational AI: Voice-Powered Chatbots
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Go beyond text. Our conversational AI agents use natural language processing
            and voice synthesis to hold real-time spoken conversations with your visitors —
            creating an experience that feels like talking to a real person.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              The Next Level of Customer Interaction
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              While text chatbots handle written queries, voice-powered AI agents
              take engagement to a new level. Visitors can simply speak their
              questions and receive spoken answers in real time. This is ideal for
              accessibility, hands-free use cases, and creating a premium,
              high-touch experience on your website.
            </p>

            <h3 className="text-xl font-bold text-foreground mb-4">
              Why Voice AI Stands Out
            </h3>
            <ul className="space-y-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <MessageSquare className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-lg border border-border bg-muted/30 flex items-center justify-center min-h-[400px] relative">
            <div className="text-center p-8">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Mic className="w-10 h-10 text-primary animate-pulse" />
              </div>
              <p className="text-foreground font-semibold text-lg mb-2">
                Try It Live — Meet Joe
              </p>
              <p className="text-muted-foreground text-sm mb-4 max-w-xs mx-auto">
                See the widget in the bottom-right corner of this page? That's Joe — our AI voice agent. Click it to start a real-time voice conversation.
              </p>
              <div className="inline-flex items-center gap-2 text-primary text-sm font-medium animate-bounce">
                <span>👉</span> Look for Joe in the bottom-right corner
              </div>
            </div>
            <div ref={widgetContainerRef} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConversationalBot;
