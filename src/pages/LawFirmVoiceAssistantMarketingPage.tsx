
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

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Bizooma Digital Marketing Agency - Voice Assistant Marketing",
    "image": "https://bizooma.com/lovable-uploads/6c062279-8370-45d7-9334-45ada83333a1.png",
    "url": "https://bizooma.com/law-firm-voice-assistant-marketing",
    "telephone": "+1-904-295-6670",
    "priceRange": "$3,000 - $10,000",
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
    "description": "Custom voice assistant development for law firms in Jacksonville. Amazon Alexa and Google Assistant solutions to enhance marketing reach and provide 24/7 client engagement.",
    "serviceType": "Voice Assistant Marketing & Development",
    "provider": {
      "@type": "Organization",
      "name": "Bizooma Digital Marketing Agency",
      "url": "https://bizooma.com"
    }
  };

  return (
    <>
      <Helmet>
        <title>Jacksonville Voice Assistant Marketing for Law Firms | Bizooma Digital Marketing Agency</title>
        <meta 
          name="description" 
          content="Jacksonville voice assistant marketing for law firms. Custom Alexa and Google Assistant development to enhance your marketing reach and provide 24/7 client engagement." 
        />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
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
