
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import SeoAeoHero from "@/components/seo-aeo/SeoAeoHero";
import SeoAeoServices from "@/components/seo-aeo/SeoAeoServices";
import SeoAeoBenefits from "@/components/seo-aeo/SeoAeoBenefits";
import SeoAeoProcess from "@/components/seo-aeo/SeoAeoProcess";
import SeoAeoResults from "@/components/seo-aeo/SeoAeoResults";
import SeoAeoCTA from "@/components/seo-aeo/SeoAeoCTA";

const LawFirmSeoAeoPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Bizooma Digital Marketing Agency - SEO/AEO/Voice SEO Services",
    "image": "https://bizooma.com/lovable-uploads/6c062279-8370-45d7-9334-45ada83333a1.png",
    "url": "https://bizooma.com/law-firm-seo-aeo-voiceseo",
    "telephone": "+1-904-295-6670",
    "priceRange": "$1,500 - $5,000/month",
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
    "description": "Professional SEO, AEO, and Voice SEO services for law firms in Jacksonville. Improve search rankings, answer engine optimization, and voice search visibility to attract more clients.",
    "serviceType": "SEO, AEO & Voice Search Optimization",
    "provider": {
      "@type": "Organization",
      "name": "Bizooma Digital Marketing Agency",
      "url": "https://bizooma.com"
    }
  };

  return (
    <>
      <Helmet>
        <title>Jacksonville SEO, AEO & Voice SEO for Law Firms | Bizooma Digital Marketing Agency</title>
        <meta 
          name="description" 
          content="Jacksonville SEO, AEO, and Voice SEO services for law firms. Improve search rankings, answer engine optimization, and voice search visibility to attract more local clients." 
        />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>
      <div className="min-h-screen">
        <Navbar />
        <SeoAeoHero />
        <SeoAeoServices />
        <SeoAeoBenefits />
        <SeoAeoProcess />
        <SeoAeoResults />
        <SeoAeoCTA />
        <Footer />
        <MobileFooterNav />
      </div>
    </>
  );
};

export default LawFirmSeoAeoPage;
