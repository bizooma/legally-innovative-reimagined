import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle } from "lucide-react";

interface AuditExecutiveSummaryProps {
  strengths?: string | null;
  gaps?: string | null;
}

export const AuditExecutiveSummary = ({ strengths, gaps }: AuditExecutiveSummaryProps) => {
  if (!strengths && !gaps) return null;

  const parseIntoList = (text: string | null | undefined): string[] => {
    if (!text) return [];
    return text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => line.replace(/^[•\-\*]\s*/, ''));
  };

  const strengthsList = parseIntoList(strengths);
  const gapsList = parseIntoList(gaps);

  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📋</span>
          Executive Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {strengthsList.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-lg">What's Working</h3>
            </div>
            <ul className="space-y-2">
              {strengthsList.map((strength, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  <span className="text-muted-foreground">{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {gapsList.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <h3 className="font-semibold text-lg">What Needs Attention</h3>
            </div>
            <ul className="space-y-2">
              {gapsList.map((gap, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-amber-600 font-bold">•</span>
                  <span className="text-muted-foreground">{gap}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
