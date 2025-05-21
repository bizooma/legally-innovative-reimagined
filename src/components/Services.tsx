import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Services = () => {
  const services = [
    {
      title: "AI Consulting",
      description: "We help law firms leverage artificial intelligence to streamline operations, enhance customer experiences, and drive innovation through strategic planning and implementation.",
      icon: "🤖",
      bgImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop"
    },
    {
      title: "Mobile App Development",
      description: "Create powerful, user-friendly mobile applications for iOS and Android platforms that engage your customers and enhance your brand's digital presence.",
      icon: "📱",
      bgImage: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?q=80&w=1932&auto=format&fit=crop"
    },
    {
      title: "Website Development",
      description: "Custom website solutions designed to meet your specific law firm needs, from simple informational sites to complex web applications with seamless user experiences.",
      icon: "💻",
      bgImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1932&auto=format&fit=crop"
    },
    {
      title: "Digital Marketing",
      description: "Comprehensive digital marketing strategies that increase your online visibility, engage your target audience, and convert visitors into loyal customers.",
      icon: "📈",
      bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1932&auto=format&fit=crop"
    },
    {
      title: "Google Business Profile/Bing Places",
      description: "Optimize your local online presence with professionally managed Google Business Profile and Bing Places listings to improve local search visibility and customer engagement.",
      icon: "🗺️",
      bgImage: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=1932&auto=format&fit=crop"
    },
    {
      title: "SEO/AEO",
      description: "Search Engine Optimization and Answer Engine Optimization services that improve your website's ranking, visibility, and traffic through proven, sustainable techniques.",
      icon: "🔍",
      bgImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1932&auto=format&fit=crop"
    },
    {
      title: "Custom AI Chatbot",
      description: "Develop intelligent, personalized AI chatbots that engage your customers, answer queries, and provide assistance 24/7, enhancing customer service while reducing operational costs.",
      icon: "💬",
      bgImage: "https://images.unsplash.com/photo-1677741445531-65f3e1328221?q=80&w=1932&auto=format&fit=crop"
    },
    {
      title: "Lead Generation Systems",
      description: "Implement effective lead generation systems that capture high-quality leads, nurture prospects through automated workflows, and convert potential customers into loyal clients.",
      icon: "🎯",
      bgImage: "https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1932&auto=format&fit=crop"
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
            We provide a comprehensive suite of services designed to help law firms 
            establish a strong digital presence and leverage technology for growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="border-t-4 border-t-legal-primary border-r-0 border-l-0 border-b-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden group"
            >
              <div className="relative">
                <AspectRatio ratio={16/5}>
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${service.bgImage})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/10" />
                </AspectRatio>
              </div>
              <CardContent className="p-6 relative z-10 bg-white">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-3">{service.icon}</div>
                  <h3 className="text-xl font-bold text-legal-dark">{service.title}</h3>
                </div>
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
