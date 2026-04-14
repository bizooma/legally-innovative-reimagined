import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import CalendlySection from "@/components/CalendlySection";
import { Helmet } from "react-helmet-async";
import bannerInsights from "@/assets/banner_insights_hero.png";
import HeroServiceNav from "@/components/HeroServiceNav";

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
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <h2 className="text-3xl font-bold text-foreground mt-0 mb-6">What We're Seeing Across Law Firms Right Now</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every week, we work with law firms across the country—from solo practitioners to multi-location firms—and clear patterns are emerging. These aren't theories or predictions. They're real-world observations from firms actively investing in growth.
              </p>
              <p className="text-muted-foreground">
                Whether you're generating leads through SEO, running paid ads, or relying on referrals, these insights apply to your firm. The firms paying attention to these trends are pulling ahead. The ones ignoring them are falling behind—often without realizing it.
              </p>

              <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">1. Traffic Isn't the Problem</h3>
              <p className="text-muted-foreground">
                This is one of the most common misconceptions we encounter. Firm after firm tells us, "We need more traffic." But when we dig into the data, the problem is almost never traffic volume—it's what happens after visitors arrive.
              </p>
              <p className="text-muted-foreground">
                Many firms are getting hundreds, even thousands, of monthly visitors. But those visitors aren't converting into consultations or signed cases. The traffic is there. The conversion isn't.
              </p>
              <p className="text-muted-foreground">Why? The most common culprits we see:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>⚠️ <strong>Confusing websites</strong> — Visitors land on the page and can't quickly understand what the firm does, who it serves, or what to do next. If it takes more than 5 seconds to answer "Am I in the right place?"—they leave.</li>
                <li>⚠️ <strong>Slow response times</strong> — A prospect fills out a form at 8 PM on a Tuesday. They don't hear back until 10 AM Wednesday. By then, they've already contacted three other firms. The first firm to respond wins the case 78% of the time.</li>
                <li>⚠️ <strong>Lack of clear next steps</strong> — Many law firm websites have beautiful designs but no clear path to action. No prominent phone number. No simple contact form above the fold. No chat widget. No urgency. Visitors don't know what to do, so they do nothing.</li>
                <li>⚠️ <strong>Poor mobile experience</strong> — Over 60% of legal searches happen on mobile devices. If your site doesn't load fast, display properly, and make it easy to call or text from a phone, you're losing the majority of your potential clients.</li>
                <li>⚠️ <strong>Generic messaging</strong> — "We fight for you" and "Experienced attorneys" don't differentiate your firm. Prospects need specific, relevant information that speaks to their exact situation and makes them feel understood.</li>
              </ul>
              <p className="text-muted-foreground">
                The fix isn't more traffic—it's a better experience for the traffic you already have. In many cases, improving conversion rates by even 1-2% can generate dozens of additional cases per year without spending an extra dollar on advertising.
              </p>

              <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">2. Speed Wins</h3>
              <p className="text-muted-foreground">
                The firms capturing the most cases aren't always the biggest, the most established, or even the most visible. They're the fastest.
              </p>
              <p className="text-muted-foreground">
                This is consistently the single biggest differentiator we see between firms that grow and firms that plateau. Response speed determines who gets the case—period.
              </p>
              <p className="text-muted-foreground">The winning firms are the ones that:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ <strong>Respond immediately</strong> — Not within an hour. Not within 30 minutes. Immediately. The best firms use automated text and email responses to acknowledge inquiries within seconds, followed by a personal call within minutes.</li>
                <li>✅ <strong>Make it easy to connect</strong> — Multiple contact options (phone, chat, text, form), prominently displayed, with minimal friction. The easier it is to reach you, the more people will.</li>
                <li>✅ <strong>Follow up consistently</strong> — Not every prospect converts on the first touch. The firms that have structured follow-up sequences—automated and personal—capture cases that others leave on the table.</li>
                <li>✅ <strong>Are available outside business hours</strong> — Accidents, arrests, and legal crises don't happen on a 9-to-5 schedule. Firms with 24/7 intake capabilities (even through AI chatbots and automated systems) capture a disproportionate share of cases.</li>
              </ul>
              <p className="text-muted-foreground">
                Consider this: a potential client involved in a car accident fills out contact forms on three different law firm websites at 9 PM. Firm A responds with an automated text at 9:01 PM and a call at 9:05 PM. Firm B responds at 9 AM the next morning. Firm C responds two days later. Who do you think gets the case?
              </p>
              <p className="text-muted-foreground">
                Speed isn't just a nice-to-have—it's a competitive weapon. And with modern technology, it's achievable for firms of any size.
              </p>

              <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">3. Systems Beat Tactics</h3>
              <p className="text-muted-foreground">
                Running ads, improving SEO, redesigning a website, posting on social media—these are all tactics. And they can all help. But without a connected system, results are inconsistent, unpredictable, and ultimately unsustainable.
              </p>
              <p className="text-muted-foreground">
                We see this pattern repeatedly: a firm invests in Google Ads and gets more traffic. But their website doesn't convert well. So the leads are low quality. So they blame the ads. They switch agencies. The cycle repeats.
              </p>
              <p className="text-muted-foreground">
                The problem was never the ads—it was the lack of a system connecting ads to website to intake to follow-up.
              </p>
              <p className="text-muted-foreground">The firms growing the fastest are building integrated systems that include:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ <strong>Integrated marketing systems</strong> — SEO, paid ads, content marketing, and social media all working together toward a unified goal, with consistent messaging and coordinated campaigns.</li>
                <li>✅ <strong>Automated intake processes</strong> — From the moment a lead comes in, the process is systematized: instant acknowledgment, information capture, qualification, assignment to the right attorney, and scheduled follow-up—all automated.</li>
                <li>✅ <strong>Data-driven decision frameworks</strong> — Instead of guessing what's working, these firms track every touchpoint: which channels generate leads, which pages convert, which follow-up sequences close cases. They optimize based on evidence, not intuition.</li>
                <li>✅ <strong>CRM and pipeline management</strong> — Every lead is tracked from first touch to signed retainer. Nothing falls through the cracks. No prospect is forgotten. Every opportunity is maximized.</li>
                <li>✅ <strong>Continuous optimization</strong> — Marketing isn't a "set it and forget it" activity. The best firms review performance monthly, test new approaches, and refine their systems based on real results.</li>
              </ul>
              <p className="text-muted-foreground">
                The difference is night and day. A firm with a disconnected marketing approach might spend $10,000/month and sign 5 cases. A firm with an integrated system spending the same amount might sign 15. Same budget. Three times the result. The system is the multiplier.
              </p>

              <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">4. Perception Matters More Than You Think</h3>
              <p className="text-muted-foreground">
                Here's an uncomfortable truth: from the client's perspective, they can't evaluate your legal skills before hiring you. They can't compare your courtroom record or your settlement history in a meaningful way. What they can evaluate—instantly—is how your firm makes them feel.
              </p>
              <p className="text-muted-foreground">From the client's perspective, the firm that:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ <strong>Responds first</strong> — Signals that you're attentive, organized, and eager to help. A fast response tells prospects, "We take you seriously."</li>
                <li>✅ <strong>Feels modern and professional</strong> — A polished website, a seamless intake process, and clear communication create the impression of a firm that's competent, capable, and current. Rightly or wrongly, clients equate a modern digital presence with quality legal services.</li>
                <li>✅ <strong>Communicates clearly</strong> — Legal jargon intimidates people. The firms that explain things in plain language, set clear expectations, and make the process feel manageable earn trust faster than firms that hide behind legalese.</li>
                <li>✅ <strong>Follows through consistently</strong> — Every promise kept, every callback made on time, every update delivered as expected—these small moments compound into a reputation that generates referrals and five-star reviews.</li>
              </ul>
              <p className="text-muted-foreground">
                …is often seen as the better choice—regardless of actual experience or track record. Perception shapes reality in client acquisition. And every digital touchpoint either builds or erodes that perception.
              </p>
              <p className="text-muted-foreground">
                This is why investing in your digital presence isn't vanity—it's strategy. Your website, your response time, your follow-up process, your reviews—these are all perception signals that directly impact your bottom line.
              </p>

              <h3 className="text-2xl font-semibold text-foreground mt-12 mb-4">5. The Gap Is Widening</h3>
              <p className="text-muted-foreground">
                One final observation that's impossible to ignore: the gap between firms that invest in modern systems and firms that don't is widening rapidly.
              </p>
              <p className="text-muted-foreground">
                Three years ago, having a decent website and a few Google reviews was enough to compete. Today, the leading firms have AI chatbots, automated intake, integrated CRMs, data dashboards, and content strategies optimized for both traditional search and AI-driven platforms.
              </p>
              <p className="text-muted-foreground">
                The firms that wait to adopt these tools aren't just standing still—they're falling behind. Because their competitors are getting better, faster, and more efficient every month.
              </p>

              <h3 className="text-2xl font-semibold text-foreground mt-12 mb-4">Our Take</h3>
              <p className="text-muted-foreground">
                The future of law firm marketing isn't about doing more. It's about building smarter, faster, more connected systems that work harder than any individual tactic ever could.
              </p>
              <p className="text-muted-foreground">
                It's about understanding that every interaction—from the first Google search to the signed retainer—is part of a single, unified experience. And the firms that design that experience intentionally are the ones that will thrive.
              </p>
              <p className="text-muted-foreground">
                Technology isn't replacing the practice of law. But it is redefining how clients find, choose, and experience their attorney. The firms that embrace that reality are building something that lasts.
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

export default InsightsSectionPage;
