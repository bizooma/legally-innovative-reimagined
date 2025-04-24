
import { Card, CardContent } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      title: "Innovation Consulting",
      description: "We help legal teams identify opportunities for innovation, develop strategies, and implement changes that improve efficiency and client satisfaction.",
      icon: "🚀",
    },
    {
      title: "Legal Design Thinking",
      description: "Reimagine legal services and documents through human-centered design principles that enhance clarity, usability, and effectiveness.",
      icon: "💡",
    },
    {
      title: "Technology Implementation",
      description: "Navigate the complex legal tech landscape. We help select, implement, and optimize the right tools for your specific needs.",
      icon: "⚙️",
    },
    {
      title: "Training Programs",
      description: "Equip your team with the skills needed for the future of legal practice through our specialized training programs and workshops.",
      icon: "🎓",
    },
    {
      title: "Change Management",
      description: "Successfully navigate organizational change with our proven methodologies that ensure adoption and sustainable transformation.",
      icon: "📈",
    },
    {
      title: "Innovation Culture",
      description: "Build a culture that embraces innovation, continuous improvement, and client-centered thinking throughout your organization.",
      icon: "🌱",
    },
  ];

  return (
    <section id="services" className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Our <span className="highlight-text">Services</span>
          </h2>
          <p className="text-lg text-gray-700">
            We provide a comprehensive suite of services designed to help legal professionals 
            and organizations navigate the changing landscape of legal services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="border-t-4 border-t-legal-primary border-r-0 border-l-0 border-b-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-legal-dark">{service.title}</h3>
                <p className="text-gray-700">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
