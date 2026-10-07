import { Helmet } from "react-helmet-async";

const SITE_URL = "https://bizooma.com";
const BUSINESS_NAME = "Bizooma Digital Marketing Agency";
const PHONE = "+1-904-331-8130";
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
    description: "A Jacksonville marketing agency serving law firms and nonprofits. AI marketing and automation, SEO and AEO, websites and apps, and lead generation — plus our own software products.",
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
            name: "AI Marketing & Automation",
            description: "Automating the work a team repeats, with the governance to do it safely."
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO & AEO",
            description: "Being findable in search and citable by AI assistants."
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Websites & Apps",
            description: "Sites built around what a visitor came to do, and apps where one is warranted."
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Lead Generation & Intake",
            description: "Closing the gap between an enquiry arriving and a human replying."
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

        {/* Fallback description for routes that don't set their own */}
        <meta name="description" content="AI marketing, SEO/AEO, web development, mobile apps, and lead generation for law firms, nonprofits, and startups. Offices in Jacksonville, FL and Amarillo, TX." />

        {/* Global JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(organizationLd)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteLd)}</script>
      </Helmet>
  );
};

export default GlobalSEO;
