import { format } from 'date-fns';
import { GanttProject } from './types';

interface GanttTableProps {
  projects: GanttProject[];
  rowHeight: number;
}

export function GanttTable({ projects, rowHeight }: GanttTableProps) {
  return (
    <div className="min-w-[320px] border-r bg-card">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-muted border-b h-10 flex items-center text-xs font-medium text-muted-foreground">
        <div className="w-24 px-3 border-r">Start Date</div>
        <div className="w-24 px-3 border-r">End Date</div>
        <div className="flex-1 px-3">Title</div>
      </div>
      
      {/* Rows */}
      <div>
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="flex items-center border-b text-sm hover:bg-accent/50 transition-colors"
            style={{ height: `${rowHeight}px` }}
          >
            <div className="w-24 px-3 border-r text-xs text-muted-foreground">
              {project.start_date ? format(new Date(project.start_date), 'MM/dd/yy') : '-'}
            </div>
            <div className="w-24 px-3 border-r text-xs text-muted-foreground">
              {project.end_date ? format(new Date(project.end_date), 'MM/dd/yy') : '-'}
            </div>
            <div className="flex-1 px-3 truncate font-medium">
              {project.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
