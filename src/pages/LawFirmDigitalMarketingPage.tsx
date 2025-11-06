
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DigitalMarketingHero from "@/components/digital-marketing/DigitalMarketingHero";
import DigitalMarketingServices from "@/components/digital-marketing/DigitalMarketingServices";
import DigitalMarketingBenefits from "@/components/digital-marketing/DigitalMarketingBenefits";
import DigitalMarketingProcess from "@/components/digital-marketing/DigitalMarketingProcess";
import DigitalMarketingResults from "@/components/digital-marketing/DigitalMarketingResults";
import DigitalMarketingCTA from "@/components/digital-marketing/DigitalMarketingCTA";

const LawFirmDigitalMarketingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Digital Marketing for Law Firms | Grow Your Legal Practice Online | Bizooma</title>
        <meta 
          name="description" 
          content="Comprehensive digital marketing services for law firms. Increase online visibility, generate quality leads, and grow your legal practice with proven digital strategies." 
        />
      </Helmet>
      <div className="min-h-screen">
        <Navbar />
        <DigitalMarketingHero />
        <DigitalMarketingServices />
        <DigitalMarketingBenefits />
        <DigitalMarketingProcess />
        <DigitalMarketingResults />
        <DigitalMarketingCTA />
        <Footer />
      </div>
    </>
  );
};

export default LawFirmDigitalMarketingPage;
