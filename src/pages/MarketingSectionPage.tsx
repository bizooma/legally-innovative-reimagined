import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { ArrowLeft } from "lucide-react";
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

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <h2 className="text-2xl font-semibold text-foreground mt-0 mb-4">Modern Law Firm Marketing That Actually Drives Cases</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Law firm marketing has changed.
              </p>
              <p className="text-muted-foreground">
                It's no longer just about rankings, impressions, or traffic—it's about connecting with the right client at the right moment and guiding them to take action.
              </p>
              <p className="text-muted-foreground">
                Today's most successful firms understand that marketing is a system made up of three critical layers:
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">1. Visibility</h3>
              <p className="text-muted-foreground">Your firm needs to be found across:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ Search engines like Google</li>
                <li>✅ Local listings and map results</li>
                <li>✅ Paid advertising channels</li>
                <li>✅ Emerging AI-driven search platforms</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">2. Authority</h3>
              <p className="text-muted-foreground">Once found, your firm must build trust quickly:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ Clear, helpful content that answers real client questions</li>
                <li>✅ Strong reviews and reputation signals</li>
                <li>✅ Professional, modern design</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">3. Conversion</h3>
              <p className="text-muted-foreground">This is where most firms fall short.</p>
              <p className="text-muted-foreground">If your website doesn't:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ Clearly guide users</li>
                <li>✅ Provide easy ways to contact you</li>
                <li>✅ Remove friction from the process</li>
              </ul>
              <p className="text-muted-foreground">
                …you're losing cases to firms that do.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-10 mb-3">The Shift: SEO → AEO</h3>
              <p className="text-muted-foreground">Search is evolving.</p>
              <p className="text-muted-foreground">
                Instead of just optimizing for rankings, firms must now optimize for answers—this is known as <strong>Ask Engine Optimization (AEO)</strong>.
              </p>
              <p className="text-muted-foreground">
                Clients aren't just searching anymore. They're asking:
              </p>
              <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
                "Do I need a lawyer for this?"<br />
                "How much is my case worth?"
              </blockquote>
              <p className="text-muted-foreground">
                If your firm isn't answering those questions clearly, you're invisible in the moments that matter most.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-10 mb-3">Our Approach</h3>
              <p className="text-muted-foreground">
                At Bizooma, we don't treat marketing as isolated tactics.
              </p>
              <p className="text-muted-foreground">We build complete marketing systems designed to:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ Attract qualified prospects</li>
                <li>✅ Build trust instantly</li>
              </ul>
            </div>
            <div className="mt-12 text-center">
              <Link to="/route-to-results-newsletter" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Newsletter
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default MarketingSectionPage;
