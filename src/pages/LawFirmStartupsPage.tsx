import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Scale,
  Globe,
  Mail,
  MapPin,
  Search,
  Star,
  Share2,
  PenTool,
  Megaphone,
  BarChart3,
  Bot,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    icon: Scale,
    title: "Lock Down Your Brand & Entity",
    summary: "Before a single pixel goes live, formalize the firm.",
    actions: [
      "Register your PLLC/PA/LLP with the state and obtain an EIN.",
      "Secure your firm name across the .com (and .law if relevant) plus all major social handles.",
      "Order a malpractice insurance quote — many marketing decisions hinge on practice area scope.",
      "Design a clean, professional logo and choose 2 brand colors and 2 fonts. Keep it conservative.",
    ],
  },
  {
    icon: Mail,
    title: "Set Up Professional Email & Phone",
    summary: "Never market with a Gmail address.",
    actions: [
      "Set up Google Workspace on your custom domain (you@yourfirm.com).",
      "Get a dedicated business phone line — we recommend a VoIP provider with call recording and forwarding.",
      "Configure a professional voicemail and an email signature with your bar number, address, and disclaimer.",
      "Add SPF, DKIM, and DMARC records so your emails actually reach the inbox.",
    ],
  },
  {
    icon: Globe,
    title: "Build a Conversion-Focused Website",
    summary: "Your website is your 24/7 intake associate.",
    actions: [
      "Map out core pages: Home, About, each Practice Area, Attorney Bios, Contact, Blog, Privacy Policy, Disclaimer.",
      "Write copy for the client — focus on their problem, not your accolades.",
      "Place a phone number, contact form, and live chat above the fold on every page.",
      "Make it mobile-first, fast (under 2s load), and ADA accessible.",
      "Install SSL, set up a backup system, and configure a staging environment.",
    ],
    cta: { label: "See our website development", href: "/law-firm-website-development" },
  },
  {
    icon: MapPin,
    title: "Claim & Optimize Your Google Business Profile",
    summary: "Local search is where 80% of new clients start.",
    actions: [
      "Claim your GBP and verify with a physical address (not a PO box).",
      "Choose the most specific primary category (e.g., \"Personal Injury Attorney\" not \"Lawyer\").",
      "Upload 10+ high-quality photos of your office, team, and signage.",
      "Add services, hours, attributes, and a keyword-rich (but natural) business description.",
      "Post weekly updates — Google rewards active profiles.",
    ],
    cta: { label: "GBP optimization details", href: "/google-business-profile-optimization" },
  },
  {
    icon: Search,
    title: "Lay the SEO, AEO & Voice Search Foundation",
    summary: "Get found on Google, ChatGPT, and Alexa.",
    actions: [
      "Conduct keyword research around your practice areas + city (\"Jacksonville DUI lawyer\").",
      "Create one in-depth practice area page per service you offer — 1,000+ words minimum.",
      "Add LegalService and Attorney schema markup to every relevant page.",
      "Submit your sitemap to Google Search Console and Bing Webmaster Tools.",
      "Structure FAQ content so AI assistants (ChatGPT, Gemini, Alexa) can quote you.",
    ],
    cta: { label: "SEO / AEO / Voice SEO", href: "/law-firm-seo-aeo-voiceseo" },
  },
  {
    icon: Star,
    title: "Build a Review Generation Engine",
    summary: "Reviews are the #1 local ranking factor and the #1 hiring factor.",
    actions: [
      "Pick a review platform priority order: Google → Avvo → Yelp → Facebook.",
      "Build a written process: every closed matter gets a review request within 48 hours.",
      "Use SMS (not just email) — text requests get 5x the response rate.",
      "Respond to every review, positive or negative, within 24 hours.",
      "Display 5-star reviews prominently on your homepage and practice area pages.",
    ],
    cta: { label: "Why reviews matter", href: "/why-reviews-matter-for-law-firms" },
  },
  {
    icon: PenTool,
    title: "Launch a Content Strategy",
    summary: "Educate prospects, earn trust, and rank in search.",
    actions: [
      "Commit to publishing 2–4 blog posts per month answering real client questions.",
      "Repurpose every post into a short LinkedIn article, an Instagram carousel, and a TikTok/Reel.",
      "Build pillar pages around your top practice areas and link supporting blog posts to them.",
      "Add a clear CTA (book a consult, call, download) to every piece of content.",
    ],
  },
  {
    icon: Share2,
    title: "Set Up the Right Social Channels",
    summary: "Pick 2 platforms — do them well — ignore the rest.",
    actions: [
      "LinkedIn for referral attorneys and B2B work.",
      "Instagram + TikTok for consumer practice areas (PI, family, criminal).",
      "Facebook for community presence and review collection.",
      "Use a scheduler (Buffer, Later) to batch a month of content in one sitting.",
    ],
  },
  {
    icon: Bot,
    title: "Add an AI Chatbot & Intake Automation",
    summary: "Capture leads at 2am while you sleep.",
    actions: [
      "Deploy a chatbot trained on your practice areas to qualify leads 24/7.",
      "Automate intake: chatbot → CRM → text/email notification → calendar booking.",
      "Pre-screen for conflicts and jurisdiction before a human ever touches the lead.",
      "Route hot leads (e.g., recent car accident) directly to a phone call.",
    ],
    cta: { label: "AI chatbots for law firms", href: "/ai-customer-support-chatbots" },
  },
  {
    icon: Megaphone,
    title: "Turn On Paid Acquisition (Carefully)",
    summary: "Don't spend a dollar on ads until everything above is done.",
    actions: [
      "Start with Google Local Services Ads (LSAs) — pay-per-lead, Google-screened badge.",
      "Layer in Google Search Ads on high-intent keywords (\"hire a [practice area] lawyer near me\").",
      "Build retargeting audiences from website visitors using Meta Pixel + Google Tag Manager.",
      "Set a strict daily budget cap and review CPL weekly for the first 90 days.",
    ],
    cta: { label: "Lead generation services", href: "/law-firm-lead-generation" },
  },
  {
    icon: BarChart3,
    title: "Install Analytics & Tracking from Day One",
    summary: "If you can't measure it, you can't grow it.",
    actions: [
      "Install Google Analytics 4 + Google Tag Manager + Search Console.",
      "Set up call tracking with dynamic number insertion (CallRail or similar).",
      "Track form submissions, chat conversions, and clicks-to-call as conversion events.",
      "Build a one-page weekly dashboard: leads, source, cost-per-lead, signed cases.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Stay Compliant & Protect the Firm",
    summary: "State bar advertising rules will end your marketing fast if you ignore them.",
    actions: [
      "Read your state bar's attorney advertising rules — twice. Most prohibit guarantees and require disclaimers.",
      "Add a Privacy Policy, Terms, and Attorney Advertising disclaimer to your website footer.",
      "Never publish a client testimonial without written, signed consent.",
      "Keep records of every ad creative for the period your bar requires (often 2+ years).",
    ],
  },
];

const LawFirmStartupsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Launch a New Law Firm's Web Presence and Marketing",
    description:
      "A step-by-step playbook for new law firms to build their brand, website, local search presence, content engine, and paid acquisition.",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.summary,
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Law Firm Startups: Step-by-Step Web & Marketing Launch Guide</title>
        <meta
          name="description"
          content="A practical, step-by-step playbook for new law firms launching their website, SEO, Google Business Profile, reviews, content, ads, and intake automation."
        />
        <link rel="canonical" href="https://bizooma.com/law-firm-startups" />
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      </Helmet>

      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-legal-primary via-legal-primary to-legal-dark text-white overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <Scale className="h-4 w-4" />
              <span className="text-sm font-medium">For New & Solo Law Firms</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              The Law Firm Startup Playbook
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Step-by-step instructions to launch your firm's web presence and start
              generating real cases — in the right order.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <a href="#steps">
                  Start the Playbook <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/40 hover:bg-white hover:text-legal-primary"
              >
                <Link to="/#contact">Book a Strategy Call</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Why the order matters
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            New firms often jump straight to running ads or building a fancy logo
            before the fundamentals exist. We've helped dozens of attorneys launch —
            and the firms that grow fastest follow the same sequence below.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Each step builds on the previous one. Skip step 4 and your ads in step 10
            will burn money. Skip step 12 and the bar will end your marketing for you.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section id="steps" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <Card
                  key={idx}
                  className="overflow-hidden border-2 hover:border-legal-primary/40 transition-colors"
                >
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0 flex md:flex-col items-center md:items-start gap-4">
                        <div className="bg-legal-primary text-white rounded-full w-14 h-14 flex items-center justify-center font-bold text-xl">
                          {String(idx + 1).padStart(2, "0")}
                        </div>
                        <div className="bg-legal-primary/10 rounded-full w-14 h-14 flex items-center justify-center">
                          <Icon className="h-7 w-7 text-legal-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-bold mb-2 text-legal-dark">
                          {step.title}
                        </h3>
                        <p className="text-lg text-muted-foreground italic mb-4">
                          {step.summary}
                        </p>
                        <ul className="space-y-3">
                          {step.actions.map((action, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-legal-primary flex-shrink-0 mt-0.5" />
                              <span className="text-foreground leading-relaxed">
                                {action}
                              </span>
                            </li>
                          ))}
                        </ul>
                        {step.cta && (
                          <div className="mt-6">
                            <Button asChild variant="outline">
                              <Link to={step.cta.href}>
                                {step.cta.label}{" "}
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-legal-primary to-legal-dark text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Want us to handle steps 3 through 12?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            We build the website, claim the GBP, set up the SEO, deploy the chatbot,
            and run the ads — so you can focus on practicing law.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link to="/#contact">Book a Free Strategy Call</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-white/40 hover:bg-white hover:text-legal-primary"
            >
              <Link to="/law-firm-digital-marketing">See All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default LawFirmStartupsPage;