
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { sendPortalResetEmail } from '@/lib/portalPasswordReset';

const ForgotPassword = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || sending) return;
    setSending(true);
    try {
      await sendPortalResetEmail(email.trim());
    } catch { /* same confirmation either way */ }
    setSending(false);
    setSent(true);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) { setSent(false); setEmail(''); } }}>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 h-auto text-legal-primary">Forgot password?</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset your password</DialogTitle>
          <DialogDescription>Enter the email you sign in with and we'll send you a reset link.</DialogDescription>
        </DialogHeader>
        {sent ? (
          <p className="text-sm">If an account exists for that address, a reset link is on its way. Check your inbox.</p>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="forgot-email">Email</Label>
              <Input id="forgot-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            </div>
            <Button type="submit" className="w-full" disabled={sending || !email.trim()}>
              {sending ? 'Sending…' : 'Send reset link'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

const LoginFormFooter = () => {
  return (
    <CardFooter className="flex flex-col items-start gap-2">
      <ForgotPassword />
      <p className="text-sm text-muted-foreground">
        Don't have credentials? Contact your account manager for access.
      </p>
      <Button 
        variant="link" 
        className="p-0 h-auto text-legal-primary" 
        onClick={() => window.location.href = "mailto:support@bizooma.com?subject=Portal%20Access%20Request&body=Hello,%0A%0AI'd%20like%20to%20request%20access%20to%20the%20client%20portal.%20Please%20provide%20me%20with%20login%20credentials.%0A%0AThank%20you."}
      >
        Request Access
      </Button>
    </CardFooter>
  );
};

export default LoginFormFooter;
