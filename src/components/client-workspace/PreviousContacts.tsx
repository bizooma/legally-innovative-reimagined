import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface Row { id: string; contact_name: string; contact_email: string; replaced_at: string; replaced_by: string | null }

const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

/** Read-only list of superseded contacts, written by a database trigger. */
export function PreviousContacts({ clientId, refreshKey }: { clientId: string; refreshKey: number }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [names, setNames] = useState<Record<string, string>>({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from('client_contact_history')
        .select('id,contact_name,contact_email,replaced_at,replaced_by')
        .eq('client_id', clientId)
        .order('replaced_at', { ascending: false });
      if (error || cancelled) return;
      const list = (data ?? []) as Row[];
      setRows(list);
      const ids = [...new Set(list.map((r) => r.replaced_by).filter(Boolean))] as string[];
      if (ids.length) {
        const { data: users } = await supabase.from('users').select('id,full_name,email').in('id', ids);
        if (!cancelled && users) {
          setNames(Object.fromEntries(users.map((u: any) => [u.id, u.full_name || u.email])));
        }
      }
    })();
    return () => { cancelled = true; };
  }, [clientId, refreshKey]);

  if (rows.length === 0) return null;

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="border-t pt-3">
      <CollapsibleTrigger className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronRight className={`h-4 w-4 transition-transform ${open ? 'rotate-90' : ''}`} />
        Previous contacts ({rows.length})
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          {rows.map((r) => (
            <li key={r.id} className="break-words">
              {r.contact_name} · {r.contact_email} · replaced {fmt(r.replaced_at)}
              {r.replaced_by && names[r.replaced_by] ? ` by ${names[r.replaced_by]}` : ''}
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
