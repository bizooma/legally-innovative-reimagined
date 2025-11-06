
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
    "@type": "Service",
    "serviceType": "SEO, AEO & Voice Search Optimization",
    "provider": {
      "@type": "Organization",
      "name": "Bizooma",
      "url": "https://bizooma.com"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "description": "Professional SEO, AEO, and Voice SEO services for law firms. Improve search rankings, answer engine optimization, and voice search visibility to attract more clients.",
    "offers": {
      "@type": "Offer",
      "priceRange": "$1,500 - $5,000/month",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "termsOfService": "https://bizooma.com"
  };

  return (
    <>
      <Helmet>
        <title>Law Firm SEO, AEO & Voice SEO Services | Search Engine Optimization | Bizooma</title>
        <meta 
          name="description" 
          content="Professional SEO, AEO, and Voice SEO services for law firms. Improve search rankings, answer engine optimization, and voice search visibility to attract more clients." 
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
