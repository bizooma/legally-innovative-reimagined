import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trackServiceView, trackCTAClick, trackNavigation } from "@/utils/gtmTracking";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { PhoneCall, Clock, Brain, Contact, Headset, Building2, HeartHandshake, Briefcase, ArrowRight, CheckCircle2 } from "lucide-react";

/** AI Receptionist service page */
const AIReceptionist = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    trackServiceView('AI Receptionist');
  }, []);

  useScrollTracking({ pageName: 'AI Receptionist' });

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Bizooma - AI Receptionist",
    "url": "https://bizooma.com/ai-receptionist",
    "telephone": "+1-904-331-8130",
    "description": "An AI receptionist that answers every call 24/7, qualifies callers, and hands your team a clean summary. Built and trained on your business by Bizooma.",
    "serviceType": "AI Receptionist",
    "provider": {
      "@type": "Organization",
      "name": "Bizooma Digital Marketing Agency",
      "url": "https://bizooma.com"
    }
  };

  const whatItDoes = [
    {
      icon: Clock,
      title: "Answers instantly, 24/7",
      description: "No hold music, no voicemail, no after-hours gap."
    },
    {
      icon: Brain,
      title: "Understands what the caller needs",
      description: "It's trained on your services, hours, and the questions your callers actually ask."
    },
    {
      icon: Contact,
      title: "Captures contact details accurately",
      description: "Phone numbers and email addresses are read back and confirmed on the call, so the lead you get is a lead you can actually reach."
    },
    {
      icon: Headset,
      title: "Hands off cleanly",
      description: "Your team gets a structured summary — who called, what they wanted, how urgent it is, and how to reach them."
    }
  ];

  const whereItFits = [
    {
      icon: Building2,
      title: "Law firms",
      description: "Capture intake calls after hours and route urgent matters immediately."
    },
    {
      icon: HeartHandshake,
      title: "Nonprofits",
      description: "Answer donor and volunteer questions without adding staff."
    },
    {
      icon: Briefcase,
      title: "Small business",
      description: "Stop losing jobs to the competitor who picked up first."
    }
  ];

  return (
    <>
      <Helmet>
        <title>AI Receptionist for Law Firms & Small Business | Bizooma</title>
        <meta
          name="description"
          content="An AI receptionist that answers every call 24/7, qualifies callers, and hands your team a clean summary. Built and trained on your business by Bizooma."
        />
        <link rel="canonical" href="https://bizooma.com/ai-receptionist" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>
      <div className="min-h-screen">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-background">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_60%)]" />
          <div className="container mx-auto px-4 pt-32 pb-24 lg:pt-40 lg:pb-32">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                <PhoneCall className="h-8 w-8" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
                Never Miss Another Call
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Most businesses lose more revenue to unanswered phones than to any marketing problem. Calls come in after hours, during court, on weekends, and while the line is already busy — and the caller simply moves on to the next name on the list. Our AI receptionist answers on the first ring, every time, and sounds like it works for you because it was trained on your business.
              </p>
              <Button asChild size="lg" className="gap-2"
                onClick={() => trackCTAClick('AI Receptionist Hero Contact', 'ai-receptionist')}
              >
                <Link
                  to="/#contact"
                  onClick={() => trackNavigation('/#contact', 'Contact Us')}
                >
                  Get a Consultation <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* What it does on every call */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">What it does on every call</h2>
            <p className="text-muted-foreground">Your callers get a consistent, professional experience — and you get structured information you can act on.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whatItDoes.map((item) => (
              <Card key={item.title} className="border hover:border-primary/40 transition-colors">
                <CardContent className="pt-6">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Built for your business */}
        <section className="border-y bg-muted/30">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground text-center">Built for your business, not from a template</h2>
              <p className="text-lg text-muted-foreground text-center mb-10">
                A generic answering bot reads a script and frustrates people. We build yours around a knowledge base written specifically for your business — your services, your intake process, your pricing rules, and the things it is not allowed to say. It routes existing clients differently from new prospects, flags urgent calls, and when it doesn't know something, it says so instead of guessing.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Trained on your specific services and FAQs",
                  "Routes existing clients differently from new leads",
                  "Flags urgent calls for immediate attention",
                  "Never invents answers outside its knowledge base"
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Where it fits */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Where it fits</h2>
            <p className="text-muted-foreground">Any business that answers a phone can stop losing opportunities to missed calls.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {whereItFits.map((item) => (
              <Card key={item.title} className="border hover:border-primary/40 transition-colors">
                <CardContent className="pt-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="border-t">
          <div className="container mx-auto px-4 py-20 text-center">
            <PhoneCall className="h-10 w-10 mx-auto text-primary mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Hear it for yourself</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Call our main line and you'll be talking to one. Then book a call and we'll scope one for your business.
            </p>
            <Button asChild size="lg" className="gap-2"
              onClick={() => trackCTAClick('AI Receptionist Bottom Contact', 'ai-receptionist')}
            >
              <Link
                to="/#contact"
                onClick={() => trackNavigation('/#contact', 'Contact Us')}
              >
                Get in Touch <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        <Footer />
        <MobileFooterNav />
      </div>
    </>
  );
};

export default AIReceptionist;
