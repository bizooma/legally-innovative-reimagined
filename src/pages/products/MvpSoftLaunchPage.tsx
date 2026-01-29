import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Rocket, Target, Globe, Search, Zap, TrendingUp } from "lucide-react";
import mvpSoftlaunchImg from "@/assets/mvp-softlaunch-screenshot.png";

const MvpSoftLaunchPage = () => {
  return (
    <>
      <Helmet>
        <title>MVP Soft Launch - Launch Platform Directory | Bizooma</title>
        <meta name="description" content="Discover 200+ platforms to list, launch, and promote your SaaS, mobile app, or software. Find the perfect launch sites for your target audience and ship faster." />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navbar />

        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-legal-primary to-legal-dark text-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                MVP Soft Launch: Your Launch Platform Directory
              </h1>
              <p className="text-xl mb-8 text-legal-light">
                Discover 200+ curated platforms to list, launch, and promote your SaaS, mobile app, or software. Find the perfect launch sites for your target audience and accelerate your go-to-market strategy.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-white text-legal-primary hover:bg-legal-light">
                  Access Directory
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  View Sample Platforms
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
                <div className="text-4xl font-bold text-legal-primary mb-2">200+</div>
                <div className="text-gray-700">Launch Platforms</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-legal-primary mb-2">10x</div>
                <div className="text-gray-700">Faster Discovery</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-legal-primary mb-2">50+</div>
                <div className="text-gray-700">Categories Covered</div>
              </div>
            </div>
          </div>
        </section>

        {/* Screenshot Section */}
        <section className="section-padding">
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-legal-dark">
                Your Complete Launch Toolkit
              </h2>
              <div className="rounded-xl overflow-hidden shadow-2xl border border-legal-primary/20">
                <img 
                  src={mvpSoftlaunchImg} 
                  alt="MVP Soft Launch Platform Directory Interface" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding bg-legal-light/30">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-legal-dark">
              Everything You Need to Launch Successfully
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Rocket, title: "Curated Platforms", description: "200+ hand-picked launch sites organized by category, audience, and industry" },
                { icon: Target, title: "Audience Targeting", description: "Filter platforms by your target market for maximum visibility and relevance" },
                { icon: Globe, title: "Global Reach", description: "Access international platforms to launch your product worldwide" },
                { icon: Search, title: "Smart Search", description: "Find the perfect platforms with powerful filtering and search tools" },
                { icon: Zap, title: "Quick Submissions", description: "Direct links and submission tips to speed up your listing process" },
                { icon: TrendingUp, title: "Launch Strategy", description: "Best practices and timing recommendations for each platform" }
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

        {/* Platform Categories */}
        <section className="section-padding">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-legal-dark">
              Platform Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                "Product Hunt Alternatives",
                "SaaS Directories",
                "Startup Communities",
                "Developer Platforms",
                "App Stores",
                "Tech News Sites",
                "Beta Tester Networks",
                "Indie Hacker Forums",
                "AI Tool Directories",
                "No-Code Platforms",
                "Review Sites",
                "Social Aggregators"
              ].map((category, index) => (
                <div key={index} className="bg-legal-light/50 rounded-lg p-4 text-center hover:bg-legal-primary/10 transition-colors">
                  <span className="text-legal-dark font-medium">{category}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-padding bg-legal-light/30">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-legal-dark">
                Why Use MVP Soft Launch?
              </h2>
              <Card className="border-none shadow-xl">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-legal-primary">Save Time</h3>
                      <ul className="space-y-3">
                        {[
                          "No more endless Googling for launch sites",
                          "Pre-vetted platforms save research hours",
                          "Ready-to-use submission links",
                          "Organized by category and audience"
                        ].map((item, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="w-5 h-5 text-legal-primary mr-3 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-legal-primary">Launch Better</h3>
                      <ul className="space-y-3">
                        {[
                          "Reach your ideal customers faster",
                          "Build early traction and backlinks",
                          "Gather user feedback from multiple sources",
                          "Increase visibility across the web"
                        ].map((item, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="w-5 h-5 text-legal-primary mr-3 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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
              What Founders Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  quote: "MVP Soft Launch saved me at least 40 hours of research. I launched my SaaS on 50+ platforms in one weekend and got my first 500 users within two weeks.",
                  author: "Alex Chen",
                  role: "Founder, TaskFlow AI"
                },
                {
                  quote: "As a solo founder, time is my most valuable resource. This directory helped me find niche platforms I never knew existed. My launch got 3x more visibility than expected.",
                  author: "Sarah Miller",
                  role: "Indie Hacker, DataPulse"
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
              Simple Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {[
                {
                  name: "Starter",
                  price: "$29",
                  period: "one-time",
                  features: [
                    "Access to 200+ platforms",
                    "Category filters",
                    "Direct submission links",
                    "Lifetime updates",
                    "Basic launch checklist"
                  ]
                },
                {
                  name: "Pro",
                  price: "$79",
                  period: "one-time",
                  popular: true,
                  features: [
                    "Everything in Starter",
                    "Priority platform additions",
                    "Launch strategy templates",
                    "Pitch templates for each platform",
                    "Email outreach scripts",
                    "Exclusive launch community access",
                    "1-on-1 launch review"
                  ]
                }
              ].map((plan, index) => (
                <Card key={index} className={`${plan.popular ? 'border-legal-primary border-2 shadow-xl' : 'border-legal-primary/20'} relative`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-legal-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Best Value
                      </span>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-legal-dark">{plan.name}</h3>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-legal-primary">{plan.price}</span>
                      <span className="text-gray-600"> {plan.period}</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="w-5 h-5 text-legal-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className={`w-full ${plan.popular ? 'bg-legal-primary hover:bg-legal-dark' : ''}`}>
                      Get Access
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-gradient-to-br from-legal-primary to-legal-dark text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Launch Your Product?
            </h2>
            <p className="text-xl mb-8 text-legal-light max-w-2xl mx-auto">
              Stop wasting time searching for launch platforms. Get instant access to 200+ curated sites and start building traction today.
            </p>
            <Button size="lg" className="bg-white text-legal-primary hover:bg-legal-light">
              Get MVP Soft Launch Now
            </Button>
          </div>
        </section>

        <Footer />
        <MobileFooterNav />
      </div>
    </>
  );
};

export default MvpSoftLaunchPage;
