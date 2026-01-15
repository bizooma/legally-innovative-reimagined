import { Search, TrendingUp, BarChart3, Shield, DollarSign, Target, Users, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const GoogleGrantSection = () => {
  const services = [
    {
      icon: Search,
      title: "Grant Application & Submission",
      description: "Complete management of your Google Ad Grants application, ensuring compliance with all eligibility requirements."
    },
    {
      icon: Target,
      title: "Campaign Setup & Strategy",
      description: "Strategic keyword research and campaign structure designed to reach your target audience effectively."
    },
    {
      icon: BarChart3,
      title: "Monthly Reporting & Optimization",
      description: "Regular performance reports with ongoing optimization to maximize your grant utilization."
    },
    {
      icon: Shield,
      title: "Compliance Monitoring",
      description: "Proactive monitoring to maintain grant status and avoid policy violations that could suspend your account."
    }
  ];

  const stats = [
    { value: "$10,000", label: "Monthly Ad Credits", icon: DollarSign },
    { value: "$120K", label: "Annual Value", icon: TrendingUp },
    { value: "500M+", label: "Potential Reach", icon: Users },
    { value: "Global", label: "Audience Reach", icon: Globe }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-pink-50 to-pink-100/50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 mb-6">
            <Search className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400 font-medium">Service 1</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Google Ad Grants Management
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access up to $10,000 per month in free Google Ads to promote your mission and reach supporters actively searching for causes like yours.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/80 border-gray-200 backdrop-blur-sm shadow-sm">
              <CardContent className="p-6 text-center">
                <stat.icon className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="bg-white/80 border-gray-200 backdrop-blur-sm hover:bg-white transition-colors shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-green-100 border border-green-200">
                    <service.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits callout */}
        <Card className="bg-gradient-to-r from-green-100 to-emerald-100 border-green-200 shadow-sm">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Google Ad Grants for Foundations?</h3>
            <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                <span>Reach donors actively searching for causes to support</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                <span>Increase awareness of your foundation's programs</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                <span>Drive traffic to donation and volunteer pages</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                <span>Compete with larger organizations on equal footing</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GoogleGrantSection;
