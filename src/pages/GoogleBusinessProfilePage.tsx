
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GBPHero from "@/components/gbp/GBPHero";
import GBPServices from "@/components/gbp/GBPServices";
import GBPBenefits from "@/components/gbp/GBPBenefits";
import GBPProcess from "@/components/gbp/GBPProcess";
import GBPResults from "@/components/gbp/GBPResults";
import GBPCTA from "@/components/gbp/GBPCTA";

const GoogleBusinessProfilePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Google Business Profile Optimization for Law Firms | Local SEO Services | Legally Innovative</title>
        <meta 
          name="description" 
          content="Professional Google Business Profile optimization for law firms. Improve local search visibility, attract more clients, and dominate your local market with expert GBP management." 
        />
      </Helmet>
      <div className="min-h-screen">
        <Navbar />
        <GBPHero />
        <GBPServices />
        <GBPBenefits />
        <GBPProcess />
        <GBPResults />
        <GBPCTA />
        <Footer />
      </div>
    </>
  );
};

export default GoogleBusinessProfilePage;
