import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { deriveProgress, TASK_DONE_STATUS } from '@/lib/projectProgress';

/** Derived progress per project id: completed tasks ÷ total tasks, or null when the project has no tasks. */
export function useProjectProgress(projectIds: string[], refreshKey: unknown = 0) {
  const [progress, setProgress] = useState<Record<string, number | null>>({});
  const key = JSON.stringify([...projectIds].sort());

  useEffect(() => {
    if (projectIds.length === 0) { setProgress({}); return; }
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from('project_tasks')
        .select('project_id, status')
        .in('project_id', projectIds);
      if (cancelled) return;
      if (error) { console.error('Error fetching task progress:', error); return; }
      const totals: Record<string, { done: number; total: number }> = {};
      (data || []).forEach((t) => {
        const r = (totals[t.project_id] ||= { done: 0, total: 0 });
        r.total += 1;
        if (t.status === TASK_DONE_STATUS) r.done += 1;
      });
      const out: Record<string, number | null> = {};
      projectIds.forEach((id) => { out[id] = deriveProgress(totals[id]?.done ?? 0, totals[id]?.total ?? 0); });
      setProgress(out);
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, refreshKey]);

  return progress;
}
