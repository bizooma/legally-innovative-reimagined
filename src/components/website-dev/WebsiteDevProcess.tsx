
import { CheckCircle } from "lucide-react";

const WebsiteDevProcess = () => {
  const steps = [
    {
      number: "01",
      title: "Discovery & Planning",
      description: "We analyze your firm's needs, target audience, and competition to create a strategic plan."
    },
    {
      number: "02",
      title: "Design & Wireframing",
      description: "Custom designs that reflect your brand and optimize user experience for legal clients."
    },
    {
      number: "03",
      title: "Development & Testing",
      description: "Clean code development with thorough testing across all devices and browsers."
    },
    {
      number: "04",
      title: "Content Integration",
      description: "Strategic content placement, SEO optimization, and legal compliance review."
    },
    {
      number: "05",
      title: "Launch & Optimization",
      description: "Smooth launch with ongoing monitoring and performance optimization."
    },
    {
      number: "06",
      title: "Maintenance & Support",
      description: "Continuous updates, security monitoring, and technical support."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Our Proven Development Process
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A systematic approach to creating websites that not only look great 
            but also drive results for your law firm.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex items-start space-x-4">
                <div className="bg-legal-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-legal-dark">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-full w-8 h-0.5 bg-legal-primary/30 transform -translate-y-1/2 translate-x-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebsiteDevProcess;
