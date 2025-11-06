import { Helmet } from "react-helmet-async";

const SITE_URL = "https://bizooma.com";
const BUSINESS_NAME = "Bizooma";
const PHONE = "+1-904-295-6670";
const LOGO_URL = `${SITE_URL}/lovable-uploads/6c062279-8370-45d7-9334-45ada83333a1.png`;

const GlobalSEO = () => {
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: BUSINESS_NAME,
    url: SITE_URL,
    telephone: PHONE,
    logo: LOGO_URL,
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
