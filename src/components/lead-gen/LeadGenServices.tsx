
import { Target, Users, Mail, Phone, BarChart, Zap } from "lucide-react";

const LeadGenServices = () => {
  const services = [
    {
      icon: Target,
      title: "Lead Capture Systems",
      description: "Strategic landing pages, contact forms, and lead magnets designed to convert website visitors into qualified prospects for your legal services."
    },
    {
      icon: Users,
      title: "Prospect Qualification",
      description: "Automated systems to identify and qualify high-intent leads based on practice area, case value, and client fit criteria."
    },
    {
      icon: Mail,
      title: "Email Marketing Automation",
      description: "Nurture sequences that educate prospects, build trust, and guide them through the decision-making process to choose your firm."
    },
    {
      icon: Phone,
      title: "Call Tracking & Management",
      description: "Advanced call tracking systems with intelligent routing and recording to ensure no lead falls through the cracks."
    },
    {
      icon: BarChart,
      title: "Lead Scoring & Analytics",
      description: "Comprehensive analytics and lead scoring systems to prioritize follow-up efforts and optimize conversion rates."
    },
    {
      icon: Zap,
      title: "Multi-Channel Integration",
      description: "Connect leads from all sources - website, social media, referrals, and advertising - into one unified system."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Complete Lead Generation Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our comprehensive lead generation systems are designed specifically for law firms 
            to attract, capture, and convert high-quality prospects into paying clients.
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

export default LeadGenServices;
