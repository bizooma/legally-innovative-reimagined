import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import CalendlySection from "@/components/CalendlySection";
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
              <h2 className="text-2xl font-semibold text-foreground mt-0 mb-4">Your Website Should Be a System—Not Just a Design</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Most law firm websites are built like brochures.
              </p>
              <p className="text-muted-foreground">
                They look good. They have pages. They might even rank.
              </p>
              <p className="text-muted-foreground">
                But they don't work the way they should.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">The Problem with Traditional Platforms</h3>
              <p className="text-muted-foreground">
                Platforms like WordPress can be powerful—but they often rely on:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ Multiple plugins</li>
                <li>✅ Third-party integrations</li>
                <li>✅ Ongoing patchwork maintenance</li>
              </ul>
              <p className="text-muted-foreground">As your needs grow, so does complexity.</p>
              <p className="text-muted-foreground">That's when issues start to appear:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>⚠️ Slower load times</li>
                <li>⚠️ Broken integrations</li>
                <li>⚠️ Limited flexibility</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">A Better Approach: Modern Development</h3>
              <p className="text-muted-foreground">
                We build websites using TypeScript and modern JavaScript frameworks, which allows us to create:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ Faster, high-performance websites</li>
                <li>✅ Custom features tailored to your firm</li>
                <li>✅ Seamless integrations with AI and automation tools</li>
                <li>✅ Scalable systems that grow with your business</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">What This Means for Your Firm</h3>
              <p className="text-muted-foreground">Instead of a static website, you get:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ A platform that adapts to your marketing strategy</li>
                <li>✅ A system that integrates with your intake process</li>
                <li>✅ A foundation for future growth (AI, voice, automation)</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-10 mb-3">Built for What's Next</h3>
              <p className="text-muted-foreground">Your website shouldn't limit what you can do.</p>
              <p className="text-muted-foreground">
                It should enable everything you want to build next.
              </p>
            </div>
        <CalendlySection />
          </div>
        </section>
      </main>
      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default CodeSectionPage;
