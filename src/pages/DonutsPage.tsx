
import { Helmet } from "react-helmet-async";
import DonutHero from "@/components/donuts/DonutHero";
import DonutServices from "@/components/donuts/DonutServices";
import DonutCTA from "@/components/donuts/DonutCTA";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";

const DonutsPage = () => {
  // Add more detailed debug logs to verify the component is rendering
  useEffect(() => {
    console.log("DonutsPage component mounted");
    console.log("Current URL:", window.location.href);
    console.log("Current pathname:", window.location.pathname);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Thanks for the Donuts! | Legally Innovative</title>
        <meta name="description" content="Enjoyed your donuts? Learn how Legally Innovative can help your law firm thrive with our innovative marketing and AI solutions." />
      </Helmet>
      
      <Navbar />
      
      <main>
        <DonutHero />
        <DonutServices />
        <DonutCTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default DonutsPage;
