
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import WebsiteDevHero from "@/components/website-dev/WebsiteDevHero";
import WebsiteDevServices from "@/components/website-dev/WebsiteDevServices";
import WebsiteDevProcess from "@/components/website-dev/WebsiteDevProcess";
import WebsiteDevBenefits from "@/components/website-dev/WebsiteDevBenefits";
import WebsiteDevPortfolio from "@/components/website-dev/WebsiteDevPortfolio";
import WebsiteDevCTA from "@/components/website-dev/WebsiteDevCTA";

const LawFirmWebsiteDevelopmentPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Website Development",
    "provider": {
      "@type": "Organization",
      "name": "Bizooma",
      "url": "https://bizooma.com"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "description": "Professional website development for law firms. Custom designs, responsive layouts, SEO optimization, and compliance-focused solutions to grow your legal practice online.",
    "offers": {
      "@type": "Offer",
      "priceRange": "$5,000 - $15,000",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "duration": "P6W"
  };

  return (
    <>
      <Helmet>
        <title>Law Firm Website Development Services | Bizooma</title>
        <meta 
          name="description" 
          content="Professional website development for law firms. Custom designs, responsive layouts, SEO optimization, and compliance-focused solutions to grow your legal practice online." 
        />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>
      <div className="min-h-screen">
        <Navbar />
        <WebsiteDevHero />
        <WebsiteDevServices />
        <WebsiteDevProcess />
        <WebsiteDevBenefits />
        <WebsiteDevPortfolio />
        <WebsiteDevCTA />
        <Footer />
        <MobileFooterNav />
      </div>
    </>
  );
};

export default LawFirmWebsiteDevelopmentPage;
