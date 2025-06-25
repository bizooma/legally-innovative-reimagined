
import { TrendingUp, Clock, DollarSign, Heart } from "lucide-react";

const AiChatbotsBenefits = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Increase Lead Conversion",
      stat: "35%",
      description: "Higher conversion rates from website visitors to qualified leads"
    },
    {
      icon: Clock,
      title: "Save Time",
      stat: "15 hrs",
      description: "Average hours saved per week on initial client inquiries"
    },
    {
      icon: DollarSign,
      title: "Reduce Costs",
      stat: "60%",
      description: "Lower customer service costs compared to human-only support"
    },
    {
      icon: Heart,
      title: "Improve Satisfaction",
      stat: "4.8/5",
      description: "Average client satisfaction rating with AI-assisted support"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Measurable Results for Your Practice
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Law firms using our AI chatbots see significant improvements in 
            client acquisition, efficiency, and satisfaction.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <benefit.icon className="w-10 h-10 text-legal-primary" />
              </div>
              <div className="text-4xl font-bold text-legal-primary mb-2">{benefit.stat}</div>
              <h3 className="text-xl font-semibold mb-3 text-legal-dark">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiChatbotsBenefits;
