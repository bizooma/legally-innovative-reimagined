
const VoiceAssistantResults = () => {
  const caseStudies = [
    {
      title: "Personal Injury Alexa Skill",
      challenge: "Client wanted 24/7 availability for accident victim questions",
      solution: "Custom Alexa skill providing immediate accident guidance and consultation scheduling",
      results: [
        "500+ monthly active users",
        "40% increase in consultation bookings",
        "95% user satisfaction rating"
      ],
      image: "/lovable-uploads/414ce62c-05f7-4a1a-a76e-328c8a4fb9fb.png"
    },
    {
      title: "Family Law Google Assistant",
      challenge: "Needed to provide divorce process information to stressed clients",
      solution: "Empathetic Google Assistant action with step-by-step divorce guidance",
      results: [
        "300+ weekly interactions",
        "60% lead conversion rate",
        "4.8/5 user experience rating"
      ],
      image: "/lovable-uploads/414ce62c-05f7-4a1a-a76e-328c8a4fb9fb.png"
    },
    {
      title: "Estate Planning Voice App",
      challenge: "Complex estate planning concepts difficult to explain remotely",
      solution: "Interactive voice application breaking down estate planning into simple steps",
      results: [
        "200+ estate planning consultations generated",
        "75% increase in younger client demographics",
        "Featured in Amazon Alexa showcase"
      ],
      image: "/lovable-uploads/414ce62c-05f7-4a1a-a76e-328c8a4fb9fb.png"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Voice Assistant Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how law firms are using voice technology to revolutionize client engagement 
            and create new marketing opportunities.
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

export default VoiceAssistantResults;
