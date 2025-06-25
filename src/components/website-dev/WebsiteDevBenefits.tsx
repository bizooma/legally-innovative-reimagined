
import { TrendingUp, Clock, DollarSign, Users, Shield, Search } from "lucide-react";

const WebsiteDevBenefits = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Increase Leads",
      stat: "150%",
      description: "Average increase in qualified leads from website traffic"
    },
    {
      icon: Clock,
      title: "Faster Load Times",
      stat: "< 3s",
      description: "Optimized for speed with loading times under 3 seconds"
    },
    {
      icon: Users,
      title: "Better User Experience",
      stat: "4.9/5",
      description: "Average user satisfaction rating for our websites"
    },
    {
      icon: Search,
      title: "SEO Performance",
      stat: "+200%",
      description: "Improvement in search engine visibility"
    },
    {
      icon: Shield,
      title: "Security Score",
      stat: "A+",
      description: "Top-tier security ratings and compliance standards"
    },
    {
      icon: DollarSign,
      title: "ROI Improvement",
      stat: "300%",
      description: "Average return on investment within first year"
    }
  ];

  return (
    <section className="py-20 bg-legal-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Measurable Results for Your Practice
          </h2>
          <p className="text-lg text-legal-light max-w-3xl mx-auto">
            Our websites don't just look good—they deliver real business results 
            that help your law firm grow and succeed online.
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

export default WebsiteDevBenefits;
