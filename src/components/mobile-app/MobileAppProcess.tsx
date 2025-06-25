
const MobileAppProcess = () => {
  const steps = [
    {
      number: "01",
      title: "Discovery & Strategy",
      description: "We analyze your firm's needs, target users, and define app objectives and features."
    },
    {
      number: "02",
      title: "Design & Prototyping",
      description: "Create user-friendly designs and interactive prototypes for testing and feedback."
    },
    {
      number: "03",
      title: "Development & Integration",
      description: "Build your app with clean code and integrate with your existing legal systems."
    },
    {
      number: "04",
      title: "Testing & Quality Assurance",
      description: "Comprehensive testing across devices, platforms, and use cases."
    },
    {
      number: "05",
      title: "App Store Deployment",
      description: "Handle the entire app store submission process for iOS and Android."
    },
    {
      number: "06",
      title: "Support & Maintenance",
      description: "Ongoing updates, feature enhancements, and technical support."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Our Mobile App Development Process
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A systematic approach to creating mobile apps that deliver 
            exceptional user experiences and business results.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex items-start space-x-4">
                <div className="bg-legal-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-legal-dark">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-full w-8 h-0.5 bg-legal-primary/30 transform -translate-y-1/2 translate-x-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobileAppProcess;
