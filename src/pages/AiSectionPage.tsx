import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import bannerAi from "@/assets/banner_ai_hero.png";

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
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <h2 className="text-2xl font-semibold text-foreground mt-0 mb-4">AI Is Changing How Clients Find and Choose Attorneys</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Artificial Intelligence is no longer a future concept—it's already shaping how potential clients search, evaluate, and choose law firms.
              </p>
              <p className="text-muted-foreground">
                From AI-powered search results to voice assistants like Amazon Alexa, the way people interact with information is evolving rapidly.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">What This Means for Law Firms</h3>
              <p className="text-muted-foreground">Clients are now:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ Asking full questions instead of typing keywords</li>
                <li>✅ Expecting immediate answers</li>
                <li>✅ Making faster decisions</li>
              </ul>
              <p className="text-muted-foreground">
                If your firm isn't part of that conversation, you're being skipped.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">AI in Action</h3>
              <p className="text-muted-foreground">We help law firms leverage AI in practical, results-driven ways:</p>

              <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Smart Chatbots</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ Engage visitors instantly</li>
                <li>✅ Answer common questions</li>
                <li>✅ Guide users through next steps</li>
              </ul>

              <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Voice-Enabled Intake</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ Allow users to interact naturally</li>
                <li>✅ Capture leads in a conversational format</li>
              </ul>

              <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Automated Follow-Ups</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ Respond immediately via text or email</li>
                <li>✅ Keep prospects engaged while interest is high</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-10 mb-3">Why It Matters</h3>
              <p className="text-muted-foreground">Speed and relevance win.</p>
              <p className="text-muted-foreground">When a potential client reaches out, the firm that:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ Responds first</li>
                <li>✅ Provides clarity</li>
                <li>✅ Makes it easy to move forward</li>
              </ul>
              <p className="text-muted-foreground">…is the firm that gets the case.</p>

              <h3 className="text-xl font-semibold text-foreground mt-10 mb-3">AI, Done Right</h3>
              <p className="text-muted-foreground">AI isn't about replacing your team.</p>
              <p className="text-muted-foreground">
                It's about enhancing your responsiveness, improving efficiency, and creating better client experiences at scale.
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

export default AiSectionPage;
