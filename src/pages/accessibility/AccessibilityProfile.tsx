import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import type { useAccessibilityOrg } from "@/hooks/useAccessibilityOrg";

type Ctx = ReturnType<typeof useAccessibilityOrg>;

export default function AccessibilityProfile() {
  const ctx = useOutletContext<Ctx>();
  const [email, setEmail] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPwd, setSavingPwd] = useState(false);
  const [digestEmail, setDigestEmail] = useState("");
  const [digestFreq, setDigestFreq] = useState("off");
  const [digestLastSent, setDigestLastSent] = useState<string | null>(null);
  const [savingDigest, setSavingDigest] = useState(false);
  const [sendingTest, setSendingTest] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setEmail(data.user.email ?? "");
        setOriginalEmail(data.user.email ?? "");
        setFullName((data.user.user_metadata as any)?.full_name ?? "");
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!ctx.org) return;
    (async () => {
      const { data } = await supabase
        .from("acc_organizations")
        .select("digest_email, digest_frequency, digest_last_sent_at")
        .eq("id", ctx.org!.id)
        .maybeSingle();
      if (data) {
        setDigestEmail((data as any).digest_email ?? "");
        setDigestFreq((data as any).digest_frequency ?? "off");
        setDigestLastSent((data as any).digest_last_sent_at ?? null);
      }
    })();
  }, [ctx.org?.id]);

  const saveDigest = async () => {
    if (!ctx.org) return;
    setSavingDigest(true);
    const payload: any = {
      digest_email: digestEmail.trim() || null,
      digest_frequency: digestFreq,
    };
    const { error } = await supabase.from("acc_organizations").update(payload).eq("id", ctx.org.id);
    setSavingDigest(false);
    if (error) return toast({ title: "Save failed", description: error.message, variant: "destructive" });
    toast({ title: "Digest preferences saved" });
  };

  const sendTestDigest = async () => {
    if (!ctx.org) return;
    setSendingTest(true);
    // Force a send by clearing last_sent_at then invoking
    await supabase.from("acc_organizations").update({ digest_last_sent_at: null }).eq("id", ctx.org.id);
    const { data, error } = await supabase.functions.invoke("acc-send-digests", { body: {} });
    setSendingTest(false);
    if (error) return toast({ title: "Test failed", description: error.message, variant: "destructive" });
    toast({ title: "Digest dispatched", description: `Processed ${data?.processed ?? 0} org(s). Check your inbox shortly.` });
  };

  const saveProfile = async () => {
    setSavingProfile(true);
    const emailChanged = email && email !== originalEmail;
    const payload: { email?: string; data: { full_name: string } } = { data: { full_name: fullName } };
    if (emailChanged) payload.email = email;
    const { error } = await supabase.auth.updateUser(payload);
    setSavingProfile(false);
    if (error) return toast({ title: "Update failed", description: error.message, variant: "destructive" });
    toast({
      title: "Profile updated",
      description: emailChanged
        ? "Check your inbox at the new address to confirm the change."
        : "Saved.",
    });
  };

  const changePassword = async () => {
    if (newPassword.length < 8) return toast({ title: "Password too short", description: "Use at least 8 characters.", variant: "destructive" });
    setSavingPwd(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setSavingPwd(false);
    if (error) return toast({ title: "Password change failed", description: error.message, variant: "destructive" });
    setNewPassword("");
    toast({ title: "Password updated" });
  };

  if (loading) return <div className="flex items-center justify-center py-12"><Loader2 className="h-5 w-5 animate-spin" /></div>;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-sm text-muted-foreground">Manage your account details and password.</p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-semibold">Account</h3>
          <div className="space-y-2">
            <Label htmlFor="full_name">Full name</Label>
            <Input id="full_name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <Button onClick={saveProfile} disabled={savingProfile}>
            {savingProfile && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}Save changes
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-semibold">Change password</h3>
          <div className="space-y-2">
            <Label htmlFor="new_password">New password</Label>
            <Input id="new_password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="At least 8 characters" />
          </div>
          <Button onClick={changePassword} disabled={savingPwd || !newPassword}>
            {savingPwd && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}Update password
          </Button>
        </CardContent>
      </Card>

      {ctx.org && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div>
              <h3 className="font-semibold">Email digests</h3>
              <p className="text-xs text-muted-foreground">Periodic summary of accessibility scores, new issues, and resolutions across your websites.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Recipient email</Label>
                <Input type="email" value={digestEmail} onChange={(e) => setDigestEmail(e.target.value)} placeholder="you@company.com" />
              </div>
              <div className="space-y-2">
                <Label>Frequency</Label>
                <Select value={digestFreq} onValueChange={setDigestFreq}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="off">Off</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {digestLastSent && (
              <p className="text-xs text-muted-foreground">Last sent {new Date(digestLastSent).toLocaleString()}</p>
            )}
            <div className="flex gap-2">
              <Button onClick={saveDigest} disabled={savingDigest}>
                {savingDigest && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}Save digest settings
              </Button>
              <Button variant="outline" onClick={sendTestDigest} disabled={sendingTest || digestFreq === "off" || !digestEmail.trim()}>
                {sendingTest && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}Send now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}