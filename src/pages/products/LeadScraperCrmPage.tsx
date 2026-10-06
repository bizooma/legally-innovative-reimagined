import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Search, Database, Target, Zap, Mail, TrendingUp } from "lucide-react";

const LeadScraperCrmPage = () => {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Lead Scraper CRM",
    "description": "Automated lead generation and management platform. AI-powered lead scraping with built-in CRM, email automation, verification, and enrichment.",
    "brand": { "@type": "Brand", "name": "Bizooma" },
    "url": "https://bizooma.com/products/lead-scraper-crm",
    "offers": [
      {
        "@type": "Offer",
        "name": "Starter",
        "price": "99",
        "priceCurrency": "USD",
        "url": "https://bizooma.com/products/lead-scraper-crm",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Growth",
        "price": "299",
        "priceCurrency": "USD",
        "url": "https://bizooma.com/products/lead-scraper-crm",
        "availability": "https://schema.org/InStock"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Lead Scraper CRM - Automated Lead Generation & Management | Bizooma</title>
        <meta name="description" content="Automatically find, verify, and manage leads with AI-powered lead scraper. Built-in CRM with email automation and enrichment." />
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navbar />

        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-legal-primary to-legal-dark text-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Lead Scraper CRM: Automated Lead Generation
              </h1>
              <p className="text-xl mb-8 text-legal-light">
                Automatically find, verify, and manage quality leads with AI-powered scraping. Built-in CRM with email automation, enrichment, and intelligent nurturing.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-white text-legal-primary hover:bg-legal-light">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-legal-dark">
              Complete Lead Generation System
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Search, title: "Smart Lead Discovery", description: "Find leads from LinkedIn, websites, directories, and social media" },
                { icon: Database, title: "Data Enrichment", description: "Automatically enrich leads with company info, social profiles, and more" },
                { icon: Target, title: "Advanced Filtering", description: "Find your ideal customers with precision targeting" },
                { icon: Mail, title: "Email Automation", description: "Personalized outreach campaigns with AI-written templates" },
                { icon: Zap, title: "Real-Time Verification", description: "Verify emails and phone numbers before outreach" },
                { icon: TrendingUp, title: "Built-in CRM", description: "Manage leads, track interactions, and close deals" }
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
              Affordable Plans for Every Business
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Starter",
                  price: "$99",
                  period: "/month",
                  features: [
                    "500 leads/month",
                    "Email verification",
                    "Basic enrichment",
                    "CRM for up to 2 users",
                    "Email support"
                  ]
                },
                {
                  name: "Growth",
                  price: "$299",
                  period: "/month",
                  popular: true,
                  features: [
                    "5,000 leads/month",
                    "Email & phone verification",
                    "Advanced enrichment",
                    "CRM for up to 10 users",
                    "Email automation (10K sends)",
                    "Priority support",
                    "API access"
                  ]
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  period: "",
                  features: [
                    "Unlimited leads",
                    "Full verification suite",
                    "Premium enrichment",
                    "Unlimited users",
                    "Unlimited email automation",
                    "Dedicated account manager",
                    "Custom integrations",
                    "White-label option"
                  ]
                }
              ].map((plan, index) => (
                <Card key={index} className={`${plan.popular ? 'border-legal-primary border-2 shadow-xl' : 'border-legal-primary/20'} relative`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-legal-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-legal-dark">{plan.name}</h3>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-legal-primary">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
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
                      {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
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
              Ready to 10x Your Lead Generation?
            </h2>
            <p className="text-xl mb-8 text-legal-light max-w-2xl mx-auto">
              Stop wasting money on bad leads. Start generating quality leads automatically today.
            </p>
            <Button size="lg" className="bg-white text-legal-primary hover:bg-legal-light">
              Start Your Free 14-Day Trial
            </Button>
          </div>
        </section>

        <Footer />
        <MobileFooterNav />
      </div>
    </>
  );
};

export default LeadScraperCrmPage;
