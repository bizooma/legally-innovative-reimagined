
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
    // Load the ElevenLabs embeddable widget script
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    script.onload = () => {
      if (widgetContainerRef.current && !widgetContainerRef.current.querySelector("elevenlabs-convai")) {
        const widget = document.createElement("elevenlabs-convai");
        widget.setAttribute("agent-id", "cylHD3Ay9g1H7eGVdSdj");
        widgetContainerRef.current.appendChild(widget);
      }
    };

    return () => {
      script.remove();
      if (widgetContainerRef.current) {
        const widget = widgetContainerRef.current.querySelector("elevenlabs-convai");
        if (widget) widget.remove();
      }
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

          <div className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Mic className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              Try It Live — Talk to Joe
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Look for the voice agent widget in the <strong>lower-right corner</strong> of this page. Click it to start a real-time spoken conversation with our AI agent, Joe.
            </p>
            <p className="text-xs text-muted-foreground/70">
              Powered by ElevenLabs Conversational AI
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConversationalBot;
