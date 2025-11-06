import { Helmet } from "react-helmet-async";
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
    <>
      <Helmet>
        <title>Bizooma | AI-Powered Marketing & Development Platforms</title>
        <meta name="description" content="Transform your business with Bizooma's intelligent marketing platforms. Built with AI, analytics, and automation for law firms, nonprofits, and startups seeking measurable growth." />
        <meta property="og:title" content="Bizooma | AI-Powered Marketing & Development Platforms" />
        <meta property="og:description" content="Transform your business with Bizooma's intelligent marketing platforms. Built with AI, analytics, and automation for law firms, nonprofits, and startups seeking measurable growth." />
        <meta property="og:image" content="https://bizooma.com/lovable-uploads/6c062279-8370-45d7-9334-45ada83333a1.png" />
      </Helmet>
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
    </>
  );
};

export default Index;
