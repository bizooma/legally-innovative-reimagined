import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://bizooma.com";

const CanonicalMeta = () => {
  const { pathname } = useLocation();
  const canonical = `${SITE_URL}${pathname}`;

  // Breadcrumbs built from the path
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    ...segments.map((seg, idx) => ({
      "@type": "ListItem",
      position: idx + 2,
      name: decodeURIComponent(seg.replace(/-/g, " ")).replace(/\b\w/g, c => c.toUpperCase()),
      item: `${SITE_URL}/${segments.slice(0, idx + 1).join("/")}`,
    })),
  ];

  const breadcrumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  // Speakable (basic) for key pages
  const isSpeakablePath = pathname === "/" || pathname === "/law-firm-seo-aeo-voiceseo";
  const speakableLd = isSpeakablePath
    ? {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: canonical,
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [
            "h1",
            "h2",
            "p",
          ],
        },
      }
    : null;

  // Article for specific page
  const articleLd = pathname === "/voice-seo-aeo-stats"
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Voice SEO & AEO Stats for Law Firms",
        mainEntityOfPage: canonical,
        author: {
          "@type": "Organization",
          name: "Bizooma",
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: "Bizooma",
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/lovable-uploads/6c062279-8370-45d7-9334-45ada83333a1.png`,
          },
        },
        dateModified: "2025-08-10",
        datePublished: "2024-01-01",
      }
    : null;

  return (
    <Helmet>
      <link rel="canonical" href={canonical} />
      <meta property="og:url" content={canonical} />
      <link rel="alternate" hrefLang="en" href={canonical} />

      <script type="application/ld+json">{JSON.stringify(breadcrumbsLd)}</script>
      {speakableLd && (
        <script type="application/ld+json">{JSON.stringify(speakableLd)}</script>
      )}
      {articleLd && (
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
      )}
    </Helmet>
  );
};

export default CanonicalMeta;
