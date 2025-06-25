
import { MapPin, Star, Camera, MessageSquare, Calendar, BarChart } from "lucide-react";

const GBPServices = () => {
  const services = [
    {
      icon: MapPin,
      title: "Profile Setup & Optimization",
      description: "Complete Google Business Profile setup with accurate business information, categories, and local SEO optimization to maximize your local search visibility."
    },
    {
      icon: Star,
      title: "Review Management",
      description: "Proactive review monitoring, response management, and reputation building strategies to maintain a strong online reputation and attract more clients."
    },
    {
      icon: Camera,
      title: "Professional Photography",
      description: "High-quality photos of your law firm, team, and office space that build trust and showcase your professional environment to potential clients."
    },
    {
      icon: MessageSquare,
      title: "Q&A Management",
      description: "Monitor and respond to Google Business Profile questions, providing helpful information that demonstrates your expertise and builds client confidence."
    },
    {
      icon: Calendar,
      title: "Posts & Updates",
      description: "Regular Google Business Profile posts highlighting your services, achievements, and legal insights to keep your profile active and engaging."
    },
    {
      icon: BarChart,
      title: "Performance Analytics",
      description: "Detailed reporting on profile performance, search visibility, client actions, and ROI to measure success and optimize strategies."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Complete Google Business Profile Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our comprehensive approach to Google Business Profile optimization ensures your law firm 
            stands out in local search results and converts more visitors into clients.
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

export default GBPServices;
