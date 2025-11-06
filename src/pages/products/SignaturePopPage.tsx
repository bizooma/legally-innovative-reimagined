import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Mail, TrendingUp, Users, Zap, BarChart, Sparkles } from "lucide-react";
import underConstructionImg from "@/assets/under-construction.jpg";

const SignaturePopPage = () => {
  return (
    <>
      <Helmet>
        <title>Signature Pop - Email Signature Marketing Platform | Bizooma</title>
        <meta name="description" content="Turn every email into a marketing opportunity with dynamic email signatures. Add banners, CTAs, and track clicks across your entire team." />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navbar />

        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-legal-primary to-legal-dark text-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Signature Pop: Email Signature Marketing
              </h1>
              <p className="text-xl mb-8 text-legal-light">
                Transform every email into a marketing opportunity with branded, interactive email signatures. Add dynamic banners, track clicks, and run campaigns across your entire team.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-white text-legal-primary hover:bg-legal-light">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  View Examples
                </Button>
              </div>
              <div className="mt-8">
                <img src={underConstructionImg} alt="Under Construction - Coming Soon" className="w-full max-w-3xl mx-auto rounded-lg shadow-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Key Results */}
        <section className="py-12 bg-legal-light/30">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-legal-primary mb-2">425%</div>
                <div className="text-gray-700">Increase in Engagement</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-legal-primary mb-2">8K+</div>
                <div className="text-gray-700">Impressions Per Employee/Year</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-legal-primary mb-2">Zero</div>
                <div className="text-gray-700">Additional Marketing Spend</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-legal-dark">
              Turn Emails Into Marketing Campaigns
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Mail, title: "Professional Templates", description: "Beautiful, mobile-responsive signature designs" },
                { icon: Sparkles, title: "Dynamic Banners", description: "Add promotional banners that update automatically" },
                { icon: TrendingUp, title: "Campaign Management", description: "Run different campaigns for different teams or occasions" },
                { icon: BarChart, title: "Click Tracking", description: "See who's clicking and which campaigns perform best" },
                { icon: Users, title: "Team Management", description: "Centrally manage signatures for your entire organization" },
                { icon: Zap, title: "Easy Deployment", description: "One-click installation for Gmail, Outlook, and more" }
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
                Success Story: Summit Consulting
              </h2>
              <Card className="border-none shadow-xl">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-4 text-legal-primary">The Challenge</h3>
                    <p className="text-gray-700 mb-4">
                      Summit Consulting, with 75 consultants, sent 500+ client emails daily but had no way to leverage this touchpoint. Their email signatures were inconsistent, outdated, and wasted valuable marketing real estate.
                    </p>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-4 text-legal-primary">The Solution</h3>
                    <p className="text-gray-700 mb-4">
                      We implemented Signature Pop with branded signatures featuring rotating banners promoting their new AI consulting service, upcoming webinar, and case study downloads. The system automatically updated all employee signatures.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-legal-primary">The Results</h3>
                    <ul className="space-y-3">
                      {[
                        "425% increase in website traffic from email signatures",
                        "287 webinar registrations (worth $143,500 in pipeline)",
                        "1,200+ case study downloads",
                        "95% brand consistency across all employee emails",
                        "$0 spent on additional marketing to achieve results"
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
              What Marketing Leaders Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  quote: "Signature Pop turned our biggest untapped marketing channel into a lead generation machine. Every employee email now promotes our services without any extra effort. The ROI has been phenomenal.",
                  author: "Rachel Thompson",
                  role: "CMO, Summit Consulting"
                },
                {
                  quote: "We were wasting thousands of impressions daily with plain email signatures. Now we're running targeted campaigns directly in our emails and actually tracking results. It's marketing gold.",
                  author: "Daniel Kim",
                  role: "Marketing Director, Apex Technologies"
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
              Simple Per-User Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Starter",
                  price: "$3",
                  period: "/user/month",
                  features: [
                    "Up to 25 users",
                    "Professional templates",
                    "Basic banner campaigns",
                    "Click tracking",
                    "Email support"
                  ]
                },
                {
                  name: "Business",
                  price: "$5",
                  period: "/user/month",
                  popular: true,
                  features: [
                    "Up to 500 users",
                    "Custom templates",
                    "Advanced campaign management",
                    "Detailed analytics",
                    "A/B testing",
                    "Priority support",
                    "API access"
                  ]
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  period: "",
                  features: [
                    "Unlimited users",
                    "White-label solution",
                    "Custom integrations",
                    "Dedicated account manager",
                    "Advanced security & compliance",
                    "Custom development",
                    "SLA guarantee",
                    "Training & onboarding"
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
              Ready to Unlock Your Email Marketing Potential?
            </h2>
            <p className="text-xl mb-8 text-legal-light max-w-2xl mx-auto">
              Every email is an opportunity. Start turning your team's emails into marketing campaigns today.
            </p>
            <Button size="lg" className="bg-white text-legal-primary hover:bg-legal-light">
              Start Your Free 14-Day Trial
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default SignaturePopPage;
