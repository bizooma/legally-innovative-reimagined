
import { TrendingUp, DollarSign, Clock, Users, Award, Zap } from "lucide-react";

const AiConsultingBenefits = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Increased Productivity",
      stat: "85%",
      description: "Average increase in lawyer productivity with AI implementation"
    },
    {
      icon: DollarSign,
      title: "Cost Savings",
      stat: "$250K",
      description: "Average annual savings for mid-size law firms"
    },
    {
      icon: Clock,
      title: "Time Reduction",
      stat: "70%",
      description: "Less time spent on routine administrative tasks"
    },
    {
      icon: Users,
      title: "Client Satisfaction",
      stat: "95%",
      description: "Client satisfaction rate with AI-enhanced services"
    },
    {
      icon: Award,
      title: "Accuracy Improvement",
      stat: "99.5%",
      description: "Document accuracy with AI-powered review systems"
    },
    {
      icon: Zap,
      title: "Response Time",
      stat: "24/7",
      description: "Automated client support availability"
    }
  ];

  return (
    <section className="py-20 bg-legal-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Proven Results from AI Implementation
          </h2>
          <p className="text-lg text-legal-light max-w-3xl mx-auto">
            Our AI consulting services deliver measurable improvements across all aspects 
            of your law firm's operations.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-10 h-10 text-legal-accent" />
              </div>
              <div className="text-4xl font-bold text-legal-accent mb-2">{benefit.stat}</div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-legal-light">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiConsultingBenefits;
