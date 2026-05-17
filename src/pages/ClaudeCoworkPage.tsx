import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Scale,
  HeartHandshake,
  BookOpen,
  GraduationCap,
  Sparkles,
  Download,
  PlayCircle,
  ArrowRight,
  Wrench,
} from "lucide-react";

type Item = {
  title: string;
  description: string;
  type: "Tutorial" | "Resource" | "Skill";
  price: string;
  duration?: string;
};

const lawFirmItems: Item[] = [
  {
    title: "Intake Triage Skill for Claude",
    description:
      "Drop-in Claude Skill that classifies inbound leads by practice area, urgency, and conflict risk, then drafts a tailored response.",
    type: "Skill",
    price: "$149",
  },
  {
    title: "Deposition Prep Tutorial Series",
    description:
      "Six-part walkthrough on using Claude to summarize transcripts, build question outlines, and surface contradictions.",
    type: "Tutorial",
    price: "$79",
    duration: "6 modules",
  },
  {
    title: "Engagement Letter Prompt Pack",
    description:
      "20 attorney-reviewed prompts covering fee agreements, scope letters, and disengagement notices with placeholders ready to fill.",
    type: "Resource",
    price: "$39",
  },
  {
    title: "Discovery Document Reviewer Skill",
    description:
      "Claude Skill that ingests PDFs, tags privileged material, and produces a chronological summary of key facts.",
    type: "Skill",
    price: "$199",
  },
  {
    title: "Local SEO Playbook for Solo & Small Firms",
    description:
      "Step-by-step guide to using Claude for GBP optimization, local content, and review response at scale.",
    type: "Resource",
    price: "$29",
  },
  {
    title: "Court Filing Checklist Generator",
    description:
      "Tutorial + reusable prompt that produces jurisdiction-aware filing checklists in seconds.",
    type: "Tutorial",
    price: "Free",
    duration: "45 min",
  },
];

const nonprofitItems: Item[] = [
  {
    title: "Grant Writing Co-Pilot Skill",
    description:
      "Claude Skill that drafts LOIs, full proposals, and budget narratives from your program brief and funder profile.",
    type: "Skill",
    price: "$129",
  },
  {
    title: "Donor Cultivation Tutorial",
    description:
      "Learn how to use Claude to segment donors, draft personalized appeals, and prep major-gift briefings.",
    type: "Tutorial",
    price: "$59",
    duration: "4 modules",
  },
  {
    title: "Board Reporting Template Pack",
    description:
      "Editable prompts and templates for monthly impact reports, financial summaries, and program dashboards.",
    type: "Resource",
    price: "$25",
  },
  {
    title: "Volunteer Coordinator Skill",
    description:
      "Claude Skill that drafts shift schedules, reminder emails, and post-event thank-yous tailored to each volunteer.",
    type: "Skill",
    price: "$99",
  },
  {
    title: "Annual Appeal Story Kit",
    description:
      "Frameworks and prompts for turning beneficiary interviews into compelling year-end campaign copy.",
    type: "Resource",
    price: "$35",
  },
  {
    title: "Impact Measurement Tutorial",
    description:
      "Walkthrough on using Claude to translate program data into board-ready outcomes and funder-ready proof points.",
    type: "Tutorial",
    price: "Free",
    duration: "60 min",
  },
];

const typeIcon = (type: Item["type"]) => {
  if (type === "Skill") return <Wrench className="h-4 w-4" />;
  if (type === "Tutorial") return <PlayCircle className="h-4 w-4" />;
  return <Download className="h-4 w-4" />;
};

const ItemCard = ({ item }: { item: Item }) => (
  <Card className="h-full flex flex-col border-border/60 hover:border-[#d97757]/60 hover:shadow-lg transition-all duration-200 bg-white">
    <CardHeader>
      <div className="flex items-center justify-between mb-2">
        <Badge
          variant="secondary"
          className="bg-[#f5f0e6] text-[#7a3a1f] border-0 flex items-center gap-1.5"
        >
          {typeIcon(item.type)}
          {item.type}
        </Badge>
        <span className="text-sm font-semibold text-legal-dark">{item.price}</span>
      </div>
      <CardTitle className="text-lg font-bold text-legal-dark leading-snug">
        {item.title}
      </CardTitle>
      {item.duration && (
        <CardDescription className="text-xs uppercase tracking-wide text-muted-foreground">
          {item.duration}
        </CardDescription>
      )}
    </CardHeader>
    <CardContent className="flex-1 flex flex-col justify-between gap-4">
      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
      <Button
        variant="ghost"
        className="self-start px-0 text-[#d97757] hover:text-[#b85d3f] hover:bg-transparent"
      >
        Learn more <ArrowRight className="h-4 w-4 ml-1" />
      </Button>
    </CardContent>
  </Card>
);

const VerticalSection = ({
  id,
  icon: Icon,
  eyebrow,
  title,
  description,
  items,
}: {
  id: string;
  icon: typeof Scale;
  eyebrow: string;
  title: string;
  description: string;
  items: Item[];
}) => (
  <section id={id} className="py-20 lg:py-28">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f0e6] text-[#7a3a1f] text-xs font-semibold uppercase tracking-wider mb-4">
          <Icon className="h-3.5 w-3.5" />
          {eyebrow}
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-legal-dark mb-4">{title}</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <ItemCard key={item.title} item={item} />
        ))}
      </div>
    </div>
  </section>
);

const ClaudeCoworkPage = () => {
  return (
    <>
      <Helmet>
        <title>Claude Cowork | Tutorials, Resources & Skills for Law Firms and Nonprofits</title>
        <meta
          name="description"
          content="Practical Claude tutorials, downloadable resources, and ready-to-use Skills built for law firms and nonprofits. Ship faster with AI workflows your team will actually use."
        />
        <link rel="canonical" href="https://bizooma.com/claude-cowork" />
      </Helmet>

      <div className="min-h-screen bg-[#fbf8f3] flex flex-col">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-b from-[#fbf8f3] via-[#f5ece1] to-[#fbf8f3]">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none [background-image:radial-gradient(circle_at_1px_1px,#1a0000_1px,transparent_0)] [background-size:24px_24px]" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#e6d5bf] text-[#7a3a1f] text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Claude Cowork
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-legal-dark mb-6 leading-tight">
                Claude tutorials, resources, and Skills
                <span className="block text-[#d97757]">built for the work you actually do.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
                A curated library for two communities we know best: law firms and nonprofits.
                Buy a single Skill, follow a tutorial series, or download a resource your team
                can use today.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#d97757] hover:bg-[#b85d3f] text-white shadow-sm"
                >
                  <a href="#law-firms">
                    <Scale className="h-4 w-4 mr-2" /> For Law Firms
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-[#d97757] text-[#d97757] hover:bg-[#d97757] hover:text-white"
                >
                  <a href="#nonprofits">
                    <HeartHandshake className="h-4 w-4 mr-2" /> For Nonprofits
                  </a>
                </Button>
              </div>

              {/* Feature row */}
              <div className="mt-16 grid sm:grid-cols-3 gap-6 text-left">
                {[
                  {
                    icon: PlayCircle,
                    title: "Tutorials",
                    body: "Step-by-step walkthroughs for real day-to-day workflows.",
                  },
                  {
                    icon: BookOpen,
                    title: "Resources",
                    body: "Prompt packs, templates, and playbooks you can use today.",
                  },
                  {
                    icon: Wrench,
                    title: "Skills",
                    body: "Drop-in Claude Skills that plug into your existing tools.",
                  },
                ].map((f) => (
                  <div
                    key={f.title}
                    className="p-5 rounded-xl bg-white/70 backdrop-blur-sm border border-[#e6d5bf]"
                  >
                    <f.icon className="h-6 w-6 text-[#d97757] mb-3" />
                    <h3 className="font-semibold text-legal-dark mb-1">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <VerticalSection
          id="law-firms"
          icon={Scale}
          eyebrow="For Law Firms"
          title="Practical AI for solo, small, and mid-size firms"
          description="Tutorials, prompt resources, and Claude Skills built around intake, document review, marketing, and client communication. Every item is reviewed by a practitioner before it ships."
          items={lawFirmItems}
        />

        <div className="container mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-[#e6d5bf] to-transparent" />
        </div>

        <VerticalSection
          id="nonprofits"
          icon={HeartHandshake}
          eyebrow="For Nonprofits"
          title="AI workflows that respect small teams and big missions"
          description="From grant writing to donor cultivation and impact reporting, these resources help mission-driven teams do more with the staff and budget they already have."
          items={nonprofitItems}
        />

        {/* CTA */}
        <section className="py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-br from-[#1a0000] to-[#3a0a0a] text-white p-10 lg:p-14 text-center shadow-xl">
              <GraduationCap className="h-10 w-10 text-[#d97757] mx-auto mb-4" />
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Need something custom for your team?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                We build bespoke Claude Skills, internal tutorials, and rollout playbooks for
                firms and nonprofits ready to operationalize AI.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-[#d97757] hover:bg-[#b85d3f] text-white"
              >
                <Link to="/#contact">Talk to us <ArrowRight className="h-4 w-4 ml-2" /></Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
        <MobileFooterNav />
      </div>
    </>
  );
};

export default ClaudeCoworkPage;