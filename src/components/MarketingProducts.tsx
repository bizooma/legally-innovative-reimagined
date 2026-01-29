import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import whyChooseBg from "@/assets/why-choose-bg-bold.jpg";
import underConstructionImg from "@/assets/under-construction.webp";
import aeoAnalyzerImg from "@/assets/aeo-analyzer-screenshot.png";
import npobotsImg from "@/assets/npobots-screenshot.png";
import mvpSoftlaunchImg from "@/assets/mvp-softlaunch-screenshot.png";
import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const MarketingProducts = () => {
  const sectionRef = useScrollAnimation({ animationClass: 'animate-fade-in' });
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = cardsRef.current.map((card, index) => {
      if (!card) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }
          });
        },
        { threshold: 0.1 }
      );
      
      observer.observe(card);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  const products = [
    {
      title: "NPOBots",
      subtitle: "AI-Powered Nonprofit Engagement",
      description: "Revolutionary chatbot platform that increased donor engagement by 340% using fully automated 80% of common inquiries for nonprofit organizations.",
      badges: ["AI Chatbots", "Nonprofit", "Fundraising"],
      keyResults: [
        "340% ↑ Engagement",
        "80% Automation",
        "24/7 Support"
      ],
      image: npobotsImg,
      link: "/products/npo-bots"
    },
    {
      title: "AEOAnalyzer",
      subtitle: "Legal Analytics Dashboard",
      description: "Advanced AI analytics platform that helps law firms identify case patterns, predict outcomes, and optimize their legal strategies with data-driven insights.",
      badges: ["Legal Tech", "AI Analytics", "SaaS"],
      keyResults: [
        "60% Faster Analysis",
        "95% Accuracy",
        "500+ Cases Analyzed"
      ],
      image: aeoAnalyzerImg,
      link: "/products/aeo-analyzer"
    },
    {
      title: "MVP Soft Launch",
      subtitle: "Launch Platform Directory",
      description: "Discover 200+ platforms to list, launch, and promote your SaaS, mobile app, or software. Find the perfect launch sites for your target audience and ship faster.",
      badges: ["Launch Strategy", "SaaS", "Startup"],
      keyResults: [
        "200+ Platforms",
        "Faster Time-to-Market",
        "Targeted Visibility"
      ],
      image: mvpSoftlaunchImg,
      link: "/products/mvp-soft-launch"
    },
    {
      title: "Lead Scraper CRM",
      subtitle: "Automated Lead Generation",
      description: "Automatically find, verify, and manage quality leads with AI-powered scraping. Built-in CRM with email automation and enrichment.",
      badges: ["Lead Gen", "CRM", "Automation"],
      keyResults: [
        "500+ Leads Daily",
        "95% Email Accuracy",
        "10x Pipeline Growth"
      ],
      image: underConstructionImg,
      link: "/products/lead-scraper-crm"
    },
    {
      title: "Support Bots",
      subtitle: "AI Customer Support",
      description: "Automate customer support with AI chatbots. Resolve 85% of inquiries instantly, reduce costs by 60%, and provide 24/7 multilingual support.",
      badges: ["AI Support", "Automation", "24/7"],
      keyResults: [
        "85% Auto-Resolved",
        "60% Cost Reduction",
        "24/7 Availability"
      ],
      image: underConstructionImg,
      link: "/products/support-bots"
    },
    {
      title: "Signature Pop",
      subtitle: "Email Signature Marketing",
      description: "Transform every email into a marketing opportunity with branded, interactive email signatures. Add dynamic banners and track clicks across your team.",
      badges: ["Email Marketing", "Branding", "Analytics"],
      keyResults: [
        "425% ↑ Engagement",
        "8K+ Impressions/Year",
        "Zero Extra Cost"
      ],
      image: underConstructionImg,
      link: "/products/signature-pop"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="section-padding"
      style={{
        backgroundImage: `linear-gradient(rgba(122, 10, 10, 0.85), rgba(122, 10, 10, 0.85)), url('${whyChooseBg}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container mx-auto">
        <div className="text-left max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Marketing <span className="text-legal-accent">Products</span>
          </h2>
          <div className="text-white/90 text-lg space-y-4">
            <p>
              At Bizooma, we design and develop intelligent marketing platforms that transform how businesses attract, engage, and convert customers. Built with scalability and automation at their core, our platforms seamlessly integrate AI, analytics, and automation to give your team the competitive edge it deserves.
            </p>
            <p>
              Whether you're a law firm, nonprofit, or emerging startup, our custom solutions adapt to your goals and workflows—delivering performance, precision, and measurable growth.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`transition-all duration-700 ${
                visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card 
                className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 overflow-hidden group h-full"
              >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-legal-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.badges.map((badge, badgeIndex) => (
                    <Badge 
                      key={badgeIndex}
                      variant="secondary"
                      className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {product.title}
                </h3>
                
                <p className="text-lg font-semibold text-legal-accent mb-3">
                  {product.subtitle}
                </p>

                <p className="text-white/90 mb-4">
                  {product.description}
                </p>

                <div className="mb-4">
                  <p className="font-semibold text-white mb-2">Key Results:</p>
                  <ul className="space-y-1">
                    {product.keyResults.map((result, resultIndex) => (
                      <li key={resultIndex} className="flex items-center text-white/90">
                        <span className="text-legal-accent mr-2">→</span>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                <a 
                  href={product.link || "#contact"}
                  className="inline-flex items-center text-white font-semibold hover:text-legal-accent transition-colors group"
                >
                  {product.link ? "Learn More" : "View Case Study"}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </CardContent>
            </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-white text-lg">
            To view all the products we've developed, visit our Development Team's site at{' '}
            <a 
              href="https://bizooma.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-legal-accent font-semibold hover:underline"
            >
              Bizooma.dev
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default MarketingProducts;
