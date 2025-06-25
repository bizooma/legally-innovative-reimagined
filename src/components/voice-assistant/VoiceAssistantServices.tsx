
import { Mic, MessageSquare, Search, Phone, BookOpen, Users } from "lucide-react";

const VoiceAssistantServices = () => {
  const services = [
    {
      icon: Mic,
      title: "Alexa Skills Development",
      description: "Custom Amazon Alexa skills that provide legal information, answer frequently asked questions, and guide potential clients through initial consultations."
    },
    {
      icon: MessageSquare,
      title: "Google Assistant Actions",
      description: "Interactive Google Assistant applications that help users understand legal processes, find relevant information, and connect with your firm."
    },
    {
      icon: Search,
      title: "Voice SEO Optimization",
      description: "Optimize your voice applications for voice search queries, ensuring your firm is found when people ask legal questions through smart speakers."
    },
    {
      icon: Phone,
      title: "Lead Capture Integration",
      description: "Voice-activated lead capture systems that collect contact information and schedule consultations through natural conversation."
    },
    {
      icon: BookOpen,
      title: "Legal Information Library",
      description: "Comprehensive voice-accessible legal resource libraries that provide instant answers to common legal questions in your practice areas."
    },
    {
      icon: Users,
      title: "Client Onboarding Assistance",
      description: "Voice-guided client onboarding processes that help new clients understand your services and prepare for their first consultation."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Voice Assistant Marketing Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Leverage the power of voice technology to reach clients through Amazon Alexa, 
            Google Assistant, and other voice platforms with custom applications designed for law firms.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="bg-legal-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-legal-primary" />
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

export default VoiceAssistantServices;
