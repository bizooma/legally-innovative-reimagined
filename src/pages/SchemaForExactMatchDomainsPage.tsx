import ArticleLayout from "@/components/ArticleLayout";
import { Building2, Wrench, MessageSquareQuote, Mic, Trophy, Lightbulb } from "lucide-react";
import heroImage from "@/assets/schema-emd-hero.jpg";

const SchemaCard = ({
  icon: Icon,
  number,
  title,
  subtitle,
  children,
}: {
  icon: React.ElementType;
  number: number;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) => (
  <div className="my-8 rounded-xl border border-border bg-card overflow-hidden">
    <div className="bg-gradient-to-r from-legal-primary to-legal-secondary p-4 flex items-center gap-4">
      <div className="bg-white/20 rounded-full p-3">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <span className="text-white/80 text-sm font-medium">Schema #{number}</span>
        <h3 className="text-xl font-bold text-white m-0">{title}</h3>
        <p className="text-white/90 text-sm m-0">{subtitle}</p>
      </div>
    </div>
    <div className="p-6 space-y-3 text-muted-foreground">{children}</div>
  </div>
);

const SchemaForExactMatchDomainsPage = () => {
  const faqs = [
    {
      question: "What is an Exact Match Domain (EMD)?",
      answer: "An Exact Match Domain is a domain name that exactly matches a target keyword phrase, such as seattlecaraccidentlawyer.com. EMDs can deliver strong topical relevance signals when paired with proper structure and schema."
    },
    {
      question: "Why does schema matter for an EMD?",
      answer: "Without schema, an EMD is just a keyword in a URL. With schema, the domain becomes a clearly defined entity that Google, AI Overviews, and voice assistants can confidently surface in answers."
    },
    {
      question: "Which schema types should every EMD use?",
      answer: "At minimum: LocalBusiness/LegalService, Service, FAQ, Speakable, Review/Rating, and Organization with SameAs. Together they define the entity, the offering, the answers, and the authority."
    },
    {
      question: "Will an EMD hurt my main brand's domain authority?",
      answer: "Not when implemented correctly. Using Organization and SameAs schema ties the EMD back to your main brand, social profiles, and Google Business Profile so authority flows together rather than being siloed."
    }
  ];

  return (
    <ArticleLayout
      title="Schema For Exact Match Domains"
      excerpt="Most firms buy an EMD, forward it, and lose the advantage. Here's the schema stack we implement on every EMD site to turn a keyword domain into a search-winning entity."
      date="2026-04-20"
      author="SEO Strategy Team"
      category="SEO"
      image={heroImage}
      faqs={faqs}
    >
      <p className="lead">
        An Exact Match Domain (EMD) like <em>seattlecaraccidentlawyer.com</em> can be one of the
        most powerful assets in a law firm's digital strategy — but only when it's built as a
        structured, AI-ready entity rather than a parked keyword. The difference between firms
        that benefit from EMDs and firms that waste them comes down to schema.
      </p>

      <h2>What We Implement on Every EMD Site</h2>
      <p>
        Below is the exact schema stack we deploy on every Exact Match Domain we build. Each
        layer plays a specific role in how Google, AI Overviews, and voice assistants understand
        and surface the site.
      </p>

      <SchemaCard
        icon={Building2}
        number={1}
        title="LocalBusiness / LegalService Schema"
        subtitle="Anchors the EMD to a real firm, in a real market"
      >
        <p>This is the foundation. It anchors the site to:</p>
        <ul>
          <li>Practice area</li>
          <li>Location</li>
          <li>Contact data</li>
        </ul>
        <p>
          Even if the domain is hyper-specific (like <em>seattlecaraccidentlawyer.com</em>), this
          tells Google: <strong>“This is a real firm serving a real market.”</strong> Without it,
          an EMD looks like a microsite with no operator behind it.
        </p>
        <p className="font-semibold text-foreground mt-4 mb-2">Example:</p>
        <pre className="bg-legal-dark text-white text-xs rounded-lg p-4 overflow-x-auto m-0"><code>{`{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Seattle Car Accident Lawyer",
  "image": "https://seattlecaraccidentlawyer.com/logo.png",
  "url": "https://seattlecaraccidentlawyer.com",
  "telephone": "+1-206-555-1234",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Seattle",
    "addressRegion": "WA",
    "postalCode": "98101",
    "addressCountry": "US"
  },
  "areaServed": {
    "@type": "City",
    "name": "Seattle"
  },
  "priceRange": "$$$"
}`}</code></pre>
      </SchemaCard>

      <SchemaCard
        icon={Wrench}
        number={2}
        title="Service Schema"
        subtitle="The most underrated layer for EMDs"
      >
        <p>
          This is where EMDs really shine. We explicitly define the service that matches the
          domain:
        </p>
        <ul>
          <li>Car Accident Representation</li>
          <li>Personal Injury Claims</li>
          <li>Wrongful Death Cases</li>
        </ul>
        <p>
          The Service schema aligns perfectly with the exact-match keyword in the domain,
          reinforcing topical relevance at both the URL level and the structured-data level.
        </p>
        <p className="font-semibold text-foreground mt-4 mb-2">Example:</p>
        <pre className="bg-legal-dark text-white text-xs rounded-lg p-4 overflow-x-auto m-0"><code>{`{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Car Accident Lawyer",
  "provider": {
    "@type": "LegalService",
    "name": "Seattle Car Accident Lawyer"
  },
  "areaServed": {
    "@type": "City",
    "name": "Seattle"
  },
  "description": "Legal representation for car accident victims in Seattle, Washington."
}`}</code></pre>
      </SchemaCard>

      <SchemaCard
        icon={MessageSquareQuote}
        number={3}
        title="FAQ Schema"
        subtitle="The AEO + Voice SEO driver"
      >
        <p>This is critical for:</p>
        <ul>
          <li>Google AI Overviews</li>
          <li>Voice assistants</li>
          <li>Featured snippets</li>
        </ul>
        <p>We structure questions like:</p>
        <ul>
          <li>“What should I do after a car accident in Seattle?”</li>
          <li>“How much is my case worth?”</li>
        </ul>
        <p>
          Properly formatted FAQ schema feeds directly into AI-generated answers — putting your
          EMD in the response itself, not just the link list.
        </p>
        <p className="font-semibold text-foreground mt-4 mb-2">Example:</p>
        <pre className="bg-legal-dark text-white text-xs rounded-lg p-4 overflow-x-auto m-0"><code>{`{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What should I do after a car accident in Seattle?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Seek medical attention, document the scene, and contact a car accident lawyer as soon as possible."
      }
    },
    {
      "@type": "Question",
      "name": "How much is my car accident case worth?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Case value depends on injuries, liability, and damages. A consultation can help estimate your claim."
      }
    }
  ]
}`}</code></pre>
      </SchemaCard>

      <SchemaCard
        icon={Mic}
        number={4}
        title="Speakable Schema"
        subtitle="The voice-search play most firms ignore"
      >
        <p>This is where most firms are completely behind.</p>
        <p>
          We mark key sections of content as: <strong>“Ready to be read aloud by voice
          assistants.”</strong>
        </p>
        <p>Perfect for queries like:</p>
        <ul>
          <li>“Hey Siri, find me a car accident lawyer in Seattle.”</li>
          <li>“Alexa, who handles personal injury cases nearby?”</li>
        </ul>
      </SchemaCard>

      <h2>Why This Matters (Big Picture)</h2>
      <div className="my-8 rounded-xl border border-border bg-accent/40 p-6">
        <div className="flex items-start gap-3">
          <Lightbulb className="h-6 w-6 text-legal-accent flex-shrink-0 mt-1" />
          <div>
            <p className="m-0">
              <strong>An EMD without schema is just a keyword.</strong>
            </p>
            <p className="mt-3 mb-0">
              An EMD with schema becomes a clearly defined entity in Google's ecosystem — and
              that's what wins in AI search, voice search, and future algorithm updates.
            </p>
          </div>
        </div>
      </div>

      <h2>The Takeaway</h2>
      <div className="grid md:grid-cols-3 gap-4 my-8 not-prose">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="text-sm font-semibold text-muted-foreground mb-2">Most firms</div>
          <ul className="text-sm space-y-1 m-0 pl-4 list-disc text-foreground">
            <li>Buy the domain</li>
            <li>Forward it</li>
            <li>Lose the advantage</li>
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="text-sm font-semibold text-muted-foreground mb-2">Some firms</div>
          <ul className="text-sm space-y-1 m-0 pl-4 list-disc text-foreground">
            <li>Build a page</li>
          </ul>
        </div>
        <div className="rounded-xl border-2 border-legal-primary bg-legal-primary/5 p-5">
          <div className="text-sm font-semibold text-legal-primary mb-2">Very few firms</div>
          <ul className="text-sm space-y-1 m-0 pl-4 list-disc text-foreground">
            <li>Build a structured, AI-ready asset</li>
          </ul>
        </div>
      </div>

      <div className="my-8 rounded-xl bg-gradient-to-r from-legal-primary to-legal-secondary p-8 text-center">
        <Trophy className="h-10 w-10 text-white mx-auto mb-3" />
        <p className="text-white text-xl font-semibold m-0">
          That's the difference between having a domain… and owning a search position.
        </p>
      </div>
    </ArticleLayout>
  );
};

export default SchemaForExactMatchDomainsPage;
