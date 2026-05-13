
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
import ogImage from "@/assets/og/og-digital-marketing.jpg";

const LawFirmDigitalMarketingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    trackServiceView('Law Firm Digital Marketing');
  }, []);

  // Track scroll depth
  useScrollTracking({ pageName: 'Digital Marketing' });

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Bizooma Digital Marketing Agency - Digital Marketing Services",
    "image": "https://bizooma.com/lovable-uploads/6c062279-8370-45d7-9334-45ada83333a1.png",
    "url": "https://bizooma.com/law-firm-digital-marketing",
    "telephone": "+1-904-295-6670",
    "priceRange": "$2,000 - $10,000/month",
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
    "description": "Comprehensive digital marketing services for law firms in Jacksonville. Increase online visibility, generate quality leads, and grow your legal practice with proven strategies.",
    "serviceType": "Digital Marketing",
    "provider": {
      "@type": "Organization",
      "name": "Bizooma Digital Marketing Agency",
      "url": "https://bizooma.com"
    }
  };

  return (
    <>
      <Helmet>
        <title>Jacksonville Digital Marketing for Law Firms | Bizooma</title>
        <meta 
          name="description" 
          content="Jacksonville digital marketing for law firms. Increase online visibility, generate quality local leads, and grow your legal practice with proven digital strategies." 
        />
        <meta property="og:title" content="Jacksonville Digital Marketing for Law Firms | Bizooma" />
        <meta property="og:description" content="Increase visibility, generate local leads, and grow your legal practice with Bizooma's digital marketing." />
        <meta property="og:image" content={`https://bizooma.com${ogImage}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`https://bizooma.com${ogImage}`} />
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
