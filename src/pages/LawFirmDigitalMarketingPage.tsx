
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import DigitalMarketingHero from "@/components/digital-marketing/DigitalMarketingHero";
import DigitalMarketingServices from "@/components/digital-marketing/DigitalMarketingServices";
import DigitalMarketingBenefits from "@/components/digital-marketing/DigitalMarketingBenefits";
import DigitalMarketingProcess from "@/components/digital-marketing/DigitalMarketingProcess";
import DigitalMarketingResults from "@/components/digital-marketing/DigitalMarketingResults";
import DigitalMarketingCTA from "@/components/digital-marketing/DigitalMarketingCTA";
import { trackServiceView } from "@/utils/gtmTracking";
import { useScrollTracking } from "@/hooks/useScrollTracking";

const LawFirmDigitalMarketingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    trackServiceView('Law Firm Digital Marketing');
  }, []);

  // Track scroll depth
  useScrollTracking({ pageName: 'Digital Marketing' });

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Digital Marketing",
    "provider": {
      "@type": "Organization",
      "name": "Bizooma",
      "url": "https://bizooma.com"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "description": "Comprehensive digital marketing services for law firms. Increase online visibility, generate quality leads, and grow your legal practice with proven digital strategies.",
    "offers": {
      "@type": "Offer",
      "priceRange": "$2,000 - $10,000/month",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      <Helmet>
        <title>Jacksonville Digital Marketing for Law Firms | Bizooma Digital Marketing Agency</title>
        <meta 
          name="description" 
          content="Jacksonville digital marketing for law firms. Increase online visibility, generate quality local leads, and grow your legal practice with proven digital strategies." 
        />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
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
        <MobileFooterNav />
      </div>
    </>
  );
};

export default LawFirmDigitalMarketingPage;
