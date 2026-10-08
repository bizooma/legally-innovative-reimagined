import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export interface InviteClientOpt { id: string; company_name: string; contact_email: string | null }

/** Reads the plain message out of a failed function call. */
async function functionError(error: any): Promise<string> {
  try {
    const body = await error?.context?.json?.();
    if (body?.error) return String(body.error);
  } catch { /* fall through */ }
  return error?.message ?? String(error);
}

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  clients: InviteClientOpt[];
  initial?: { email: string; clientId: string };
  onInvited: () => void;
}

export function InviteClientUserDialog({ open, onOpenChange, clients, initial, onInvited }: Props) {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [clientId, setClientId] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) { setEmail(initial?.email ?? ''); setClientId(initial?.clientId ?? ''); setError(null); }
  }, [open, initial]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !clientId || sending) return;
    setSending(true);
    setError(null);
    const { error: err } = await supabase.functions.invoke('invite-client-user', {
      body: { email: email.trim(), client_id: clientId },
    });
    setSending(false);
    if (err) { setError(await functionError(err)); return; }
    toast({ title: 'Invitation sent', description: email.trim() });
    onOpenChange(false);
    onInvited();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite client user</DialogTitle>
          <DialogDescription>They'll get an email to set their own password, and will only see this client's workspace.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="invite-email">Email</Label>
            <Input id="invite-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="invite-client">Client</Label>
            <Select value={clientId} onValueChange={setClientId}>
              <SelectTrigger id="invite-client"><SelectValue placeholder="Choose a client" /></SelectTrigger>
              <SelectContent>
                {clients.map((c) => <SelectItem key={c.id} value={c.id}>{c.company_name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          {error && <p role="alert" className="text-sm text-destructive">{error}{/already exists/i.test(error) ? ' — use Link to client on their row instead.' : ''}</p>}
          <DialogFooter>
            <Button type="submit" disabled={sending || !email.trim() || !clientId}>{sending ? 'Sending…' : 'Send invitation'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
