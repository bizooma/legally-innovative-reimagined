import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import CalendlySection from "@/components/CalendlySection";
import { Helmet } from "react-helmet-async";
import bannerMarketing from "@/assets/banner_marketing_hero.png";
import HeroServiceNav from "@/components/HeroServiceNav";

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
          <HeroServiceNav />
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <h2 className="text-3xl font-bold text-foreground mt-0 mb-6">Modern Law Firm Marketing That Actually Drives Cases</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Law firm marketing has changed—dramatically.
              </p>
              <p className="text-muted-foreground">
                It's no longer just about rankings, impressions, or traffic. It's about connecting with the right client at the right moment and guiding them to take action. The firms that understand this distinction are the ones signing more cases, building stronger reputations, and growing year over year.
              </p>
              <p className="text-muted-foreground">
                Today's most successful firms understand that marketing is a system—not a collection of tactics. That system is made up of three critical layers that work together to turn strangers into signed clients.
              </p>

              <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">1. Visibility — Getting Found Where It Matters</h3>
              <p className="text-muted-foreground">
                If potential clients can't find you, nothing else matters. But visibility today means more than just ranking on page one of Google. It means showing up consistently across every channel where your ideal client is looking.
              </p>
              <p className="text-muted-foreground">Your firm needs to be found across:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ <strong>Search engines like Google</strong> — Organic rankings remain the highest-intent traffic source for law firms. When someone searches "car accident lawyer near me," they're ready to hire.</li>
                <li>✅ <strong>Local listings and map results</strong> — Google Business Profile optimization is critical. Over 46% of all Google searches have local intent, and the map pack is often the first thing potential clients see.</li>
                <li>✅ <strong>Paid advertising channels</strong> — Google Ads, Local Service Ads (LSAs), and targeted social media campaigns can fill gaps while organic strategies build momentum.</li>
                <li>✅ <strong>Emerging AI-driven search platforms</strong> — Tools like ChatGPT, Perplexity, and Google's AI Overviews are changing how people discover services. Firms that aren't optimized for these platforms are already falling behind.</li>
              </ul>
              <p className="text-muted-foreground">
                The key is consistency. Your firm's name, messaging, and value proposition should be unified across every touchpoint. A fragmented presence creates confusion—and confusion kills conversions.
              </p>

              <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">2. Authority — Building Trust Before the First Call</h3>
              <p className="text-muted-foreground">
                Getting found is only half the battle. Once a potential client lands on your website or reads your Google reviews, they're making a snap judgment: "Is this the right firm for me?"
              </p>
              <p className="text-muted-foreground">
                That decision often happens in seconds. Your firm must build trust quickly and decisively through:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ <strong>Clear, helpful content</strong> — Blog posts, FAQ pages, and practice area guides that answer real client questions position your firm as a knowledgeable, trustworthy resource. Content isn't just for SEO—it's your digital first impression.</li>
                <li>✅ <strong>Strong reviews and reputation signals</strong> — A steady stream of authentic client reviews on Google, Avvo, and other platforms acts as social proof. Firms with 50+ reviews and a 4.5+ star rating dramatically outperform competitors.</li>
                <li>✅ <strong>Professional, modern design</strong> — Your website is your digital storefront. If it looks outdated, loads slowly, or isn't mobile-friendly, visitors assume the firm operates the same way. First impressions matter.</li>
                <li>✅ <strong>Case results and testimonials</strong> — Showcasing real outcomes (with appropriate disclaimers) gives prospects confidence that you can deliver results for their specific situation.</li>
              </ul>
              <p className="text-muted-foreground">
                Authority isn't built overnight—it's earned through consistent, strategic effort. But once established, it becomes your most powerful competitive advantage.
              </p>

              <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">3. Conversion — Turning Visitors Into Signed Cases</h3>
              <p className="text-muted-foreground">
                This is where most firms fall short—and where the biggest opportunities exist. You can have all the traffic and credibility in the world, but if your website doesn't convert visitors into leads, you're leaving money on the table.
              </p>
              <p className="text-muted-foreground">If your website doesn't:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ <strong>Clearly guide users</strong> — Every page should have a clear purpose and a logical next step. Visitors should never wonder "what do I do now?"</li>
                <li>✅ <strong>Provide multiple ways to contact you</strong> — Phone, chat, contact forms, text messaging—different people prefer different channels. Make it easy for all of them.</li>
                <li>✅ <strong>Remove friction from the process</strong> — Long forms, confusing navigation, and slow load times all create barriers. Every unnecessary click is a potential lost client.</li>
                <li>✅ <strong>Respond immediately</strong> — Studies show that firms responding within 5 minutes are 21x more likely to convert a lead than those responding after 30 minutes. Speed isn't optional—it's essential.</li>
              </ul>
              <p className="text-muted-foreground">
                …you're losing cases to firms that do. And in competitive markets, even small improvements in conversion rate can translate to dozens of additional signed cases per year.
              </p>

              <h3 className="text-2xl font-semibold text-foreground mt-12 mb-4">The Shift: SEO → AEO (Ask Engine Optimization)</h3>
              <p className="text-muted-foreground">
                Search is evolving—and law firms need to evolve with it.
              </p>
              <p className="text-muted-foreground">
                For years, the focus was on Search Engine Optimization (SEO): targeting keywords, building backlinks, and climbing rankings. That still matters. But a fundamental shift is underway.
              </p>
              <p className="text-muted-foreground">
                Instead of just optimizing for rankings, firms must now optimize for <strong>answers</strong>—this is known as <strong>Ask Engine Optimization (AEO)</strong>.
              </p>
              <p className="text-muted-foreground">
                Here's why: clients aren't just searching anymore. They're asking full questions to AI tools, voice assistants, and search engines:
              </p>
              <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-6">
                "Do I need a lawyer for this?"<br />
                "How much is my car accident case worth?"<br />
                "What should I do after a slip and fall?"<br />
                "How long do I have to file a personal injury claim?"
              </blockquote>
              <p className="text-muted-foreground">
                AI-powered tools like Google's AI Overviews, ChatGPT, and voice assistants are pulling answers directly from websites that structure their content to respond to these questions. If your firm isn't answering those questions clearly and comprehensively, you're invisible in the moments that matter most.
              </p>
              <p className="text-muted-foreground">
                AEO isn't replacing SEO—it's expanding it. The firms that adapt now will dominate both traditional search results and the emerging AI-driven landscape.
              </p>

              <h3 className="text-2xl font-semibold text-foreground mt-12 mb-4">The Real Cost of Disconnected Marketing</h3>
              <p className="text-muted-foreground">
                Many law firms invest in marketing—but they invest in pieces. A little SEO here, some paid ads there, a website redesign every few years, and a social media presence that gets updated sporadically.
              </p>
              <p className="text-muted-foreground">
                The problem? These pieces don't talk to each other. Your ads drive traffic to a website that doesn't convert. Your SEO content ranks but doesn't align with your intake process. Your social media builds awareness but doesn't capture leads.
              </p>
              <p className="text-muted-foreground">
                The result is wasted budget, missed opportunities, and the frustrating feeling that marketing "doesn't work." It does work—but only when everything is connected.
              </p>

              <h3 className="text-2xl font-semibold text-foreground mt-12 mb-4">Our Approach: Connected Marketing Systems</h3>
              <p className="text-muted-foreground">
                At Bizooma, we don't treat marketing as isolated tactics. We build complete, connected marketing systems designed to work together seamlessly.
              </p>
              <p className="text-muted-foreground">Every system we build is designed to:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ <strong>Attract qualified prospects</strong> — Through strategic SEO, AEO, paid campaigns, and local optimization that bring the right people to your firm.</li>
                <li>✅ <strong>Build trust instantly</strong> — With professional design, compelling content, and social proof that establishes credibility within seconds.</li>
                <li>✅ <strong>Convert visitors into leads</strong> — Using optimized landing pages, smart forms, live chat, and clear calls-to-action that make it effortless to reach out.</li>
                <li>✅ <strong>Nurture and follow up automatically</strong> — Through automated email sequences, text follow-ups, and CRM integrations that ensure no lead falls through the cracks.</li>
                <li>✅ <strong>Measure and optimize continuously</strong> — With analytics dashboards, conversion tracking, and regular performance reviews that keep your marketing improving month over month.</li>
              </ul>
              <p className="text-muted-foreground">
                The difference between a firm that grows and one that stagnates isn't budget—it's strategy. A well-built marketing system outperforms a collection of disconnected tactics every single time.
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

export default MarketingSectionPage;
