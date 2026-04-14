import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { ArrowLeft, TrendingUp, Clock, Settings, Eye } from "lucide-react";
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

        {/* Intro */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">What We're Seeing Across Law Firms Right Now</h2>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Every week, we work with law firms across the country—and clear patterns are emerging.
            </p>
          </div>
        </section>

        {/* Four Insights Grid */}
        <section className="pb-16 lg:pb-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8">
              {/* 1. Traffic */}
              <div className="rounded-xl border border-border bg-card p-8">
                <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-5">
                  <TrendingUp className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">1. Traffic Isn't the Problem</h3>
                <p className="text-muted-foreground mb-4">
                  Many firms are getting visitors. But those visitors aren't converting. Why?
                </p>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2"><span className="text-destructive mt-0.5">✗</span> Confusing websites</li>
                  <li className="flex items-start gap-2"><span className="text-destructive mt-0.5">✗</span> Slow response times</li>
                  <li className="flex items-start gap-2"><span className="text-destructive mt-0.5">✗</span> Lack of clear next steps</li>
                </ul>
              </div>

              {/* 2. Speed */}
              <div className="rounded-xl border border-border bg-card p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">2. Speed Wins</h3>
                <p className="text-muted-foreground mb-4">
                  The firms capturing the most cases aren't always the biggest or the most visible. They're the ones that:
                </p>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Respond immediately</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Make it easy to connect</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Follow up consistently</li>
                </ul>
              </div>

              {/* 3. Systems */}
              <div className="rounded-xl border border-border bg-card p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">3. Systems Beat Tactics</h3>
                <p className="text-muted-foreground mb-4">
                  Running ads, improving SEO, or redesigning a website can all help… but without a connected system, results are inconsistent.
                </p>
                <p className="text-muted-foreground text-sm mb-3">The firms growing the fastest are building:</p>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Integrated marketing systems</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Automated intake processes</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Data-driven decision frameworks</li>
                </ul>
              </div>

              {/* 4. Perception */}
              <div className="rounded-xl border border-border bg-card p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">4. Perception Matters</h3>
                <p className="text-muted-foreground mb-4">From the client's perspective, the firm that:</p>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Responds first</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Feels modern</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Communicates clearly</li>
                </ul>
                <p className="text-muted-foreground text-sm mt-4">…is often seen as the better choice.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Take */}
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">Our Take</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
              The future of law firm marketing isn't about doing more.
            </p>
            <p className="text-lg text-foreground font-medium max-w-2xl mx-auto">
              It's about building smarter, faster, more connected systems.
            </p>
          </div>
        </section>

        {/* Back Link */}
        <section className="py-16">
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

export default InsightsSectionPage;
