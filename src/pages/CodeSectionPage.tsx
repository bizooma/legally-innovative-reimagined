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
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <h2 className="text-3xl font-bold text-foreground mt-0 mb-6">Your Website Should Be a System—Not Just a Design</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Most law firm websites are built like brochures. They look good. They have pages. They might even rank on Google.
              </p>
              <p className="text-muted-foreground">
                But they don't <em>work</em> the way they should.
              </p>
              <p className="text-muted-foreground">
                A modern law firm website should do more than just sit there and look professional. It should actively generate leads, qualify prospects, integrate with your intake process, and adapt as your firm grows. If your website isn't doing those things, it's not a system—it's a liability.
              </p>

              <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">The Problem with Traditional Platforms</h3>
              <p className="text-muted-foreground">
                Platforms like WordPress power a significant portion of the web, and for good reason—they're accessible, widely supported, and familiar. But for law firms with growing digital needs, they come with real limitations.
              </p>
              <p className="text-muted-foreground">
                WordPress sites typically rely on:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>⚠️ <strong>Multiple plugins</strong> — Need a contact form? Plugin. SEO? Plugin. Speed optimization? Plugin. Live chat? Another plugin. Each one adds code, creates potential conflicts, and requires its own updates and maintenance.</li>
                <li>⚠️ <strong>Third-party integrations</strong> — Connecting your website to your CRM, intake system, or email marketing tool often requires middleware, custom code, or paid connectors that can break without warning.</li>
                <li>⚠️ <strong>Ongoing patchwork maintenance</strong> — WordPress core updates, theme updates, plugin updates—each one carries the risk of breaking something else. Many firms end up paying monthly maintenance fees just to keep things running.</li>
              </ul>
              <p className="text-muted-foreground">
                As your needs grow, so does the complexity. And that's when the real issues start to surface:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>⚠️ <strong>Slower load times</strong> — Every plugin adds weight. A site that loads in 5+ seconds loses nearly 40% of visitors before they ever see your content. In legal marketing, that translates directly to lost cases.</li>
                <li>⚠️ <strong>Security vulnerabilities</strong> — WordPress is the most targeted CMS in the world. Outdated plugins are the #1 attack vector. A hacked law firm website doesn't just cause downtime—it destroys client trust.</li>
                <li>⚠️ <strong>Broken integrations</strong> — When a plugin updates and another doesn't, things break. Forms stop submitting. Chat widgets disappear. Tracking code stops firing. These silent failures cost firms leads they never even know about.</li>
                <li>⚠️ <strong>Limited flexibility</strong> — Want a custom intake flow? A dynamic fee calculator? An AI-powered chatbot? With WordPress, these features require extensive custom development on top of an already complex stack.</li>
              </ul>
              <p className="text-muted-foreground">
                This isn't about WordPress being "bad"—it's about recognizing when a tool has outgrown your needs. For many law firms, that tipping point has already passed.
              </p>

              <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">A Better Approach: Modern Web Development</h3>
              <p className="text-muted-foreground">
                We build law firm websites using TypeScript, React, and modern JavaScript frameworks. This isn't just a technical preference—it's a strategic decision that directly impacts your firm's ability to compete.
              </p>
              <p className="text-muted-foreground">Here's what modern development makes possible:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ <strong>Blazing-fast performance</strong> — Modern frameworks render pages in milliseconds, not seconds. Faster sites rank higher, convert better, and create a premium user experience that reflects the quality of your firm.</li>
                <li>✅ <strong>Custom features tailored to your firm</strong> — Instead of bolting on generic plugins, we build exactly what you need. Custom intake forms, case evaluation tools, dynamic content—all built natively into your site.</li>
                <li>✅ <strong>Seamless integrations with AI and automation</strong> — Modern architecture makes it straightforward to connect chatbots, voice assistants, automated follow-ups, CRM systems, and analytics tools without the fragile middleware that traditional platforms require.</li>
                <li>✅ <strong>Scalable systems that grow with your business</strong> — Whether you're adding a new practice area, expanding to a new market, or launching a multi-location strategy, your website scales effortlessly without performance degradation.</li>
                <li>✅ <strong>Built-in security</strong> — Without the plugin ecosystem that creates vulnerabilities, modern sites have a dramatically smaller attack surface. Your client data stays protected.</li>
              </ul>

              <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">The Technical Advantage, Explained Simply</h3>
              <p className="text-muted-foreground">
                You don't need to understand code to appreciate what modern development delivers. Think of it this way:
              </p>
              <p className="text-muted-foreground">
                A traditional WordPress site is like a house built with off-the-shelf parts from different manufacturers. Each part works on its own, but they weren't designed to work together. Over time, things loosen, leak, and require constant patching.
              </p>
              <p className="text-muted-foreground">
                A modern website is like a house designed and built as a unified system. Every component is engineered to work with every other component. The plumbing, electrical, and HVAC all share a common architecture. It's faster to build, easier to maintain, and more efficient to operate.
              </p>
              <p className="text-muted-foreground">
                For your law firm, this translates to: fewer technical issues, lower maintenance costs, faster load times, better security, and the ability to add new features without rebuilding from scratch.
              </p>

              <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">What This Means for Your Firm</h3>
              <p className="text-muted-foreground">
                Instead of a static website that sits there collecting dust between redesigns, you get a living, breathing digital platform:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ <strong>A platform that adapts to your marketing strategy</strong> — Need to launch a landing page for a new campaign? Add a practice area page? A/B test different headlines? Your site flexes to support your goals in real time.</li>
                <li>✅ <strong>A system that integrates with your intake process</strong> — From the moment a visitor fills out a form or starts a chat, their information flows seamlessly into your CRM, triggers automated follow-ups, and notifies your team—all without manual data entry.</li>
                <li>✅ <strong>A foundation for future growth</strong> — AI chatbots, voice search optimization, automated client communication, predictive analytics—these aren't futuristic concepts. They're available now. And a modern website is the foundation that makes them all possible.</li>
                <li>✅ <strong>A competitive edge</strong> — While competitors struggle with slow, bloated websites and broken plugins, your firm operates with a fast, reliable, modern platform that impresses prospects and converts at a higher rate.</li>
              </ul>

              <h3 className="text-2xl font-semibold text-foreground mt-12 mb-4">Built for What's Next</h3>
              <p className="text-muted-foreground">
                The legal industry is evolving faster than ever. AI is transforming how clients find attorneys. Voice search is changing how people ask for help. Automation is redefining what efficient client intake looks like.
              </p>
              <p className="text-muted-foreground">
                Your website shouldn't limit what you can do—it should enable everything you want to build next. That starts with the right foundation.
              </p>
              <p className="text-muted-foreground">
                At Bizooma, we don't just build websites. We build the technical infrastructure that powers your firm's growth—today and for years to come.
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
