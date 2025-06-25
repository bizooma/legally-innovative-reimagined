
import { TrendingUp, Users, Search, Mic } from "lucide-react";

const SeoAeoResults = () => {
  const caseStudies = [
    {
      icon: TrendingUp,
      firmType: "Personal Injury Law Firm",
      location: "Los Angeles, CA",
      result: "500% increase in organic traffic",
      description: "Achieved first page rankings for 45+ competitive personal injury keywords",
      metrics: ["#1 for 'personal injury lawyer LA'", "12,000+ monthly organic visitors", "300% more qualified leads"]
    },
    {
      icon: Users,
      firmType: "Family Law Practice",
      location: "Chicago, IL",
      result: "85% voice search optimization",
      description: "Optimized for voice queries and answer engines with structured content",
      metrics: ["Featured in 40+ AI responses", "60% increase in consultation calls", "Top 3 for voice searches"]
    },
    {
      icon: Search,
      firmType: "Corporate Law Firm",
      location: "New York, NY",
      result: "200% growth in organic leads",
      description: "Comprehensive SEO strategy targeting high-value business law keywords",
      metrics: ["#1 for 'corporate lawyer NYC'", "850% ROI on SEO investment", "50+ page-one rankings"]
    },
    {
      icon: Mic,
      firmType: "Criminal Defense Attorney",
      location: "Miami, FL",
      result: "90% answer engine visibility",
      description: "Optimized content appears in ChatGPT, Claude, and Google AI Overviews",
      metrics: ["Featured in 60+ AI responses", "400% increase in website traffic", "Top voice search results"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Real SEO Results for Law Firms
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how our comprehensive SEO, AEO, and Voice SEO strategies have transformed 
            law firms' online visibility and client acquisition.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="bg-legal-accent/10 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <study.icon className="w-6 h-6 text-legal-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-legal-dark">{study.firmType}</h3>
                    <span className="text-sm text-gray-500">{study.location}</span>
                  </div>
                  <div className="text-2xl font-bold text-legal-accent mb-2">{study.result}</div>
                  <p className="text-gray-600 mb-4">{study.description}</p>
                  <div className="space-y-1">
                    {study.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="text-sm text-legal-primary font-medium">
                        • {metric}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeoAeoResults;
