/** Project progress is derived from tasks: completed ÷ total. null when a project has no tasks (shown as "—"). The projects.progress column is left untouched. */
export function deriveProgress(completed: number, total: number): number | null {
  if (!total) return null;
  return Math.round((completed / total) * 100);
}

export function formatProgress(value: number | null | undefined): string {
  return value == null ? "—" : `${value}%`;
}

export const TASK_DONE_STATUS = "completed";
