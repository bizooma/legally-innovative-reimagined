
import { Search, MessageCircle, Mic, Globe, BarChart, FileText } from "lucide-react";

const SeoAeoServices = () => {
  const services = [
    {
      icon: Search,
      title: "Traditional SEO",
      description: "Comprehensive search engine optimization including keyword research, on-page SEO, technical SEO, and link building strategies tailored for law firms."
    },
    {
      icon: MessageCircle,
      title: "Answer Engine Optimization (AEO)",
      description: "Optimize your content for AI-powered search engines like ChatGPT, Claude, and Google's AI Overviews to capture traffic from answer engines."
    },
    {
      icon: Mic,
      title: "Voice SEO",
      description: "Optimize for voice search queries from Alexa, Google Assistant, and Siri to capture the growing voice search market in legal services."
    },
    {
      icon: Globe,
      title: "Local SEO",
      description: "Dominate local search results with Google Business Profile optimization, local citations, and location-based keyword targeting."
    },
    {
      icon: BarChart,
      title: "SEO Analytics & Reporting",
      description: "Comprehensive tracking and reporting of SEO performance, keyword rankings, traffic growth, and conversion metrics."
    },
    {
      icon: FileText,
      title: "Content SEO",
      description: "Strategic content creation and optimization that establishes thought leadership while targeting high-value legal keywords."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Complete SEO Services for Modern Law Firms
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From traditional search engines to AI-powered answer engines and voice assistants, 
            we ensure your law firm is found wherever potential clients are searching.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="bg-legal-accent/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-legal-accent" />
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

export default SeoAeoServices;
