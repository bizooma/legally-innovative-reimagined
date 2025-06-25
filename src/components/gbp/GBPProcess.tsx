
import { Search, Settings, Camera, MessageSquare, BarChart, RefreshCw } from "lucide-react";

const GBPProcess = () => {
  const steps = [
    {
      icon: Search,
      title: "Profile Audit & Analysis",
      description: "Comprehensive analysis of your current Google Business Profile and local search presence to identify optimization opportunities."
    },
    {
      icon: Settings,
      title: "Complete Profile Setup",
      description: "Optimize all profile elements including business information, categories, attributes, and local SEO factors."
    },
    {
      icon: Camera,
      title: "Visual Content Creation",
      description: "Professional photography and visual content that showcases your law firm and builds trust with potential clients."
    },
    {
      icon: MessageSquare,
      title: "Content & Posting Strategy",
      description: "Regular posts, updates, and Q&A management to keep your profile active and engaging."
    },
    {
      icon: BarChart,
      title: "Performance Monitoring",
      description: "Track key metrics including views, clicks, calls, and direction requests to measure success."
    },
    {
      icon: RefreshCw,
      title: "Ongoing Optimization",
      description: "Continuous improvements based on performance data and algorithm updates to maintain top rankings."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Our GBP Optimization Process
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A systematic approach to Google Business Profile optimization that delivers 
            consistent results and sustainable local search visibility.
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

export default GBPProcess;
