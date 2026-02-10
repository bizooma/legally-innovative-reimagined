import { Globe, Paintbrush, Zap, Search, Smartphone, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Paintbrush,
    title: "Design Refresh",
    description: "Modern, clean UI updates that reflect your brand and build trust with referral partners.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Faster load times and smoother interactions to reduce bounce rates and improve conversions.",
  },
  {
    icon: Search,
    title: "SEO Improvements",
    description: "On-page SEO enhancements to boost visibility in local search results and AI-driven answers.",
  },
  {
    icon: Smartphone,
    title: "Mobile Responsiveness",
    description: "Fully responsive layouts that look and function perfectly on every device and screen size.",
  },
  {
    icon: Globe,
    title: "Content Updates",
    description: "Fresh, relevant content that speaks to your audience and showcases your referral network value.",
  },
  {
    icon: ShieldCheck,
    title: "Security & Maintenance",
    description: "Up-to-date plugins, security patches, and ongoing reliability for worry-free operations.",
  },
];

const stats = [
  { value: "53%", label: "of visitors leave if a page takes >3s to load" },
  { value: "70%", label: "of traffic now comes from mobile devices" },
  { value: "3x", label: "more leads from optimized websites" },
];

const WebsiteUpdatesSection = () => {
  return (
    <section className="py-20 px-4 bg-pink-50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-legal-primary/10 text-legal-primary text-sm font-medium mb-4">
            Website Updates
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            A Modern Website Built for Growth
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Your website is the digital front door of your referral network. We'll make sure it's fast, beautiful, and working hard for you.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service) => (
            <Card key={service.title} className="border-legal-primary/10 bg-white/80 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-legal-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-legal-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid sm:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-xl bg-white/60 border border-legal-primary/10">
              <p className="text-3xl font-bold text-legal-primary mb-2">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebsiteUpdatesSection;
