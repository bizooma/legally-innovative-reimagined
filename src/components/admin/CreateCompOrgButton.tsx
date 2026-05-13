import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const CreateCompOrgButton: React.FC = () => {
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("acc-admin-create-comp-org", {
        body: { email, password: password || undefined, orgName },
      });
      if (error || (data as any)?.error) throw new Error((data as any)?.error || error?.message);
      toast({
        title: "Comp organization created",
        description: `${(data as any).organization.name} is active for ${email}.`,
      });
      setOrgName("");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      toast({ title: "Failed", description: err.message ?? String(err), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Comp Accessibility Org</CardTitle>
        <CardDescription>
          Create a free Accessibility Widget organization (bypasses Stripe). If the email
          doesn't have an account yet, a password is required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="comp-org">Organization name</Label>
            <Input id="comp-org" required value={orgName} onChange={(e) => setOrgName(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="comp-email">Owner email</Label>
            <Input id="comp-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="comp-pw">Password (only for new accounts)</Label>
            <Input id="comp-pw" type="text" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating…" : "Create comp organization"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateCompOrgButton;