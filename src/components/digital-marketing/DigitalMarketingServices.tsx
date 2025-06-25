
import { Search, Globe, Share2, Mail, PenTool, BarChart } from "lucide-react";

const DigitalMarketingServices = () => {
  const services = [
    {
      icon: Search,
      title: "Search Engine Optimization (SEO)",
      description: "Improve your law firm's visibility in search results with targeted SEO strategies that attract potential clients actively searching for legal services."
    },
    {
      icon: Globe,
      title: "Website Optimization",
      description: "Convert more visitors into clients with professionally optimized websites designed to build trust and encourage contact."
    },
    {
      icon: Share2,
      title: "Social Media Marketing",
      description: "Build your firm's reputation and engage with your community through strategic social media presence across all relevant platforms."
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description: "Nurture leads and stay connected with clients through targeted email campaigns that provide value and drive engagement."
    },
    {
      icon: PenTool,
      title: "Content Marketing",
      description: "Establish thought leadership and attract clients with valuable, informative content that showcases your legal expertise."
    },
    {
      icon: BarChart,
      title: "Pay-Per-Click Advertising",
      description: "Generate immediate results with targeted PPC campaigns that put your firm in front of potential clients at the right moment."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Comprehensive Digital Marketing Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our full-service digital marketing approach ensures your law firm has a strong, 
            cohesive online presence that attracts and converts quality leads.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="bg-legal-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-legal-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-legal-dark">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DigitalMarketingServices;
