
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MeetJoe from "@/components/MeetJoe";
import Services from "@/components/Services";
import VideoSection from "@/components/VideoSection";
import FAQ from "@/components/FAQ";
import WhyChooseUs from "@/components/WhyChooseUs";
import DemoSite from "@/components/DemoSite";
import MarketingProducts from "@/components/MarketingProducts";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GoogleMap from "@/components/GoogleMap";
import Newsletter from "@/components/Newsletter";
import MobileFooterNav from "@/components/MobileFooterNav";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <MeetJoe />
      <Services />
      <VideoSection />
      <MarketingProducts />
      <FAQ />
      <WhyChooseUs />
      <Contact />
      <DemoSite />
      <Newsletter />
      <GoogleMap />
      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default Index;
