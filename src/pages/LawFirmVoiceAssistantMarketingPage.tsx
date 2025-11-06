
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import VoiceAssistantHero from "@/components/voice-assistant/VoiceAssistantHero";
import VoiceAssistantServices from "@/components/voice-assistant/VoiceAssistantServices";
import VoiceAssistantBenefits from "@/components/voice-assistant/VoiceAssistantBenefits";
import VoiceAssistantProcess from "@/components/voice-assistant/VoiceAssistantProcess";
import VoiceAssistantResults from "@/components/voice-assistant/VoiceAssistantResults";
import VoiceAssistantCTA from "@/components/voice-assistant/VoiceAssistantCTA";

const LawFirmVoiceAssistantMarketingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Voice Assistant Marketing for Law Firms | Alexa & Google Assistant Development | Bizooma</title>
        <meta 
          name="description" 
          content="Develop custom voice assistants for Amazon Alexa and Google Assistant to enhance your law firm's marketing reach and provide 24/7 client engagement through voice technology." 
        />
      </Helmet>
      <div className="min-h-screen">
        <Navbar />
        <VoiceAssistantHero />
        <VoiceAssistantServices />
        <VoiceAssistantBenefits />
        <VoiceAssistantProcess />
        <VoiceAssistantResults />
        <VoiceAssistantCTA />
        <Footer />
        <MobileFooterNav />
      </div>
    </>
  );
};

export default LawFirmVoiceAssistantMarketingPage;
