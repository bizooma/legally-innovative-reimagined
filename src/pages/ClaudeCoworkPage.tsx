import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  AlertTriangle,
  Brain,
  FolderTree,
  ShieldCheck,
  FileText,
  CheckCircle2,
  Folder,
  Users,
  Building2,
  Briefcase,
  Database,
  MessageSquare,
  Target,
  Heart,
} from "lucide-react";

type Item = {
  title: string;
  description: string;
  type: "Tutorial" | "Resource" | "Skill";
  price: string;
  duration?: string;
};

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

const lawProblems = [
  {
    icon: Brain,
    title: "It forgets your clients",
    body: "Every new session is a blank slate. You re-explain the matter background, rebuild the client context, restate the firm's approach. Every. Single. Time. Not because the AI is bad — because it has nothing to work from.",
  },
  {
    icon: FileText,
    title: "It doesn't sound like you",
    body: "Generic output means constant rewriting. The AI doesn't know your firm's voice, your writing standards, or the specific language you use with clients. What comes back is technically correct and completely off-brand.",
  },
  {
    icon: FolderTree,
    title: "Nothing stays organised",
    body: "No matter memory. No file structure. No continuity between sessions. Just a chat window that starts fresh every time you open it, with no record of what was decided, drafted, or agreed last week.",
  },
];

const lawSolutions = [
  {
    icon: Brain,
    title: "Persistent matter memory",
    body: "Every client gets a folder with a brief, a memory log, and an outputs directory. Claude reads the whole thing before it touches your work. When you pick up a matter next week, it picks up exactly where you left off.",
  },
  {
    icon: FileText,
    title: "Your voice, every time",
    body: "Your firm's voice profile and legal writing rules travel with every session. Banned phrases. Tone standards. Communication register. What comes back sounds like it was written by your firm — because it was briefed by your firm.",
  },
  {
    icon: ShieldCheck,
    title: "Confidentiality built in",
    body: "Client matters never cross. CoWork OS is hardwired to flag anything that could mix client information across matters. Structural confidentiality — not just a policy.",
  },
];

const lawTemplates = [
  "Matter brief",
  "Client intake",
  "Engagement letter",
  "Demand letter",
  "Client status update — three formats (substantive, nothing-new, post-meeting)",
  "Billing narratives",
  "Legal research memo",
  "Email formats — client, opposing counsel, referral, cold outreach",
  "Weekly review",
  "Matter memory log",
];

const lawSteps = [
  { n: "1", title: "Download the zip", body: "One file. Everything included." },
  { n: "2", title: "Unzip and place", body: "Extract the folder and put it wherever you keep your work. Create a separate folder for each firm you install it for — CoWork keeps them completely isolated." },
  { n: "3", title: "Load into CoWork", body: "Open the CoWork desktop app and point it at the folder. That's the connection." },
  { n: "4", title: "Trigger first run", body: "Open a new chat. Claude detects the setup file automatically and walks you through onboarding — no special commands needed." },
  { n: "5", title: "Fill in your firm", body: "Answer questions about your practice, your voice, your team, and your tools. Takes 10–15 minutes. Once it's done, Claude knows your firm." },
];

const lawAudiences = [
  {
    icon: Briefcase,
    title: "Solo practitioners",
    body: "Handle the administrative load of a larger firm without the overhead. Engagement letters drafted and ready to review. Billing narratives from rough notes in seconds. Client updates written in your voice before you've typed a word. You practice law — CoWork OS handles the paper.",
  },
  {
    icon: Building2,
    title: "Small and mid-size firms",
    body: "Consistent firm voice across every attorney. Every matter organised the same way. New associates and paralegals get up to speed in one session because the brief and memory log are already there. The firm runs like a firm, not like five individual practitioners.",
  },
  {
    icon: Users,
    title: "Legal ops and office managers",
    body: "A system for the whole firm, not just the power users. Templates and workflows that every attorney can follow. Matter organisation that doesn't depend on individual habits. One standard — whoever opens the file next knows exactly where they are.",
  },
];

const lawPricingIncludes = [
  "Complete folder structure and CLAUDE.md operating file",
  "6 identity and memory files — pre-built, ready to fill in",
  "10 legal document and workflow templates",
  "Installation guide (HTML — opens in any browser)",
  "How-to-use guide (HTML — reference anytime)",
  "Personal assistant plugin",
  "Specialist sub-agent builder plugin",
  "Lifetime access — no subscription, no renewal",
  "Install for every attorney in your firm",
  "30-day money-back guarantee",
];

const lawFaqs = [
  { q: "What exactly am I downloading?", a: "A zip file containing a complete folder system — ABOUT ME, WORK AREAS, RESOURCES, and a CLAUDE.md operating file. You unzip it, load it into the CoWork desktop app, and follow the first-run setup. That's it." },
  { q: "Do I need CoWork to use this?", a: "Yes. Law Firm CoWork OS is built to work with the CoWork desktop app, which connects Claude to your folder and maintains session context. CoWork is a separate product." },
  { q: "Is my client data safe?", a: "Your data never leaves your computer. The folder system is entirely local — no cloud storage, no third-party servers involved in the CoWork OS itself. Claude processes information through Anthropic's API, subject to their privacy policy." },
  { q: "Can I use this for multiple firms?", a: "Yes. Create a separate folder for each firm. CoWork lets you switch workspaces — each one is completely isolated. One purchase covers all of them." },
  { q: "Does this work for any practice area?", a: "Yes. The templates and folder structure are practice-area agnostic. The identity files are where you customise for your specific firm — estate planning, litigation, real estate, family law, business, or any combination." },
  { q: "What if it doesn't work for me?", a: "30-day money-back guarantee, no questions asked. Email support@bizooma.com and we'll refund you." },
  { q: "Do I need to be technical to set this up?", a: "No. If you can unzip a file and drag a folder, you can install this. The first-run setup is guided — Claude walks you through every step." },
];

const LawFirmCoworkSections = () => (
  <div id="law-firms">
    {/* Problem */}
    <section className="py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f0e6] text-[#7a3a1f] text-xs font-semibold uppercase tracking-wider mb-4">
            <Scale className="h-3.5 w-3.5" /> For Law Firms
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-legal-dark mb-4">
            Generic AI isn't built for law firms.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-3">
            Most attorneys using AI spend more time fixing output than they would have spent drafting it themselves. The AI doesn't know who you are, how you write, or which client you're working on. So every session starts cold. Every draft needs rewriting. And the time savings you were promised disappear into cleanup.
          </p>
          <p className="text-lg text-legal-dark font-semibold">
            That's not an AI problem. It's a context problem.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {lawProblems.map((p) => (
            <Card key={p.title} className="bg-white border-border/60 h-full">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-[#fdecdf] text-[#d97757] flex items-center justify-center mb-2">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg text-legal-dark">{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* Solution */}
    <section className="py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f0e6] text-[#7a3a1f] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="h-3.5 w-3.5" /> The Solution
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-legal-dark mb-4">
            CoWork OS gives Claude the context it's missing.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A structured folder system that loads your firm's identity, matter history, and writing rules before Claude does anything. The result is an AI that sounds like your firm, remembers your clients, and produces output you can actually use.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {lawSolutions.map((s) => (
            <Card key={s.title} className="border-[#e6d5bf] bg-[#fbf8f3] h-full">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-[#d97757] text-white flex items-center justify-center mb-2">
                  <s.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg text-legal-dark">{s.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* What's inside */}
    <section className="py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-legal-dark mb-4">
            Everything in the box.
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#7a3a1f]">The folder structure</h3>
            {[
              { name: "ABOUT ME/", body: "Six identity files Claude reads every session without exception. Your firm profile, communication voice, legal writing rules, tool map, specialist routing, and session memory. This is what makes the AI sound like your firm rather than a template." },
              { name: "WORK AREAS/", body: "Five organised work areas covering every type of firm work: Client Matters, Practice Development, Marketing, Operations, and Admin. Each matter gets its own brief, memory log, and outputs folder." },
              { name: "RESOURCES/", body: "Templates, guides, plugins, and skills. Everything you need to work immediately." },
              { name: "CLAUDE.md", body: "The operating brain. Global instructions that govern how Claude behaves across every session, every matter, every document." },
            ].map((f) => (
              <div key={f.name} className="flex gap-4 p-5 rounded-xl bg-white border border-[#e6d5bf]">
                <Folder className="h-6 w-6 text-[#d97757] shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono text-sm font-semibold text-legal-dark mb-1">{f.name}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#7a3a1f] mb-5">10 legal templates</h3>
            <div className="p-6 rounded-xl bg-gradient-to-br from-[#1a0000] to-[#3a0a0a] text-white">
              <p className="text-sm text-white/80 mb-5 leading-relaxed">
                Every template is pre-loaded with your firm's voice profile and writing rules. Claude uses the structure — you don't copy the content.
              </p>
              <ul className="space-y-3">
                {lawTemplates.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[#d97757] shrink-0 mt-0.5" />
                    <span className="text-white/95">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* How it works */}
    <section className="py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-legal-dark mb-4">
            Up and running in 15 minutes.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
          {lawSteps.map((s) => (
            <div key={s.n} className="p-5 rounded-xl border border-[#e6d5bf] bg-[#fbf8f3]">
              <div className="h-9 w-9 rounded-full bg-[#d97757] text-white font-bold flex items-center justify-center mb-3">
                {s.n}
              </div>
              <h3 className="font-semibold text-legal-dark mb-1.5">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="max-w-4xl rounded-xl border-l-4 border-[#d97757] bg-[#fdecdf] p-5 flex gap-3">
          <ShieldCheck className="h-5 w-5 text-[#d97757] shrink-0 mt-0.5" />
          <p className="text-sm text-legal-dark leading-relaxed">
            Each law firm client gets their own separate folder. Claude stays completely separated between firms — confidentiality is structural, not just promised.
          </p>
        </div>
      </div>
    </section>

    {/* Who it's for */}
    <section className="py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-legal-dark mb-4">
            Built for attorneys who are done fixing AI output.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {lawAudiences.map((a) => (
            <Card key={a.title} className="bg-white border-border/60 h-full">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-[#fdecdf] text-[#d97757] flex items-center justify-center mb-2">
                  <a.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg text-legal-dark">{a.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* Pricing */}
    <section className="py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-legal-dark mb-3">
            One price. Your firm keeps it.
          </h2>
        </div>
        <div className="max-w-3xl mx-auto rounded-2xl border-2 border-[#d97757] bg-[#fbf8f3] p-8 lg:p-10 shadow-lg">
          <div className="text-center mb-8">
            <p className="text-sm uppercase tracking-wider text-[#7a3a1f] font-semibold mb-2">Law Firm CoWork OS</p>
            <p className="text-5xl font-bold text-legal-dark mb-1">
              $<span className="text-[#d97757]">149</span>
            </p>
            <p className="text-sm text-muted-foreground">one-time</p>
          </div>
          <ul className="space-y-3 mb-8">
            {lawPricingIncludes.map((i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="h-4 w-4 text-[#d97757] shrink-0 mt-0.5" />
                <span className="text-legal-dark">{i}</span>
              </li>
            ))}
          </ul>
          <Button size="lg" className="w-full bg-[#d97757] hover:bg-[#b85d3f] text-white">
            Download CoWork OS <Download className="h-4 w-4 ml-2" />
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-5 leading-relaxed">
            Instant download. Works with Claude and the CoWork desktop app. One folder per firm — install for as many attorneys as you have. All templates require attorney review before use.
          </p>
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-20 lg:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl lg:text-4xl font-bold text-legal-dark mb-8 text-center">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {lawFaqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-[#e6d5bf]">
              <AccordionTrigger className="text-left text-legal-dark font-semibold hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  </div>
);

const npProblems = [
  {
    icon: Brain,
    title: "It doesn't know your mission",
    body: "Generic AI produces generic mission language — vague, jargon-heavy, interchangeable with any other nonprofit in your sector. Funders read hundreds of proposals. Program officers notice immediately when the narrative could have come from anyone. Your org's specific theory of change, your community's specific need, your program's specific approach — the AI doesn't know any of it.",
  },
  {
    icon: AlertTriangle,
    title: "It invents impact claims",
    body: "Ask generic AI to write a needs statement or an impact narrative without providing data, and it will. It will produce plausible-sounding statistics, confident outcome claims, and compelling-but-unverifiable impact language. Funders verify. The wrong number in a proposal damages a relationship that took years to build.",
  },
  {
    icon: FolderTree,
    title: "Every session starts from scratch",
    body: "No funder memory. No program history. No record of what the last proposal said, what the program officer responded, or what was promised in the last grant report. You rebuild context every time you open a chat window — and the AI has no way to know what it's supposed to be consistent with.",
  },
];

const npSolutions = [
  {
    icon: Database,
    title: "Funder memory that persists",
    body: "Every funder relationship gets its own folder — brief, memory log, past proposals, report notes, program officer context. Claude reads it before every session. When you return to a funder relationship next quarter, everything is there: what you proposed, what was funded, what was promised, what the relationship history looks like.",
  },
  {
    icon: MessageSquare,
    title: "Four communication registers, built in",
    body: "Nonprofits don't write in one voice — they write in four. Funder-facing copy is precise and evidence-based. Donor-facing copy is warm and story-driven. Constituent-facing communications are plain-language and accessible. Internal documents are direct and practical. CoWork OS knows the difference and applies the right register automatically.",
  },
  {
    icon: ShieldCheck,
    title: "The data-first rule",
    body: "CoWork OS will not draft impact claims, outcome statements, or needs statement content without supporting data. If the data isn't there, Claude asks for it before writing. This isn't a limitation — it's protection. Your credibility with funders and donors depends on claims you can defend. CoWork OS keeps that standard enforced, session after session.",
  },
];

const npGrantFeatures = [
  {
    title: "The grant proposal scaffold",
    body: "Our flagship template covers every standard section funders require: organization background, statement of need, program description, evaluation plan, sustainability plan, and budget narrative. Each section has built-in prompts that ask for the data before Claude drafts. No invented statistics. No vague impact language. A complete, data-grounded first draft ready for your review.",
  },
  {
    title: "The grant report template",
    body: "Honest reporting builds funder relationships that last. Our report template is structured around the real reporting cycle — comparing actuals to targets, explaining variances with context and learning, and setting up the renewal conversation. Funders don't need everything to have gone perfectly. They need to trust you.",
  },
  {
    title: "The LOI template",
    body: "A two-page pitch format that answers the five questions every program officer needs answered: who you are, what you want to do, why it matters, why you can do it, and what you're asking for. Mirror the funder's language. Lead with the need. State the amount early.",
  },
  {
    title: "Funder relationship memory",
    body: "Every funder gets a folder. The brief captures their priorities, relationship history, and prior application notes. The memory log tracks what was submitted, what feedback was received, and what the program officer said at the last site visit. The next proposal builds on everything that came before it — not from a blank page.",
  },
];

const npTemplates = [
  "Grant proposal scaffold — data-first, section by section",
  "Grant report — interim and final, honest-reporting format",
  "Letter of inquiry (LOI)",
  "Donor acknowledgment — first gift and major gift formats",
  "Appeal letter — with ethical guardrails built in",
  "Donor impact update",
  "Board report",
  "Impact summary / annual report section",
  "Newsletter — three-section format",
  "Program documentation brief",
  "Volunteer and community communication",
  "Project memory log",
];

const npSteps = [
  { n: "1", title: "Download the zip", body: "One file. Everything included." },
  { n: "2", title: "Unzip and place", body: "Extract the folder and put it wherever you keep your work. Each organization you install it for gets its own separate folder." },
  { n: "3", title: "Load into CoWork", body: "Open the CoWork desktop app and point it at the folder." },
  { n: "4", title: "Trigger first run", body: "Open a new chat. Claude detects the setup file and walks you through onboarding automatically." },
  { n: "5", title: "Fill in your organization", body: "Answer questions about your mission, programs, funding mix, and communication voice. The voice profile takes the most time and is worth doing carefully." },
  { n: "6", title: "Read the data-first rule", body: "Bring your program outcome data and at least two external data points for any needs statement. Claude does the rest." },
];

const npAudiences = [
  {
    icon: Target,
    title: "Development directors and grant writers",
    body: "The proposal deadline is in ten days. You have three other deadlines behind it. CoWork OS drafts the needs statement from your program data, structures the narrative around the funder's priorities, and flags every impact claim that needs a data source before you read it. You review, refine, and submit — instead of drafting from scratch at 10pm.",
  },
  {
    icon: Briefcase,
    title: "Executive directors of small nonprofits",
    body: "You write the grants, the donor letters, the board reports, the newsletter, and the program documentation — and then you do your actual job. CoWork OS handles the first draft of all of it in your org's voice and at your org's standard. Not generic AI output you spend an hour fixing. Something you can actually use.",
  },
  {
    icon: Heart,
    title: "Communications and program staff",
    body: "Whether it's a volunteer recruitment email, a program participant update, or an annual report section, CoWork OS applies the right register automatically. Funder-facing precision for proposals. Warm story-driven language for donors. Plain language for participants. You don't have to think about the register — it's already loaded.",
  },
];

const npPricingIncludes = [
  "Complete folder structure and CLAUDE.md operating file",
  "6 identity and memory files — pre-built, ready to fill in",
  "12 nonprofit document and workflow templates",
  "Grant writing guide — how to use CoWork OS for proposals and reports",
  "Installation guide (HTML — opens in any browser)",
  "How-to-use guide (HTML — reference anytime)",
  "Personal assistant plugin",
  "Specialist sub-agent builder plugin",
  "Lifetime access — no subscription, no renewal",
  "Install for your whole team — one purchase per organization",
  "30-day money-back guarantee",
];

const npFaqs = [
  { q: "What exactly am I downloading?", a: "A zip file containing a complete folder system — ABOUT ME, WORK AREAS, RESOURCES, and a CLAUDE.md operating file. You unzip it, load it into the CoWork desktop app, and follow the first-run setup. The grant writing scaffold and all 12 templates are included and ready to use." },
  { q: "Do I need CoWork to use this?", a: "Yes. Nonprofit CoWork OS is built to work with the CoWork desktop app, which connects Claude to your folder and maintains session context. CoWork is a separate product." },
  { q: "Is our donor and beneficiary data safe?", a: "Your data never leaves your computer. The folder system is entirely local — no cloud storage, no third-party servers involved in CoWork OS itself. Claude processes session content through Anthropic's API, subject to their privacy policy. We recommend reviewing that policy alongside your organization's data governance practices." },
  { q: "Can one purchase cover our whole team?", a: "Yes. One purchase, one installation per organization. Multiple development staff, program staff, and the ED can all use the same CoWork OS folder. Each person opens CoWork and points it at the shared folder." },
  { q: "Does this work for any type of nonprofit?", a: "Yes. The templates and structure work across sectors — human services, advocacy, arts, education, environment, health, community development. The identity files are where you customise for your specific organization, mission, and funding mix." },
  { q: "What about the data-first rule — does it slow things down?", a: "It takes an extra two minutes at the start of a grant session to provide your program data and the external statistics for your needs statement. What you get in return is a proposal draft where every impact claim has a source — which is the draft you would have had to produce anyway after reviewing generic AI output. The data-first rule doesn't slow you down; it removes a revision cycle." },
  { q: "What if it doesn't work for us?", a: "30-day money-back guarantee, no questions asked. Email support@bizooma.com and we'll refund you." },
];

const NonprofitCoworkSections = () => (
  <div id="nonprofits">
    {/* Problem */}
    <section className="py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f0e6] text-[#7a3a1f] text-xs font-semibold uppercase tracking-wider mb-4">
            <HeartHandshake className="h-3.5 w-3.5" /> For Nonprofits
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-legal-dark mb-4">
            Generic AI doesn't understand nonprofit work.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Development directors and EDs using generic AI tools run into the same wall: the output is fine until it isn't. It doesn't know your theory of change. It doesn't know how you talk about the people you serve. It doesn't know what your last grant report said or what this funder cares about. So you rewrite everything. The time you thought you were saving goes into cleanup — and the pressure of the next deadline is already building.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {npProblems.map((p) => (
            <Card key={p.title} className="bg-white border-border/60 h-full">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-[#fdecdf] text-[#d97757] flex items-center justify-center mb-2">
                  <p.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg text-legal-dark">{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* Solution */}
    <section className="py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f0e6] text-[#7a3a1f] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="h-3.5 w-3.5" /> The Solution
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-legal-dark mb-4">
            CoWork OS gives Claude the context it's missing.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A structured folder system built specifically for nonprofit operations. It loads your organization's identity, funder relationships, program data, and communication standards before Claude writes a word. The result is AI that sounds like your org, respects your data, and produces work you can actually submit.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {npSolutions.map((s) => (
            <Card key={s.title} className="border-[#e6d5bf] bg-[#fbf8f3] h-full">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-[#d97757] text-white flex items-center justify-center mb-2">
                  <s.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg text-legal-dark">{s.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* Grant writing */}
    <section className="py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f0e6] text-[#7a3a1f] text-xs font-semibold uppercase tracking-wider mb-4">
            <FileText className="h-3.5 w-3.5" /> Grant Writing
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-legal-dark mb-4">
            The feature that pays for itself the first time you use it.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Grant writing is the highest-stakes, most time-consuming writing work in a development office. A strong proposal takes days. A weak one — or a late one — closes a funder relationship that took years to build. CoWork OS was designed around this work first.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {npGrantFeatures.map((g) => (
            <Card key={g.title} className="border-[#e6d5bf] bg-white h-full">
              <CardHeader>
                <CardTitle className="text-lg text-legal-dark">{g.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{g.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* What's inside */}
    <section className="py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-legal-dark mb-4">
            Everything in the box.
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#7a3a1f]">The folder structure</h3>
            {[
              { name: "ABOUT ME/", body: "Six identity files Claude reads every session without exception. Your org profile, four-register voice system, dignity-first writing rules, tool map, specialist routing, and session memory. This is what makes Claude sound like your org rather than a sector template." },
              { name: "WORK AREAS/", body: "Six organised areas covering every type of nonprofit work: Grants-Funding (the flagship), Donor-Relations, Communications, Programs, Operations, and Admin. Every grant, campaign, and initiative gets its own brief, memory log, and outputs folder." },
              { name: "RESOURCES/", body: "Templates, HTML guides, plugins, and skills. Everything you need to work immediately." },
              { name: "CLAUDE.md", body: "The operating brain. Governs every session, enforces the data-first rule, applies register awareness automatically, and flags anything that could compromise impact integrity or donor confidentiality." },
            ].map((f) => (
              <div key={f.name} className="flex gap-4 p-5 rounded-xl bg-[#fbf8f3] border border-[#e6d5bf]">
                <Folder className="h-6 w-6 text-[#d97757] shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono text-sm font-semibold text-legal-dark mb-1">{f.name}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#7a3a1f] mb-5">12 nonprofit templates</h3>
            <div className="p-6 rounded-xl bg-gradient-to-br from-[#1a0000] to-[#3a0a0a] text-white">
              <p className="text-sm text-white/80 mb-5 leading-relaxed">
                Every template is pre-loaded with your org's voice profile and the data-first rule. Claude uses the structure — you bring the data.
              </p>
              <ul className="space-y-3">
                {npTemplates.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[#d97757] shrink-0 mt-0.5" />
                    <span className="text-white/95">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* How it works */}
    <section className="py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-legal-dark mb-4">
            Up and running in 20 minutes.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 mb-8">
          {npSteps.map((s) => (
            <div key={s.n} className="p-5 rounded-xl border border-[#e6d5bf] bg-white">
              <div className="h-9 w-9 rounded-full bg-[#d97757] text-white font-bold flex items-center justify-center mb-3">
                {s.n}
              </div>
              <h3 className="font-semibold text-legal-dark mb-1.5">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="max-w-4xl rounded-xl border-l-4 border-[#d97757] bg-[#fdecdf] p-5 flex gap-3">
          <ShieldCheck className="h-5 w-5 text-[#d97757] shrink-0 mt-0.5" />
          <p className="text-sm text-legal-dark leading-relaxed">
            Each organization gets its own separate folder. Multiple staff can use the same CoWork OS install — one purchase covers your whole team.
          </p>
        </div>
      </div>
    </section>

    {/* Who it's for */}
    <section className="py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-legal-dark mb-4">
            Built for the people doing the most writing with the least time.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {npAudiences.map((a) => (
            <Card key={a.title} className="bg-[#fbf8f3] border-[#e6d5bf] h-full">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-[#fdecdf] text-[#d97757] flex items-center justify-center mb-2">
                  <a.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg text-legal-dark">{a.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* Data-first rule */}
    <section className="py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-br from-[#fdecdf] to-[#fbf8f3] border border-[#e6d5bf] p-8 lg:p-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#7a3a1f] text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="h-3.5 w-3.5" /> The Data-First Rule
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-legal-dark mb-5">
            We built something most AI tools won't.
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Nonprofit CoWork OS will not generate impact statistics, outcome claims, or community needs data that isn't grounded in real information you provide.
            </p>
            <p>
              This is deliberate. Funders verify claims. Program officers at major foundations have seen every version of AI-generated impact language — and the ones that don't hold up damage the relationship that generated the application. Donors who discover that impact numbers were inflated don't give again.
            </p>
            <p>
              When Claude needs data to draft a needs statement, it asks you for it. When an impact claim in a draft doesn't have a source, it flags it before delivering the document. When a proposal section requires specific program outcome data, it waits for you to provide it.
            </p>
            <p>
              This rule is structural — it's built into the CLAUDE.md file that governs every session. It can't be turned off by accident.
            </p>
            <p className="text-legal-dark font-semibold">
              Your credibility with funders and donors is worth protecting. CoWork OS protects it.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Pricing */}
    <section className="py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-legal-dark mb-3">
            One price. Your whole team uses it.
          </h2>
        </div>
        <div className="max-w-3xl mx-auto rounded-2xl border-2 border-[#d97757] bg-[#fbf8f3] p-8 lg:p-10 shadow-lg">
          <div className="text-center mb-8">
            <p className="text-sm uppercase tracking-wider text-[#7a3a1f] font-semibold mb-2">Nonprofit CoWork OS</p>
            <p className="text-5xl font-bold text-legal-dark mb-1">
              $<span className="text-[#d97757]">49</span>
            </p>
            <p className="text-sm text-muted-foreground">one-time</p>
          </div>
          <ul className="space-y-3 mb-8">
            {npPricingIncludes.map((i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="h-4 w-4 text-[#d97757] shrink-0 mt-0.5" />
                <span className="text-legal-dark">{i}</span>
              </li>
            ))}
          </ul>
          <Button size="lg" className="w-full bg-[#d97757] hover:bg-[#b85d3f] text-white">
            Download CoWork OS <Download className="h-4 w-4 ml-2" />
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-5 leading-relaxed">
            Instant download. Works with Claude and the CoWork desktop app. One folder per organization — your whole team can use the same install. All grant proposals and donor communications require human review before submission or distribution.
          </p>
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-20 lg:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl lg:text-4xl font-bold text-legal-dark mb-8 text-center">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {npFaqs.map((f, i) => (
            <AccordionItem key={i} value={`np-item-${i}`} className="border-[#e6d5bf]">
              <AccordionTrigger className="text-left text-legal-dark font-semibold hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  </div>
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

        <LawFirmCoworkSections />

        <div className="container mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-[#e6d5bf] to-transparent" />
        </div>

        <NonprofitCoworkSections />

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