
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import AiChatbotsHero from "@/components/ai-chatbots/AiChatbotsHero";
import AiChatbotsFeatures from "@/components/ai-chatbots/AiChatbotsFeatures";
import AiChatbotsBenefits from "@/components/ai-chatbots/AiChatbotsBenefits";
import AiChatbotsDemo from "@/components/ai-chatbots/AiChatbotsDemo";
import AiChatbotsPricing from "@/components/ai-chatbots/AiChatbotsPricing";
import AiChatbotsCTA from "@/components/ai-chatbots/AiChatbotsCTA";
import { trackServiceView } from "@/utils/gtmTracking";
import { useScrollTracking } from "@/hooks/useScrollTracking";

const AiCustomerSupportChatbotsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    trackServiceView('AI Customer Support Chatbots');
  }, []);

  // Track scroll depth
  useScrollTracking({ pageName: 'AI Customer Support Chatbots' });

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "AI Customer Support Chatbots",
    "provider": {
      "@type": "Organization",
      "name": "Bizooma",
      "url": "https://bizooma.com"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "description": "Transform your law firm's client support with AI-powered chatbots. Available 24/7, handle inquiries, schedule consultations, and improve client satisfaction.",
    "offers": {
      "@type": "Offer",
      "priceRange": "$2,500 - $8,000",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "duration": "P4W"
  };

  return (
    <>
      <Helmet>
        <title>Jacksonville AI Customer Support Chatbots for Law Firms | Bizooma Digital Marketing Agency</title>
        <meta 
          name="description" 
          content="Transform your law firm's client support with AI-powered chatbots. Available 24/7, handle inquiries, schedule consultations, and improve client satisfaction." 
        />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>
      <div className="min-h-screen">
        <Navbar />
        <AiChatbotsHero />
        <AiChatbotsFeatures />
        <AiChatbotsBenefits />
        <AiChatbotsDemo />
        <AiChatbotsPricing />
        <AiChatbotsCTA />
        <Footer />
        <MobileFooterNav />
      </div>
    </>
  );
};

export default AiCustomerSupportChatbotsPage;
