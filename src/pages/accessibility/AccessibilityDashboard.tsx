import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gauge, Shield, AlertTriangle, AlertCircle, CheckCircle2, FileText, ScanLine, Globe, Calendar } from "lucide-react";

const stats = [
  { label: "Accessibility Score", value: "92", icon: Gauge, hint: "+4 vs last week" },
  { label: "WCAG 2.1 AA", value: "87%", icon: Shield, hint: "Target 95%" },
  { label: "Critical issues", value: "3", icon: AlertTriangle, tone: "destructive" },
  { label: "Warnings", value: "18", icon: AlertCircle },
  { label: "Resolved", value: "142", icon: CheckCircle2, tone: "success" },
  { label: "Pages scanned", value: "248", icon: FileText },
  { label: "ADA risk", value: "Low", icon: Shield, tone: "success" },
  { label: "Last scan", value: "2h ago", icon: Calendar },
];

export default function AccessibilityDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Compliance health across your websites.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><FileText className="h-4 w-4"/> Generate report</Button>
          <Button className="gap-2"><ScanLine className="h-4 w-4"/> Run new scan</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{s.label}</span>
                <s.icon className="h-4 w-4" />
              </div>
              <div className="text-3xl font-bold mt-2">{s.value}</div>
              {s.hint && <div className="text-xs text-muted-foreground mt-1">{s.hint}</div>}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Accessibility score over time</h3>
              <Badge variant="outline">30 days</Badge>
            </div>
            <div className="h-56 rounded-lg bg-gradient-to-tr from-primary/20 via-primary/5 to-transparent border" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Top violations</h3>
            <ul className="space-y-3 text-sm">
              {[
                { l: "Missing alt text", n: 42 },
                { l: "Low color contrast", n: 31 },
                { l: "Missing form labels", n: 22 },
                { l: "Heading hierarchy", n: 14 },
                { l: "Empty links", n: 8 },
              ].map((v) => (
                <li key={v.l} className="flex items-center justify-between">
                  <span>{v.l}</span>
                  <Badge variant="secondary">{v.n}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Websites</h3>
            <Button size="sm" variant="outline" className="gap-2"><Globe className="h-4 w-4"/> Add website</Button>
          </div>
          <div className="text-sm text-muted-foreground text-center py-8 border rounded-lg">
            No websites yet — add your first domain to begin scanning.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}