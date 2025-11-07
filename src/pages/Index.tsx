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
import { useScrollTracking } from "@/hooks/useScrollTracking";
import nonprofitVolunteersBg from "@/assets/nonprofit-volunteers-bg.jpg";

const Index = () => {
  // Track scroll depth for homepage
  useScrollTracking({ pageName: 'Homepage' });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How can AI consulting benefit my company?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI consulting can benefit your company by identifying opportunities to automate repetitive tasks, enhance client interactions through intelligent systems, and provide data-driven insights for better decision-making. Our consultants analyze your specific needs and implement AI solutions that increase efficiency and reduce operational costs."
        }
      },
      {
        "@type": "Question",
        "name": "What is the typical timeline for implementing AI solutions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The implementation timeline varies based on complexity, but typically ranges from 4-12 weeks. We begin with a thorough assessment (1-2 weeks), followed by solution design (1-3 weeks), implementation (2-6 weeks), and training (1-2 weeks). Throughout the process, we work closely with your team to ensure minimal disruption."
        }
      },
      {
        "@type": "Question",
        "name": "What types of mobile apps can Bizooma develop?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We develop various mobile applications including client portals for updates and document sharing, appointment scheduling systems, secure messaging platforms, billing and payment apps, and custom management solutions. Each app is designed with your company's specific workflows and branding in mind for both iOS and Android platforms."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to develop a professional website?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A professional website typically takes 6-10 weeks to develop. This includes discovery and planning (1-2 weeks), design (2-3 weeks), development (2-4 weeks), and testing/launch (1 week). All our websites are mobile-responsive, SEO-friendly, and optimized for conversion."
        }
      },
      {
        "@type": "Question",
        "name": "What digital marketing strategies does Bizooma offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer local SEO optimization, targeted PPC campaigns, content marketing, email nurturing campaigns, and reputation management. We create a custom marketing mix based on your industry, target audience, and competitive landscape, with comprehensive analytics tracking and monthly reporting."
        }
      },
      {
        "@type": "Question",
        "name": "What areas does Bizooma serve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bizooma is based in Jacksonville, Florida and serves clients throughout Florida and the entire United States. We specialize in helping law firms, nonprofits, and startups with AI-powered marketing and development solutions."
        }
      },
      {
        "@type": "Question",
        "name": "What is Bizooma's pricing structure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bizooma offers custom pricing based on your specific needs and project scope. We provide transparent quotes after an initial consultation to understand your goals. Our services range from one-time projects to ongoing monthly retainers, with flexible payment options including major credit cards, bank transfers, and digital payments."
        }
      },
      {
        "@type": "Question",
        "name": "Why is Google Business Profile important?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Google Business Profile significantly impacts local search visibility. A well-optimized profile increases your chances of appearing in the valuable 'Local Pack' results and provides essential information like location, hours, contact details, and client reviews that influence decision-making."
        }
      },
      {
        "@type": "Question",
        "name": "What's the difference between SEO and AEO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SEO (Search Engine Optimization) focuses on ranking your website in traditional search results. AEO (Answer Engine Optimization) specifically targets voice searches and featured snippets by structuring content to directly answer questions. Both are important for comprehensive online visibility."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to see SEO results?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SEO is typically a medium to long-term strategy, with initial improvements visible within 3-6 months. Some ranking improvements for less competitive keywords may appear within the first few months, while more competitive keywords may take 6-12 months to show significant movement."
        }
      },
      {
        "@type": "Question",
        "name": "How can an AI chatbot benefit my business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An AI chatbot provides immediate 24/7 response to inquiries, qualifies leads by collecting key information, answers common questions, schedules consultations, and reduces administrative workload. This improves customer experience by providing instant engagement while ensuring you never miss an opportunity."
        }
      },
      {
        "@type": "Question",
        "name": "What lead generation methods are most effective?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The most effective lead generation methods include optimized landing pages with strong calls-to-action, targeted PPC campaigns, educational content marketing, strategic email nurture campaigns, and reputation management systems that leverage positive reviews. We create comprehensive multi-channel systems tailored to your industry."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Bizooma | AI-Powered Marketing & Development Platforms</title>
        <meta name="description" content="Transform your business with Bizooma's intelligent marketing platforms. Built with AI, analytics, and automation for law firms, nonprofits, and startups seeking measurable growth." />
        <meta property="og:title" content="Bizooma | AI-Powered Marketing & Development Platforms" />
        <meta property="og:description" content="Transform your business with Bizooma's intelligent marketing platforms. Built with AI, analytics, and automation for law firms, nonprofits, and startups seeking measurable growth." />
        <meta property="og:image" content="https://bizooma.com/lovable-uploads/6c062279-8370-45d7-9334-45ada83333a1.png" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
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
      <DemoSite targetAudience="Non-Profits" backgroundImage={nonprofitVolunteersBg} />
      <GoogleMap />
      <Footer />
      <MobileFooterNav />
      </div>
    </>
  );
};

export default Index;
