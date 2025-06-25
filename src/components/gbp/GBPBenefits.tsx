
import { TrendingUp, Users, MapPin, Phone, Star, Target } from "lucide-react";

const GBPBenefits = () => {
  const benefits = [
    {
      icon: MapPin,
      title: "Local Search Dominance",
      stat: "3x",
      description: "Higher likelihood to appear in local search results and map pack"
    },
    {
      icon: Phone,
      title: "More Phone Calls",
      stat: "200%",
      description: "Increase in direct phone calls from potential clients"
    },
    {
      icon: Users,
      title: "Website Traffic",
      stat: "165%",
      description: "Boost in website visits from Google Business Profile"
    },
    {
      icon: Target,
      title: "Direction Requests",
      stat: "300%",
      description: "More people requesting directions to your law firm"
    },
    {
      icon: Star,
      title: "Trust & Credibility",
      stat: "85%",
      description: "Of clients trust businesses with complete profiles more"
    },
    {
      icon: TrendingUp,
      title: "Overall ROI",
      stat: "400%",
      description: "Return on investment from local SEO and GBP optimization"
    }
  ];

  return (
    <section className="py-20 bg-legal-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Proven Results for Law Firms
          </h2>
          <p className="text-lg text-legal-light max-w-3xl mx-auto">
            Our Google Business Profile optimization delivers measurable results that directly 
            impact your law firm's growth and client acquisition.
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

export default GBPBenefits;
