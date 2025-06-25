
import { Zap, Clock, Target, TrendingUp, Users, Shield } from "lucide-react";

const VoiceAssistantBenefits = () => {
  const benefits = [
    {
      icon: Zap,
      title: "First-Mover Advantage",
      stat: "95%",
      description: "Of law firms haven't adopted voice marketing, giving early adopters significant competitive advantage"
    },
    {
      icon: Clock,
      title: "24/7 Accessibility",
      stat: "Always On",
      description: "Voice assistants provide round-the-clock access to legal information and firm services"
    },
    {
      icon: Target,
      title: "Higher Engagement",
      stat: "3x",
      description: "More engaging than traditional digital marketing with natural conversation experiences"
    },
    {
      icon: TrendingUp,
      title: "Growing Market",
      stat: "200M+",
      description: "Voice-enabled devices in US homes, representing massive untapped marketing opportunity"
    },
    {
      icon: Users,
      title: "Better Accessibility",
      stat: "Universal",
      description: "Voice interfaces make legal services more accessible to elderly and disabled clients"
    },
    {
      icon: Shield,
      title: "Brand Authority",
      stat: "Expert",
      description: "Position your firm as innovative technology leaders in the legal industry"
    }
  ];

  return (
    <section className="py-20 bg-legal-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why Voice Assistant Marketing Works
          </h2>
          <p className="text-lg text-legal-light max-w-3xl mx-auto">
            Voice technology represents the next frontier in digital marketing, offering law firms 
            unique opportunities to connect with clients in completely new ways.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{benefit.stat}</div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-legal-light">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VoiceAssistantBenefits;
