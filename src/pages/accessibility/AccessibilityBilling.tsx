import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, ExternalLink, Loader2, FileText, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { useAccessibilityOrg } from "@/hooks/useAccessibilityOrg";

type Ctx = ReturnType<typeof useAccessibilityOrg>;
type Sub = {
  id: string; status: string; current_period_end: number; cancel_at_period_end: boolean;
  amount: number | null; currency: string; interval: string | null; product_name: string;
  payment_method: { brand: string; last4: string; exp: string } | null;
} | null;
type Invoice = { id: string; number: string | null; status: string | null; amount_paid: number; currency: string; created: number; hosted_invoice_url: string | null; invoice_pdf: string | null };

const fmtMoney = (cents: number | null, cur = "usd") =>
  cents == null ? "—" : new Intl.NumberFormat(undefined, { style: "currency", currency: cur.toUpperCase() }).format(cents / 100);

export default function AccessibilityBilling() {
  const ctx = useOutletContext<Ctx>();
  const [loading, setLoading] = useState(true);
  const [sub, setSub] = useState<Sub>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [planName, setPlanName] = useState<string>("");
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke("accessibility-billing", { body: { action: "info" } });
      if (error) toast({ title: "Could not load billing", description: error.message, variant: "destructive" });
      else {
        setSub(data.subscription);
        setInvoices(data.invoices ?? []);
        setPlanName(data.org?.plan ?? "");
      }
      setLoading(false);
    })();
  }, [ctx.org?.id]);

  const openPortal = async () => {
    setOpening(true);
    const { data, error } = await supabase.functions.invoke("accessibility-billing", { body: { action: "portal", origin: window.location.origin } });
    setOpening(false);
    if (error || !data?.url) { toast({ title: "Could not open billing portal", description: error?.message, variant: "destructive" }); return; }
    window.location.href = data.url;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="text-sm text-muted-foreground">Manage your subscription, payment method, and invoices.</p>
      </div>

      {loading ? (
        <div className="text-sm text-muted-foreground flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Loading…</div>
      ) : (
        <>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-xs uppercase text-muted-foreground">Current plan</div>
                  <div className="text-xl font-bold mt-1">{sub?.product_name ?? planName ?? "—"}</div>
                  {sub && (
                    <div className="text-sm text-muted-foreground mt-1">
                      {fmtMoney(sub.amount, sub.currency)}{sub.interval ? ` / ${sub.interval}` : ""}
                    </div>
                  )}
                </div>
                {sub && (
                  <Badge variant={sub.status === "active" || sub.status === "trialing" ? "default" : "secondary"}>
                    {sub.cancel_at_period_end ? "Cancels at period end" : sub.status}
                  </Badge>
                )}
              </div>
              {sub && (
                <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t">
                  <div>
                    <div className="text-xs uppercase text-muted-foreground">Next billing date</div>
                    <div className="text-sm font-medium mt-1">
                      {new Date(sub.current_period_end * 1000).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase text-muted-foreground">Payment method</div>
                    <div className="text-sm font-medium mt-1 flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      {sub.payment_method ? `${sub.payment_method.brand.toUpperCase()} •••• ${sub.payment_method.last4} (exp ${sub.payment_method.exp})` : "—"}
                    </div>
                  </div>
                </div>
              )}
              <div className="flex gap-2 pt-2">
                <Button onClick={openPortal} disabled={opening || !sub} className="gap-2">
                  {opening ? <Loader2 className="h-4 w-4 animate-spin" /> : <ExternalLink className="h-4 w-4" />}
                  Manage subscription
                </Button>
                {!sub && <span className="text-sm text-muted-foreground self-center">No active subscription.</span>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Invoice history</h3>
              {invoices.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center py-8 border rounded-lg">No invoices yet.</div>
              ) : (
                <ul className="divide-y">
                  {invoices.map((inv) => (
                    <li key={inv.id} className="flex items-center gap-3 py-3 text-sm">
                      <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{inv.number ?? inv.id}</div>
                        <div className="text-xs text-muted-foreground">{new Date(inv.created * 1000).toLocaleDateString()}</div>
                      </div>
                      <div className="tabular-nums">{fmtMoney(inv.amount_paid, inv.currency)}</div>
                      <Badge variant={inv.status === "paid" ? "default" : "secondary"} className="gap-1">
                        {inv.status === "paid" && <CheckCircle2 className="h-3 w-3" />}{inv.status}
                      </Badge>
                      {inv.invoice_pdf && (
                        <a href={inv.invoice_pdf} target="_blank" rel="noreferrer" className="text-primary hover:underline text-xs">PDF</a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}