import { format } from 'date-fns';
import { GanttRow } from '@/components/client-workspace/gantt/types';

interface AdminGanttTableProps {
  rows: GanttRow[];
  projectRowHeight: number;
  taskRowHeight: number;
  taskCounts: Record<string, number>;
}

export function AdminGanttTable({ rows, projectRowHeight, taskRowHeight, taskCounts }: AdminGanttTableProps) {
  return (
    <div className="min-w-[420px] border-r bg-card">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-muted border-b h-10 flex items-center text-xs font-medium text-muted-foreground">
        <div className="w-32 px-3 border-r">Client</div>
        <div className="w-24 px-3 border-r">Start Date</div>
        <div className="w-24 px-3 border-r">End Date</div>
        <div className="flex-1 px-3">Title</div>
      </div>
      
      {/* Rows */}
      <div>
        {rows.map((row, index) => {
          const rowHeight = row.type === 'project' ? projectRowHeight : taskRowHeight;
          
          if (row.type === 'project' && row.project) {
            const project = row.project as any; // Cast to access client_name from ProjectWithClient
            return (
              <div
                key={row.id}
                className="flex items-center border-b text-sm hover:bg-accent/50 transition-colors"
                style={{ height: `${rowHeight}px` }}
              >
                <div className="w-32 px-3 border-r text-xs font-medium truncate" title={project.client_name}>
                  {project.client_name}
                </div>
                <div className="w-24 px-3 border-r text-xs text-muted-foreground">
                  {row.project.start_date ? format(new Date(row.project.start_date), 'MM/dd/yy') : '-'}
                </div>
                <div className="w-24 px-3 border-r text-xs text-muted-foreground">
                  {row.project.end_date ? format(new Date(row.project.end_date), 'MM/dd/yy') : '-'}
                </div>
                <div className="flex-1 px-3 truncate font-medium">
                  {row.project.name}
                </div>
              </div>
            );
          }
          
          return null;
        })}
      </div>
    </div>
  );
}
