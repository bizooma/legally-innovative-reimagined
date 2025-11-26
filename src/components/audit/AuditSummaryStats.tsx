import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, TrendingUp, BarChart3 } from "lucide-react";

interface AuditResult {
  score: number;
  status: string;
}

interface AuditSummaryStatsProps {
  results: AuditResult[];
}

export const AuditSummaryStats = ({ results }: AuditSummaryStatsProps) => {
  const totalItems = results.length;
  const strengths = results.filter(r => r.score >= 70).length;
  const areasForImprovement = results.filter(r => r.score < 70).length;
  const averageScore = Math.round(results.reduce((sum, r) => sum + r.score, 0) / totalItems);

  const excellentCount = results.filter(r => r.status === 'excellent').length;
  const goodCount = results.filter(r => r.status === 'good').length;
  const needsImprovementCount = results.filter(r => r.status === 'needs_improvement').length;
  const criticalCount = results.filter(r => r.status === 'critical').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="border-green-200 bg-green-50/50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Strengths</p>
              <p className="text-2xl font-bold text-green-700">{strengths}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {excellentCount} excellent, {goodCount} good
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-orange-50/50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Areas to Improve</p>
              <p className="text-2xl font-bold text-orange-700">{areasForImprovement}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {needsImprovementCount} moderate, {criticalCount} critical
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Average Score</p>
              <p className="text-2xl font-bold text-primary">{averageScore}/100</p>
              <p className="text-xs text-muted-foreground mt-1">
                Grade: {averageScore >= 90 ? 'A' : averageScore >= 80 ? 'B' : averageScore >= 70 ? 'C' : averageScore >= 60 ? 'D' : 'F'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 bg-slate-50/50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-slate-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Items</p>
              <p className="text-2xl font-bold text-slate-700">{totalItems}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Across all audits
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
