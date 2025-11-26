import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

interface AuditAccessModalProps {
  onAccessGranted: (code: string) => void;
}

export const AuditAccessModal = ({ onAccessGranted }: AuditAccessModalProps) => {
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    try {
      const { data, error } = await supabase
        .from("audit_access_codes")
        .select("*")
        .eq("code", code.toUpperCase())
        .eq("is_active", true)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        toast({
          title: "Invalid Access Code",
          description: "The code you entered is not valid or has expired.",
          variant: "destructive",
        });
        return;
      }

      // Check expiration
      if (data.expires_at && new Date(data.expires_at) < new Date()) {
        toast({
          title: "Code Expired",
          description: "This access code has expired.",
          variant: "destructive",
        });
        return;
      }

      onAccessGranted(code.toUpperCase());
      toast({
        title: "Access Granted",
        description: `Welcome! Loading audit dashboard for ${data.client_name}`,
      });
    } catch (error) {
      console.error("Error verifying code:", error);
      toast({
        title: "Error",
        description: "Failed to verify access code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">SEO Audit Access</CardTitle>
          <CardDescription>
            Enter your access code to view your comprehensive SEO, AEO, and Voice SEO audit results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accessCode">Access Code</Label>
              <Input
                id="accessCode"
                placeholder="Enter your access code"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="text-center font-mono text-lg tracking-wider"
                maxLength={8}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isVerifying || code.length < 4}>
              {isVerifying ? "Verifying..." : "Access Audit Dashboard"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
