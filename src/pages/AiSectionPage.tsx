import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { ArrowLeft, MessageSquare, Mic, Mail, Trophy } from "lucide-react";
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

        {/* Intro */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">AI Is Changing How Clients Find and Choose Attorneys</h2>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Artificial Intelligence is no longer a future concept—it's already shaping how potential clients search, evaluate, and choose law firms.
            </p>
            <p className="text-lg text-muted-foreground mt-4 max-w-3xl">
              From AI-powered search results to voice assistants like Amazon Alexa, the way people interact with information is evolving rapidly.
            </p>
          </div>
        </section>

        {/* What This Means */}
        <section className="pb-16 lg:pb-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="rounded-xl border border-border bg-card p-8 lg:p-10">
              <h3 className="text-2xl font-semibold text-foreground mb-4">What This Means for Law Firms</h3>
              <p className="text-muted-foreground mb-6">Clients are now:</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="rounded-lg bg-muted/50 p-5 text-center">
                  <p className="text-foreground font-medium">Asking full questions instead of typing keywords</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-5 text-center">
                  <p className="text-foreground font-medium">Expecting immediate answers</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-5 text-center">
                  <p className="text-foreground font-medium">Making faster decisions</p>
                </div>
              </div>
              <p className="text-muted-foreground mt-6 font-medium">
                If your firm isn't part of that conversation, you're being skipped.
              </p>
            </div>
          </div>
        </section>

        {/* AI in Action */}
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">AI in Action</h3>
            <p className="text-lg text-muted-foreground mb-10">We help law firms leverage AI in practical, results-driven ways:</p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="rounded-xl border border-border bg-card p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-4">Smart Chatbots</h4>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Engage visitors instantly</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Answer common questions</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Guide users through next steps</li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <Mic className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-4">Voice-Enabled Intake</h4>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Allow users to interact naturally</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Capture leads in a conversational format</li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-4">Automated Follow-Ups</h4>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Respond immediately via text or email</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Keep prospects engaged while interest is high</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why It Matters */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">Why It Matters</h3>
                <p className="text-lg text-muted-foreground mb-4">Speed and relevance win.</p>
                <p className="text-muted-foreground mb-4">When a potential client reaches out, the firm that:</p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Responds first</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Provides clarity</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Makes it easy to move forward</li>
                </ul>
                <p className="text-muted-foreground mt-4 font-medium">…is the firm that gets the case.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <Trophy className="w-7 h-7 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-3">AI, Done Right</h4>
                <p className="text-muted-foreground">
                  AI isn't about replacing your team. It's about enhancing your responsiveness, improving efficiency, and creating better client experiences at scale.
                </p>
              </div>
            </div>
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

export default AiSectionPage;
