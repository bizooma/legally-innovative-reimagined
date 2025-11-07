import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, QrCode, Smartphone, BarChart, Eye, Zap, Share2 } from "lucide-react";

const QuickieQrPage = () => {
  return (
    <>
      <Helmet>
        <title>Quickie QR - Smart QR Code Marketing Platform | Bizooma</title>
        <meta name="description" content="Create dynamic QR codes with built-in analytics. Track scans, update content in real-time, and boost engagement with smart QR marketing." />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navbar />

        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-legal-primary to-legal-dark text-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Quickie QR: Smart QR Code Marketing
              </h1>
              <p className="text-xl mb-8 text-legal-light">
                Create dynamic QR codes with built-in analytics, A/B testing, and real-time content updates. Perfect for restaurants, retail, events, and professional services.
              </p>
              <div className="flex justify-center">
                <Button size="lg" className="bg-white text-legal-primary hover:bg-legal-light">
                  Coming Soon
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
                <div className="text-4xl font-bold text-legal-primary mb-2">N/A</div>
                <div className="text-gray-700">Increase in Engagement</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-legal-primary mb-2">Real-Time</div>
                <div className="text-gray-700">Content Updates</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-legal-primary mb-2">N/A</div>
                <div className="text-gray-700">Businesses Using</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-legal-dark">
              Powerful QR Code Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: QrCode, title: "Dynamic QR Codes", description: "Update content anytime without reprinting codes" },
                { icon: BarChart, title: "Advanced Analytics", description: "Track scans, locations, devices, and time patterns" },
                { icon: Eye, title: "A/B Testing", description: "Test different landing pages and optimize conversion" },
                { icon: Smartphone, title: "Mobile Optimized", description: "Perfect viewing experience on all devices" },
                { icon: Zap, title: "Instant Creation", description: "Generate professional QR codes in seconds" },
                { icon: Share2, title: "Multi-Channel", description: "Use on print, digital, packaging, and more" }
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
                Success Story: Bella's Bistro
              </h2>
              <Card className="border-none shadow-xl">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-4 text-legal-primary">The Challenge</h3>
                    <p className="text-gray-700 mb-4">
                      Bella's Bistro, a popular restaurant chain with 8 locations, wanted to modernize their menus and collect customer feedback. Printing new menus for specials cost $500/week, and customer engagement was minimal.
                    </p>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-4 text-legal-primary">The Solution</h3>
                    <p className="text-gray-700 mb-4">
                      We implemented Quickie QR table tents with dynamic menu links. Each location got custom QR codes linking to digital menus that could be updated instantly. We added feedback forms, loyalty program signup, and social media links.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-legal-primary">The Results</h3>
                    <ul className="space-y-3">
                      {[
                        "85% of diners now scan QR codes for menus",
                        "$26,000 saved annually on menu printing",
                        "250% increase in loyalty program signups",
                        "Daily menu updates for specials at zero cost",
                        "2,500+ customer feedback responses monthly"
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
              What Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  quote: "Quickie QR transformed our restaurant operations. We update our menu daily with specials, and customers love the convenience. The analytics showed us our most popular items, helping us optimize our offerings.",
                  author: "Isabella Rodriguez",
                  role: "Owner, Bella's Bistro"
                },
                {
                  quote: "As a real estate agent, I use Quickie QR on property signs. Potential buyers scan and instantly see photos, videos, and details. My listing engagement increased 300% and I'm closing deals faster.",
                  author: "James Patterson",
                  role: "Realtor, Premium Properties"
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
              Simple Pricing, Powerful Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Starter",
                  price: "$29",
                  period: "/month",
                  features: [
                    "10 dynamic QR codes",
                    "5,000 scans/month",
                    "Basic analytics",
                    "Email support",
                    "Mobile optimized pages"
                  ]
                },
                {
                  name: "Business",
                  price: "$79",
                  period: "/month",
                  popular: true,
                  features: [
                    "50 dynamic QR codes",
                    "25,000 scans/month",
                    "Advanced analytics & A/B testing",
                    "Priority support",
                    "Custom branding",
                    "API access",
                    "Team collaboration"
                  ]
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  period: "",
                  features: [
                    "Unlimited QR codes",
                    "Unlimited scans",
                    "White-label solution",
                    "Dedicated account manager",
                    "Custom integrations",
                    "Advanced security",
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
              Ready to Modernize Your Marketing?
            </h2>
            <p className="text-xl mb-8 text-legal-light max-w-2xl mx-auto">
              Join 10,000+ businesses using Quickie QR to engage customers and track results.
            </p>
            <Button size="lg" className="bg-white text-legal-primary hover:bg-legal-light">
              Create Your First QR Code Free
            </Button>
          </div>
        </section>

        <Footer />
        <MobileFooterNav />
      </div>
    </>
  );
};

export default QuickieQrPage;
