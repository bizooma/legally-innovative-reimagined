import { Rocket, Calendar, TrendingUp, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ProposalValueProp = () => {
  const timeline = [
    {
      phase: "Week 1-2",
      title: "Discovery & Setup",
      tasks: ["Google Grant application submission", "Website analysis for chatbot integration", "Strategy alignment call"]
    },
    {
      phase: "Week 3-4",
      title: "Implementation",
      tasks: ["Google Ads campaign configuration", "Video chatbot customization", "Content and FAQ programming"]
    },
    {
      phase: "Month 2+",
      title: "Optimization & Growth",
      tasks: ["Performance monitoring and reporting", "Continuous optimization", "Strategy refinement based on data"]
    }
  ];

  const outcomes = [
    "Increased online visibility through Google Search",
    "Higher engagement rates on your website",
    "More qualified donor and volunteer leads",
    "Reduced administrative burden on staff",
    "Data-driven insights for future campaigns"
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black/90 to-legal-dark">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-legal-primary/20 border border-legal-primary/30 mb-6">
            <Rocket className="w-4 h-4 text-legal-primary" />
            <span className="text-sm text-legal-primary font-medium">Combined Value</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            A Complete Digital Growth Strategy
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            These two services work together to create a powerful ecosystem—driving traffic through Google Ads 
            and converting that traffic through intelligent chatbot engagement.
          </p>
        </div>

        {/* Timeline */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {timeline.map((phase, index) => (
            <Card key={index} className="bg-white/5 border-white/10 relative overflow-hidden">
              <CardContent className="p-6">
                {/* Phase indicator */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-legal-primary/20 border border-legal-primary/30 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-legal-primary" />
                  </div>
                  <span className="text-legal-primary font-medium">{phase.phase}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-4">{phase.title}</h3>
                
                <ul className="space-y-2">
                  {phase.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-start gap-2 text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-sm">{task}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Connector line (hidden on last item) */}
                {index < timeline.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 w-6 h-px bg-legal-primary/30" style={{ transform: 'translateX(100%)' }} />
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Expected outcomes */}
        <Card className="bg-gradient-to-r from-legal-primary/10 to-sky-500/10 border-legal-primary/20">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-8 h-8 text-legal-primary" />
              <h3 className="text-xl font-semibold text-white">Expected Outcomes</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {outcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{outcome}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProposalValueProp;
