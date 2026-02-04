import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  TrendingUp, 
  Users, 
  Heart, 
  Target, 
  Share2, 
  CheckCircle,
  ArrowDown,
  Building2,
  Briefcase,
  MapPin,
  Zap
} from "lucide-react";

const MomentumCampaignsPage = () => {
  const scrollToCaseStudy = () => {
    const element = document.getElementById('case-studies');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('closing-cta');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const benefits = [
    { icon: Heart, text: "Builds trust without selling" },
    { icon: Target, text: "Keeps your brand top-of-mind" },
    { icon: Users, text: "Strengthens emotional connection" },
    { icon: TrendingUp, text: "Activates former clients and referral sources" },
    { icon: Share2, text: "Creates shareable, human content" },
  ];

  const targetAudience = [
    { icon: Briefcase, text: "Law firms" },
    { icon: Building2, text: "Professional service firms" },
    { icon: MapPin, text: "Brands with strong local or community ties" },
    { icon: Zap, text: "Businesses that value long-term growth over short-term clicks" },
  ];

  return (
    <>
      <Helmet>
        <title>Momentum Campaigns | Brand-Driven Digital Campaigns | Bizooma</title>
        <meta 
          name="description" 
          content="Turn cultural moments into trust, recall, and referrals. Momentum campaigns are brand acceleration campaigns designed for law firms and professional service firms." 
        />
        <meta name="keywords" content="momentum campaigns, brand campaigns, law firm marketing, cultural marketing, digital campaigns, brand awareness" />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-legal-primary to-legal-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Momentum Campaigns
            </h1>
            <p className="text-xl md:text-2xl font-light mb-6 text-white/90">
              Turn cultural moments into trust, recall, and referrals.
            </p>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              Not every campaign is about immediate leads.<br />
              Some campaigns are about showing up at the right moment — when your audience already cares.
            </p>
            <Button 
              onClick={scrollToCaseStudy}
              size="lg"
              className="bg-white text-legal-primary hover:bg-legal-light hover:text-legal-dark transition-all duration-300 group"
            >
              View a Campaign Example
              <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* What Is a Momentum Campaign Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-legal-dark mb-8 text-center">
              What Is a Momentum Campaign?
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Momentum campaigns are short-term, culturally relevant digital campaigns designed to align your brand with moments your audience already feels emotionally connected to — sports, community events, seasonal trends, or shared experiences.
              </p>
              <div className="bg-legal-light/50 border-l-4 border-legal-primary p-6 rounded-r-lg">
                <p className="font-medium text-legal-dark">
                  They are not sales campaigns.<br />
                  <span className="text-legal-primary">They are brand acceleration campaigns.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Momentum Works Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-legal-dark mb-12 text-center">
              Why This Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {benefits.map((benefit, index) => (
                <Card 
                  key={index} 
                  className="bg-white border-legal-primary/10 hover:border-legal-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="p-3 bg-legal-light rounded-lg shrink-0">
                      <benefit.icon className="h-6 w-6 text-legal-primary" />
                    </div>
                    <p className="text-gray-700 font-medium">{benefit.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-center text-xl text-gray-600 italic max-w-2xl mx-auto">
              "People don't remember ads — they remember how a brand made them feel."
            </p>
          </div>
        </div>
      </section>

      {/* Finding the Moment Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-legal-dark mb-8 text-center">
              Finding the Moment
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                At Bizooma, we actively monitor platforms like Google Trends, social conversations, and local cultural signals to identify moments that naturally intersect with our clients' audiences.
              </p>
              <p className="text-gray-600">
                Sometimes it's subtle.<br />
                Sometimes it's obvious.
              </p>
              <p>
                The Seahawks Super Bowl campaign was one of those moments — a city-wide emotional event that didn't need to be manufactured. It needed to be respected and leveraged correctly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="section-padding bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-legal-dark mb-12 text-center">
              Momentum Campaigns in Action
            </h2>
            
            <Card className="bg-white border-legal-primary/20 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gradient-to-br from-legal-primary to-legal-dark p-8 flex items-center justify-center">
                  <div className="text-center text-white">
                    <TrendingUp className="h-16 w-16 mx-auto mb-4 opacity-90" />
                    <p className="font-playfair text-xl font-semibold">Case Study</p>
                  </div>
                </div>
                <CardContent className="md:w-2/3 p-8">
                  <h3 className="font-playfair text-2xl font-bold text-legal-dark mb-4">
                    Seattle Seahawks Super Bowl Momentum Campaign
                  </h3>
                  <p className="text-gray-700 mb-6">
                    A short-term engagement campaign built around a major cultural event, designed to increase brand affinity, activate former clients, and build referral momentum.
                  </p>
                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold text-legal-dark">Results Snapshot:</h4>
                    <ul className="space-y-2">
                      {[
                        "High participation rate",
                        "Strong engagement from existing audience",
                        "New email capture",
                        "Increased brand visibility during peak interest window"
                      ].map((result, index) => (
                        <li key={index} className="flex items-center gap-3 text-gray-700">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-legal-primary text-legal-primary hover:bg-legal-primary hover:text-white transition-all duration-300"
                  >
                    View Campaign Strategy
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Who This Is Built For Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-legal-dark mb-12 text-center">
              Who This Is Built For
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {targetAudience.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg hover:bg-legal-light/30 transition-colors duration-300"
                >
                  <div className="p-3 bg-legal-primary/10 rounded-lg">
                    <item.icon className="h-6 w-6 text-legal-primary" />
                  </div>
                  <p className="text-lg text-gray-700 font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA Section */}
      <section id="closing-cta" className="section-padding bg-gradient-to-br from-legal-primary to-legal-dark text-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
              Momentum Is a Strategy — Not a Gimmick
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              The best brands don't chase attention.<br />
              They show up when it matters.
            </p>
            <Button 
              size="lg"
              className="bg-white text-legal-primary hover:bg-legal-light hover:text-legal-dark transition-all duration-300"
              onClick={() => window.location.href = '/#contact'}
            >
              Let's Build Momentum
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default MomentumCampaignsPage;
