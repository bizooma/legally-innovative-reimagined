
const DigitalMarketingResults = () => {
  const caseStudies = [
    {
      title: "Personal Injury Law Firm",
      challenge: "Low online visibility and few qualified leads",
      solution: "Comprehensive SEO and PPC campaign targeting local personal injury keywords",
      results: [
        "300% increase in organic traffic",
        "150% more qualified leads",
        "50% reduction in cost per acquisition"
      ],
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1932&auto=format&fit=crop"
    },
    {
      title: "Corporate Law Practice",
      challenge: "Need to establish thought leadership and attract high-value clients",
      solution: "Content marketing strategy with LinkedIn advertising and email nurturing",
      results: [
        "400% increase in website engagement",
        "200% growth in newsletter subscribers",
        "75% of new clients from digital channels"
      ],
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1932&auto=format&fit=crop"
    },
    {
      title: "Family Law Attorney",
      challenge: "Competing in saturated local market",
      solution: "Local SEO optimization and social media presence building",
      results: [
        "250% increase in local search rankings",
        "180% more consultation requests",
        "90% increase in social media engagement"
      ],
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1932&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Real Results for Real Law Firms
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how our digital marketing strategies have transformed law firms across different practice areas.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src={study.image} 
                alt={study.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-legal-dark">{study.title}</h3>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Challenge:</h4>
                  <p className="text-gray-600 text-sm">{study.challenge}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Solution:</h4>
                  <p className="text-gray-600 text-sm">{study.solution}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Results:</h4>
                  <ul className="space-y-1">
                    {study.results.map((result, resultIndex) => (
                      <li key={resultIndex} className="text-legal-accent text-sm font-medium">
                        • {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DigitalMarketingResults;
