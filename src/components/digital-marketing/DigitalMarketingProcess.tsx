
import { Search, FileText, Target, Rocket, BarChart, Users } from "lucide-react";

const DigitalMarketingProcess = () => {
  const steps = [
    {
      icon: Search,
      title: "Market Research & Analysis",
      description: "We analyze your competition, target audience, and market opportunities to create a winning strategy."
    },
    {
      icon: FileText,
      title: "Strategy Development",
      description: "Create a comprehensive digital marketing plan tailored to your practice areas and business goals."
    },
    {
      icon: Target,
      title: "Campaign Setup",
      description: "Launch targeted campaigns across multiple digital channels with optimized messaging and targeting."
    },
    {
      icon: Rocket,
      title: "Implementation & Launch",
      description: "Execute your marketing campaigns with careful monitoring and real-time optimization."
    },
    {
      icon: BarChart,
      title: "Performance Tracking",
      description: "Monitor key metrics and performance indicators to ensure maximum ROI from your marketing investment."
    },
    {
      icon: Users,
      title: "Optimization & Growth",
      description: "Continuously refine and improve campaigns based on data insights and changing market conditions."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Our Proven Digital Marketing Process
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A systematic approach to digital marketing that delivers consistent results 
            and sustainable growth for your law firm.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="absolute -top-4 left-6">
                  <div className="bg-legal-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <div className="pt-4">
                  <div className="bg-legal-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <step.icon className="w-8 h-8 text-legal-primary" />
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

export default DigitalMarketingProcess;
