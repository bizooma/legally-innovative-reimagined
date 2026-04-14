import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import bannerInsights from "@/assets/banner_insights_hero.png";

const InsightsSectionPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Insights | Route to Results Newsletter | Bizooma</title>
        <meta name="description" content="Key takeaways, summaries, and actionable insights from Bizooma's Route to Results newsletter." />
      </Helmet>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section
          className="relative overflow-hidden bg-cover bg-center bg-no-repeat aspect-[3/1]"
          style={{ backgroundImage: `url(${bannerInsights})` }}
        >
          <h1 className="sr-only">Insights</h1>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <h2 className="text-2xl font-semibold text-foreground mt-0 mb-4">What We're Seeing Across Law Firms Right Now</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every week, we work with law firms across the country—and clear patterns are emerging.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">1. Traffic Isn't the Problem</h3>
              <p className="text-muted-foreground">Many firms are getting visitors.</p>
              <p className="text-muted-foreground">But those visitors aren't converting.</p>
              <p className="text-muted-foreground">Why?</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>⚠️ Confusing websites</li>
                <li>⚠️ Slow response times</li>
                <li>⚠️ Lack of clear next steps</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">2. Speed Wins</h3>
              <p className="text-muted-foreground">
                The firms capturing the most cases aren't always the biggest or the most visible.
              </p>
              <p className="text-muted-foreground">They're the ones that:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ Respond immediately</li>
                <li>✅ Make it easy to connect</li>
                <li>✅ Follow up consistently</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">3. Systems Beat Tactics</h3>
              <p className="text-muted-foreground">
                Running ads, improving SEO, or redesigning a website can all help…
              </p>
              <p className="text-muted-foreground">
                But without a connected system, results are inconsistent.
              </p>
              <p className="text-muted-foreground">The firms growing the fastest are building:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ Integrated marketing systems</li>
                <li>✅ Automated intake processes</li>
                <li>✅ Data-driven decision frameworks</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">4. Perception Matters</h3>
              <p className="text-muted-foreground">From the client's perspective, the firm that:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ Responds first</li>
                <li>✅ Feels modern</li>
                <li>✅ Communicates clearly</li>
              </ul>
              <p className="text-muted-foreground">…is often seen as the better choice.</p>

              <h3 className="text-xl font-semibold text-foreground mt-10 mb-3">Our Take</h3>
              <p className="text-muted-foreground">The future of law firm marketing isn't about doing more.</p>
              <p className="text-muted-foreground">
                It's about building smarter, faster, more connected systems.
              </p>
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

export default InsightsSectionPage;
