import { Card, CardContent } from "@/components/ui/card";

interface AuditScoreCardProps {
  score: number;
  grade: string;
}

export const AuditScoreCard = ({ score, grade }: AuditScoreCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
      <CardContent className="pt-6">
        <div className="text-center space-y-2">
          <h2 className="text-lg font-medium text-muted-foreground">Overall SEO Score</h2>
          <div className="flex items-center justify-center gap-4">
            <div className={`text-6xl font-bold ${getScoreColor(score)}`}>
              {score}
            </div>
            <div className="text-4xl font-bold text-muted-foreground">/</div>
            <div className="text-4xl font-bold text-muted-foreground">100</div>
          </div>
          <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
            Grade: {grade}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
