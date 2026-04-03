
import { GitBranch, CheckCircle } from "lucide-react";

const benefits = [
  "Every visitor follows a tailored path based on their answers",
  "No AI hallucinations — responses are exactly what you script",
  "Perfect for lead qualification, intake forms, and onboarding",
  "Can include video, audio, and rich media at each step",
  "Easy to update and adjust without technical knowledge",
];

const ConditionalChatbots = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <GitBranch className="w-4 h-4" />
            Decision-Tree Chatbots
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Conditional Chatbots: Pre-Determined Paths
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Not every chatbot needs AI. Conditional chatbots follow scripted decision trees
            where each response leads to a specific next step — giving you full control over
            the conversation flow and ensuring visitors always get the right answer.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              How It Works
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We map out every possible conversation path before the bot goes live.
              Based on what a visitor selects or types, the chatbot branches into
              the appropriate response — like a choose-your-own-adventure for your
              business. This is ideal when you need predictable, consistent
              interactions without the variability of AI-generated responses.
            </p>

            <h3 className="text-xl font-bold text-foreground mb-4">
              Why Businesses Choose Conditional Bots
            </h3>
            <ul className="space-y-3">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground mb-3">
              Live Example — Try It Yourself:
            </p>
            <div className="rounded-3xl overflow-hidden shadow-lg border border-border">
              <iframe
                src="https://www.videoask.com/fips5dogy"
                allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
                width="100%"
                height="600px"
                style={{ border: "none" }}
                title="Conditional chatbot example"
                loading="lazy"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              This interactive demo shows a conditional chatbot guiding visitors through a pre-determined path.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConditionalChatbots;
