import { useMemo } from 'react';
import { GanttProject } from './types';
import { BarPosition } from './types';
import { isBefore, startOfDay } from 'date-fns';
import { cn } from '@/lib/utils';

interface GanttBarProps {
  project: GanttProject;
  position: BarPosition;
  rowHeight: number;
  onClick: (project: GanttProject) => void;
  isTask?: boolean;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}

const PRIORITY_COLORS = {
  low: 'border-l-blue-500',
  medium: 'border-l-yellow-500',
  high: 'border-l-orange-500',
  urgent: 'border-l-red-500',
};

export function GanttBar({ project, position, rowHeight, onClick, isTask = false, priority }: GanttBarProps) {
  const { statusColor, isOverdue } = useMemo(() => {
    const today = startOfDay(new Date());
    const endDate = project.end_date ? startOfDay(new Date(project.end_date)) : today;
    const overdue = isBefore(endDate, today) && project.status !== 'Completed';
    
    let color = 'bg-muted text-muted-foreground';
    
    if (overdue) {
      color = 'bg-destructive/90 text-destructive-foreground';
    } else {
      switch (project.status) {
        case 'Completed':
          color = 'bg-chart-2 text-white';
          break;
        case 'In Progress':
          color = 'bg-chart-1 text-white';
          break;
        case 'On Hold':
          color = 'bg-chart-3 text-white';
          break;
        case 'Not Started':
          color = 'bg-muted text-muted-foreground';
          break;
        default:
          color = 'bg-muted text-muted-foreground';
      }
    }
    
    return { statusColor: color, isOverdue: overdue };
  }, [project.status, project.end_date]);

  if (!position.isVisible) return null;

  const progress = project.progress || 0;
  const barHeightPx = isTask ? Math.floor(rowHeight * 0.5) : Math.floor(rowHeight * 0.6);
  const marginTop = Math.floor((rowHeight - barHeightPx) / 2);

  return (
    <div
      className={cn(
        "absolute group",
        isTask ? "cursor-default" : "cursor-pointer"
      )}
      style={{
        left: position.left,
        width: position.width,
        height: `${rowHeight}px`,
        top: 0
      }}
      onClick={() => !isTask && onClick(project)}
    >
      <div
        className={cn(
          "relative rounded overflow-hidden transition-all",
          !isTask && "group-hover:ring-2 group-hover:ring-primary",
          isTask ? "opacity-70 border-l-4" : "",
          isTask && priority ? PRIORITY_COLORS[priority] : "",
          statusColor
        )}
        style={{
          height: `${barHeightPx}px`,
          marginTop: `${marginTop}px`
        }}
      >
        {/* Progress bar */}
        {!isTask && progress > 0 && project.status !== 'Completed' && (
          <div
            className="absolute top-0 left-0 bottom-0 bg-black/20"
            style={{ width: `${progress}%` }}
          />
        )}
        
        {/* Progress badge - only for projects */}
        {!isTask && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-background text-foreground text-[10px] font-semibold px-1.5 py-0.5 rounded shadow-sm">
            {progress}%
          </div>
        )}
        
        {/* Hover tooltip */}
        <div className={cn(
          "absolute left-2 top-1/2 -translate-y-1/2 text-xs font-medium truncate max-w-full transition-opacity",
          isTask ? "pr-2 text-[10px]" : "pr-12 opacity-0 group-hover:opacity-100"
        )}>
          {project.name}
        </div>
      </div>
    </div>
  );
}
