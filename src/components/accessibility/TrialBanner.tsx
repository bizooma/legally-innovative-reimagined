import { useEffect, useState } from "react";
import { AlertTriangle, Clock, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const PAID = ["active", "trialing", "past_due"];
const DAY = 24 * 60 * 60 * 1000;

/** Trial countdown for organizations without a subscription in good standing. */
export default function TrialBanner({ orgId }: { orgId: string }) {
  const [state, setState] = useState<{ status: string | null; trialEnds: string | null } | null>(null);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    let cancel = false;
    supabase.from("acc_organizations").select("subscription_status, trial_ends_at").eq("id", orgId).maybeSingle()
      .then(({ data }) => {
        if (!cancel && data) setState({ status: data.subscription_status, trialEnds: data.trial_ends_at });
      });
    return () => { cancel = true; };
  }, [orgId]);

  if (!state || (state.status && PAID.includes(state.status))) return null;

  const msLeft = state.trialEnds ? new Date(state.trialEnds).getTime() - Date.now() : -1;
  const ended = msLeft <= 0;
  const daysLeft = Math.max(1, Math.ceil(msLeft / DAY));
  const urgent = ended || daysLeft < 3;

  const upgrade = async () => {
    setStarting(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-accessibility-checkout", { body: { origin: window.location.origin } });
      const url = (data as any)?.url as string | undefined;
      if (error || (data as any)?.error || !url) throw new Error((data as any)?.error || error?.message || "Could not start checkout");
      if (window.top && window.top !== window.self) window.top.location.href = url;
      else window.location.href = url;
    } catch (e: any) {
      toast({ title: "Upgrade failed", description: e?.message ?? String(e), variant: "destructive" });
      setStarting(false);
    }
  };

  const message = ended
    ? state.status
      ? "Your subscription is not active — your widget is no longer running on your site."
      : "Your trial has ended — your widget is no longer running on your site."
    : `${daysLeft} ${daysLeft === 1 ? "day" : "days"} left in your trial.`;

  return (
    <Card className={urgent ? "border-destructive bg-destructive/5" : ""} role={urgent ? "alert" : "status"}>
      <CardContent className="flex flex-col sm:flex-row sm:items-center gap-3 py-4">
        {urgent ? <AlertTriangle className="h-5 w-5 text-destructive shrink-0" /> : <Clock className="h-5 w-5 text-muted-foreground shrink-0" />}
        <p className={`flex-1 text-sm ${urgent ? "font-semibold text-destructive" : ""}`}>{message}</p>
        <Button onClick={upgrade} disabled={starting} variant={urgent ? "destructive" : "default"}>
          {starting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Upgrade"}
        </Button>
      </CardContent>
    </Card>
  );
}
