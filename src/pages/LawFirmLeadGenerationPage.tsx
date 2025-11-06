
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

const LawFirmLeadGenerationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Lead Generation Systems",
    "provider": {
      "@type": "Organization",
      "name": "Bizooma",
      "url": "https://bizooma.com"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "description": "Professional lead generation systems for law firms. Capture high-quality leads, nurture prospects, and convert potential clients with automated workflows and proven strategies.",
    "offers": {
      "@type": "Offer",
      "priceRange": "$1,000 - $5,000/month",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      <Helmet>
        <title>Law Firm Lead Generation Systems | Convert Prospects into Clients | Bizooma</title>
        <meta 
          name="description" 
          content="Professional lead generation systems for law firms. Capture high-quality leads, nurture prospects, and convert potential clients with automated workflows and proven strategies." 
        />
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
