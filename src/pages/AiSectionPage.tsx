import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import bannerAi from "@/assets/banner_ai_600x200.png";

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
          className="relative py-20 overflow-hidden bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bannerAi})` }}
        >
          <div className="absolute inset-0 bg-background/60" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">AI</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From the <span className="font-semibold text-foreground">Route to Results</span> newsletter — Where Marketing Meets Code + AI
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <p className="text-lg text-muted-foreground leading-relaxed">
                The <strong>AI</strong> section of our newsletter explores how artificial intelligence is transforming business, marketing, and client engagement.
              </p>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">What We Cover</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li>🤖 AI chatbots and virtual assistants</li>
                <li>🧠 Machine learning and predictive analytics</li>
                <li>⚙️ Workflow automation and AI-powered tools</li>
                <li>🔍 AI in search — ChatGPT, Perplexity, Google AI Overviews</li>
                <li>💬 Natural language processing and voice AI</li>
                <li>📋 AI for content creation and strategy</li>
                <li>🔮 Emerging AI trends and what's next</li>
              </ul>
              <p className="text-muted-foreground mt-8">
                We cut through the hype to show you what AI tools actually work and how to implement them in your business today.
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
