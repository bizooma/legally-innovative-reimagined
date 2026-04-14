import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import bannerMarketing from "@/assets/banner_marketing_600x200.png";

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
          className="relative py-20 overflow-hidden bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bannerMarketing})` }}
        >
          <h1 className="sr-only">Marketing</h1>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <p className="text-lg text-muted-foreground leading-relaxed">
                The <strong>Marketing</strong> section of our newsletter covers the strategies, trends, and tactics that drive real results for businesses — especially law firms and professional services.
              </p>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">What We Cover</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li>📈 SEO & AEO (Answer Engine Optimization) strategies</li>
                <li>🗺️ Google Business Profile optimization</li>
                <li>🎯 Lead generation and conversion tactics</li>
                <li>📱 Digital advertising and PPC insights</li>
                <li>🗣️ Voice search and smart assistant marketing</li>
                <li>✍️ Content marketing and branding tips</li>
                <li>📊 Analytics, KPIs, and ROI measurement</li>
              </ul>
              <p className="text-muted-foreground mt-8">
                Every week, we break down what's changing in digital marketing and give you actionable steps to stay ahead.
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

export default MarketingSectionPage;
