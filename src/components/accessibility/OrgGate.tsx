import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Building2, LogIn } from "lucide-react";
import type { useAccessibilityOrg } from "@/hooks/useAccessibilityOrg";

type Ctx = ReturnType<typeof useAccessibilityOrg>;

export function OrgGate({ ctx, children }: { ctx: Ctx; children: React.ReactNode }) {
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);

  if (ctx.loading) {
    return (
      <div className="flex items-center justify-center py-24 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading workspace…
      </div>
    );
  }

  if (!ctx.userId) {
    return (
      <div className="max-w-md mx-auto mt-12">
        <Card>
          <CardContent className="pt-6 text-center space-y-4">
            <LogIn className="h-10 w-10 mx-auto text-primary" />
            <h2 className="text-xl font-semibold">Sign in required</h2>
            <p className="text-sm text-muted-foreground">
              The Accessibility Layer dashboard requires an account. Sign in through the portal to continue.
            </p>
            <Button asChild><Link to="/portal">Go to sign in</Link></Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!ctx.org) {
    return (
      <div className="max-w-md mx-auto mt-12">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-primary" />
              <div>
                <h2 className="text-lg font-semibold">Create your organization</h2>
                <p className="text-xs text-muted-foreground">One organization can monitor many websites.</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="orgname">Organization name</Label>
              <Input id="orgname" placeholder="Acme Inc." value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            {ctx.error && <p className="text-xs text-destructive">{ctx.error}</p>}
            <Button
              className="w-full"
              disabled={creating || name.trim().length < 2}
              onClick={async () => {
                setCreating(true);
                await ctx.createOrg(name.trim());
                setCreating(false);
              }}
            >
              {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create organization"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}