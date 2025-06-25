
import { TrendingUp, DollarSign, Users, Clock, Award, Target } from "lucide-react";

const DigitalMarketingBenefits = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Increased Online Visibility",
      stat: "400%",
      description: "Average increase in organic search visibility within 6 months"
    },
    {
      icon: DollarSign,
      title: "Higher Quality Leads",
      stat: "75%",
      description: "More qualified leads compared to traditional marketing methods"
    },
    {
      icon: Users,
      title: "Client Acquisition Growth",
      stat: "150%",
      description: "Increase in new client acquisitions through digital channels"
    },
    {
      icon: Clock,
      title: "Faster Response Time",
      stat: "24/7",
      description: "Automated lead capture and response systems"
    },
    {
      icon: Award,
      title: "Brand Authority",
      stat: "90%",
      description: "Of clients research law firms online before making contact"
    },
    {
      icon: Target,
      title: "Precise Targeting",
      stat: "85%",
      description: "Reduction in wasted marketing spend through targeted campaigns"
    }
  ];

  return (
    <section className="py-20 bg-legal-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why Digital Marketing Works for Law Firms
          </h2>
          <p className="text-lg text-legal-light max-w-3xl mx-auto">
            Our proven digital marketing strategies deliver measurable results that 
            drive real business growth for law firms of all sizes.
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

export default DigitalMarketingBenefits;
