import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trackNavigation } from "@/utils/gtmTracking";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, Bot, Smartphone, MessageSquare, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const sectionRef = useScrollAnimation({ animationClass: 'animate-fade-in' });
  const services = [
    {
      title: "AI Consulting",
      subtitle: "Strategy · Implementation · Optimization",
      description: "We help companies leverage artificial intelligence to streamline operations, enhance customer experiences, and drive innovation through strategic planning and implementation.",
      highlights: [
        "AI readiness assessments & roadmaps",
        "Custom model selection & integration",
        "Process automation & workflow optimization",
        "Ongoing performance tuning & support",
      ],
      examples: "Used by law firms, startups, and nonprofits to automate intake, research, and client communication.",
      icon: <Bot className="h-8 w-8" />,
      bgImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop",
      link: "/ai-consulting-for-law-firms",
      accentColor: "from-blue-600 to-indigo-700",
    },
    {
      title: "Mobile App Development",
      subtitle: "iOS · Android · Cross-Platform",
      description: "Create powerful, user-friendly mobile applications for iOS and Android platforms that engage your customers and enhance your brand's digital presence.",
      highlights: [
        "Native & cross-platform development",
        "UI/UX design & prototyping",
        "App Store & Play Store deployment",
        "Push notifications & real-time features",
      ],
      examples: "Built health trackers, client portals, and engagement apps for organizations of all sizes.",
      icon: <Smartphone className="h-8 w-8" />,
      bgImage: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=1932&auto=format&fit=crop",
      link: "/law-firm-mobile-app-development",
      accentColor: "from-emerald-600 to-teal-700",
    },
    {
      title: "Custom AI Chatbot",
      subtitle: "24/7 Support · Lead Capture · Knowledge Base",
      description: "Develop intelligent, personalized AI chatbots that engage your customers, answer queries, and provide assistance around the clock — enhancing customer service while reducing operational costs.",
      highlights: [
        "Trained on your content & knowledge base",
        "Multi-channel deployment (web, SMS, social)",
        "Lead qualification & appointment booking",
        "Analytics dashboard & conversation insights",
      ],
      examples: "Deployed for law firms handling 80%+ of routine inquiries and booking consultations automatically.",
      icon: <MessageSquare className="h-8 w-8" />,
      bgImage: "/lovable-uploads/a88cbdbd-0e22-4907-afe1-0622b2c876ab.png",
      link: "/ai-customer-support-chatbots",
      accentColor: "from-violet-600 to-purple-700",
    },
    {
      title: "Voice Assistant Marketing",
      subtitle: "Alexa · Google Assistant · Custom Voice Apps",
      description: "Create custom voice applications for Amazon Alexa and Google Assistant that allow your business to engage with clients through natural language interactions and provide valuable information on demand.",
      highlights: [
        "Custom Alexa Skills & Google Actions",
        "Voice-optimized content strategy",
        "FAQ & service information delivery",
        "Voice search optimization (Voice SEO)",
      ],
      examples: "Helped professional services firms become discoverable through voice search, driving new client inquiries.",
      icon: <Volume2 className="h-8 w-8" />,
      bgImage: "/lovable-uploads/414ce62c-05f7-4a1a-a76e-328c8a4fb9fb.png",
      link: "/law-firm-voice-assistant-marketing",
      accentColor: "from-orange-500 to-red-600",
    },
  ];

  return (
    <section id="services" ref={sectionRef} className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-left max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Our <span className="highlight-text">Services</span>
          </h2>
          <p className="text-lg text-gray-700">
            We offer a focused suite of AI-powered services that help companies build intelligent systems, automate workflows, and connect with customers in new ways. Here's what we do best.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <Card
                key={index}
                className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-0 group"
              >
                <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  {/* Image Side */}
                  <div className="relative lg:w-2/5 min-h-[240px] lg:min-h-[360px] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${service.bgImage})` }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.accentColor} opacity-70`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                          {service.icon}
                        </div>
                        <p className="text-sm font-medium tracking-wider uppercase opacity-90">
                          {service.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <CardContent className="lg:w-3/5 p-8 lg:p-10 flex flex-col justify-center bg-white">
                    <h3 className="text-2xl lg:text-3xl font-bold text-legal-dark mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 text-base leading-relaxed">
                      {service.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-3 mb-6">
                      {service.highlights.map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="mt-1.5 h-2 w-2 rounded-full bg-legal-primary shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-100">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold text-legal-dark">Real-world example: </span>
                        {service.examples}
                      </p>
                    </div>

                    <div>
                      <Link
                        to={service.link}
                        onClick={() => trackNavigation(service.link, service.title)}
                      >
                        <Button className="bg-legal-primary hover:bg-legal-secondary text-white group/btn">
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
