
import { Brain, FileText, Users, Search, Clock, Shield } from "lucide-react";

const AiConsultingServices = () => {
  const services = [
    {
      icon: Brain,
      title: "AI Strategy Development",
      description: "Custom AI roadmaps tailored to your law firm's specific needs, goals, and budget constraints."
    },
    {
      icon: FileText,
      title: "Document Automation",
      description: "Implement AI-powered document generation, review, and management systems to reduce manual work."
    },
    {
      icon: Users,
      title: "Client Experience Enhancement",
      description: "Deploy AI chatbots and automated client communication systems for 24/7 support."
    },
    {
      icon: Search,
      title: "Legal Research Optimization",
      description: "AI-powered research tools that find relevant cases and precedents faster than traditional methods."
    },
    {
      icon: Clock,
      title: "Time & Billing Automation",
      description: "Automated time tracking and billing systems that capture every billable minute accurately."
    },
    {
      icon: Shield,
      title: "Compliance & Risk Management",
      description: "AI systems to monitor compliance requirements and identify potential risks before they become issues."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Comprehensive AI Solutions for Law Firms
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From strategy development to implementation, we provide end-to-end AI consulting 
            services designed specifically for the legal industry.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="bg-legal-accent/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-legal-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-legal-dark">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiConsultingServices;
