import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { ArrowLeft, Search, Shield, MousePointerClick, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import bannerMarketing from "@/assets/banner_marketing_hero.png";

const MarketingSectionPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Marketing | Route to Results Newsletter | Bizooma</title>
        <meta name="description" content="Digital marketing strategies, SEO/AEO, lead generation, and branding tips from Bizooma's Route to Results newsletter." />
      </Helmet>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section
          className="relative overflow-hidden bg-cover bg-center bg-no-repeat aspect-[3/1]"
          style={{ backgroundImage: `url(${bannerMarketing})` }}
        >
          <h1 className="sr-only">Marketing</h1>
        </section>

        {/* Intro */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Modern Law Firm Marketing That Actually Drives Cases</h2>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Law firm marketing has changed. It's no longer just about rankings, impressions, or traffic—it's about connecting with the right client at the right moment and guiding them to take action.
            </p>
            <p className="text-lg text-muted-foreground mt-4 max-w-3xl">
              Today's most successful firms understand that marketing is a system made up of three critical layers:
            </p>
          </div>
        </section>

        {/* Three Pillars */}
        <section className="pb-16 lg:pb-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Visibility */}
              <div className="rounded-xl border border-border bg-card p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">1. Visibility</h3>
                <p className="text-muted-foreground mb-4">Your firm needs to be found across:</p>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Search engines like Google</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Local listings and map results</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Paid advertising channels</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Emerging AI-driven search platforms</li>
                </ul>
              </div>

              {/* Authority */}
              <div className="rounded-xl border border-border bg-card p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">2. Authority</h3>
                <p className="text-muted-foreground mb-4">Once found, your firm must build trust quickly:</p>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Clear, helpful content that answers real client questions</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Strong reviews and reputation signals</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Professional, modern design</li>
                </ul>
              </div>

              {/* Conversion */}
              <div className="rounded-xl border border-border bg-card p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <MousePointerClick className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">3. Conversion</h3>
                <p className="text-muted-foreground mb-4">This is where most firms fall short. If your website doesn't:</p>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Clearly guide users</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Provide easy ways to contact you</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Remove friction from the process</li>
                </ul>
                <p className="text-muted-foreground text-sm mt-4">…you're losing cases to firms that do.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SEO → AEO */}
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">The Shift: SEO → AEO</h3>
                <p className="text-muted-foreground mb-4">Search is evolving.</p>
                <p className="text-muted-foreground mb-4">
                  Instead of just optimizing for rankings, firms must now optimize for answers—this is known as <strong className="text-foreground">Ask Engine Optimization (AEO)</strong>.
                </p>
                <p className="text-muted-foreground">
                  Clients aren't just searching anymore. They're asking questions—and if your firm isn't answering clearly, you're invisible in the moments that matter most.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-8">
                <Lightbulb className="w-8 h-8 text-primary mb-4" />
                <p className="text-lg font-medium text-foreground mb-4">Clients are asking:</p>
                <blockquote className="border-l-4 border-primary pl-4 space-y-3">
                  <p className="text-muted-foreground italic">"Do I need a lawyer for this?"</p>
                  <p className="text-muted-foreground italic">"How much is my case worth?"</p>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">Our Approach</h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-3xl">
              At Bizooma, we don't treat marketing as isolated tactics. We build complete marketing systems designed to:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-5">
                <span className="text-primary font-bold text-lg">✓</span>
                <span className="text-foreground font-medium">Attract qualified prospects</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-5">
                <span className="text-primary font-bold text-lg">✓</span>
                <span className="text-foreground font-medium">Build trust instantly</span>
              </div>
            </div>
          </div>
        </section>

        {/* Back Link */}
        <section className="pb-16">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <Link to="/route-to-results-newsletter" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Newsletter
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default MarketingSectionPage;
