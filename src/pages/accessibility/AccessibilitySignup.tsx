import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Accessibility, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function AccessibilitySignup() {
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1) Create account (no confirmation email) + organization
      const { data: signupData, error: signupErr } = await supabase.functions.invoke("accessibility-signup", {
        body: { email, password, orgName },
      });
      if (signupErr || (signupData as any)?.error) {
        throw new Error((signupData as any)?.error || signupErr?.message || "Signup failed");
      }

      // 2) Sign in to get a session for the checkout call
      const { error: signInErr } = await supabase.auth.signInWithPassword({ email, password });
      if (signInErr) throw signInErr;

      // 3) Create Stripe Checkout session
      const { data: checkout, error: checkoutErr } = await supabase.functions.invoke("create-accessibility-checkout", {
        body: { origin: window.location.origin },
      });
      if (checkoutErr || (checkout as any)?.error || !(checkout as any)?.url) {
        throw new Error((checkout as any)?.error || checkoutErr?.message || "Could not start checkout");
      }

      const url = (checkout as any).url as string;
      // Stripe Checkout cannot run inside an iframe (e.g. the Lovable preview).
      // Always redirect the top-level window so Stripe loads at the top level.
      try {
        if (window.top && window.top !== window.self) {
          window.top.location.href = url;
          return;
        }
      } catch {
        // cross-origin top access blocked — fall through to opening a new tab
        window.open(url, "_blank", "noopener,noreferrer");
        return;
      }
      window.location.href = url;
    } catch (err: any) {
      toast({ title: "Signup failed", description: err.message ?? String(err), variant: "destructive" });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <Helmet>
        <title>Create Account – Bizooma Accessibility Widget</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Card className="w-full max-w-md">
        <CardContent className="pt-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="h-12 w-12 rounded-full bg-primary/10 text-primary inline-flex items-center justify-center">
              <Accessibility className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-sm text-muted-foreground">Bizooma Accessibility Widget · $25/month · 1 website</p>
          </div>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="orgName">Organization name</Label>
              <Input id="orgName" required value={orgName} onChange={(e) => setOrgName(e.target.value)} placeholder="Acme Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Work email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" />
            </div>
            <Button type="submit" className="w-full gap-2" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Continue to payment <ArrowRight className="h-4 w-4" /></>}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              You'll be redirected to Stripe to complete your $25/month subscription. No confirmation email is required.
            </p>
          </form>
          <div className="text-xs text-center text-muted-foreground">
            Already have an account? <Link to="/portal" className="text-primary hover:underline">Sign in</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}