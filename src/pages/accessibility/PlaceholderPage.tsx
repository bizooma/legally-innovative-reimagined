import { Card, CardContent } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Card>
        <CardContent className="pt-12 pb-12 text-center">
          <Construction className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-semibold mb-2">Coming next</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            This section is part of the Accessibility Layer roadmap. The schema, RLS, and routing are wired — the UI for this view is being built in the next phase.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}