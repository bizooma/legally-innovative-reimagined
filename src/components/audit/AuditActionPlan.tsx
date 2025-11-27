import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Target, TrendingUp, Sparkles } from "lucide-react";
import { useState } from "react";

interface ActionItem {
  title: string;
  description: string;
  impact: string;
  effort: string;
}

interface TierData {
  title: string;
  description: string;
  actions: ActionItem[];
}

interface ActionPlan {
  tier1: TierData;
  tier2: TierData;
  tier3: TierData;
}

interface AuditActionPlanProps {
  actionPlan?: ActionPlan | null;
}

export const AuditActionPlan = ({ actionPlan }: AuditActionPlanProps) => {
  const [openTier, setOpenTier] = useState<string>("tier1");

  if (!actionPlan) return null;

  const tiers = [
    { key: "tier1", data: actionPlan.tier1, icon: Target, color: "text-red-600", bgColor: "bg-red-50" },
    { key: "tier2", data: actionPlan.tier2, icon: TrendingUp, color: "text-amber-600", bgColor: "bg-amber-50" },
    { key: "tier3", data: actionPlan.tier3, icon: Sparkles, color: "text-blue-600", bgColor: "bg-blue-50" },
  ];

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "outline";
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort.toLowerCase()) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "outline";
    }
  };

  return (
    <Card className="border-l-4 border-l-accent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          Prioritized Action Plan
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Follow this roadmap to systematically improve your SEO performance
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {tiers.map(({ key, data, icon: Icon, color, bgColor }) => (
          <Collapsible
            key={key}
            open={openTier === key}
            onOpenChange={() => setOpenTier(openTier === key ? "" : key)}
          >
            <CollapsibleTrigger className="w-full">
              <div className={`flex items-center justify-between p-4 rounded-lg border ${bgColor} hover:bg-opacity-80 transition-colors`}>
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${color}`} />
                  <div className="text-left">
                    <h3 className="font-semibold">{data.title}</h3>
                    <p className="text-sm text-muted-foreground">{data.description}</p>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${openTier === key ? "rotate-180" : ""}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-3 space-y-3 pl-4">
                {data.actions?.map((action, index) => (
                  <Card key={index} className="border-l-2">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{action.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{action.description}</p>
                          <div className="flex gap-2">
                            <Badge variant={getImpactColor(action.impact)} className="text-xs">
                              Impact: {action.impact}
                            </Badge>
                            <Badge variant={getEffortColor(action.effort)} className="text-xs">
                              Effort: {action.effort}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
};
