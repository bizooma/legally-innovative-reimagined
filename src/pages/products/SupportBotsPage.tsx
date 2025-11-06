import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, MessageCircle, Clock, Users, Zap, BarChart3, Globe } from "lucide-react";
import underConstructionImg from "@/assets/under-construction.jpg";

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
                <div className="text-4xl font-bold text-legal-primary mb-2">85%</div>
                <div className="text-gray-700">Inquiries Resolved Instantly</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-legal-primary mb-2">60%</div>
                <div className="text-gray-700">Cost Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-legal-primary mb-2">24/7</div>
                <div className="text-gray-700">Support Availability</div>
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

        {/* Case Study */}
        <section className="section-padding bg-legal-light/30">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-legal-dark">
                Success Story: ShopNow E-commerce
              </h2>
              <Card className="border-none shadow-xl">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-4 text-legal-primary">The Challenge</h3>
                    <p className="text-gray-700 mb-4">
                      ShopNow, an e-commerce platform with 100,000+ daily visitors, struggled with 5,000+ daily support tickets. Their 20-person support team couldn't keep up, leading to 4-hour average response times and declining customer satisfaction scores.
                    </p>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-4 text-legal-primary">The Solution</h3>
                    <p className="text-gray-700 mb-4">
                      We deployed Support Bots trained on ShopNow's knowledge base, FAQs, and order data. The AI handled order tracking, returns, product questions, and account issues across website chat, email, and social media.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-legal-primary">The Results</h3>
                    <ul className="space-y-3">
                      {[
                        "85% of support tickets resolved automatically",
                        "Response time reduced from 4 hours to 5 seconds",
                        "60% reduction in support costs ($240K annual savings)",
                        "Customer satisfaction score increased from 3.2 to 4.7/5",
                        "Support team refocused on complex issues and VIP customers"
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
              What Support Leaders Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  quote: "Support Bots transformed our customer service. We're now providing instant 24/7 support while our team focuses on building relationships with our most valuable customers. It's been a game-changer.",
                  author: "Amanda Chen",
                  role: "Director of Customer Success, ShopNow"
                },
                {
                  quote: "The ROI was immediate and impressive. We cut support costs by 60% in the first quarter while actually improving our satisfaction scores. Our customers are happier and our team is more productive.",
                  author: "Robert Williams",
                  role: "VP of Operations, TechSupply Co"
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
      </div>
    </>
  );
};

export default SupportBotsPage;
