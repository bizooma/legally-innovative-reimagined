import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, BarChart3, Brain, Zap, FileSearch, TrendingUp, Shield } from "lucide-react";

const AeoAnalyzerPage = () => {
  return (
    <>
      <Helmet>
        <title>AEO Analyzer - AI Search Optimization Tool | Bizooma</title>
        <meta name="description" content="Analyze your website and get actionable insights to improve your chances of being featured in AI-powered search results and snippets. Includes comprehensive page speed analysis." />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navbar />

        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-legal-primary to-legal-dark text-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                AEO Analyzer: Optimize for AI-Powered Search
              </h1>
              <p className="text-xl mb-8 text-legal-light">
                Analyze your website and get actionable insights to improve your chances of being featured in AI-powered search results and snippets. Includes comprehensive page speed analysis like Google PageSpeed Insights.
              </p>
              <div className="flex justify-center">
                <Button size="lg" className="bg-white text-legal-primary hover:bg-legal-light" asChild>
                  <a href="https://aeoanalyzer.com" target="_blank" rel="noopener noreferrer">
                    Get Started
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Results */}
        <section className="py-12 bg-legal-light/30">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-legal-primary mb-2">100+</div>
                <div className="text-gray-700">SEO Factors Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-legal-primary mb-2">3 Min</div>
                <div className="text-gray-700">Complete Analysis</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-legal-primary mb-2">AI-Ready</div>
                <div className="text-gray-700">Optimization Tips</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-legal-dark">
              Powerful Website Analysis Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Brain, title: "AI Search Optimization", description: "Get insights on how to optimize content for ChatGPT, Perplexity, and other AI search engines" },
                { icon: BarChart3, title: "Page Speed Analysis", description: "Comprehensive performance metrics like Google PageSpeed Insights with actionable recommendations" },
                { icon: FileSearch, title: "Content Analysis", description: "Evaluate your content structure and identify opportunities for featured snippets" },
                { icon: TrendingUp, title: "SEO Score", description: "Track your optimization progress with detailed scoring across 100+ factors" },
                { icon: Zap, title: "Instant Reports", description: "Get comprehensive analysis in under 3 minutes with easy-to-understand recommendations" },
                { icon: Shield, title: "Technical SEO", description: "Identify technical issues that prevent AI engines from properly indexing your content" }
              ].map((feature, index) => (
                <Card key={index} className="border-legal-primary/20 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <feature.icon className="w-12 h-12 text-legal-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2 text-legal-dark">{feature.title}</h3>
                    <p className="text-gray-700">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study */}
        <section className="section-padding bg-legal-light/30">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-legal-dark">
                Success Story: Mountain View Real Estate
              </h2>
              <Card className="border-none shadow-xl">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-4 text-legal-primary">The Challenge</h3>
                    <p className="text-gray-700 mb-4">
                      Mountain View Real Estate, a boutique agency with 50+ property listings, was struggling to appear in AI-powered search results. While their traditional SEO was strong, they were being overlooked by ChatGPT, Perplexity, and other AI search engines when potential buyers asked for property recommendations.
                    </p>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-4 text-legal-primary">The Solution</h3>
                    <p className="text-gray-700 mb-4">
                      We used AEO Analyzer to audit their website and identify gaps in AI search optimization. The tool revealed issues with content structure, page speed (2.8s load time), and missing schema markup that prevented AI engines from understanding their listings. They implemented all recommended fixes within two weeks.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-legal-primary">The Results</h3>
                    <ul className="space-y-3">
                      {[
                        "Featured in AI search results within 3 weeks",
                        "Page load time improved from 2.8s to 0.9s",
                        "65% increase in organic traffic from AI-powered searches",
                        "43% boost in qualified leads from voice search",
                        "Improved visibility in ChatGPT and Perplexity AI recommendations"
                      ].map((result, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-5 h-5 text-legal-primary mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-padding">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-legal-dark">
              What Our Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  quote: "AEO Analyzer showed us exactly what we needed to fix to start appearing in AI search results. Within a month, we were being recommended by ChatGPT for local property searches. The page speed improvements alone were worth it.",
                  author: "Jennifer Adams",
                  role: "Owner, Mountain View Real Estate"
                },
                {
                  quote: "This tool is a game-changer. It's like having Google PageSpeed Insights combined with AI search optimization in one place. The actionable recommendations are clear and easy to implement, even for non-technical users.",
                  author: "Marcus Chen",
                  role: "Digital Marketing Manager, TechStart Solutions"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="border-legal-primary/20">
                  <CardContent className="p-6">
                    <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                    <div className="border-t pt-4">
                      <p className="font-bold text-legal-dark">{testimonial.author}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="section-padding bg-legal-light/30">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-legal-dark">
              Simple, Transparent Pricing
            </h2>
            <div className="max-w-md mx-auto">
              <Card className="border-legal-primary border-2 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold mb-2 text-center text-legal-dark">AEO Analyzer Pro</h3>
                  <p className="text-center text-gray-600 mb-6">Get premium access to all AEO analysis features</p>
                  <div className="mb-2 text-center">
                    <span className="text-5xl font-bold text-legal-primary">$49.95</span>
                    <span className="text-xl text-gray-600">/month</span>
                  </div>
                  <p className="text-center text-sm text-gray-600 mb-8">Billed monthly</p>
                  <ul className="space-y-4 mb-8">
                    {[
                      "Comprehensive website analysis",
                      "Detailed recommendations for content optimization",
                      "Performance tracking and historical data",
                      "Export analysis reports",
                      "Priority support"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-6 h-6 text-legal-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-legal-primary hover:bg-legal-dark text-lg py-6" asChild>
                    <a href="https://aeoanalyzer.com" target="_blank" rel="noopener noreferrer">
                      Get Started
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-gradient-to-br from-legal-primary to-legal-dark text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Optimize for AI Search?
            </h2>
            <p className="text-xl mb-8 text-legal-light max-w-2xl mx-auto">
              Join hundreds of businesses using AEO Analyzer to dominate AI-powered search results and improve their website performance.
            </p>
            <Button size="lg" className="bg-white text-legal-primary hover:bg-legal-light" asChild>
              <a href="https://aeoanalyzer.com" target="_blank" rel="noopener noreferrer">
                Start Your Free Analysis
              </a>
            </Button>
          </div>
        </section>

        <Footer />
        <MobileFooterNav />
      </div>
    </>
  );
};

export default AeoAnalyzerPage;
