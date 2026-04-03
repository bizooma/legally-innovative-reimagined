
import {
  Headphones,
  UserPlus,
  Building2,
  ShoppingCart,
  GraduationCap,
  CalendarCheck,
  Heart,
  Globe,
} from "lucide-react";

const chatbotTypes = [
  {
    icon: Headphones,
    title: "Customer Support Bots",
    description:
      "Handle FAQs, troubleshoot issues, and resolve tickets 24/7 without human intervention. Trained on your knowledge base, these bots deflect routine inquiries so your team can focus on complex cases.",
    useCases: [
      "Answering product/service questions",
      "Troubleshooting common issues",
      "Ticket creation & routing",
      "Order status lookups",
    ],
    color: "from-blue-500/10 to-blue-600/5",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200",
  },
  {
    icon: UserPlus,
    title: "Lead Generation & Qualification Bots",
    description:
      "Turn website visitors into qualified leads. These bots engage prospects with targeted questions, score their intent, and deliver warm leads directly to your sales team or CRM.",
    useCases: [
      "Qualifying inbound leads",
      "Booking sales calls & demos",
      "Capturing contact information",
      "Segmenting prospects by need",
    ],
    color: "from-green-500/10 to-green-600/5",
    iconColor: "text-green-600",
    borderColor: "border-green-200",
  },
  {
    icon: Building2,
    title: "Internal Operations Bots",
    description:
      "Streamline internal workflows by giving employees an AI assistant for HR questions, IT support, onboarding checklists, and policy lookups — all within your existing communication tools.",
    useCases: [
      "HR policy & benefits inquiries",
      "IT helpdesk automation",
      "Employee onboarding guides",
      "Internal knowledge base search",
    ],
    color: "from-purple-500/10 to-purple-600/5",
    iconColor: "text-purple-600",
    borderColor: "border-purple-200",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce & Sales Bots",
    description:
      "Guide shoppers through product discovery, recommend items based on preferences, handle cart recovery, and process returns — creating a personal shopping assistant experience.",
    useCases: [
      "Product recommendations",
      "Cart abandonment recovery",
      "Order tracking & returns",
      "Upselling & cross-selling",
    ],
    color: "from-orange-500/10 to-orange-600/5",
    iconColor: "text-orange-600",
    borderColor: "border-orange-200",
  },
  {
    icon: CalendarCheck,
    title: "Appointment & Scheduling Bots",
    description:
      "Let clients self-schedule appointments, receive reminders, reschedule, or cancel — fully integrated with your calendar system. Reduce no-shows and eliminate scheduling back-and-forth.",
    useCases: [
      "Consultation booking",
      "Automated reminders & confirmations",
      "Rescheduling & cancellation flows",
      "Multi-provider calendar management",
    ],
    color: "from-teal-500/10 to-teal-600/5",
    iconColor: "text-teal-600",
    borderColor: "border-teal-200",
  },
  {
    icon: GraduationCap,
    title: "Training & Onboarding Bots",
    description:
      "Deliver interactive training content, quizzes, and step-by-step onboarding flows. These bots adapt to learner pace, answer questions in context, and track completion progress.",
    useCases: [
      "New hire onboarding programs",
      "Compliance training delivery",
      "Product knowledge quizzes",
      "Certification tracking",
    ],
    color: "from-indigo-500/10 to-indigo-600/5",
    iconColor: "text-indigo-600",
    borderColor: "border-indigo-200",
  },
  {
    icon: Heart,
    title: "Nonprofit & Community Bots",
    description:
      "Engage donors, volunteers, and community members with conversational experiences that drive donations, event sign-ups, and awareness campaigns — at scale and at minimal cost.",
    useCases: [
      "Donation & fundraising flows",
      "Volunteer sign-up & coordination",
      "Event registration & reminders",
      "Community FAQ & resource guides",
    ],
    color: "from-pink-500/10 to-pink-600/5",
    iconColor: "text-pink-600",
    borderColor: "border-pink-200",
  },
  {
    icon: Globe,
    title: "Multilingual & Accessibility Bots",
    description:
      "Break language barriers with bots that converse fluently in multiple languages and meet accessibility standards — ensuring every customer gets the same quality experience.",
    useCases: [
      "Real-time language translation",
      "ADA-compliant chat interfaces",
      "Voice-to-text & text-to-voice",
      "Region-specific content delivery",
    ],
    color: "from-cyan-500/10 to-cyan-600/5",
    iconColor: "text-cyan-600",
    borderColor: "border-cyan-200",
  },
];

const ChatbotTypes = () => {
  return (
    <section id="chatbot-types" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Types of Custom Chatbots We Build
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From customer-facing support to internal operations, we design and
            develop chatbots that fit your specific business needs — not the
            other way around.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {chatbotTypes.map((bot, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${bot.color} border ${bot.borderColor} rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-xl bg-white shadow-sm ${bot.iconColor}`}>
                  <bot.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-legal-primary transition-colors">
                    {bot.title}
                  </h3>
                </div>
              </div>
              <p className="text-muted-foreground mb-5 leading-relaxed">
                {bot.description}
              </p>
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">
                  Common Use Cases:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {bot.useCases.map((uc, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${bot.iconColor} bg-current flex-shrink-0`} />
                      {uc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChatbotTypes;
