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
              <p className="text-lg text-muted-foreground leading-relaxed">
                The <strong>Insights</strong> section is where we bring it all together — summarizing the key takeaways from each newsletter and connecting the dots between marketing, code, and AI.
              </p>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">What We Cover</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li>💡 Key takeaways and action items from each issue</li>
                <li>🔗 How marketing, code, and AI intersect</li>
                <li>📌 Strategic recommendations for your business</li>
                <li>🗓️ What to watch for in the coming weeks</li>
                <li>🎯 Priority actions ranked by impact</li>
                <li>📝 Quick summaries for busy professionals</li>
              </ul>
              <p className="text-muted-foreground mt-8">
                Think of Insights as your executive summary — the TL;DR that helps you take action fast.
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
