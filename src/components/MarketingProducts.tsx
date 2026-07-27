import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import whyChooseBg from "@/assets/why-choose-bg-bold.jpg";
import productTempImg from "@/assets/product-temp.jpg";
import amicusEdgeCardImg from "@/assets/amicus-edge-card.png.asset.json";
import lawFirmAuditCardImg from "@/assets/law-firm-audit-card.png.asset.json";
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
      title: "Law Firm Audit",
      subtitle: "AI Readiness & Workflow Assessment",
      description: "A structured audit that scores every workflow in your firm on impact and risk, then gives you a ranked plan for safe AI rollout.",
      badges: ["AI Audit", "Law Firms", "Workflow"],
      keyResults: [
        "Impact × Risk scoring",
        "Prioritized build order",
        "Attorney-in-the-loop guardrails"
      ],
      image: lawFirmAuditCardImg.url,
      link: "/ai-audit"
    },
    {
      title: "Amicus Edge",
      subtitle: "Legal Intelligence Platform",
      description: "A powerful platform that helps law firms turn case patterns, research, and operational data into a competitive advantage.",
      badges: ["Legal Tech", "Analytics", "SaaS"],
      keyResults: [
        "Case pattern analysis",
        "Research acceleration",
        "Operational intelligence"
      ],
      image: amicusEdgeCardImg.url,
      link: "#contact"
    },
    {
      title: "Lex Guild",
      subtitle: "Legal Mentorship & Knowledge Sharing",
      description: "An invitation-only mentorship program and knowledge sharing platform for the legal profession — pairing attorneys, sharing expertise, and strengthening practice communities.",
      badges: ["Mentorship", "Knowledge Sharing", "Legal"],
      keyResults: [
        "Curated mentor matching",
        "Structured knowledge sharing",
        "Stronger member engagement"
      ],
      image: productTempImg,
      link: "https://lexguild.com",
      isExternal: true
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

        <div className="grid grid-cols-1 gap-8">
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
                className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 overflow-hidden group"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-1/2 h-auto min-h-[260px] overflow-hidden shrink-0 bg-black/20 flex items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                      width={1024}
                      height={768}
                    />
                    <div className="absolute inset-0 bg-legal-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <CardContent className="p-6 md:p-8 flex flex-col justify-center w-full md:w-3/5 lg:w-2/3">
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
                      {...(product.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="inline-flex items-center text-white font-semibold hover:text-legal-accent transition-colors group"
                    >
                      {product.link ? "Learn More" : "View Case Study"}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </CardContent>
                </div>
              </Card>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MarketingProducts;
