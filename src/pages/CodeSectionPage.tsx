import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { ArrowLeft, AlertTriangle, Zap, Rocket } from "lucide-react";
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

        {/* Intro */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Your Website Should Be a System—Not Just a Design</h2>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Most law firm websites are built like brochures. They look good. They have pages. They might even rank.
            </p>
            <p className="text-lg text-muted-foreground mt-4 max-w-3xl font-medium">
              But they don't work the way they should.
            </p>
          </div>
        </section>

        {/* Problem vs Solution */}
        <section className="pb-16 lg:pb-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Problem */}
              <div className="rounded-xl border border-border bg-card p-8">
                <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-5">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">The Problem with Traditional Platforms</h3>
                <p className="text-muted-foreground mb-4">
                  Platforms like WordPress can be powerful—but they often rely on:
                </p>
                <ul className="space-y-2 text-muted-foreground text-sm mb-6">
                  <li className="flex items-start gap-2"><span className="text-muted-foreground mt-0.5">•</span> Multiple plugins</li>
                  <li className="flex items-start gap-2"><span className="text-muted-foreground mt-0.5">•</span> Third-party integrations</li>
                  <li className="flex items-start gap-2"><span className="text-muted-foreground mt-0.5">•</span> Ongoing patchwork maintenance</li>
                </ul>
                <p className="text-muted-foreground text-sm mb-3">As your needs grow, so does complexity. That's when issues start:</p>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2"><span className="text-destructive mt-0.5">✗</span> Slower load times</li>
                  <li className="flex items-start gap-2"><span className="text-destructive mt-0.5">✗</span> Broken integrations</li>
                  <li className="flex items-start gap-2"><span className="text-destructive mt-0.5">✗</span> Limited flexibility</li>
                </ul>
              </div>

              {/* Solution */}
              <div className="rounded-xl border border-border bg-card p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">A Better Approach: Modern Development</h3>
                <p className="text-muted-foreground mb-4">
                  We build websites using TypeScript and modern JavaScript frameworks, which allows us to create:
                </p>
                <ul className="space-y-3 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Faster, high-performance websites</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Custom features tailored to your firm</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Seamless integrations with AI and automation tools</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Scalable systems that grow with your business</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What This Means */}
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">What This Means for Your Firm</h3>
            <p className="text-lg text-muted-foreground mb-8">Instead of a static website, you get:</p>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="rounded-lg border border-border bg-card p-6 text-center">
                <span className="text-primary font-bold text-2xl block mb-3">✓</span>
                <p className="text-foreground font-medium">A platform that adapts to your marketing strategy</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6 text-center">
                <span className="text-primary font-bold text-2xl block mb-3">✓</span>
                <p className="text-foreground font-medium">A system that integrates with your intake process</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6 text-center">
                <span className="text-primary font-bold text-2xl block mb-3">✓</span>
                <p className="text-foreground font-medium">A foundation for future growth (AI, voice, automation)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Built for What's Next */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Rocket className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Built for What's Next</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your website shouldn't limit what you can do. It should enable everything you want to build next.
            </p>
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

export default CodeSectionPage;
