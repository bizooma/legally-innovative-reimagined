
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AiChatbotsHero from "@/components/ai-chatbots/AiChatbotsHero";
import AiChatbotsFeatures from "@/components/ai-chatbots/AiChatbotsFeatures";
import AiChatbotsBenefits from "@/components/ai-chatbots/AiChatbotsBenefits";
import AiChatbotsDemo from "@/components/ai-chatbots/AiChatbotsDemo";
import AiChatbotsPricing from "@/components/ai-chatbots/AiChatbotsPricing";
import AiChatbotsCTA from "@/components/ai-chatbots/AiChatbotsCTA";

const AiCustomerSupportChatbotsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>AI Customer Support Chatbots for Law Firms | Bizooma</title>
        <meta 
          name="description" 
          content="Transform your law firm's client support with AI-powered chatbots. Available 24/7, handle inquiries, schedule consultations, and improve client satisfaction." 
        />
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
      </div>
    </>
  );
};

export default AiCustomerSupportChatbotsPage;
