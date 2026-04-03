
import { Search, PenTool, Code, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discovery",
    description:
      "We learn your workflows, customer pain points, and goals to define exactly what your chatbot needs to do.",
  },
  {
    icon: PenTool,
    title: "Design",
    description:
      "We map out conversation flows, personality, escalation paths, and integration points before writing a single line of code.",
  },
  {
    icon: Code,
    title: "Build & Train",
    description:
      "We develop your bot with custom training data, connect it to your systems, and rigorously test every scenario.",
  },
  {
    icon: Rocket,
    title: "Launch & Optimize",
    description:
      "We deploy, monitor conversations, and continuously refine responses to improve performance over time.",
  },
];

const ChatbotsProcess = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Our Process
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every chatbot we build follows a strategy-first approach — ensuring
            the final product actually moves the needle for your business.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px border-t-2 border-dashed border-legal-primary/20" />
              )}
              <div className="w-20 h-20 rounded-full bg-legal-primary/10 flex items-center justify-center mx-auto mb-4 relative">
                <step.icon className="w-9 h-9 text-legal-primary" />
                <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-legal-primary text-white text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChatbotsProcess;
