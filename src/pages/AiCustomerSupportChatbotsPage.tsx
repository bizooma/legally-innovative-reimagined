
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
    "@type": "ProfessionalService",
    "name": "Bizooma Digital Marketing Agency - AI Customer Support Chatbots",
    "image": "https://bizooma.com/lovable-uploads/6c062279-8370-45d7-9334-45ada83333a1.png",
    "url": "https://bizooma.com/ai-customer-support-chatbots",
    "telephone": "+1-904-295-6670",
    "priceRange": "$2,500 - $8,000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "200 N Laura St",
      "addressLocality": "Jacksonville",
      "addressRegion": "FL",
      "postalCode": "32202",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "30.3322",
      "longitude": "-81.6557"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Jacksonville",
        "@id": "https://en.wikipedia.org/wiki/Jacksonville,_Florida"
      },
      {
        "@type": "State",
        "name": "Florida"
      }
    ],
    "description": "AI-powered chatbots for law firms in Jacksonville. Available 24/7 to handle inquiries, schedule consultations, and improve client satisfaction.",
    "serviceType": "AI Customer Support Chatbots",
    "provider": {
      "@type": "Organization",
      "name": "Bizooma Digital Marketing Agency",
      "url": "https://bizooma.com"
    }
  };

  return (
    <>
      <Helmet>
        <title>Jacksonville AI Customer Support Chatbots for Law Firms | Bizooma Digital Marketing Agency</title>
        <meta 
          name="description" 
          content="Jacksonville AI chatbots for law firms. Transform your client support with 24/7 AI-powered chatbots that handle inquiries, schedule consultations, and improve satisfaction." 
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
