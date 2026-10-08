import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { format } from 'date-fns';
import { Check, Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useTimeTracker } from '@/hooks/useTimeTracker';
import { TASK_DONE_STATUS } from '@/lib/projectProgress';

interface TodayTask {
  id: string;
  title: string;
  status: string;
  due_date: string | null;
  project_id: string;
  order_index: number;
  created_at: string;
}
interface ProjectOption { id: string; name: string; client_id: string; client_name: string }

const LAST_PROJECT_KEY = 'today_last_project';
const ACTIVE_STATUSES = ['in_progress', 'review'];
const localDay = (iso: string) => format(new Date(iso), 'yyyy-MM-dd');

function readLastProject(): string {
  try { return localStorage.getItem(LAST_PROJECT_KEY) || ''; } catch { return ''; }
}
function writeLastProject(id: string) {
  try { localStorage.setItem(LAST_PROJECT_KEY, id); } catch { /* ignore */ }
}

export function TodaySection({ hideHeading = false }: { hideHeading?: boolean } = {}) {
  const { toast } = useToast();
  const { startTimer, isRunning } = useTimeTracker();
  const [tasks, setTasks] = useState<TodayTask[]>([]);
  const [projects, setProjects] = useState<ProjectOption[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState('');
  const [projectId, setProjectId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [saving, setSaving] = useState(false);
  const [doneIds, setDoneIds] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    const [{ data: p }, { data: t }] = await Promise.all([
      supabase.from('projects').select('id, name, client_id, clients(company_name)').order('name'),
      supabase.from('project_tasks').select('id, title, status, due_date, project_id, order_index, created_at').neq('status', TASK_DONE_STATUS),
    ]);
    const opts = (p || []).map((x: any) => ({ id: x.id, name: x.name, client_id: x.client_id, client_name: x.clients?.company_name ?? '' }));
    setProjects(opts);
    setTasks((t || []) as TodayTask[]);
    setProjectId((cur) => {
      if (cur && opts.some((o) => o.id === cur)) return cur;
      const last = readLastProject();
      return opts.some((o) => o.id === last) ? last : opts[0]?.id ?? '';
    });
    setLoaded(true);
  }, []);

  useEffect(() => { load(); }, [load]);

  const byProject = useMemo(() => Object.fromEntries(projects.map((p) => [p.id, p])), [projects]);

  const groups = useMemo(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const used = new Set<string>();
    const take = (list: TodayTask[]) => { list.forEach((t) => used.add(t.id)); return list; };
    const byDue = (a: TodayTask, b: TodayTask) => (a.due_date ?? '').localeCompare(b.due_date ?? '');
    const overdue = take(tasks.filter((t) => t.due_date && localDay(t.due_date) < today).sort(byDue));
    const dueToday = take(tasks.filter((t) => !used.has(t.id) && t.due_date && localDay(t.due_date) === today));
    const active = take(tasks.filter((t) => !used.has(t.id) && ACTIVE_STATUSES.includes(t.status)).sort(byDue));
    const rest = tasks.filter((t) => !used.has(t.id));
    const dated = rest.filter((t) => t.due_date).sort(byDue);
    const undated = rest.filter((t) => !t.due_date).sort((a, b) => (b.created_at ?? '').localeCompare(a.created_at ?? ''));
    const next = [...dated, ...undated].slice(0, 5);
    return [
      { label: 'Overdue', items: overdue },
      { label: 'Due today', items: dueToday },
      { label: 'In progress', items: active },
      { label: 'Next up', items: next },
    ].filter((g) => g.items.length > 0);
  }, [tasks]);

  const errMessage = (err: unknown) =>
    (err && typeof err === 'object' && 'message' in err && (err as any).message) ? String((err as any).message) : String(err);

  const markDone = async (task: TodayTask) => {
    if (!task?.id) {
      toast({ title: 'Error', description: 'This task has no id, so it cannot be updated.', variant: 'destructive' });
      return;
    }
    setDoneIds((prev) => new Set(prev).add(task.id));
    try {
      const { data, error } = await supabase
        .from('project_tasks')
        .update({ status: TASK_DONE_STATUS })
        .eq('id', task.id)
        .select('id');
      if (error) throw error;
      if (!data || data.length === 0) throw new Error('No task was updated — you may not have permission to change this task.');
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
      load();
    } catch (err) {
      console.error('[Today] mark done failed', err);
      toast({ title: 'Error', description: errMessage(err), variant: 'destructive' });
    } finally {
      setDoneIds((prev) => { const n = new Set(prev); n.delete(task.id); return n; });
    }
  };

  const start = (task: TodayTask) => {
    try {
      const project = byProject[task.project_id];
      if (!project) throw new Error('This task\'s project could not be found.');
      if (!project.client_id) throw new Error('This task\'s project has no client, so the timer cannot start.');
      startTimer(project.client_id, task.title, project.id, task.id);
      toast({ title: 'Timer started', description: task.title });
    } catch (err) {
      console.error('[Today] start timer failed', err);
      toast({ title: 'Error', description: errMessage(err), variant: 'destructive' });
    }
  };

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const t = title.trim();
    if (!t || !projectId || saving) return;
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');
      const orderIndex = tasks.filter((x) => x.project_id === projectId).reduce((m, x) => Math.max(m, x.order_index + 1), 0);
      const { data, error } = await supabase
        .from('project_tasks')
        .insert({
          title: t,
          project_id: projectId,
          status: 'idea',
          priority: 'medium',
          order_index: orderIndex,
          due_date: dueDate ? new Date(`${dueDate}T00:00:00`).toISOString() : null,
          created_by: user.id,
        })
        .select('id, title, status, due_date, project_id, order_index, created_at')
        .single();
      if (error) throw error;
      setTasks((prev) => [...prev, data as TodayTask]);
      writeLastProject(projectId);
      toast({ title: 'Task added' });
      setTitle('');
      setDueDate('');
    } catch (err: any) {
      toast({ title: 'Error', description: errMessage(err), variant: 'destructive' });
    } finally {
      setSaving(false);
      inputRef.current?.focus();
    }
  };

  return (
    <section className="mb-8">
      {!hideHeading && <h2 className="text-2xl font-playfair font-bold mb-4">Today</h2>}
      <form onSubmit={addTask} className="flex flex-wrap items-center gap-2 mb-4">
        <Input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task…"
          aria-label="Add a task"
          className="flex-1 min-w-[200px]"
          disabled={projects.length === 0 && loaded}
        />
        <Select value={projectId} onValueChange={setProjectId}>
          <SelectTrigger className="w-52" aria-label="Project"><SelectValue placeholder="Project" /></SelectTrigger>
          <SelectContent>
            {projects.map((p) => (
              <SelectItem key={p.id} value={p.id}>{p.client_name ? `${p.client_name} · ${p.name}` : p.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} aria-label="Due date (optional)" className="w-40" />
        <Button type="submit" disabled={!title.trim() || !projectId || saving}>Add</Button>
      </form>

      {loaded && groups.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nothing scheduled. Add something below.</p>
      ) : (
        <div className="space-y-4">
          {groups.map((g) => (
            <div key={g.label}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{g.label}</h3>
              <Card className="divide-y">
                {g.items.map((t) => {
                  const p = byProject[t.project_id];
                  return (
                    <div key={t.id} className="flex items-center gap-3 px-3 py-2 text-sm">
                      <div className="min-w-0 flex-1 truncate">
                        <span className="text-muted-foreground">{p?.client_name || '—'} · {p?.name || '—'} · </span>
                        <span className="font-medium">{t.title}</span>
                      </div>
                      <span className={`shrink-0 text-xs ${g.label === 'Overdue' ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {t.due_date ? format(new Date(t.due_date), 'MMM d') : ''}
                      </span>
                      <Button size="sm" variant="ghost" className="h-7 px-2" onClick={() => markDone(t)} disabled={doneIds.has(t.id)}>
                        <Check className="w-4 h-4 mr-1" />Done
                      </Button>
                      <Button size="sm" variant="ghost" className="h-7 px-2" onClick={() => start(t)} disabled={isRunning || !p}>
                        <Play className="w-4 h-4 mr-1" />Start
                      </Button>
                    </div>
                  );
                })}
              </Card>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
