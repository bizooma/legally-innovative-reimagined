
import { Building, Users, TrendingUp } from "lucide-react";

const AiConsultingCaseStudies = () => {
  const caseStudies = [
    {
      icon: Building,
      title: "Mid-Size Corporate Law Firm",
      challenge: "Document review taking 40+ hours per case",
      solution: "AI-powered document analysis and contract review system",
      results: [
        "75% reduction in document review time",
        "$300K annual cost savings",
        "99.8% accuracy in contract analysis"
      ]
    },
    {
      icon: Users,
      title: "Personal Injury Practice",
      challenge: "Client inquiries overwhelming staff capacity",
      solution: "24/7 AI chatbot for initial client screening and appointment scheduling",
      results: [
        "60% reduction in phone calls",
        "85% faster client response time",
        "40% increase in qualified leads"
      ]
    },
    {
      icon: TrendingUp,
      title: "Real Estate Law Firm",
      challenge: "Manual time tracking causing billing inaccuracies",
      solution: "AI-powered time tracking and automated billing system",
      results: [
        "95% improvement in billing accuracy",
        "30% increase in billable hour capture",
        "$150K additional annual revenue"
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Real Results from Real Law Firms
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how our AI consulting services have transformed law firms across different practice areas.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-8">
              <div className="bg-legal-accent/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <study.icon className="w-8 h-8 text-legal-accent" />
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-legal-dark">{study.title}</h3>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Challenge:</h4>
                <p className="text-gray-600 text-sm">{study.challenge}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Solution:</h4>
                <p className="text-gray-600 text-sm">{study.solution}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Results:</h4>
                <ul className="space-y-2">
                  {study.results.map((result, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-legal-accent rounded-full mr-3"></div>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiConsultingCaseStudies;
