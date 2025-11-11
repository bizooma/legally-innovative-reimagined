import { Helmet } from "react-helmet-async";

const SITE_URL = "https://bizooma.com";
const BUSINESS_NAME = "Bizooma Digital Marketing Agency";
const PHONE = "+1-904-295-6670";
const LOGO_URL = `${SITE_URL}/lovable-uploads/6c062279-8370-45d7-9334-45ada83333a1.png`;

const GlobalSEO = () => {
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService", "MarketingAgency", "LocalBusiness"],
    name: BUSINESS_NAME,
    legalName: "Bizooma LLC",
    url: SITE_URL,
    telephone: PHONE,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: "600",
      height: "600"
    },
    description: "Jacksonville's premier digital marketing agency specializing in AI-powered marketing, SEO/AEO optimization, web development, mobile apps, and lead generation for law firms, nonprofits, and local businesses.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "200 N Laura St",
      addressLocality: "Jacksonville",
      addressRegion: "FL",
      postalCode: "32202",
      addressCountry: "US"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "30.3282",
      longitude: "-81.6616"
    },
    areaServed: [
      {
        "@type": "State",
        name: "Florida"
      },
      {
        "@type": "Country",
        name: "United States"
      }
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "30.3282",
        longitude: "-81.6616"
      },
      geoRadius: "100000"
    },
    email: "joe@bizooma.com",
    foundingDate: "2020",
    founder: {
      "@type": "Person",
      name: "Joe Murphy"
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: PHONE,
      contactType: "customer service",
      email: "joe@bizooma.com",
      areaServed: "US",
      availableLanguage: ["English"]
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1"
    },
    priceRange: "$$$",
    paymentAccepted: ["Cash", "Credit Card", "Debit Card", "Bank Transfer", "Check", "PayPal", "Venmo"],
    currenciesAccepted: "USD",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00"
      }
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Marketing & Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO & AEO Optimization",
            description: "Search engine and answer engine optimization for maximum online visibility"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Chatbot Development",
            description: "Custom AI-powered chatbots for customer support and lead generation"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website Development",
            description: "Custom website design and development for businesses"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Digital Marketing",
            description: "Comprehensive digital marketing strategies and campaign management"
          }
        }
      ]
    }
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BUSINESS_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
      <Helmet>
        {/* Global defaults for social */}
        <meta property="og:site_name" content={BUSINESS_NAME} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="KGi7cTbcqjyL6GMPEq14A0Iwg55cc6flZO0ObLKPbQM" />

        {/* Global JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(organizationLd)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteLd)}</script>
      </Helmet>
  );
};

export default GlobalSEO;
