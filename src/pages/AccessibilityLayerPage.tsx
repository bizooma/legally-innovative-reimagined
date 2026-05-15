import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accessibility,
  Shield,
  Sparkles,
  Gauge,
  ScanLine,
  FileCheck2,
  Bot,
  Globe,
  CheckCircle2,
  ArrowRight,
  Eye,
  Type,
  Contrast,
  MousePointer2,
  Languages,
  AlertTriangle,
  Lock,
  ShieldCheck,
} from "lucide-react";

const featureGroups = [
  {
    icon: Eye,
    title: "Visual Accessibility",
    items: ["Font size & spacing", "Dyslexia-friendly font", "High contrast & dark mode", "Grayscale & invert", "Highlight links & headings"],
  },
  {
    icon: MousePointer2,
    title: "Navigation",
    items: ["Keyboard navigation", "Skip-to-content", "Focus enhancement", "Reading guide & mask", "Pause animations"],
  },
  {
    icon: Bot,
    title: "AI Enhancements",
    items: ["AI alt text suggestions", "Readability scoring", "Contrast detection", "Heading structure analysis", "Plain-English fixes"],
  },
  {
    icon: Shield,
    title: "Compliance",
    items: ["WCAG 2.1 AA tracking", "ADA readiness score", "Section 508 indicators", "Downloadable audit reports", "Public statement page"],
  },
];

const faqs = [
  { q: "What laws does this help me comply with?", a: "WCAG 2.1 AA, the ADA (Title III), Section 508, and EAA. Our reports map findings to the relevant criteria." },
  { q: "Will the widget slow my site down?", a: "No. The widget is a small async script (<25KB gzipped) that loads after the main thread is idle." },
  { q: "Do I need to change my code?", a: "The widget improves accessibility at runtime without code changes. Scanner findings include suggested code fixes you can apply when ready." },
  { q: "Can agencies white-label this?", a: "Yes. Agency and Enterprise plans include white-label widget branding and reports." },
];

export default function AccessibilityLayerPage() {
  const [ccpaOpen, setCcpaOpen] = useState(false);
  const [cpraOpen, setCpraOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Bizooma Accessibility Layer — ADA & WCAG Monitoring Powered by AI</title>
        <meta name="description" content="Continuous ADA & WCAG compliance monitoring with an AI-powered accessibility widget, automated scans, and audit-ready reports." />
        <link rel="canonical" href="https://bizooma.com/accessibility-layer" />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_60%)]" />
        <div className="container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 gap-2">
              <Sparkles className="h-3 w-3" /> Accessibility meets automation
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Continuous ADA & WCAG Compliance Monitoring{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Powered by AI</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Protect your business, improve usability, and monitor accessibility issues in real time with the Bizooma Accessibility Layer.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link to="/accessibility/signup">Get the widget – $25/mo <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="https://calendly.com/heyjoe" target="_blank" rel="noreferrer">Schedule Demo</a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-left">
              {[
                { v: "96%", l: "of websites have WCAG failures" },
                { v: "4,605", l: "ADA web lawsuits in 2023" },
                { v: "1B+", l: "people live with disabilities" },
                { v: "$13T", l: "global disposable income" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl border bg-card/50 backdrop-blur p-4">
                  <div className="text-2xl md:text-3xl font-bold text-primary">{s.v}</div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature groups */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need for accessibility</h2>
          <p className="text-muted-foreground">A drop-in widget for your visitors and a dashboard for your team — backed by an AI engine that explains every fix.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureGroups.map((g) => (
            <Card key={g.title} className="border-2 hover:border-primary/40 transition-colors">
              <CardContent className="pt-6">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <g.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-3">{g.title}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {g.items.map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Widget preview */}
      <section className="border-y bg-muted/30">
        <div className="container mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="secondary" className="mb-4">The Widget</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">A floating accessibility panel for every visitor</h2>
            <p className="text-muted-foreground mb-6">Install with one line of HTML. Visitors get instant control over font size, contrast, motion, dyslexia-friendly fonts, reading guides, and more — fully white-label on Agency & Enterprise plans.</p>
            <pre className="bg-card border rounded-lg p-4 text-xs overflow-x-auto"><code>{`<script src="https://widget.bizooma.com/accessibility.js"
        data-site-id="YOUR_SITE_ID" async></script>`}</code></pre>
            <div className="flex flex-wrap gap-2 mt-6">
              {[Type, Contrast, Languages, Eye].map((Icon, i) => (
                <div key={i} className="h-9 w-9 rounded-md border bg-card flex items-center justify-center">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl border bg-card shadow-2xl p-6 backdrop-blur">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <Accessibility className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">Accessibility</div>
                  <div className="text-xs text-muted-foreground">Powered by Bizooma</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {["Larger text", "High contrast", "Dyslexia font", "Reduce motion", "Highlight links", "Reading guide"].map((f) => (
                  <div key={f} className="rounded-lg border p-3 text-sm hover:bg-accent">{f}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard preview */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl border bg-card shadow-xl p-6 order-2 lg:order-1">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold">Accessibility score</div>
              <Badge variant="outline">Last 30d</Badge>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[{l:"Score",v:"92",i:Gauge},{l:"WCAG AA",v:"87%",i:Shield},{l:"Critical",v:"3",i:AlertTriangle}].map((s)=>(
                <div key={s.l} className="rounded-lg border p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><s.i className="h-3 w-3"/>{s.l}</div>
                  <div className="text-2xl font-bold mt-1">{s.v}</div>
                </div>
              ))}
            </div>
            <div className="h-32 rounded-lg bg-gradient-to-r from-primary/20 to-primary/5 border" />
          </div>
          <div className="order-1 lg:order-2">
            <Badge variant="secondary" className="mb-4">The Dashboard</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See compliance health at a glance</h2>
            <p className="text-muted-foreground mb-6">Run scans, triage issues by severity & WCAG criterion, assign fixes to developers, and generate audit-ready reports — all from one dashboard.</p>
            <ul className="space-y-3">
              {["Real-time accessibility scoring", "Issues with AI-generated fixes & code examples", "Multi-client agency mode", "PDF compliance reports & public statements"].map((f)=>(
                <li key={f} className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-primary"/>{f}</li>
              ))}
            </ul>
            <Button asChild className="mt-6 gap-2"><Link to="/accessibility/signup">Get started <ArrowRight className="h-4 w-4"/></Link></Button>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-muted-foreground">One plan to get your site accessible today. Cancel anytime.</p>
          </div>
          <div className="max-w-md mx-auto">
            <Card className="border-2 border-primary shadow-xl relative">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Launch plan</Badge>
              <CardContent className="pt-8">
                <h3 className="font-semibold text-lg text-center">Bizooma Accessibility Widget</h3>
                <div className="mt-3 text-center">
                  <span className="text-5xl font-bold">$25</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 text-center">Everything you need to ship an accessible site.</p>
                <ul className="space-y-2 my-6 text-sm">
                  {[
                    "1 website",
                    "Embeddable accessibility widget",
                    "Automated WCAG scans",
                    "AI-powered remediation tips",
                    "Issue tracking dashboard",
                    "Cancel anytime",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />{f}</li>
                  ))}
                </ul>
                <Button asChild className="w-full gap-2">
                  <Link to="/accessibility/signup">Get started <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">More plans coming soon.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently asked</h2>
          <div className="space-y-4">
            {faqs.map((f)=>(
              <Card key={f.q}><CardContent className="pt-6">
                <h3 className="font-semibold mb-2">{f.q}</h3>
                <p className="text-muted-foreground text-sm">{f.a}</p>
              </CardContent></Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t">
        <div className="container mx-auto px-4 py-20 text-center">
          <Globe className="h-10 w-10 mx-auto text-primary mb-4"/>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Make every visitor feel welcome</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Get an instant accessibility score for your site and see exactly what to fix.</p>
          <Button asChild size="lg" className="gap-2"><Link to="/accessibility/signup">Get the widget – $25/mo <ScanLine className="h-4 w-4"/></Link></Button>
        </div>
      </section>

      {/* Privacy */}
      <section className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
              <Lock className="h-6 w-6" />
            </div>
            <Badge variant="secondary" className="mb-4">Privacy & Compliance</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Your privacy matters</h2>
            <p className="text-muted-foreground mb-8">
              The Bizooma Accessibility Layer is designed to respect every visitor. The widget collects only the minimal, anonymized usage signals required to deliver accessibility features and produce compliance reports. We never sell personal information, and your dashboard data stays scoped to your organization.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {["GDPR aware", "ADA Title III", "WCAG 2.1 AA", "Section 508"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground">
                  <ShieldCheck className="h-3 w-3 text-primary" />{t}
                </span>
              ))}
            </div>
            <Button variant="outline" className="gap-2" onClick={() => setCcpaOpen(true)}>
              <Shield className="h-4 w-4" /> California Consumer Privacy Act (CCPA)
            </Button>
          </div>
        </div>
      </section>

      <Dialog open={ccpaOpen} onOpenChange={setCcpaOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>California Consumer Privacy Act</DialogTitle>
          </DialogHeader>
          <div className="space-y-5 text-sm text-muted-foreground leading-relaxed">
            <p>
              The California Consumer Privacy Act (CCPA) is a landmark data privacy law enacted in 2018 that grants California residents extensive rights over their personal information. Effective January 1, 2020, it established the most comprehensive consumer privacy framework in the United States, influencing privacy standards nationwide.
            </p>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Key facts</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Signed into law: June 28, 2018 (Assembly Bill 375)</li>
                <li>Effective date: January 1, 2020</li>
                <li>Primary enforcers: California Attorney General and California Privacy Protection Agency (CPPA)</li>
                <li>Major amendment: California Privacy Rights Act (effective 2023)</li>
                <li>Penalty range (2025 adjustment): $2,663 – $7,988 per violation</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Origins and legislative development</h3>
              <p>
                Sparked by a 2017 ballot initiative led by privacy advocate Alastair Mactaggart, lawmakers passed the CCPA as a legislative compromise to avoid a voter initiative. It was signed by Governor Jerry Brown in June 2018 and took effect January 1, 2020, with enforcement beginning July 1, 2020. The act was subsequently amended by multiple bills and expanded by the 2020 California Privacy Rights Act, which created the CPPA to oversee rulemaking and enforcement.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Core consumer rights</h3>
              <p className="mb-2">The CCPA grants California residents rights to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Know what personal data businesses collect, use, and share.</li>
                <li>Delete personal data held by businesses (with certain exceptions).</li>
                <li>Opt out of the sale or sharing of personal information.</li>
                <li>Correct inaccurate data and limit use of sensitive information (CPRA amendments).</li>
                <li>Be free from discrimination for exercising these rights.</li>
              </ul>
              <p className="mt-2">
                These rights apply broadly to for-profit entities meeting thresholds such as over $25 million in annual revenue or handling data of 100,000+ consumers or households.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Enforcement and penalties</h3>
              <p>
                Since 2023, enforcement has been shared by the California Attorney General and the CPPA. Businesses face administrative fines up to $7,988 per intentional violation or violations involving minors. Consumers also hold a limited private right of action for data breaches caused by inadequate security.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Subsequent amendments and evolution</h3>
              <p>
                Recent expansions include the Delete Act (Senate Bill 362), establishing the Delete Request and Opt-Out Platform (DROP) in 2026, and 2024 amendments addressing AI systems and neural data. California continues to update CCPA regulations to cover emerging technologies and automated decision-making by 2027.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}