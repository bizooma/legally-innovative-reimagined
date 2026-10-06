import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, MessageCircle, Clock, Users, Zap, BarChart3, Globe } from "lucide-react";

const SupportBotsPage = () => {
  return (
    <>
      <Helmet>
        <title>Support Bots - AI-Powered Customer Support Automation | Bizooma</title>
        <meta name="description" content="Automate customer support with AI chatbots. Resolve 85% of inquiries instantly, reduce costs by 60%, and provide 24/7 multilingual support." />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navbar />

        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-legal-primary to-legal-dark text-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Support Bots: Transform Customer Support
              </h1>
              <p className="text-xl mb-8 text-legal-light">
                AI-powered customer support automation that resolves 85% of inquiries instantly. Reduce support costs by 60% while improving customer satisfaction with 24/7 multilingual assistance.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-white text-legal-primary hover:bg-legal-light">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  See Live Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-legal-dark">
              Enterprise-Grade Support Automation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: MessageCircle, title: "Natural Conversations", description: "AI understands context and intent for human-like interactions" },
                { icon: Clock, title: "Instant Responses", description: "Zero wait times for common questions and issues" },
                { icon: Users, title: "Smart Escalation", description: "Seamlessly transfer complex issues to human agents" },
                { icon: Globe, title: "50+ Languages", description: "Provide support in customers' native languages" },
                { icon: Zap, title: "Easy Integration", description: "Connect with Zendesk, Intercom, Salesforce, and more" },
                { icon: BarChart3, title: "Advanced Analytics", description: "Track metrics, identify trends, and optimize performance" }
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
              Plans That Scale With You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Starter",
                  price: "$199",
                  period: "/month",
                  features: [
                    "1,000 conversations/month",
                    "Single channel (website)",
                    "Basic AI training",
                    "Email support",
                    "Standard analytics"
                  ]
                },
                {
                  name: "Professional",
                  price: "$599",
                  period: "/month",
                  popular: true,
                  features: [
                    "10,000 conversations/month",
                    "Multi-channel (website, email, social)",
                    "Advanced AI with custom training",
                    "Priority support",
                    "Advanced analytics & reporting",
                    "CRM integration",
                    "Team collaboration tools"
                  ]
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  period: "",
                  features: [
                    "Unlimited conversations",
                    "All channels + phone integration",
                    "Custom AI models",
                    "Dedicated account manager",
                    "White-label solution",
                    "Advanced security & compliance",
                    "SLA guarantee",
                    "Custom integrations"
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
              Ready to Transform Your Support?
            </h2>
            <p className="text-xl mb-8 text-legal-light max-w-2xl mx-auto">
              Join thousands of companies providing better support at a fraction of the cost.
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

export default SupportBotsPage;
