
import { TrendingUp, Users, Clock, DollarSign, Star, Smartphone } from "lucide-react";

const MobileAppBenefits = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Client Satisfaction",
      stat: "95%",
      description: "Increase in client satisfaction with mobile app access"
    },
    {
      icon: Users,
      title: "Client Retention",
      stat: "+40%",
      description: "Improvement in client retention rates"
    },
    {
      icon: Clock,
      title: "Response Time",
      stat: "75%",
      description: "Faster response time to client inquiries"
    },
    {
      icon: DollarSign,
      title: "Revenue Growth",
      stat: "+25%",
      description: "Average revenue increase from improved client experience"
    },
    {
      icon: Star,
      title: "App Store Rating",
      stat: "4.8/5",
      description: "Average rating for our law firm mobile apps"
    },
    {
      icon: Smartphone,
      title: "Daily Usage",
      stat: "3.2x",
      description: "Times more client engagement than traditional methods"
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
            Mobile apps deliver measurable improvements in client satisfaction, 
            engagement, and business growth for law firms.
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

export default MobileAppBenefits;
