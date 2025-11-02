
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import VideoSection from "@/components/VideoSection";
import FAQ from "@/components/FAQ";
import WhyChooseUs from "@/components/WhyChooseUs";
import DemoSite from "@/components/DemoSite";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GoogleMap from "@/components/GoogleMap";
import Newsletter from "@/components/Newsletter";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <VideoSection />
      <FAQ />
      <WhyChooseUs />
      <Contact />
      <DemoSite />
      <Newsletter />
      <GoogleMap />
      <Footer />
    </div>
  );
};

export default Index;
