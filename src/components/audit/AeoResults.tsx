import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";

interface AuditResult {
  id: string;
  category: string;
  item_name: string;
  score: number;
  status: "pass" | "warning" | "fail";
  recommendations: string | null;
  positive_feedback?: string | null;
  details: any;
}

interface AeoResultsProps {
  results: AuditResult[];
}

export const AeoResults = ({ results }: AeoResultsProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case "fail":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "pass":
        return "default";
      case "warning":
        return "secondary";
      case "fail":
        return "destructive";
      default:
        return "outline";
    }
  };

  const categories = [...new Set(results.map(r => r.category))];

  return (
    <div className="space-y-6">
      {categories.length > 0 ? (
        categories.map(category => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="text-xl">{category}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {results
                .filter(r => r.category === category)
                .map(result => (
                  <div key={result.id} className="border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(result.status)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{result.item_name}</h4>
                          <Badge variant={getStatusBadgeVariant(result.status)}>
                            Score: {result.score}/100
                          </Badge>
                        </div>
                        {result.positive_feedback && result.score >= 70 && (
                          <p className="text-sm text-muted-foreground mt-2">
                            <strong className="text-green-600">✓ What you're doing well:</strong> {result.positive_feedback}
                          </p>
                        )}
                        {result.recommendations && (
                          <p className="text-sm text-muted-foreground mt-2">
                            <strong>→ Recommendation:</strong> {result.recommendations}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No AEO audit results available yet.
          </CardContent>
        </Card>
      )}
    </div>
  );
};
