
import { Search, Target, Mail, Users, BarChart, TrendingUp } from "lucide-react";

const LeadGenProcess = () => {
  const steps = [
    {
      icon: Search,
      title: "Lead Audit & Strategy",
      description: "Analyze your current lead generation performance and develop a comprehensive strategy tailored to your practice areas."
    },
    {
      icon: Target,
      title: "System Setup & Integration",
      description: "Implement lead capture forms, landing pages, and CRM integration to create a seamless lead management workflow."
    },
    {
      icon: Mail,
      title: "Nurture Sequence Creation",
      description: "Develop automated email sequences and content that educates prospects and builds trust in your legal expertise."
    },
    {
      icon: Users,
      title: "Lead Qualification System",
      description: "Set up automated lead scoring and qualification systems to identify your highest-value prospects."
    },
    {
      icon: BarChart,
      title: "Performance Monitoring",
      description: "Track lead quality, conversion rates, and ROI with detailed analytics and reporting dashboards."
    },
    {
      icon: TrendingUp,
      title: "Optimization & Scaling",
      description: "Continuously optimize campaigns and scale successful lead generation strategies for maximum growth."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Our Proven Lead Generation Process
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A systematic approach to building and optimizing lead generation systems 
            that consistently deliver high-quality prospects for your law firm.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="absolute -top-4 left-6">
                  <div className="bg-legal-accent text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <div className="pt-4">
                  <div className="bg-legal-accent/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <step.icon className="w-8 h-8 text-legal-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-legal-dark">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadGenProcess;
