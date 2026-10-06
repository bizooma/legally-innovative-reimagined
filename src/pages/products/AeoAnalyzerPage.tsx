import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, BarChart3, Brain, Zap, FileSearch, TrendingUp, Shield } from "lucide-react";

const AeoAnalyzerPage = () => {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "AEO Analyzer",
    "description": "AI-powered legal analytics platform that helps law firms identify case patterns, predict outcomes, and optimize legal strategies with 95% accuracy.",
    "brand": { "@type": "Brand", "name": "Bizooma" },
    "url": "https://bizooma.com/products/aeo-analyzer",
    "offers": [
      {
        "@type": "Offer",
        "name": "Solo",
        "price": "499",
        "priceCurrency": "USD",
        "url": "https://bizooma.com/products/aeo-analyzer",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Firm",
        "price": "1299",
        "priceCurrency": "USD",
        "url": "https://bizooma.com/products/aeo-analyzer",
        "availability": "https://schema.org/InStock"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>AEO Analyzer - Legal Analytics Dashboard | Bizooma</title>
        <meta name="description" content="Advanced AI analytics platform for law firms. Identify case patterns, predict outcomes, and optimize legal strategies with 95% accuracy." />
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navbar />

        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-legal-primary to-legal-dark text-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                AEO Analyzer: AI-Powered Legal Analytics
              </h1>
              <p className="text-xl mb-8 text-legal-light">
                Advanced analytics platform that helps law firms identify case patterns, predict outcomes, and optimize legal strategies with data-driven insights and 95% accuracy.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-white text-legal-primary hover:bg-legal-light">
                  Request Demo
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  View Sample Report
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-legal-dark">
              Powerful Analytics for Law Firms
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Brain, title: "AI Pattern Recognition", description: "Identify winning strategies from thousands of similar cases" },
                { icon: BarChart3, title: "Visual Analytics", description: "Interactive dashboards with real-time case insights" },
                { icon: FileSearch, title: "Document Analysis", description: "Extract key information from case files automatically" },
                { icon: TrendingUp, title: "Outcome Prediction", description: "Forecast case results based on historical data" },
                { icon: Zap, title: "Real-Time Insights", description: "Get instant recommendations during case preparation" },
                { icon: Shield, title: "Secure & Compliant", description: "Bank-level encryption and HIPAA compliance" }
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
              Flexible Pricing Plans
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Solo",
                  price: "$499",
                  period: "/month",
                  features: [
                    "Up to 50 active cases",
                    "Basic analytics dashboard",
                    "Document analysis (100/month)",
                    "Email support",
                    "Standard reports"
                  ]
                },
                {
                  name: "Firm",
                  price: "$1,299",
                  period: "/month",
                  popular: true,
                  features: [
                    "Up to 200 active cases",
                    "Advanced analytics & predictions",
                    "Unlimited document analysis",
                    "Priority phone support",
                    "Custom reports & exports",
                    "Team collaboration tools",
                    "API access"
                  ]
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  period: "",
                  features: [
                    "Unlimited cases",
                    "White-label solution",
                    "Custom AI model training",
                    "Dedicated account manager",
                    "Advanced integrations",
                    "On-premise deployment option",
                    "SLA guarantee",
                    "Custom development"
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
                      {plan.price === "Custom" ? "Contact Sales" : "Request Demo"}
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
              Ready to Transform Your Legal Practice?
            </h2>
            <p className="text-xl mb-8 text-legal-light max-w-2xl mx-auto">
              Join leading law firms using AEO Analyzer to win more cases and serve clients better.
            </p>
            <Button size="lg" className="bg-white text-legal-primary hover:bg-legal-light">
              Schedule Your Demo Today
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
