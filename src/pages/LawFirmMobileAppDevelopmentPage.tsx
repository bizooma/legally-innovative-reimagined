
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

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Mobile App Development",
    "provider": {
      "@type": "Organization",
      "name": "Bizooma",
      "url": "https://bizooma.com"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "description": "Custom mobile app development for law firms. iOS and Android apps that enhance client communication, streamline processes, and grow your legal practice.",
    "offers": {
      "@type": "Offer",
      "priceRange": "$15,000 - $50,000",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "duration": "P12W"
  };

  return (
    <>
      <Helmet>
        <title>Jacksonville Mobile App Development for Law Firms | Bizooma Digital Marketing Agency</title>
        <meta 
          name="description" 
          content="Jacksonville mobile app development for law firms. Custom iOS and Android apps that enhance client communication, streamline processes, and grow your legal practice." 
        />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
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
