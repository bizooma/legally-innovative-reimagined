
import { Helmet } from "react-helmet-async";
import DonutHero from "@/components/donuts/DonutHero";
import DonutServices from "@/components/donuts/DonutServices";
import DonutCTA from "@/components/donuts/DonutCTA";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";

const DonutsPage = () => {
  // Add even more extensive debug logs to verify the component is rendering
  useEffect(() => {
    console.log("%c DonutsPage MOUNTED", "background: pink; color: black; padding: 4px; font-size: 16px;");
    console.log("Current URL:", window.location.href);
    console.log("Current pathname:", window.location.pathname);
    console.log("Current hash:", window.location.hash);
    console.log("DonutsPage rendering timestamp:", new Date().toISOString());
    
    // Check if component elements exist
    setTimeout(() => {
      console.log("DonutHero element exists:", !!document.querySelector('#donut-hero'));
      console.log("DonutServices element exists:", !!document.querySelector('#donut-services'));
      console.log("DonutCTA element exists:", !!document.querySelector('#schedule-meeting'));
      console.log("Body classes:", document.body.className);
      
      // Add visible indicator to verify page load
      const indicator = document.createElement('div');
      indicator.style.position = 'fixed';
      indicator.style.top = '10px';
      indicator.style.right = '10px';
      indicator.style.background = 'pink';
      indicator.style.padding = '8px';
      indicator.style.borderRadius = '4px';
      indicator.style.zIndex = '9999';
      indicator.innerText = 'Donut Page Active';
      document.body.appendChild(indicator);
    }, 100);
    
    return () => {
      console.log("%c DonutsPage UNMOUNTED", "background: red; color: white; padding: 4px; font-size: 16px;");
    };
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
