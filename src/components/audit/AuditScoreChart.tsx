import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface AuditResult {
  audit_type: string;
  score: number;
}

interface AuditScoreChartProps {
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

export const AuditScoreChart = ({ results }: AuditScoreChartProps) => {
  // Calculate average scores by audit type
  const scoresByType = results.reduce((acc, result) => {
    if (!acc[result.audit_type]) {
      acc[result.audit_type] = { total: 0, count: 0 };
    }
    acc[result.audit_type].total += result.score;
    acc[result.audit_type].count += 1;
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  const chartData = Object.entries(scoresByType).map(([type, data]) => ({
    category: AUDIT_TYPE_LABELS[type] || type,
    score: Math.round(data.total / data.count),
    fill: getColorForScore(Math.round(data.total / data.count))
  }));

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Score Distribution by Category</CardTitle>
        <CardDescription>
          Average performance across different audit types
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="category" 
              stroke="hsl(var(--foreground))"
              tick={{ fill: "hsl(var(--foreground))" }}
            />
            <YAxis 
              domain={[0, 100]} 
              stroke="hsl(var(--foreground))"
              tick={{ fill: "hsl(var(--foreground))" }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
                color: "hsl(var(--popover-foreground))"
              }}
              formatter={(value: number) => [`${value}/100`, "Score"]}
            />
            <Bar dataKey="score" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
