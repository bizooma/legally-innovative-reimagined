
import { TrendingUp, Users, Clock, Award, Target, Zap } from "lucide-react";

const SeoAeoBenefits = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Organic Traffic Growth",
      stat: "400%",
      description: "Average increase in organic search traffic within 12 months"
    },
    {
      icon: Users,
      title: "More Qualified Leads",
      stat: "250%",
      description: "Increase in high-intent leads from search engines"
    },
    {
      icon: Clock,
      title: "Faster Results",
      stat: "90 days",
      description: "See initial ranking improvements and traffic growth"
    },
    {
      icon: Award,
      title: "Authority Building",
      stat: "Top 3",
      description: "Average ranking position for targeted legal keywords"
    },
    {
      icon: Target,
      title: "Voice Search Ready",
      stat: "85%",
      description: "Of our clients' content optimized for voice queries"
    },
    {
      icon: Zap,
      title: "Answer Engine Visibility",
      stat: "300%",
      description: "Increase in visibility on AI-powered search platforms"
    }
  ];

  return (
    <section className="py-20 bg-legal-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why SEO/AEO/Voice SEO Works for Law Firms
          </h2>
          <p className="text-lg text-legal-light max-w-3xl mx-auto">
            Our comprehensive search optimization approach ensures your law firm captures 
            clients across all search platforms and voice assistants.
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

export default SeoAeoBenefits;
