import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Accessibility, ArrowRight, Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import TurnstileWidget, { TurnstileHandle } from "@/components/security/TurnstileWidget";

export default function AccessibilitySignup() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const mode: "signin" | "signup" = params.get("mode") === "signin" ? "signin" : "signup";
  const setMode = (m: "signin" | "signup") => {
    const next = new URLSearchParams(params);
    if (m === "signin") next.set("mode", "signin");
    else next.delete("mode");
    setParams(next, { replace: true });
  };

  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileHandle>(null);

  const resetCaptcha = () => {
    setCaptchaToken(null);
    turnstileRef.current?.reset();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) return;
    setLoading(true);
    try {
      // 1) Create account (no confirmation email) + organization
      const { data: signupData, error: signupErr } = await supabase.functions.invoke("accessibility-signup", {
        body: { email, password, orgName, turnstileToken: captchaToken },
      });
      if (signupErr || (signupData as any)?.error) {
        throw new Error((signupData as any)?.error || signupErr?.message || "Signup failed");
      }

      // 2) Sign in to get a session for the checkout call
      const { error: signInErr } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: { captchaToken },
      });
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
      resetCaptcha();
      setLoading(false);
    }
  };

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: { captchaToken },
      });
      if (error) throw error;
      toast({ title: "Welcome back", description: "Signed in successfully." });
      navigate("/accessibility/dashboard");
    } catch (err: any) {
      toast({ title: "Sign in failed", description: err.message ?? String(err), variant: "destructive" });
      resetCaptcha();
      setLoading(false);
    }
  };

  const forgotPassword = async () => {
    if (!email) {
      toast({ title: "Enter your email", description: "Type your email above first, then click Forgot password.", variant: "destructive" });
      return;
    }
    if (!captchaToken) {
      toast({ title: "Complete the captcha", description: "Please complete the verification below first.", variant: "destructive" });
      return;
    }
    setResetting(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/accessibility/reset-password`,
        captchaToken,
      });
      if (error) throw error;
      toast({ title: "Check your inbox", description: "We sent you a password reset link." });
      resetCaptcha();
    } catch (err: any) {
      toast({ title: "Could not send reset email", description: err.message ?? String(err), variant: "destructive" });
      resetCaptcha();
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <Helmet>
        <title>{mode === "signin" ? "Sign In" : "Create Account"} – Bizooma Accessibility Widget</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Card className="w-full max-w-md">
        <CardContent className="pt-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="h-12 w-12 rounded-full bg-primary/10 text-primary inline-flex items-center justify-center">
              <Accessibility className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold">
              {mode === "signin" ? "Sign in to your dashboard" : "Create your account"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {mode === "signin"
                ? "Bizooma Accessibility Widget subscribers"
                : "Bizooma Accessibility Widget · $25/month · 1 website"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-1 p-1 bg-muted rounded-md text-sm">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`py-2 rounded ${mode === "signin" ? "bg-background shadow-sm font-medium" : "text-muted-foreground"}`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`py-2 rounded ${mode === "signup" ? "bg-background shadow-sm font-medium" : "text-muted-foreground"}`}
            >
              Create account
            </button>
          </div>

          {mode === "signup" ? (
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
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <TurnstileWidget
              ref={turnstileRef}
              onVerify={setCaptchaToken}
              onExpire={() => setCaptchaToken(null)}
            />
            <Button type="submit" className="w-full gap-2" disabled={loading || !captchaToken}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Continue to payment <ArrowRight className="h-4 w-4" /></>}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              You'll be redirected to Stripe to complete your $25/month subscription. No confirmation email is required.
            </p>
          </form>
          ) : (
          <form onSubmit={signIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signin-email">Email</Label>
              <Input id="signin-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="signin-password">Password</Label>
                <button
                  type="button"
                  onClick={forgotPassword}
                  className="text-xs text-primary hover:underline disabled:opacity-50"
                  disabled={resetting}
                >
                  {resetting ? "Sending…" : "Forgot password?"}
                </button>
              </div>
              <div className="relative">
                <Input
                  id="signin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <TurnstileWidget
              ref={turnstileRef}
              onVerify={setCaptchaToken}
              onExpire={() => setCaptchaToken(null)}
            />
            <Button type="submit" className="w-full gap-2" disabled={loading || !captchaToken}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Sign in <ArrowRight className="h-4 w-4" /></>}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Need a different account? <Link to="/portal" className="text-primary hover:underline">Client portal sign in</Link>
            </p>
          </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}