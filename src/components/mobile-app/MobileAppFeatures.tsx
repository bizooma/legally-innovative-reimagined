
import { CheckCircle, Shield, Zap, Smartphone, Clock, Globe } from "lucide-react";

const MobileAppFeatures = () => {
  const features = [
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "End-to-end encryption and compliance with legal industry standards"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance for quick loading and smooth user experience"
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Perfect user experience across all mobile devices and screen sizes"
    },
    {
      icon: Clock,
      title: "Real-Time Updates",
      description: "Instant synchronization across all platforms and devices"
    },
    {
      icon: Globe,
      title: "Offline Capability",
      description: "Core features available even without internet connection"
    },
    {
      icon: CheckCircle,
      title: "Easy Integration",
      description: "Seamless connection with your existing legal software and systems"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Powerful Features for Modern Law Firms
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our mobile apps come packed with features designed specifically 
            for the legal industry's unique requirements.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="bg-legal-accent/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-10 h-10 text-legal-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-legal-dark">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobileAppFeatures;
