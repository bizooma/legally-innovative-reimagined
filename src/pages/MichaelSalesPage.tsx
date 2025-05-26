
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import MichaelHero from "@/components/michael/MichaelHero";
import MichaelEmployeeBio from "@/components/michael/MichaelEmployeeBio";
import MichaelCalendlySection from "@/components/michael/MichaelCalendlySection";
import MichaelCTA from "@/components/michael/MichaelCTA";

const MichaelSalesPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <MichaelHero />
      <MichaelEmployeeBio />
      <Services />
      <MichaelCalendlySection />
      <MichaelCTA />
      <Footer />
    </div>
  );
};

export default MichaelSalesPage;
