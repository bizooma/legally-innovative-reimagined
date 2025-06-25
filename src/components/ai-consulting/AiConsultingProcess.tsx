
import { Search, FileText, Cog, Rocket, Users, BarChart } from "lucide-react";

const AiConsultingProcess = () => {
  const steps = [
    {
      icon: Search,
      title: "Assessment & Discovery",
      description: "We analyze your current processes and identify AI opportunities specific to your practice areas."
    },
    {
      icon: FileText,
      title: "Strategy Development",
      description: "Create a comprehensive AI roadmap with prioritized initiatives and clear ROI projections."
    },
    {
      icon: Cog,
      title: "Solution Design",
      description: "Design custom AI solutions that integrate seamlessly with your existing systems and workflows."
    },
    {
      icon: Rocket,
      title: "Implementation",
      description: "Deploy AI solutions with minimal disruption to your daily operations and client service."
    },
    {
      icon: Users,
      title: "Training & Support",
      description: "Comprehensive training for your team and ongoing support to ensure successful adoption."
    },
    {
      icon: BarChart,
      title: "Optimization",
      description: "Continuous monitoring and optimization to maximize the value of your AI investments."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Our Proven AI Implementation Process
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A systematic approach to AI transformation that minimizes risk and maximizes results 
            for your law firm.
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

export default AiConsultingProcess;
