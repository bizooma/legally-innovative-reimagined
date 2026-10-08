import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { usePortal } from '@/components/portal-shell/PortalLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { sendPortalResetEmail } from '@/lib/portalPasswordReset';
import { InviteClientUserDialog } from './InviteClientUserDialog';

interface UserRow { id: string; email: string; full_name: string | null; is_admin: boolean; created_at: string; client_id: string | null }
interface ClientOpt { id: string; company_name: string; contact_email: string | null }

const UNLINK = '__unlink__';
const isPortalUser = (u: UserRow) => u.is_admin || !!u.client_id;
const errText = (e: any) => e?.message ?? String(e);

export const UsersView = () => {
  const { user: me } = usePortal();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [clients, setClients] = useState<ClientOpt[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [confirmAdmin, setConfirmAdmin] = useState<UserRow | null>(null);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [invitePrefill, setInvitePrefill] = useState<{ email: string; clientId: string } | undefined>();
  const openInvite = (prefill?: { email: string; clientId: string }) => { setInvitePrefill(prefill); setInviteOpen(true); };

  const load = useCallback(async () => {
    setLoading(true);
    const [u, c] = await Promise.all([
      supabase.from('users').select('id, email, full_name, is_admin, created_at, client_id').order('created_at', { ascending: false }),
      supabase.from('clients').select('id, company_name, contact_email').order('company_name'),
    ]);
    if (u.error || c.error) setLoadError(errText(u.error || c.error));
    else {
      setLoadError(null);
      setUsers((u.data || []) as UserRow[]);
      setClients((c.data || []) as ClientOpt[]);
    }
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const clientName = useMemo(() => Object.fromEntries(clients.map((c) => [c.id, c.company_name])), [clients]);
  const portalCount = users.filter(isPortalUser).length;
  const visible = showAll ? users : users.filter(isPortalUser);
  const linkedClientIds = new Set(users.map((u) => u.client_id).filter(Boolean));
  const unlinkedClients = clients.filter((c) => !linkedClientIds.has(c.id));

  const update = async (u: UserRow, patch: Partial<UserRow>, done: string) => {
    setBusy(u.id);
    try {
      const { data, error } = await supabase.from('users').update(patch).eq('id', u.id).select('id, email, full_name, is_admin, created_at, client_id');
      if (error) throw error;
      if (!data || data.length === 0) throw new Error('No user was updated — you may not have permission to change this user.');
      setUsers((prev) => prev.map((x) => (x.id === u.id ? (data[0] as UserRow) : x)));
      toast({ title: done });
    } catch (e) {
      toast({ title: 'Error', description: errText(e), variant: 'destructive' });
    } finally {
      setBusy(null);
    }
  };

  const sendReset = async (u: UserRow) => {
    setBusy(u.id);
    const { error } = await sendPortalResetEmail(u.email);
    setBusy(null);
    if (error) toast({ title: 'Error', description: errText(error), variant: 'destructive' });
    else toast({ title: 'Reset email sent', description: u.email });
  };

  if (loading) return <p className="text-sm text-muted-foreground">Loading users…</p>;
  if (loadError) return <p className="text-sm text-destructive">Could not load users: {loadError}</p>;

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter users">
          <Button size="sm" variant={showAll ? 'outline' : 'default'} onClick={() => setShowAll(false)} aria-pressed={!showAll}>
            Portal users ({portalCount})
          </Button>
          <Button size="sm" variant={showAll ? 'default' : 'outline'} onClick={() => setShowAll(true)} aria-pressed={showAll}>
            All users ({users.length})
          </Button>
          <Button size="sm" variant="secondary" className="ml-auto" onClick={() => openInvite()}>Invite client user</Button>
        </div>

        <Card className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Linked client</TableHead>
                <TableHead>Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-sm text-muted-foreground">No users in this view.</TableCell></TableRow>
              )}
              {visible.map((u) => {
                const isMe = u.id === me?.id;
                const role = u.is_admin ? 'Admin' : u.client_id ? 'Client' : '—';
                const adminBtn = (
                  <Button size="sm" variant="ghost" disabled={isMe || busy === u.id} onClick={() => setConfirmAdmin(u)}>
                    {u.is_admin ? 'Remove admin' : 'Make admin'}
                  </Button>
                );
                return (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.email}</TableCell>
                    <TableCell>{u.full_name && u.full_name !== u.email ? u.full_name : '—'}</TableCell>
                    <TableCell>{role}</TableCell>
                    <TableCell>{u.client_id ? clientName[u.client_id] ?? '—' : '—'}</TableCell>
                    <TableCell className="whitespace-nowrap">{format(new Date(u.created_at), 'MMM d, yyyy')}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap items-center justify-end gap-1">
                        <Select
                          value={u.client_id ?? ''}
                          onValueChange={(v) => v === UNLINK
                            ? update(u, { client_id: null }, 'User unlinked from client')
                            : update(u, { client_id: v }, `Linked to ${clientName[v] ?? 'client'}`)}
                          disabled={busy === u.id}
                        >
                          <SelectTrigger className="h-8 w-44" aria-label={`Link ${u.email} to client`}>
                            <SelectValue placeholder="Link to client…" />
                          </SelectTrigger>
                          <SelectContent>
                            {clients.map((c) => <SelectItem key={c.id} value={c.id}>{c.company_name}</SelectItem>)}
                            {u.client_id && <SelectItem value={UNLINK}>Unlink</SelectItem>}
                          </SelectContent>
                        </Select>
                        <Button size="sm" variant="ghost" disabled={busy === u.id} onClick={() => sendReset(u)}>Send reset email</Button>
                        {isMe ? (
                          <Tooltip>
                            <TooltipTrigger asChild><span tabIndex={0}>{adminBtn}</span></TooltipTrigger>
                            <TooltipContent>You can't change your own admin role, so you can't lock yourself out.</TooltipContent>
                          </Tooltip>
                        ) : adminBtn}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>

        {unlinkedClients.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Clients with no linked user yet — that's normal. Invite one when they need portal access, or link an existing account above.
            </p>
            <Card className="divide-y">
              {unlinkedClients.map((c) => (
                <div key={c.id} className="flex flex-wrap items-center gap-3 px-3 py-2 text-sm">
                  <span className="font-medium flex-1 min-w-0 truncate">{c.company_name}</span>
                  <span className="text-muted-foreground truncate">{c.contact_email || 'No contact email'}</span>
                  <Button size="sm" variant="outline" onClick={() => openInvite({ email: c.contact_email ?? '', clientId: c.id })}>Invite</Button>
                </div>
              ))}
            </Card>
          </div>
        )}

        <InviteClientUserDialog open={inviteOpen} onOpenChange={setInviteOpen} clients={clients} initial={invitePrefill} onInvited={load} />

        <AlertDialog open={!!confirmAdmin} onOpenChange={(o) => !o && setConfirmAdmin(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{confirmAdmin?.is_admin ? 'Remove admin access?' : 'Make admin?'}</AlertDialogTitle>
              <AlertDialogDescription>
                {confirmAdmin?.is_admin
                  ? `${confirmAdmin?.email} will lose access to the admin portal.`
                  : `${confirmAdmin?.email} will get full access to the admin portal and every client's data.`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => {
                const u = confirmAdmin;
                setConfirmAdmin(null);
                if (u && u.id !== me?.id) update(u, { is_admin: !u.is_admin }, u.is_admin ? 'Admin removed' : 'Admin granted');
              }}>
                {confirmAdmin?.is_admin ? 'Remove admin' : 'Make admin'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  );
};
