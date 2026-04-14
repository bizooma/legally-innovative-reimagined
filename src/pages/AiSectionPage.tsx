import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import CalendlySection from "@/components/CalendlySection";
import { Helmet } from "react-helmet-async";
import bannerAi from "@/assets/banner_ai_hero.png";
import HeroServiceNav from "@/components/HeroServiceNav";

const AiSectionPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>AI | Route to Results Newsletter | Bizooma</title>
        <meta name="description" content="AI tools, chatbots, automation, and emerging AI trends from Bizooma's Route to Results newsletter." />
      </Helmet>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section
          className="relative overflow-hidden bg-cover bg-center bg-no-repeat aspect-[3/1]"
          style={{ backgroundImage: `url(${bannerAi})` }}
        >
          <h1 className="sr-only">AI</h1>
          <HeroServiceNav />
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <h2 className="text-3xl font-bold text-foreground mt-0 mb-6">AI Is Changing How Clients Find and Choose Attorneys</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Artificial Intelligence is no longer a future concept—it's already shaping how potential clients search, evaluate, and choose law firms. And the pace of change is accelerating.
              </p>
              <p className="text-muted-foreground">
                From AI-powered search results to voice assistants like Amazon Alexa and Google Assistant, the way people interact with information is evolving rapidly. For law firms, this shift represents both a massive opportunity and an urgent challenge.
              </p>
              <p className="text-muted-foreground">
                The firms that embrace AI strategically—not as a gimmick, but as a core part of their client acquisition and service delivery—will dominate their markets. The ones that wait will find themselves increasingly invisible.
              </p>

              <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">What This Means for Law Firms</h3>
              <p className="text-muted-foreground">
                The way people find and choose attorneys has fundamentally changed. Traditional search behavior—typing a few keywords into Google and clicking through results—is being replaced by something more conversational and immediate.
              </p>
              <p className="text-muted-foreground">Clients are now:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ <strong>Asking full questions instead of typing keywords</strong> — Instead of searching "personal injury lawyer Chicago," people are asking "What should I do if I was hit by a car while crossing the street?" AI tools provide direct answers, often bypassing traditional search results entirely.</li>
                <li>✅ <strong>Expecting immediate answers</strong> — The days of browsing multiple websites are fading. Clients want answers now—and they expect those answers to be specific, helpful, and trustworthy. If your firm doesn't provide that, AI will surface a competitor who does.</li>
                <li>✅ <strong>Making faster decisions</strong> — With AI summarizing options and providing recommendations, the decision window has compressed dramatically. The first firm to provide a clear, helpful response often wins the case.</li>
                <li>✅ <strong>Using voice search and smart devices</strong> — "Hey Siri, find me a divorce lawyer nearby." Voice searches tend to return a single result—not a list of ten. If your firm isn't optimized for these queries, you don't even enter the conversation.</li>
              </ul>
              <p className="text-muted-foreground">
                If your firm isn't part of that conversation—if your website doesn't answer these questions clearly, if your content isn't structured for AI consumption—you're being skipped. Not by choice, but by algorithm.
              </p>

              <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">AI in Action: Practical Applications for Law Firms</h3>
              <p className="text-muted-foreground">
                At Bizooma, we don't believe in AI for AI's sake. We help law firms leverage artificial intelligence in practical, results-driven ways that directly impact lead generation, client experience, and operational efficiency.
              </p>

              <h4 className="text-xl font-semibold text-foreground mt-8 mb-3">Smart Chatbots</h4>
              <p className="text-muted-foreground">
                Your website gets visitors at all hours—nights, weekends, holidays. A smart chatbot ensures that every visitor gets immediate engagement, regardless of when they arrive.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ <strong>Engage visitors instantly</strong> — The moment someone lands on your site, a chatbot can greet them, ask about their situation, and guide them toward the right next step. No waiting, no voicemail, no missed opportunities.</li>
                <li>✅ <strong>Answer common questions intelligently</strong> — Trained on your firm's specific practice areas, FAQs, and processes, AI chatbots provide accurate, helpful responses that build confidence and trust.</li>
                <li>✅ <strong>Qualify leads in real time</strong> — Before a prospect even speaks to your team, the chatbot can gather key information—type of case, timeline, location—so your intake team can prioritize and prepare.</li>
                <li>✅ <strong>Schedule consultations automatically</strong> — Integrated with your calendar, chatbots can book appointments on the spot, eliminating the back-and-forth that causes prospects to lose interest.</li>
              </ul>

              <h4 className="text-xl font-semibold text-foreground mt-8 mb-3">Voice-Enabled Intake</h4>
              <p className="text-muted-foreground">
                Not everyone wants to fill out a form. Voice-enabled intake gives visitors a natural, conversational way to share their information—making the process feel less like paperwork and more like a conversation.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ <strong>Allow users to interact naturally</strong> — Voice interfaces remove barriers for people who struggle with typing, have accessibility needs, or simply prefer speaking over writing.</li>
                <li>✅ <strong>Capture leads in a conversational format</strong> — Instead of a cold, clinical form, prospects tell their story in their own words. AI processes the information and structures it for your intake team.</li>
                <li>✅ <strong>Reduce form abandonment</strong> — Traditional intake forms have abandonment rates of 60-80%. Voice intake dramatically reduces that friction, capturing more leads from the same traffic.</li>
              </ul>

              <h4 className="text-xl font-semibold text-foreground mt-8 mb-3">Automated Follow-Ups</h4>
              <p className="text-muted-foreground">
                The moment between initial interest and first contact is critical—and it's where most firms lose potential clients. Automated follow-ups ensure that no lead goes cold.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ <strong>Respond immediately via text or email</strong> — Within seconds of a form submission or chat interaction, prospects receive a personalized confirmation and next steps. This alone can double your conversion rate.</li>
                <li>✅ <strong>Keep prospects engaged while interest is high</strong> — Automated sequences deliver helpful information, answer anticipated questions, and reinforce why your firm is the right choice—all before your team even picks up the phone.</li>
                <li>✅ <strong>Re-engage cold leads</strong> — Not every prospect is ready to hire today. Intelligent follow-up sequences keep your firm top-of-mind, so when they are ready, you're the first call they make.</li>
                <li>✅ <strong>Track and optimize performance</strong> — Every automated touchpoint is measurable. You'll know exactly which messages resonate, which leads convert, and where to improve.</li>
              </ul>

              <h4 className="text-xl font-semibold text-foreground mt-8 mb-3">AI-Optimized Content</h4>
              <p className="text-muted-foreground">
                As AI tools increasingly determine which firms get recommended to potential clients, your content strategy must evolve.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ <strong>Structured data and schema markup</strong> — Help AI systems understand exactly what your firm does, where you're located, and what makes you different.</li>
                <li>✅ <strong>Answer-focused content</strong> — Create content specifically designed to be surfaced by AI tools—direct, authoritative answers to the questions your ideal clients are asking.</li>
                <li>✅ <strong>Entity optimization</strong> — Ensure your firm is recognized as a trusted entity across Google's Knowledge Graph, AI assistants, and emerging search platforms.</li>
              </ul>

              <h3 className="text-2xl font-semibold text-foreground mt-12 mb-4">Why It Matters: The Speed Advantage</h3>
              <p className="text-muted-foreground">
                In legal marketing, speed and relevance win. The data is clear: the firm that responds first captures the case the vast majority of the time.
              </p>
              <p className="text-muted-foreground">When a potential client reaches out, the firm that:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ <strong>Responds first</strong> — Even a 5-minute delay can cost you the case. AI ensures instant response, 24/7.</li>
                <li>✅ <strong>Provides clarity</strong> — Prospects are often confused and overwhelmed. The firm that clearly explains the process and next steps earns immediate trust.</li>
                <li>✅ <strong>Makes it easy to move forward</strong> — One-click scheduling, simple forms, clear instructions—every barrier you remove increases the likelihood of conversion.</li>
              </ul>
              <p className="text-muted-foreground">
                …is the firm that gets the case. AI makes all of this possible at scale—without requiring your team to be available around the clock.
              </p>

              <h3 className="text-2xl font-semibold text-foreground mt-12 mb-4">AI, Done Right</h3>
              <p className="text-muted-foreground">
                AI isn't about replacing your team. It's not about removing the human element from legal services. It's about enhancing your responsiveness, improving efficiency, and creating better client experiences at scale.
              </p>
              <p className="text-muted-foreground">
                Think of AI as the bridge between your firm and the modern client. It handles the repetitive tasks—answering FAQs, scheduling appointments, sending follow-ups—so your attorneys and intake team can focus on what they do best: building relationships and winning cases.
              </p>
              <p className="text-muted-foreground">
                The firms that get this right aren't just keeping up—they're pulling ahead. And the gap between AI-enabled firms and traditional firms is widening every month.
              </p>
              <p className="text-muted-foreground">
                The question isn't whether your firm should adopt AI. It's how quickly you can start.
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

export default AiSectionPage;
