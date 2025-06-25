
import { Lightbulb, Code, TestTube, Rocket, BarChart, RefreshCw } from "lucide-react";

const VoiceAssistantProcess = () => {
  const steps = [
    {
      icon: Lightbulb,
      title: "Strategy & Planning",
      description: "Define voice application objectives, target audience, and key use cases for your legal practice areas."
    },
    {
      icon: Code,
      title: "Voice App Development",
      description: "Build custom Alexa Skills and Google Actions with natural language processing and legal content integration."
    },
    {
      icon: TestTube,
      title: "Testing & Refinement",
      description: "Comprehensive testing across devices and scenarios to ensure optimal user experience and accurate responses."
    },
    {
      icon: Rocket,
      title: "Platform Deployment",
      description: "Deploy and publish voice applications to Amazon Alexa and Google Assistant app stores with proper certification."
    },
    {
      icon: BarChart,
      title: "Performance Analytics",
      description: "Monitor usage metrics, user engagement, and conversion rates to measure voice marketing effectiveness."
    },
    {
      icon: RefreshCw,
      title: "Optimization & Updates",
      description: "Continuous improvement based on user feedback, analytics insights, and evolving voice technology capabilities."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Voice Assistant Development Process
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our systematic approach ensures your voice applications deliver exceptional user experiences 
            while effectively marketing your legal services.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="absolute -top-4 left-6">
                  <div className="bg-legal-accent text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <div className="pt-4">
                  <div className="bg-legal-accent/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <step.icon className="w-8 h-8 text-legal-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-legal-dark">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VoiceAssistantProcess;
