import { Video, MessageCircle, Clock, Zap, UserCheck, BarChart, HeartHandshake, Bot } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const VideoChatbotSection = () => {
  const features = [
    {
      icon: Clock,
      title: "24/7 Visitor Engagement",
      description: "Your video ambassador greets visitors anytime, answering questions and sharing your mission around the clock."
    },
    {
      icon: MessageCircle,
      title: "FAQ Automation",
      description: "Automatically answer common questions about donations, programs, volunteering, and how supporters can get involved."
    },
    {
      icon: UserCheck,
      title: "Lead Capture & Qualification",
      description: "Collect visitor information and qualify potential donors or volunteers before they leave your site."
    },
    {
      icon: Zap,
      title: "Seamless Integration",
      description: "Easily integrates with your existing foundation website without disrupting your current design."
    }
  ];

  const benefits = [
    { icon: HeartHandshake, label: "Increased donor engagement" },
    { icon: BarChart, label: "Higher conversion rates" },
    { icon: Bot, label: "Reduced staff workload" },
    { icon: Video, label: "Personal human touch" }
  ];

  return (
    <section className="py-20 px-4 bg-black/90">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/30 mb-6">
            <Video className="w-4 h-4 text-sky-400" />
            <span className="text-sm text-sky-400 font-medium">Service 2</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Video Chatbot for Your Website
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Transform your website into an interactive experience with an AI-powered video chatbot that engages visitors with personalized video responses.
          </p>
        </div>

        {/* Video preview mockup */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <Card className="bg-gradient-to-br from-sky-500/10 to-blue-500/10 border-sky-500/20 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Video avatar placeholder */}
                <div className="relative flex-shrink-0">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
                    <Video className="w-12 h-12 md:w-16 md:h-16 text-white" />
                  </div>
                  {/* Pulse animation */}
                  <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 rounded-full bg-sky-400/20 animate-ping" />
                </div>
                
                {/* Description */}
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Your Foundation's Digital Ambassador
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Imagine a friendly face greeting every visitor to your website, ready to answer questions 
                    about your programs, guide them to donation pages, or connect them with volunteer opportunities—
                    all through natural, conversational video responses.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-sky-500/10 border border-sky-500/20">
                    <feature.icon className="w-6 h-6 text-sky-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-white/5 border-white/10">
              <CardContent className="p-4 text-center">
                <benefit.icon className="w-8 h-8 text-sky-400 mx-auto mb-2" />
                <span className="text-sm text-gray-300">{benefit.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoChatbotSection;
