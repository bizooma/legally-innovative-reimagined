
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
    "@type": "ProfessionalService",
    "name": "Bizooma Digital Marketing Agency - Mobile App Development",
    "image": "https://bizooma.com/lovable-uploads/6c062279-8370-45d7-9334-45ada83333a1.png",
    "url": "https://bizooma.com/law-firm-mobile-app-development",
    "telephone": "+1-904-295-6670",
    "priceRange": "$15,000 - $50,000",
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
    "description": "Custom mobile app development for law firms in Jacksonville. iOS and Android apps that enhance client communication, streamline processes, and grow your legal practice.",
    "serviceType": "Mobile App Development",
    "provider": {
      "@type": "Organization",
      "name": "Bizooma Digital Marketing Agency",
      "url": "https://bizooma.com"
    }
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
