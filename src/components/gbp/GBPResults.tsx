
import { Building, Users, Phone, Star } from "lucide-react";

const GBPResults = () => {
  const results = [
    {
      icon: Building,
      firmType: "Personal Injury Law Firm",
      location: "Miami, FL",
      result: "350% increase in local search visibility",
      description: "Achieved #1 ranking for 15+ local keywords within 3 months"
    },
    {
      icon: Users,
      firmType: "Family Law Practice",
      location: "Austin, TX", 
      result: "280% more profile views",
      description: "Increased monthly profile views from 1,200 to 4,560"
    },
    {
      icon: Phone,
      firmType: "Criminal Defense Firm",
      location: "Denver, CO",
      result: "200% increase in phone calls",
      description: "Direct calls from Google Business Profile doubled in 2 months"
    },
    {
      icon: Star,
      firmType: "Corporate Law Firm",
      location: "Seattle, WA",
      result: "4.9-star average rating",
      description: "Built strong reputation with 50+ positive reviews"
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
            See how our Google Business Profile optimization has helped law firms 
            across the country increase their local visibility and client acquisition.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {results.map((result, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="bg-legal-accent/10 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <result.icon className="w-6 h-6 text-legal-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-legal-dark">{result.firmType}</h3>
                    <span className="text-sm text-gray-500">{result.location}</span>
                  </div>
                  <div className="text-2xl font-bold text-legal-accent mb-2">{result.result}</div>
                  <p className="text-gray-600">{result.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GBPResults;
