import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export default function AccessibilityCheckoutSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"verifying" | "paid" | "unpaid" | "error">("verifying");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const sessionId = params.get("session_id");
    if (!sessionId) {
      setStatus("error");
      setMessage("Missing session id");
      return;
    }
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke("verify-accessibility-checkout", { body: { sessionId } });
        if (error || (data as any)?.error) throw new Error((data as any)?.error || error?.message);
        if ((data as any)?.paid) {
          setStatus("paid");
          setTimeout(() => navigate("/accessibility/dashboard", { replace: true }), 1500);
        } else {
          setStatus("unpaid");
        }
      } catch (e: any) {
        setStatus("error");
        setMessage(e.message ?? String(e));
      }
    })();
  }, [params, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Helmet><title>Activating your account…</title><meta name="robots" content="noindex" /></Helmet>
      <Card className="w-full max-w-md">
        <CardContent className="pt-8 text-center space-y-4">
          {status === "verifying" && (<>
            <Loader2 className="h-10 w-10 mx-auto animate-spin text-primary" />
            <h1 className="text-xl font-semibold">Confirming your subscription…</h1>
            <p className="text-sm text-muted-foreground">Hang tight, this only takes a moment.</p>
          </>)}
          {status === "paid" && (<>
            <CheckCircle2 className="h-10 w-10 mx-auto text-primary" />
            <h1 className="text-xl font-semibold">You're all set!</h1>
            <p className="text-sm text-muted-foreground">Redirecting you to your dashboard…</p>
          </>)}
          {status === "unpaid" && (<>
            <AlertTriangle className="h-10 w-10 mx-auto text-destructive" />
            <h1 className="text-xl font-semibold">Payment not completed</h1>
            <p className="text-sm text-muted-foreground">We couldn't confirm your payment. Please try again.</p>
            <Button asChild><Link to="/accessibility-layer">Back to plan</Link></Button>
          </>)}
          {status === "error" && (<>
            <AlertTriangle className="h-10 w-10 mx-auto text-destructive" />
            <h1 className="text-xl font-semibold">Something went wrong</h1>
            <p className="text-sm text-muted-foreground">{message}</p>
            <Button asChild><Link to="/accessibility-layer">Back to plan</Link></Button>
          </>)}
        </CardContent>
      </Card>
    </div>
  );
}