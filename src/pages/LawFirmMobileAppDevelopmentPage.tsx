
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import MobileAppHero from "@/components/mobile-app/MobileAppHero";
import MobileAppServices from "@/components/mobile-app/MobileAppServices";
import MobileAppFeatures from "@/components/mobile-app/MobileAppFeatures";
import MobileAppBenefits from "@/components/mobile-app/MobileAppBenefits";
import MobileAppProcess from "@/components/mobile-app/MobileAppProcess";
import MobileAppCTA from "@/components/mobile-app/MobileAppCTA";

const LawFirmMobileAppDevelopmentPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Law Firm Mobile App Development Services | Bizooma</title>
        <meta 
          name="description" 
          content="Custom mobile app development for law firms. iOS and Android apps that enhance client communication, streamline processes, and grow your legal practice." 
        />
      </Helmet>
      <div className="min-h-screen">
        <Navbar />
        <MobileAppHero />
        <MobileAppServices />
        <MobileAppFeatures />
        <MobileAppBenefits />
        <MobileAppProcess />
        <MobileAppCTA />
        <Footer />
        <MobileFooterNav />
      </div>
    </>
  );
};

export default LawFirmMobileAppDevelopmentPage;
