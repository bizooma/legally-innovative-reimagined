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
}

export function GanttBar({ project, position, rowHeight, onClick }: GanttBarProps) {
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
  const barHeightPx = Math.floor(rowHeight * 0.6);
  const marginTop = Math.floor((rowHeight - barHeightPx) / 2);

  return (
    <div
      className="absolute cursor-pointer group"
      style={{
        left: position.left,
        width: position.width,
        height: `${rowHeight}px`,
        top: 0
      }}
      onClick={() => onClick(project)}
    >
      <div
        className={cn(
          "relative rounded overflow-hidden transition-all group-hover:ring-2 group-hover:ring-primary",
          statusColor
        )}
        style={{
          height: `${barHeightPx}px`,
          marginTop: `${marginTop}px`
        }}
      >
        {/* Progress bar */}
        {progress > 0 && project.status !== 'Completed' && (
          <div
            className="absolute top-0 left-0 bottom-0 bg-black/20"
            style={{ width: `${progress}%` }}
          />
        )}
        
        {/* Progress badge */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-background text-foreground text-[10px] font-semibold px-1.5 py-0.5 rounded shadow-sm">
          {progress}%
        </div>
        
        {/* Hover tooltip */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-medium truncate pr-12 max-w-full opacity-0 group-hover:opacity-100 transition-opacity">
          {project.name}
        </div>
      </div>
    </div>
  );
}
