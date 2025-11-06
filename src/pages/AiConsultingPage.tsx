
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import AiConsultingHero from "@/components/ai-consulting/AiConsultingHero";
import AiConsultingServices from "@/components/ai-consulting/AiConsultingServices";
import AiConsultingBenefits from "@/components/ai-consulting/AiConsultingBenefits";
import AiConsultingProcess from "@/components/ai-consulting/AiConsultingProcess";
import AiConsultingCaseStudies from "@/components/ai-consulting/AiConsultingCaseStudies";
import AiConsultingCTA from "@/components/ai-consulting/AiConsultingCTA";

const AiConsultingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "AI Consulting & Implementation",
    "provider": {
      "@type": "Organization",
      "name": "Bizooma",
      "url": "https://bizooma.com"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "description": "Expert AI consulting services for law firms. Streamline operations, enhance client experiences, and drive innovation with strategic AI implementation tailored for legal practices.",
    "offers": {
      "@type": "Offer",
      "priceRange": "$5,000 - $25,000",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "duration": "P8W"
  };

  return (
    <>
      <Helmet>
        <title>AI Consulting for Law Firms | Transform Your Legal Practice | Bizooma</title>
        <meta 
          name="description" 
          content="Expert AI consulting services for law firms. Streamline operations, enhance client experiences, and drive innovation with strategic AI implementation tailored for legal practices." 
        />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>
      <div className="min-h-screen">
        <Navbar />
        <AiConsultingHero />
        <AiConsultingServices />
        <AiConsultingBenefits />
        <AiConsultingProcess />
        <AiConsultingCaseStudies />
        <AiConsultingCTA />
        <Footer />
        <MobileFooterNav />
      </div>
    </>
  );
};

export default AiConsultingPage;
