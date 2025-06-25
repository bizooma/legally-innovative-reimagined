
import { TrendingUp, DollarSign, Clock, Users, Target, Zap } from "lucide-react";

const LeadGenBenefits = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Higher Quality Leads",
      stat: "300%",
      description: "Increase in qualified leads compared to traditional marketing methods"
    },
    {
      icon: DollarSign,
      title: "Improved ROI",
      stat: "450%",
      description: "Return on investment from automated lead generation systems"
    },
    {
      icon: Clock,
      title: "24/7 Lead Capture",
      stat: "Round-the-Clock",
      description: "Never miss a potential client with always-on lead capture systems"
    },
    {
      icon: Users,
      title: "Faster Response Time",
      stat: "5 Minutes",
      description: "Average response time to new leads with automated systems"
    },
    {
      icon: Target,
      title: "Better Conversion Rate",
      stat: "85%",
      description: "Lead to client conversion rate with proper nurturing sequences"
    },
    {
      icon: Zap,
      title: "Reduced Cost Per Lead",
      stat: "60%",
      description: "Reduction in cost per qualified lead through optimized systems"
    }
  ];

  return (
    <section className="py-20 bg-legal-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why Lead Generation Systems Work for Law Firms
          </h2>
          <p className="text-lg text-legal-light max-w-3xl mx-auto">
            Our proven lead generation strategies deliver measurable results that 
            transform how law firms attract and convert potential clients.
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

export default LeadGenBenefits;
