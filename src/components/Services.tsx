import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trackNavigation } from "@/utils/gtmTracking";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, Bot, Smartphone, MessageSquare, Volume2, Accessibility, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import immigrationLawApp from "@/assets/immigration-law-app.png";
import rokuDemo from "@/assets/roku-demo.png";
import alexaSkill from "@/assets/alexa-skill.png";
import chatbotExamples from "@/assets/chatbot-examples.png";
import accessibilityWidget from "@/assets/accessibility-widget.png";

const Services = () => {
  const sectionRef = useScrollAnimation({ animationClass: 'animate-fade-in' });
  const services = [
    {
      title: "Custom Roku Channel Development",
      subtitle: "Design · Development · Publishing",
      description: "We build custom Roku channels that help businesses stream content, engage audiences, and expand their brand reach on one of the largest connected TV platforms.",
      highlights: [
        "Custom channel design & branding",
        "Content management & streaming setup",
        "Roku Channel Store publishing",
        "Analytics integration & performance tracking",
      ],
      examples: "Roku surpassed 90 million streaming households globally in the first week of 2025, with a significant concentration in the U.S. where they serve over half of all broadband homes. By late 2025, the platform continued to grow, maintaining its position as the #1 TV streaming platform in North America.",
      examplesLabel: "Why Roku? ",
      icon: <Bot className="h-8 w-8" />,
      bgImage: rokuDemo,
      link: "/ai-consulting-for-law-firms",
      accentColor: "from-blue-600 to-indigo-700",
      noOverlay: true,
    },
    {
      title: "Mobile App Development",
      subtitle: "iOS · Android · Cross-Platform",
      description: "Create powerful, user-friendly mobile applications for iOS and Android platforms that engage your customers and enhance your brand's digital presence.",
      highlights: [
        "Native & cross-platform development",
        "UI/UX design & prototyping",
        "App Store & Play Store deployment",
        "Push notifications & real-time features",
      ],
      examples: "Two ways to pay: 1/2 up front, 1/2 upon delivery of quoted fee, or $1,000/month until quoted fee is paid in full.",
      icon: <Smartphone className="h-8 w-8" />,
      bgImage: immigrationLawApp,
      link: "/law-firm-mobile-app-development",
      accentColor: "from-emerald-600 to-teal-700",
      noOverlay: true,
    },
    {
      title: "Custom AI Chatbot",
      subtitle: "24/7 Support · Lead Capture · Knowledge Base",
      description: "Most businesses approach chatbots the wrong way. They install a prebuilt bot, plug in a few canned responses, and expect it to meaningfully support their operations. But a chatbot is only as effective as the strategy behind it. Every organization has different goals, workflows, customer questions, and conversion paths.",
      highlights: [
        "Trained on your content & knowledge base",
        "Multi-channel deployment (web, SMS, social)",
        "Lead qualification & appointment booking",
        "Analytics dashboard & conversation insights",
      ],
      examples: "At Bizooma, we design and build bots that are tailored to your organization's unique objectives. Instead of using rigid prebuilt systems, we create conversational experiences that integrate with your website, marketing funnels, and operational workflows.",
      icon: <MessageSquare className="h-8 w-8" />,
      bgImage: chatbotExamples,
      link: "/chatbots",
      accentColor: "from-violet-600 to-purple-700",
      noOverlay: true,
      showLearnMore: true,
    },
    {
      title: "Voice Assistant Marketing",
      subtitle: "Alexa · Google Assistant · Custom Voice Apps",
      description: "Create custom voice applications for Amazon Alexa and Google Assistant that allow your business to engage with clients through natural language interactions and provide valuable information on demand.",
      highlights: [
        "Custom Alexa Skills & Google Actions",
        "Voice-optimized content strategy",
        "FAQ & service information delivery",
        "Voice search optimization (Voice SEO)",
      ],
      examples: "As of 2025, the total Amazon Echo users is expected to reach around 69.9 million. In 2024, the Amazon Echo with Alexa is the most popular smart speaker in the U.S, with around 90% of users using it on mobile devices.",
      examplesLabel: "Why Voice? ",
      icon: <Volume2 className="h-8 w-8" />,
      bgImage: alexaSkill,
      link: "/law-firm-voice-assistant-marketing",
      accentColor: "from-orange-500 to-red-600",
      noOverlay: true,
    },
    {
      title: "ADA Accessibility Widget",
      subtitle: "ADA · WCAG 2.2 · AI-Powered Compliance",
      description: "Our Bizooma Accessibility Layer helps businesses monitor, improve, and demonstrate ADA/WCAG compliance across their websites. A single embeddable widget gives every visitor the tools they need — font scaling, contrast modes, dyslexia-friendly typography, animation pausing, and more — while our scanner and AI engine surface issues to fix on the back end.",
      highlights: [
        "One-line embeddable widget",
        "Automated WCAG 2.2 site scans",
        "AI-powered remediation guidance",
        "Multi-site, multi-tenant dashboard",
      ],
      examples: "Reduce legal exposure under ADA Title III and demonstrate ongoing accessibility efforts with audit-ready reporting and a visible compliance widget on your site.",
      examplesLabel: "Why it matters: ",
      icon: <Accessibility className="h-8 w-8" />,
      bgImage: accessibilityWidget,
      link: "/accessibility-layer",
      accentColor: "from-rose-700 to-red-900",
      noOverlay: true,
      showLearnMore: true,
    },
    {
      title: "Claude Cowork",
      subtitle: "Tutorials · Resources · Skills",
      description: "A curated library of Claude-powered tutorials, resources, and skills built for two verticals: law firms and nonprofits. Equip your team with practical workflows for intake, drafting, grant writing, donor cultivation, and more — all designed to plug Claude directly into the work you already do.",
      highlights: [
        "Claude Skills for law firms & nonprofits",
        "Step-by-step tutorial series",
        "Downloadable templates & prompt packs",
        "Vertical-specific workflows",
      ],
      examples: "Browse Skills like Intake Triage and Grant Writing Co-Pilot, plus tutorials on deposition prep, donor cultivation, and impact measurement.",
      examplesLabel: "What's inside: ",
      icon: <Sparkles className="h-8 w-8" />,
      bgImage: accessibilityWidget,
      link: "/claude-cowork",
      accentColor: "from-orange-500 to-amber-700",
      noOverlay: false,
      showLearnMore: true,
    },
  ];

  return (
    <section id="services" ref={sectionRef} className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-left max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Our <span className="highlight-text">Services</span>
          </h2>
          <p className="text-lg text-gray-700">
            From custom Roku channels and mobile apps to AI-powered chatbots and voice assistant marketing, we help businesses reach audiences on the platforms that matter most — connected TVs, smartphones, websites, and smart speakers.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <Card
                key={index}
                id={`service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-0 group"
              >
                <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  {/* Image Side */}
                  <div className="relative lg:w-2/5 min-h-[240px] lg:min-h-[360px] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-contain bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                      style={{
                        backgroundImage: `url(${service.bgImage})`,
                        ...(service.noOverlay ? { backgroundColor: '#ffffff' } : {}),
                        backgroundSize: service.noOverlay ? 'contain' : 'cover',
                      }}
                    />
                    {!service.noOverlay && (
                      <>
                        <div className={`absolute inset-0 bg-gradient-to-br ${service.accentColor} opacity-70`} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                              {service.icon}
                            </div>
                            <p className="text-sm font-medium tracking-wider uppercase opacity-90">
                              {service.subtitle}
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Content Side */}
                  <CardContent className="lg:w-3/5 p-8 lg:p-10 flex flex-col justify-center bg-white">
                    <h3 className="text-2xl lg:text-3xl font-bold text-legal-dark mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 text-base leading-relaxed">
                      {service.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-3 mb-6">
                      {service.highlights.map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="mt-1.5 h-2 w-2 rounded-full bg-legal-primary shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-100">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold text-legal-dark">{service.examplesLabel || (service.noOverlay ? "Payment options: " : "Real-world example: ")}</span>
                        {service.examples}
                      </p>
                    </div>

                    {service.showLearnMore && service.link && (
                      <div>
                        <Link to={service.link}>
                          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                            Learn More <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    )}

                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
