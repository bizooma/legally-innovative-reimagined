
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import ogImage from "@/assets/og/og-website-dev.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import WebsiteDevHero from "@/components/website-dev/WebsiteDevHero";
import WebsiteDevServices from "@/components/website-dev/WebsiteDevServices";
import WebsiteDevProcess from "@/components/website-dev/WebsiteDevProcess";
import WebsiteDevBenefits from "@/components/website-dev/WebsiteDevBenefits";
import WebsiteDevPortfolio from "@/components/website-dev/WebsiteDevPortfolio";
import WebsiteDevCTA from "@/components/website-dev/WebsiteDevCTA";
import { trackServiceView } from "@/utils/gtmTracking";
import { useScrollTracking } from "@/hooks/useScrollTracking";

const LawFirmWebsiteDevelopmentPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    trackServiceView('Law Firm Website Development');
  }, []);

  // Track scroll depth
  useScrollTracking({ pageName: 'Website Development' });

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Bizooma Digital Marketing Agency - Website Development",
    "image": "https://bizooma.com/lovable-uploads/6c062279-8370-45d7-9334-45ada83333a1.png",
    "url": "https://bizooma.com/law-firm-website-development",
    "telephone": "+1-904-295-6670",
    "priceRange": "$5,000 - $15,000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "200 N Laura St",
      "addressLocality": "Jacksonville",
      "addressRegion": "FL",
      "postalCode": "32202",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "30.3322",
      "longitude": "-81.6557"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Jacksonville",
        "@id": "https://en.wikipedia.org/wiki/Jacksonville,_Florida"
      },
      {
        "@type": "State",
        "name": "Florida"
      }
    ],
    "description": "Professional website development for law firms in Jacksonville. Custom designs, responsive layouts, SEO optimization, and compliance-focused solutions to grow your legal practice online.",
    "serviceType": "Website Development",
    "provider": {
      "@type": "Organization",
      "name": "Bizooma Digital Marketing Agency",
      "url": "https://bizooma.com"
    }
  };

  return (
    <>
      <Helmet>
        <title>Jacksonville Website Development for Law Firms | Bizooma</title>
        <meta 
          name="description" 
          content="Jacksonville website development for law firms. Custom designs, responsive layouts, SEO optimization, and compliance-focused solutions to grow your legal practice online." 
        />
        <meta property="og:title" content="Jacksonville Website Development for Law Firms | Bizooma" />
        <meta property="og:description" content="Custom, responsive, SEO-ready websites for law firms — built to grow your legal practice." />
        <meta property="og:image" content={`https://bizooma.com${ogImage}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`https://bizooma.com${ogImage}`} />
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
