
import { Search, FileText, Code, TrendingUp, BarChart, RefreshCw } from "lucide-react";

const SeoAeoProcess = () => {
  const steps = [
    {
      icon: Search,
      title: "SEO Audit & Research",
      description: "Comprehensive analysis of your current SEO performance, competitor research, and keyword opportunity identification."
    },
    {
      icon: FileText,
      title: "Strategy Development",
      description: "Create a customized SEO/AEO/Voice SEO strategy based on your practice areas, target market, and competitive landscape."
    },
    {
      icon: Code,
      title: "Technical Implementation",
      description: "Optimize website structure, page speed, mobile responsiveness, and technical SEO elements for better search performance."
    },
    {
      icon: TrendingUp,
      title: "Content Optimization",
      description: "Create and optimize content for traditional search, answer engines, and voice search queries with legal expertise."
    },
    {
      icon: BarChart,
      title: "Performance Monitoring",
      description: "Track rankings, traffic, conversions, and voice search visibility with detailed reporting and insights."
    },
    {
      icon: RefreshCw,
      title: "Continuous Optimization",
      description: "Regular updates and improvements based on algorithm changes, performance data, and emerging search trends."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Our Proven SEO Process
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A systematic approach to search engine optimization that delivers consistent 
            results across traditional search, answer engines, and voice platforms.
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

export default SeoAeoProcess;
