
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const AiChatbotsPricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$299",
      period: "/month",
      description: "Perfect for solo practitioners and small firms",
      features: [
        "1 AI chatbot",
        "Up to 1,000 conversations/month",
        "Basic customization",
        "Email support",
        "Lead capture forms",
        "Basic analytics"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$599",
      period: "/month",
      description: "Ideal for growing law firms",
      features: [
        "3 AI chatbots",
        "Up to 5,000 conversations/month",
        "Advanced customization",
        "Priority support",
        "Lead qualification",
        "Calendar integration",
        "Advanced analytics",
        "Multi-language support"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large firms with complex needs",
      features: [
        "Unlimited chatbots",
        "Unlimited conversations",
        "Full customization",
        "Dedicated support",
        "Advanced integrations",
        "Custom training",
        "White-label options",
        "API access"
      ],
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Choose Your Plan
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Flexible pricing options to fit law firms of all sizes. 
            All plans include setup, training, and ongoing support.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`rounded-lg p-8 ${
              plan.popular 
                ? 'bg-legal-primary text-white shadow-2xl scale-105' 
                : 'bg-gray-50 text-legal-dark'
            }`}>
              {plan.popular && (
                <div className="bg-legal-accent text-legal-dark text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className={`text-lg ${plan.popular ? 'text-legal-light' : 'text-gray-600'}`}>
                  {plan.period}
                </span>
              </div>
              <p className={`mb-6 ${plan.popular ? 'text-legal-light' : 'text-gray-600'}`}>
                {plan.description}
              </p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className={`w-5 h-5 mr-3 ${
                      plan.popular ? 'text-legal-accent' : 'text-legal-primary'
                    }`} />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-legal-accent hover:bg-legal-accent/90 text-legal-dark' 
                    : 'bg-legal-primary hover:bg-legal-secondary text-white'
                }`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiChatbotsPricing;
