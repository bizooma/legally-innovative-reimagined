
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import LeadGenHero from "@/components/lead-gen/LeadGenHero";
import LeadGenServices from "@/components/lead-gen/LeadGenServices";
import LeadGenBenefits from "@/components/lead-gen/LeadGenBenefits";
import LeadGenProcess from "@/components/lead-gen/LeadGenProcess";
import LeadGenResults from "@/components/lead-gen/LeadGenResults";
import LeadGenCTA from "@/components/lead-gen/LeadGenCTA";
import ogImage from "@/assets/og/og-lead-gen.jpg";

const LawFirmLeadGenerationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Bizooma Digital Marketing Agency - Lead Generation Services",
    "image": "https://bizooma.com/lovable-uploads/6c062279-8370-45d7-9334-45ada83333a1.png",
    "url": "https://bizooma.com/law-firm-lead-generation",
    "telephone": "+1-904-295-6670",
    "priceRange": "$1,000 - $5,000/month",
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
    "description": "Professional lead generation systems for law firms in Jacksonville. Capture high-quality leads, nurture prospects, and convert potential clients with automated workflows.",
    "serviceType": "Lead Generation Systems",
    "provider": {
      "@type": "Organization",
      "name": "Bizooma Digital Marketing Agency",
      "url": "https://bizooma.com"
    }
  };

  return (
    <>
      <Helmet>
        <title>Jacksonville Lead Generation for Law Firms | Bizooma Digital Marketing Agency</title>
        <meta 
          name="description" 
          content="Jacksonville lead generation systems for law firms. Capture high-quality local leads, nurture prospects, and convert potential clients with automated workflows." 
        />
        <meta property="og:title" content="Jacksonville Lead Generation for Law Firms | Bizooma" />
        <meta property="og:description" content="Capture high-quality local leads, nurture prospects, and convert clients with Bizooma's automated lead-gen systems." />
        <meta property="og:image" content={`https://bizooma.com${ogImage}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`https://bizooma.com${ogImage}`} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>
      <div className="min-h-screen">
        <Navbar />
        <LeadGenHero />
        <LeadGenServices />
        <LeadGenBenefits />
        <LeadGenProcess />
        <LeadGenResults />
        <LeadGenCTA />
        <Footer />
        <MobileFooterNav />
      </div>
    </>
  );
};

export default LawFirmLeadGenerationPage;
