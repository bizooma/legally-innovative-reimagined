import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import bannerCode from "@/assets/banner_code_hero.png";

const CodeSectionPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Code | Route to Results Newsletter | Bizooma</title>
        <meta name="description" content="Web development, mobile apps, tech tools, and coding insights from Bizooma's Route to Results newsletter." />
      </Helmet>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section
          className="relative overflow-hidden bg-cover bg-center bg-no-repeat aspect-[3/1]"
          style={{ backgroundImage: `url(${bannerCode})` }}
        >
          <h1 className="sr-only">Code</h1>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <p className="text-lg text-muted-foreground leading-relaxed">
                The <strong>Code</strong> section of our newsletter dives into the technical side — the development tools, frameworks, and innovations that power modern digital experiences.
              </p>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">What We Cover</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li>💻 Web development trends and best practices</li>
                <li>📱 Mobile app development insights</li>
                <li>🔧 Developer tools and productivity tips</li>
                <li>⚡ Performance optimization and Core Web Vitals</li>
                <li>🏗️ Software architecture and design patterns</li>
                <li>🔐 Security best practices and updates</li>
                <li>🚀 New frameworks, libraries, and tech launches</li>
              </ul>
              <p className="text-muted-foreground mt-8">
                We translate technical concepts into practical insights so you can make better decisions about your digital infrastructure.
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

export default CodeSectionPage;
