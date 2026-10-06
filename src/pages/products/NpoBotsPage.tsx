import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, MessageSquare, TrendingUp, Clock, Users, Zap } from "lucide-react";

const NpoBotsPage = () => {
  return (
    <>
      <Helmet>
        <title>NPO Bots - AI-Powered Nonprofit Engagement | Bizooma</title>
        <meta name="description" content="Revolutionary AI chatbot platform for nonprofits. Increase donor engagement by 340% and automate 80% of inquiries with 24/7 support." />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navbar />

        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-legal-primary to-legal-dark text-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                NPO Bots: Transform Your Nonprofit Engagement
              </h1>
              <p className="text-xl mb-8 text-legal-light">
                Revolutionary AI-powered chatbot platform that increased donor engagement by 340% and automated 80% of common inquiries for nonprofit organizations.
              </p>
              <div className="flex justify-center">
                <Button size="lg" className="bg-white text-legal-primary hover:bg-legal-light" asChild>
                  <a href="https://npobots.com" target="_blank" rel="noopener noreferrer">
                    Get Started
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-legal-dark">
              Powerful Features for Nonprofits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: MessageSquare, title: "Intelligent Conversations", description: "Natural language processing understands donor intent and responds contextually" },
                { icon: TrendingUp, title: "Donor Analytics", description: "Track engagement patterns and optimize your fundraising strategies" },
                { icon: Clock, title: "24/7 Availability", description: "Never miss an opportunity to connect with supporters" },
                { icon: Users, title: "Multi-Site Support", description: "Deploy on multiple .org websites that are part of your organization" },
                { icon: Zap, title: "Instant Responses", description: "Answer common questions immediately, freeing staff for complex issues" },
                { icon: Check, title: "Easy Installation", description: "Copy and paste a script onto your website" }
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

        {/* Pricing */}
        <section className="section-padding bg-legal-light/30">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-legal-dark">
              Simple, Transparent Pricing
            </h2>
            <div className="max-w-md mx-auto">
              <Card className="border-legal-primary border-2 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold mb-2 text-center text-legal-dark">NPO Bots</h3>
                  <div className="mb-8 text-center">
                    <span className="text-5xl font-bold text-legal-primary">$99</span>
                    <span className="text-xl text-gray-600">/month</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {[
                      "Up to 2,000 conversations/month",
                      "Deploy on your website",
                      "24/7 automated responses",
                      "Donor engagement analytics",
                      "Email support",
                      "Custom AI training",
                      "Lead capture & qualification",
                      "Easy CRM integration"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-6 h-6 text-legal-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-legal-primary hover:bg-legal-dark text-lg py-6">
                    Get Started Today
                  </Button>
                  <p className="text-center text-sm text-gray-600 mt-4">
                    Easy setup • Cancel anytime
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-gradient-to-br from-legal-primary to-legal-dark text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Nonprofit?
            </h2>
            <p className="text-xl mb-8 text-legal-light max-w-2xl mx-auto">
              Join hundreds of nonprofits using NPO Bots to engage more donors and make a bigger impact.
            </p>
            <Button size="lg" className="bg-white text-legal-primary hover:bg-legal-light">
              Get Started Today
            </Button>
          </div>
        </section>

        <Footer />
        <MobileFooterNav />
      </div>
    </>
  );
};

export default NpoBotsPage;
