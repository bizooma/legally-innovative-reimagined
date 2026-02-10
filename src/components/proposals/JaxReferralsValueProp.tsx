import { ClipboardCheck, Code, Rocket, TrendingUp } from "lucide-react";

const timeline = [
  {
    icon: ClipboardCheck,
    phase: "Week 1–2",
    title: "Discovery & Audit",
    description: "We review your current site, analytics, and goals to build a clear roadmap for Version 2.",
  },
  {
    icon: Code,
    phase: "Week 3–4",
    title: "Design & Development",
    description: "Modern redesign, performance tuning, SEO improvements, and mobile optimization — all implemented.",
  },
  {
    icon: Rocket,
    phase: "Week 5",
    title: "Launch & Testing",
    description: "We deploy the updated site, run QA across devices, and ensure everything is running smoothly.",
  },
  {
    icon: TrendingUp,
    phase: "Month 2+",
    title: "Ongoing Support",
    description: "Continued monitoring, content updates, and iterative improvements to keep your site performing.",
  },
];

const outcomes = [
  "Faster load times and improved Core Web Vitals",
  "Higher local search visibility for referral-related queries",
  "Better mobile experience for on-the-go professionals",
  "Increased partner and client conversions",
  "A professional web presence that strengthens your referral brand",
];

const JaxReferralsValueProp = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-pink-50 to-rose-50">
      <div className="max-w-5xl mx-auto">
        {/* Timeline */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-legal-primary/10 text-legal-primary text-sm font-medium mb-4">
            Our Approach
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            From Audit to Launch — and Beyond
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {timeline.map((step, i) => (
            <div key={step.phase} className="relative bg-white/80 rounded-xl border border-legal-primary/10 p-6 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-legal-primary/10 flex items-center justify-center mb-4">
                <step.icon className="w-5 h-5 text-legal-primary" />
              </div>
              <span className="text-xs font-semibold text-legal-primary uppercase tracking-wide">{step.phase}</span>
              <h3 className="text-lg font-semibold text-gray-800 mt-1 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Outcomes */}
        <div className="bg-white/80 rounded-2xl border border-legal-primary/10 p-8 md:p-12 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Expected Outcomes</h3>
          <ul className="space-y-4 max-w-2xl mx-auto">
            {outcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-legal-primary shrink-0" />
                <span className="text-gray-600">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default JaxReferralsValueProp;
