import { format } from 'date-fns';
import { GanttRow } from './types';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { ProjectTask } from '@/types/task';
import { cn } from '@/lib/utils';

interface GanttTableProps {
  rows: GanttRow[];
  projectRowHeight: number;
  taskRowHeight: number;
  expandedProjects: Set<string>;
  onToggleExpand: (projectId: string) => void;
  tasksByProject: Record<string, ProjectTask[]>;
  taskCounts: Record<string, number>;
}

const PRIORITY_COLORS = {
  low: 'bg-blue-500',
  medium: 'bg-yellow-500',
  high: 'bg-orange-500',
  urgent: 'bg-red-500',
};

export function GanttTable({ 
  rows, 
  projectRowHeight, 
  taskRowHeight,
  expandedProjects,
  onToggleExpand,
  tasksByProject,
  taskCounts,
}: GanttTableProps) {
  return (
    <div className="min-w-[340px] border-r bg-card">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-muted border-b h-10 flex items-center text-xs font-medium text-muted-foreground">
        <div className="w-8 px-2"></div>
        <div className="w-28 px-3 border-r">Start Date</div>
        <div className="w-28 px-3 border-r">End Date</div>
        <div className="flex-1 px-3">Name</div>
      </div>
      
      {/* Rows */}
      <div>
        {rows.map((row) => {
          const rowHeight = row.type === 'project' ? projectRowHeight : taskRowHeight;
          const hasTasks = row.type === 'project' && row.project && (taskCounts[row.project.id] || 0) > 0;
          const isExpanded = row.type === 'project' && row.project && expandedProjects.has(row.project.id);
          
          return (
            <div
              key={row.id}
              className={cn(
                "flex items-center border-b text-sm transition-colors",
                row.type === 'project' ? "hover:bg-accent/50" : "bg-accent/10"
              )}
              style={{ height: `${rowHeight}px` }}
            >
              <div className="w-8 px-2">
                {row.type === 'project' && hasTasks && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => row.project && onToggleExpand(row.project.id)}
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
              
              {row.type === 'project' && row.project && (
                <>
                  <div className="w-28 px-3 border-r text-xs text-muted-foreground">
                    {format(new Date(row.project.start_date), 'MM/dd/yy')}
                  </div>
                  <div className="w-28 px-3 border-r text-xs text-muted-foreground">
                    {format(new Date(row.project.end_date), 'MM/dd/yy')}
                  </div>
                  <div className="flex-1 px-3 truncate font-medium">
                    {row.project.name}
                  </div>
                </>
              )}
              
              {row.type === 'task' && row.task && (
                <>
                  <div className="w-28 px-3 border-r text-xs text-muted-foreground">
                    -
                  </div>
                  <div className="w-28 px-3 border-r text-xs text-muted-foreground">
                    {row.task.due_date ? format(new Date(row.task.due_date), 'MM/dd/yy') : '-'}
                  </div>
                  <div className="flex-1 px-3 flex items-center gap-2">
                    <div className={cn("w-1 h-6 rounded", PRIORITY_COLORS[row.task.priority])} />
                    <span className="truncate text-xs pl-4">{row.task.title}</span>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
