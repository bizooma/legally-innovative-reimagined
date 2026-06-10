import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import auditPreview from "@/assets/ai-audit-preview.png.asset.json";
import trackerPreview from "@/assets/ai-tracker-preview.png.asset.json";
import {
  CheckCircle2,
  FileSpreadsheet,
  ClipboardCheck,
  Workflow,
  ArrowRight,
  ShieldCheck,
  Scale,
  Download,
  Sparkles,
} from "lucide-react";

async function startAiAuditCheckout() {
  try {
    const { data, error } = await supabase.functions.invoke("create-ai-audit-checkout", {
      body: { origin: window.location.origin },
    });
    if (error || (data as any)?.error || !(data as any)?.url) {
      throw new Error((data as any)?.error || error?.message || "Could not start checkout");
    }
    const url = (data as any).url as string;
    try {
      if (window.top && window.top !== window.self) {
        window.top.location.href = url;
        return;
      }
    } catch {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    window.location.href = url;
  } catch (err: any) {
    toast({ title: "Checkout failed", description: err.message ?? String(err), variant: "destructive" });
  }
}

const included = [
  "AI Audit spreadsheet — score your firm across the workflows that matter",
  "Implementation Tracker spreadsheet — manage every AI workflow rollout",
  "Pre-built scoring formulas and prioritization logic",
  "Lifetime access — no subscription, instant download after checkout",
];

const auditUses = [
  "Identify which practice-area tasks are highest-leverage for AI",
  "Score current tooling, data readiness, and team capability",
  "Surface the 3–5 workflows that will pay back the fastest",
  "Produce a defensible baseline to measure progress against",
];

const trackerUses = [
  "Assign owners, deadlines, and status to every AI workflow",
  "Track tools, prompts, SOPs, and training per workflow",
  "Monitor adoption, time saved, and ROI over time",
  "Keep partners and staff aligned on what's live, what's next",
];

export default function AiAuditPage() {
  return (
    <div className="min-h-screen bg-[#fbf8f3]">
      <Helmet>
        <title>AI Audit for Law Firms — Audit & Implementation Spreadsheets</title>
        <meta
          name="description"
          content="Two spreadsheets to audit your law firm's AI readiness and manage the rollout of AI workflows. Instant download after purchase."
        />
        <link rel="canonical" href="https://legallyinnovative.com/ai-audit" />
      </Helmet>
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f0e6] text-[#7a3a1f] text-xs font-semibold uppercase tracking-wider mb-5">
              <Scale className="h-3.5 w-3.5" /> For Law Firms
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-legal-dark leading-tight mb-5">
              Audit your firm's AI. Then actually implement it.
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8">
              Two spreadsheets, built for law firms. The first scores where AI will pay off in your practice. The second runs the implementation so it doesn't stall after the kickoff meeting.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="bg-[#d97757] hover:bg-[#b85d3f] text-white"
                onClick={startAiAuditCheckout}
              >
                Buy both spreadsheets <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <a
                href="#whats-inside"
                className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-[#d97757]/40 text-[#7a3a1f] hover:bg-[#fdecdf] text-sm font-medium"
              >
                See what's inside
              </a>
            </div>
            <div className="mt-4 inline-flex items-center gap-2">
              <span className="text-2xl font-bold text-[#d97757]">$19.95</span>
              <span className="text-sm text-muted-foreground">one-time</span>
            </div>
            <p className="text-xs text-muted-foreground mt-3 inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" /> Instant download after checkout. Lifetime access.
            </p>
          </div>
        </div>
      </section>

      {/* Two products */}
      <section id="whats-inside" className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f0e6] text-[#7a3a1f] text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="h-3.5 w-3.5" /> What you get
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-legal-dark mb-4">
              Stop guessing about AI. Score it, prioritize it, build it safely.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Diagnose first, implement second. The audit tells you where to start. The tracker keeps it moving.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-[#e6d5bf] bg-[#fbf8f3]">
              <CardHeader>
                <Badge variant="secondary" className="bg-[#f5f0e6] text-[#7a3a1f] border-0 flex items-center gap-1.5 w-fit mb-3">
                  <FileSpreadsheet className="h-4 w-4" /> Spreadsheet 1
                </Badge>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-[#d97757] text-white flex items-center justify-center">
                    <ClipboardCheck className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl text-legal-dark">Law Firm AI Audit</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-5 rounded-lg overflow-hidden border border-[#e6d5bf] bg-white shadow-sm">
                  <img
                    src={auditPreview.url}
                    alt="Preview of the Law Firm AI Workflow Audit spreadsheet showing departments, workflows, impact and risk scoring, and prioritized recommendations"
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  A structured audit of where AI fits in your firm — across intake, drafting, research, billing, marketing, and operations. Score it, rank it, and walk away with a prioritized list.
                </p>
                <ul className="space-y-2.5">
                  {auditUses.map((u) => (
                    <li key={u} className="flex items-start gap-2.5 text-sm text-legal-dark">
                      <CheckCircle2 className="h-4 w-4 text-[#d97757] shrink-0 mt-0.5" />
                      <span>{u}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-[#e6d5bf] bg-[#fbf8f3]">
              <CardHeader>
                <Badge variant="secondary" className="bg-[#f5f0e6] text-[#7a3a1f] border-0 flex items-center gap-1.5 w-fit mb-3">
                  <FileSpreadsheet className="h-4 w-4" /> Spreadsheet 2
                </Badge>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-[#d97757] text-white flex items-center justify-center">
                    <Workflow className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl text-legal-dark">AI Workflow Implementation Tracker</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-5 rounded-lg overflow-hidden border border-[#e6d5bf] bg-white shadow-sm">
                  <img
                    src={trackerPreview.url}
                    alt="Preview of the Law Firm AI Implementation Tracker spreadsheet showing build priority, owners, status, start dates, target go-live dates, and effort scoring"
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  A project tracker built specifically for AI rollouts inside a law firm. Owners, deadlines, tools, prompts, training — everything in one place so the work actually gets done.
                </p>
                <ul className="space-y-2.5">
                  {trackerUses.map((u) => (
                    <li key={u} className="flex items-start gap-2.5 text-sm text-legal-dark">
                      <CheckCircle2 className="h-4 w-4 text-[#d97757] shrink-0 mt-0.5" />
                      <span>{u}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing / CTA */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto rounded-2xl border-2 border-[#d97757] bg-white p-8 lg:p-10 shadow-lg">
            <div className="text-center mb-6">
              <Badge variant="secondary" className="bg-[#f5f0e6] text-[#7a3a1f] border-0 mb-3">
                Both spreadsheets included
              </Badge>
              <h2 className="text-2xl lg:text-3xl font-bold text-legal-dark mb-2">
                AI Audit + Implementation Toolkit
              </h2>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-3xl font-bold text-[#d97757]">$19.95</span>
                <span className="text-sm text-muted-foreground">one-time</span>
              </div>
              <p className="text-muted-foreground">
                One purchase. Instant download. Yours to use across your firm.
              </p>
            </div>
            <ul className="space-y-3 mb-7">
              {included.map((i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-legal-dark">
                  <CheckCircle2 className="h-5 w-5 text-[#d97757] shrink-0 mt-0.5" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
            <Button
              size="lg"
              className="w-full bg-[#d97757] hover:bg-[#b85d3f] text-white"
              onClick={startAiAuditCheckout}
            >
              Buy now <Download className="h-4 w-4 ml-2" />
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-3">
              Secure checkout via Stripe. You'll be redirected back to download both spreadsheets.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <MobileFooterNav />
    </div>
  );
}