
import { Brain, Shield, Users, Zap, Calendar, FileText } from "lucide-react";

const AiChatbotsFeatures = () => {
  const features = [
    {
      icon: Brain,
      title: "Legal-Trained AI",
      description: "Our chatbots are specifically trained on legal terminology and common client inquiries to provide accurate, helpful responses."
    },
    {
      icon: Shield,
      title: "Compliant & Secure",
      description: "Built with legal compliance in mind, ensuring client confidentiality and adherence to professional standards."
    },
    {
      icon: Users,
      title: "Lead Qualification",
      description: "Automatically qualify leads by asking the right questions and routing potential clients to the appropriate attorney."
    },
    {
      icon: Zap,
      title: "Instant Responses",
      description: "Provide immediate answers to common questions, reducing response time from hours to seconds."
    },
    {
      icon: Calendar,
      title: "Appointment Scheduling",
      description: "Seamlessly integrate with your calendar to allow clients to book consultations directly through the chat."
    },
    {
      icon: FileText,
      title: "Case Information Collection",
      description: "Gather preliminary case information and client details before the initial consultation."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Powerful Features for Law Firms
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our AI chatbots are designed specifically for legal practices, 
            combining cutting-edge technology with industry expertise.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-legal-light/20 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <feature.icon className="w-12 h-12 text-legal-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-legal-dark">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiChatbotsFeatures;
