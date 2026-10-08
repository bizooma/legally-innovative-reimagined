import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const contactSchema = z.object({
  contact_name: z.string().trim().min(1, 'Contact name is required').max(200),
  contact_email: z.string().trim().min(1, 'Contact email is required').email('Enter a valid email address').max(255),
  contact_phone: z.string().trim().max(50).optional(),
});

export interface ContactValues { contact_name: string; contact_email: string; contact_phone: string | null }
interface LinkedUser { id: string; email: string; full_name: string | null }

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
  clientId: string;
  current: ContactValues;
  onSaved: (v: ContactValues) => void;
}

export function EditContactDialog({ open, onOpenChange, clientId, current, onSaved }: Props) {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState<'form' | 'confirm'>('form');
  const [linked, setLinked] = useState<LinkedUser[]>([]);
  const [removeIds, setRemoveIds] = useState<string[]>([]);
  const [invite, setInvite] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setName(current.contact_name ?? '');
      setEmail(current.contact_email ?? '');
      setPhone(current.contact_phone ?? '');
      setErrors({}); setStep('form'); setLinked([]); setRemoveIds([]); setInvite(false); setError(null);
    }
  }, [open, current]);

  const parsed = () => contactSchema.safeParse({ contact_name: name, contact_email: email, contact_phone: phone });

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    const r = parsed();
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({}); setError(null);
    const emailChanged = r.data.contact_email.toLowerCase() !== (current.contact_email ?? '').trim().toLowerCase();
    if (emailChanged) {
      setBusy(true);
      const { data, error: err } = await supabase.from('users').select('id,email,full_name').eq('client_id', clientId);
      setBusy(false);
      if (err) { setError(err.message); return; }
      if (data && data.length > 0) { setLinked(data as LinkedUser[]); setStep('confirm'); return; }
    }
    await save();
  };

  const save = async () => {
    const r = parsed();
    if (!r.success) { setStep('form'); return; }
    const values: ContactValues = {
      contact_name: r.data.contact_name,
      contact_email: r.data.contact_email,
      contact_phone: r.data.contact_phone ? r.data.contact_phone : null,
    };
    setBusy(true); setError(null);
    const { data, error: err } = await supabase.from('clients').update(values).eq('id', clientId).select('id');
    if (err) { setBusy(false); setError(err.message); return; }
    if (!data || data.length === 0) { setBusy(false); setError('No client was updated — you may not have permission to edit this client.'); return; }
    onSaved(values);

    const problems: string[] = [];
    for (const id of removeIds) {
      const u = linked.find((l) => l.id === id);
      const { error: rErr } = await supabase.from('users').update({ client_id: null }).eq('id', id).select('id');
      if (rErr) problems.push(`Could not remove access for ${u?.full_name || u?.email}: ${rErr.message}`);
    }
    if (invite) {
      const { error: iErr } = await supabase.functions.invoke('invite-client-user', {
        body: { email: values.contact_email, client_id: clientId },
      });
      if (iErr) {
        const msg = await functionError(iErr);
        problems.push(`Contact updated, but the invitation could not be sent: ${msg}${/already exists/i.test(msg) ? ' — link their existing account from the Users screen instead.' : ''}`);
      }
    }
    setBusy(false);
    if (problems.length) {
      setError(problems.join(' '));
      toast({ title: 'Contact updated, with problems', description: problems.join(' '), variant: 'destructive' });
      return;
    }
    toast({ title: 'Contact updated', description: invite ? `Invitation sent to ${values.contact_email}` : undefined });
    onOpenChange(false);
  };

  const label = (u: LinkedUser) => u.full_name || u.email;

  return (
    <Dialog open={open} onOpenChange={(o) => !busy && onOpenChange(o)}>
      <DialogContent>
        {step === 'form' ? (
          <>
            <DialogHeader>
              <DialogTitle>Edit contact</DialogTitle>
              <DialogDescription>The previous contact is kept in this client's history.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleContinue} className="space-y-4" noValidate>
              <div className="space-y-2">
                <Label htmlFor="ec-name">Contact name</Label>
                <Input id="ec-name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.contact_name} />
                {errors.contact_name && <p className="text-sm text-destructive">{errors.contact_name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="ec-email">Contact email</Label>
                <Input id="ec-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.contact_email} />
                {errors.contact_email && <p className="text-sm text-destructive">{errors.contact_email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="ec-phone">Phone <span className="text-muted-foreground">(optional)</span></Label>
                <Input id="ec-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={busy}>Cancel</Button>
                <Button type="submit" disabled={busy}>{busy ? 'Saving…' : 'Save'}</Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Portal access</DialogTitle>
              <DialogDescription>
                {linked.map(label).join(', ')} still {linked.length > 1 ? 'have' : 'has'} access to this client's portal. Changing the contact does not remove it.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {linked.map((u) => (
                <label key={u.id} className="flex items-start gap-3 text-sm">
                  <Checkbox
                    checked={removeIds.includes(u.id)}
                    onCheckedChange={(c) => setRemoveIds((ids) => c ? [...ids, u.id] : ids.filter((i) => i !== u.id))}
                  />
                  <span>
                    Remove {label(u)}'s access
                    <span className="block text-muted-foreground">Removes their access to this client's data. Their login stays intact — this is not an account deletion.</span>
                  </span>
                </label>
              ))}
              <label className="flex items-start gap-3 text-sm">
                <Checkbox checked={invite} onCheckedChange={(c) => setInvite(!!c)} />
                <span>Invite {email.trim()} to the portal</span>
              </label>
              {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setStep('form')} disabled={busy}>Back</Button>
              <Button type="button" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save contact'}</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
