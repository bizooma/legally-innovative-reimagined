import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const MarketingProducts = () => {
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
      image: "/lovable-uploads/924cc48a-722c-40c0-a449-9ae43b8b9134.png"
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
      image: "/lovable-uploads/fe60785d-1380-4920-a47b-48ec9f13c3ec.png"
    },
    {
      title: "Amicus Edge",
      subtitle: "AI-Powered Legal Technology Platform",
      description: "Comprehensive legal tech platform that modernizes law firms with AI-powered brief creation, video chatbots, voice search optimization, and automated document drafting. Empowers firms to increase efficiency while enhancing client experience.",
      badges: ["Legal Tech", "AI Automation", "Client Experience"],
      keyResults: [
        "300% ↑ Organic Traffic",
        "2x Lead Conversion",
        "24/7 Client Support"
      ],
      image: "/lovable-uploads/59e51f8e-610f-44a9-9530-a964b738ff51.png"
    },
    {
      title: "VoiceFirst SEO",
      subtitle: "Voice Search Optimization Suite",
      description: "Next-generation voice search optimization platform that helps businesses dominate voice assistant results across Alexa, Siri, and Google Assistant with AI-powered content optimization.",
      badges: ["Voice SEO", "AI Content", "Multi-Platform"],
      keyResults: [
        "450% ↑ Voice Queries",
        "Top 3 Voice Results",
        "85% Answer Rate"
      ],
      image: "/lovable-uploads/0e8bdb38-d5a7-4ced-b3d0-d0a37c64ac55.png"
    },
    {
      title: "CitationBuilder Pro",
      subtitle: "Local SEO Automation Platform",
      description: "Automated citation building and management system that maintains consistent NAP data across 200+ directories, helping local businesses dominate search results in their area.",
      badges: ["Local SEO", "Automation", "Directory Management"],
      keyResults: [
        "200+ Citations Built",
        "100% NAP Accuracy",
        "First Page Rankings"
      ],
      image: "/lovable-uploads/6c062279-8370-45d7-9334-45ada83333a1.png"
    },
    {
      title: "ContentGenius AI",
      subtitle: "AI-Powered Content Marketing",
      description: "Intelligent content creation and distribution platform that generates SEO-optimized blog posts, social media content, and email campaigns using advanced AI, saving marketing teams 20+ hours per week.",
      badges: ["Content Marketing", "AI Writing", "Multi-Channel"],
      keyResults: [
        "20+ Hours Saved/Week",
        "250% ↑ Content Output",
        "90% Engagement Rate"
      ],
      image: "/lovable-uploads/a88cbdbd-0e22-4907-afe1-0622b2c876ab.png"
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Marketing <span className="highlight-text">Products</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card 
              key={index}
              className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden group"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.badges.map((badge, badgeIndex) => (
                    <Badge 
                      key={badgeIndex}
                      variant="secondary"
                      className="bg-legal-light text-legal-primary border-legal-primary/20"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>

                <h3 className="text-2xl font-bold text-legal-dark mb-2">
                  {product.title}
                </h3>
                
                <p className="text-lg font-semibold text-legal-primary mb-3">
                  {product.subtitle}
                </p>

                <p className="text-gray-700 mb-4">
                  {product.description}
                </p>

                <div className="mb-4">
                  <p className="font-semibold text-legal-dark mb-2">Key Results:</p>
                  <ul className="space-y-1">
                    {product.keyResults.map((result, resultIndex) => (
                      <li key={resultIndex} className="flex items-center text-gray-700">
                        <span className="text-legal-primary mr-2">→</span>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                <a 
                  href="#contact"
                  className="inline-flex items-center text-legal-primary font-semibold hover:text-legal-dark transition-colors group"
                >
                  View Case Study
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketingProducts;
