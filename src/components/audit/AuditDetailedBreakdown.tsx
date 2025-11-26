import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuditResult {
  audit_type: string;
  category: string;
  item_name: string;
  score: number;
  status: string;
}

interface AuditDetailedBreakdownProps {
  results: AuditResult[];
}

const AUDIT_TYPE_LABELS: Record<string, string> = {
  local_seo: "Local SEO",
  aeo: "AEO",
  voice_seo: "Voice SEO",
  gbp: "GBP Analysis"
};

const getColorForScore = (score: number) => {
  if (score >= 90) return "hsl(var(--chart-1))"; // Green
  if (score >= 80) return "hsl(var(--chart-2))"; // Blue
  if (score >= 70) return "hsl(var(--chart-3))"; // Yellow
  if (score >= 60) return "hsl(var(--chart-4))"; // Orange
  return "hsl(var(--chart-5))"; // Red
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-popover-foreground mb-1">{data.item}</p>
        <p className="text-sm text-muted-foreground">Category: {data.category}</p>
        <p className="text-sm font-medium mt-1">Score: {data.score}/100</p>
        <p className="text-xs text-muted-foreground capitalize mt-1">Status: {data.status}</p>
      </div>
    );
  }
  return null;
};

export const AuditDetailedBreakdown = ({ results }: AuditDetailedBreakdownProps) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const groupByAuditType = (auditType: string) => {
    const filtered = results.filter(r => r.audit_type === auditType);
    const categories = Array.from(new Set(filtered.map(r => r.category)));
    
    return categories.map(category => {
      const categoryResults = filtered.filter(r => r.category === category);
      return {
        category,
        items: categoryResults.map(r => ({
          item: r.item_name,
          score: r.score,
          status: r.status,
          category: r.category,
          fill: getColorForScore(r.score)
        }))
      };
    });
  };

  const renderCategoryBreakdown = (auditType: string) => {
    const categoryGroups = groupByAuditType(auditType);
    
    if (categoryGroups.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          No results available for this audit type
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {categoryGroups.map(({ category, items }) => {
          const isExpanded = expandedCategories.has(`${auditType}-${category}`);
          const avgScore = Math.round(items.reduce((sum, item) => sum + item.score, 0) / items.length);
          
          return (
            <Card key={`${auditType}-${category}`} className="border-muted">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {category}
                      <span className="text-sm font-normal text-muted-foreground">
                        ({items.length} items)
                      </span>
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Average Score: {avgScore}/100
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleCategory(`${auditType}-${category}`)}
                    className="ml-4"
                  >
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              
              {isExpanded && (
                <CardContent>
                  <ResponsiveContainer width="100%" height={Math.max(300, items.length * 40)}>
                    <BarChart
                      data={items}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        type="number" 
                        domain={[0, 100]}
                        stroke="hsl(var(--foreground))"
                        tick={{ fill: "hsl(var(--foreground))" }}
                      />
                      <YAxis 
                        type="category" 
                        dataKey="item"
                        width={200}
                        stroke="hsl(var(--foreground))"
                        tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                        {items.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Detailed Item Breakdown</CardTitle>
        <CardDescription>
          Expand categories to view individual item scores and drill down into specific findings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="local_seo" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="local_seo">Local SEO</TabsTrigger>
            <TabsTrigger value="aeo">AEO</TabsTrigger>
            <TabsTrigger value="voice_seo">Voice SEO</TabsTrigger>
            <TabsTrigger value="gbp">GBP</TabsTrigger>
          </TabsList>

          <TabsContent value="local_seo" className="mt-6">
            {renderCategoryBreakdown("local_seo")}
          </TabsContent>

          <TabsContent value="aeo" className="mt-6">
            {renderCategoryBreakdown("aeo")}
          </TabsContent>

          <TabsContent value="voice_seo" className="mt-6">
            {renderCategoryBreakdown("voice_seo")}
          </TabsContent>

          <TabsContent value="gbp" className="mt-6">
            {renderCategoryBreakdown("gbp")}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
