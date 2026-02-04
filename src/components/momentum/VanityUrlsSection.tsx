import { Card, CardContent } from "@/components/ui/card";
import { 
  Link, 
  ArrowRight, 
  Mail, 
  BarChart3, 
  FileText, 
  Handshake, 
  Clock,
  Home,
  Target
} from "lucide-react";

const VanityUrlsSection = () => {
  const benefits = [
    { icon: Clock, text: "Match messaging to the moment" },
    { icon: Mail, text: "Capture engagement or emails" },
    { icon: BarChart3, text: "Track campaign-specific traffic" },
    { icon: FileText, text: "Create shareable, campaign-native content" },
    { icon: Handshake, text: "Preserve goodwill without selling" },
  ];

  const vanityUrlExamples = [
    { url: "SeahawksOrPatriots.com", description: "Pre-game engagement & voting" },
    { url: "SeahawksWin.com", description: "Post-win celebration & momentum" },
    { url: "ForThe12s.com", description: "Loyalty and community support" },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-legal-light via-white to-legal-light/50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section Headline */}
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-legal-dark mb-12 text-center">
            Vanity URLs: Turning Moments into Destinations
          </h2>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left Column - Copy */}
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Many brands already own vanity URLs — but most of them simply redirect to a homepage and never reach their full potential.
              </p>
              <p>
                In a Momentum Campaign, a vanity URL isn't just a shortcut.<br />
                <span className="font-semibold text-legal-dark">It's a destination built for a specific moment.</span>
              </p>
              <p>
                Instead of sending people to a general website, vanity URLs allow brands to meet their audience in real time with messaging that matches what they're thinking, feeling, and paying attention to right now.
              </p>
            </div>

            {/* Right Column - Visual Comparison */}
            <div className="space-y-8">
              {/* Comparison Graphic */}
              <div className="space-y-4">
                {/* Redirect Path */}
                <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg border border-gray-200">
                  <div className="p-2 bg-gray-200 rounded-lg">
                    <Link className="h-5 w-5 text-gray-500" />
                  </div>
                  <span className="text-gray-500 font-medium">Redirect</span>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                  <div className="flex items-center gap-2 text-gray-500">
                    <Home className="h-4 w-4" />
                    <span>Homepage (generic)</span>
                  </div>
                </div>

                {/* Momentum URL Path */}
                <div className="flex items-center gap-4 p-4 bg-legal-light rounded-lg border-2 border-legal-primary/30">
                  <div className="p-2 bg-legal-primary/20 rounded-lg">
                    <Link className="h-5 w-5 text-legal-primary" />
                  </div>
                  <span className="text-legal-primary font-semibold">Momentum URL</span>
                  <ArrowRight className="h-5 w-5 text-legal-primary" />
                  <div className="flex items-center gap-2 text-legal-dark font-medium">
                    <Target className="h-4 w-4" />
                    <span>Campaign-Specific Page</span>
                  </div>
                </div>
              </div>

              {/* Example URLs */}
              <div className="flex flex-wrap gap-3">
                {["SeahawksOrPatriots.com", "SeahawksWin.com", "ForThe12s.com"].map((url) => (
                  <span 
                    key={url}
                    className="px-4 py-2 bg-legal-dark text-white font-mono text-sm rounded-full"
                  >
                    {url}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Beyond the Redirect Subsection */}
          <div className="mb-16">
            <h3 className="font-playfair text-2xl font-bold text-legal-dark mb-8 text-center">
              Beyond the Redirect
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white rounded-lg border border-legal-primary/10 hover:border-legal-primary/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="p-2 bg-legal-light rounded-lg shrink-0">
                    <benefit.icon className="h-5 w-5 text-legal-primary" />
                  </div>
                  <p className="text-gray-700 font-medium">{benefit.text}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-lg text-gray-600 italic max-w-2xl mx-auto">
              After the moment passes, the URL can redirect — but the impact remains.
            </p>
          </div>

          {/* Vanity URLs in Action Subsection */}
          <div>
            <h3 className="font-playfair text-2xl font-bold text-legal-dark mb-8 text-center">
              Vanity URLs in Action
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {vanityUrlExamples.map((example, index) => (
                <Card 
                  key={index}
                  className="bg-white border-legal-primary/20 hover:border-legal-primary/40 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <CardContent className="p-6">
                    <p className="font-mono text-legal-primary font-semibold text-lg mb-2">
                      {example.url}
                    </p>
                    <p className="text-gray-600">{example.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VanityUrlsSection;
