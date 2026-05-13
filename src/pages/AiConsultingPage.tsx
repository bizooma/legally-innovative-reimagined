
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
    "@type": "ProfessionalService",
    "name": "Bizooma Digital Marketing Agency - AI Consulting",
    "image": "https://bizooma.com/lovable-uploads/6c062279-8370-45d7-9334-45ada83333a1.png",
    "url": "https://bizooma.com/ai-consulting-for-law-firms",
    "telephone": "+1-904-295-6670",
    "priceRange": "$5,000 - $25,000",
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
    "description": "Expert AI consulting services for law firms in Jacksonville. Streamline operations, enhance client experiences, and drive innovation with strategic AI implementation.",
    "serviceType": "AI Consulting & Implementation",
    "provider": {
      "@type": "Organization",
      "name": "Bizooma Digital Marketing Agency",
      "url": "https://bizooma.com"
    }
  };

  return (
    <>
      <Helmet>
        <title>Jacksonville AI Consulting for Law Firms | Bizooma</title>
        <meta 
          name="description" 
          content="Jacksonville AI consulting for law firms. Streamline operations, enhance client experiences, and drive innovation with strategic AI implementation tailored for legal practices." 
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
