
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { trackServiceView } from "@/utils/gtmTracking";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import ChatbotsHero from "@/components/chatbots/ChatbotsHero";
import ChatbotTypes from "@/components/chatbots/ChatbotTypes";
import ChatbotsProcess from "@/components/chatbots/ChatbotsProcess";
import ChatbotsCTA from "@/components/chatbots/ChatbotsCTA";

const ChatbotsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    trackServiceView('Custom Chatbots');
  }, []);

  useScrollTracking({ pageName: 'Custom Chatbots' });

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Bizooma - Custom AI Chatbot Development",
    "url": "https://bizooma.com/chatbots",
    "telephone": "+1-904-295-6670",
    "description": "Custom AI chatbot development for businesses. We build tailored conversational experiences including customer support bots, lead generation bots, internal operations bots, and more.",
    "serviceType": "Custom AI Chatbot Development",
    "provider": {
      "@type": "Organization",
      "name": "Bizooma Digital Marketing Agency",
      "url": "https://bizooma.com"
    }
  };

  return (
    <>
      <Helmet>
        <title>Custom AI Chatbot Development | Bizooma</title>
        <meta
          name="description"
          content="We design and build custom AI chatbots tailored to your business. From customer support to lead generation, internal operations to e-commerce — discover the right bot for you."
        />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>
      <div className="min-h-screen">
        <Navbar />
        <ChatbotsHero />
        <ChatbotTypes />
        <ChatbotsProcess />
        <ChatbotsCTA />
        <Footer />
        <MobileFooterNav />
      </div>
    </>
  );
};

export default ChatbotsPage;
