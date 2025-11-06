
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

  return (
    <>
      <Helmet>
        <title>AI Consulting for Law Firms | Transform Your Legal Practice | Bizooma</title>
        <meta 
          name="description" 
          content="Expert AI consulting services for law firms. Streamline operations, enhance client experiences, and drive innovation with strategic AI implementation tailored for legal practices." 
        />
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
      </div>
    </>
  );
};

export default AiConsultingPage;
