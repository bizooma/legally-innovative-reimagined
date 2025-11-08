import { useMemo, useState, useEffect, useRef } from 'react';
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
  taskId?: string;
  onDragStart?: (taskId: string, clientX: number) => void;
  onDragMove?: (clientX: number) => void;
  onDragEnd?: () => void;
  dragOffset?: number;
  onResizeStart?: (edge: 'start' | 'end', clientX: number) => void;
  onResizeMove?: (clientX: number) => void;
  onResizeEnd?: () => void;
  resizeOffset?: number;
  isResizing?: boolean;
  resizingEdge?: 'start' | 'end';
}

const PRIORITY_COLORS = {
  low: 'border-l-blue-500',
  medium: 'border-l-yellow-500',
  high: 'border-l-orange-500',
  urgent: 'border-l-red-500',
};

export function GanttBar({ 
  project, 
  position, 
  rowHeight, 
  onClick, 
  isTask = false, 
  priority,
  taskId,
  onDragStart,
  onDragMove,
  onDragEnd,
  dragOffset = 0,
  onResizeStart,
  onResizeMove,
  onResizeEnd,
  resizeOffset = 0,
  isResizing = false,
  resizingEdge,
}: GanttBarProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && isTask) {
        e.preventDefault();
        onDragMove?.(e.clientX);
      } else if (isResizing) {
        e.preventDefault();
        onResizeMove?.(e.clientX);
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        onDragEnd?.();
      } else if (isResizing) {
        onResizeEnd?.();
      }
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = isResizing ? 'ew-resize' : 'grabbing';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, isResizing, onDragMove, onDragEnd, onResizeMove, onResizeEnd, isTask]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isTask && taskId && onDragStart) {
      e.stopPropagation();
      e.preventDefault();
      setIsDragging(true);
      onDragStart(taskId, e.clientX);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isDragging && !isResizing && !isTask) {
      onClick(project);
    }
  };

  const handleResizeMouseDown = (edge: 'start' | 'end') => (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onResizeStart?.(edge, e.clientX);
  };

  if (!position.isVisible) return null;

  const progress = project.progress || 0;
  const barHeightPx = isTask ? Math.floor(rowHeight * 0.5) : Math.floor(rowHeight * 0.6);
  const marginTop = Math.floor((rowHeight - barHeightPx) / 2);

  // Calculate transform based on resize edge and offset
  let transform: string | undefined;
  if (isDragging || dragOffset !== 0) {
    transform = `translateX(${dragOffset}px)`;
  } else if (isResizing && resizingEdge === 'start') {
    transform = `translateX(${resizeOffset}px)`;
  }

  // Calculate width adjustment for resize
  let widthAdjustment = '';
  if (isResizing && resizingEdge === 'end') {
    widthAdjustment = ` + ${resizeOffset}px`;
  } else if (isResizing && resizingEdge === 'start') {
    widthAdjustment = ` - ${resizeOffset}px`;
  }

  const containerStyle = {
    left: position.left,
    width: widthAdjustment ? `calc(${position.width}${widthAdjustment})` : position.width,
    height: `${rowHeight}px`,
    top: 0,
    transform,
  };

  return (
    <div
      ref={barRef}
      className={cn(
        "absolute group transition-transform",
        isTask ? "cursor-grab active:cursor-grabbing" : "cursor-pointer",
        (isDragging || isResizing) && "z-50"
      )}
      style={containerStyle}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "relative rounded overflow-hidden transition-all",
          !isTask && "group-hover:ring-2 group-hover:ring-primary",
          isTask ? "opacity-70 border-l-4 hover:opacity-90" : "",
          isTask && priority ? PRIORITY_COLORS[priority] : "",
          (isDragging || isResizing) && "opacity-60 shadow-xl ring-2 ring-primary",
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

        {/* Resize handles - only show when not a task and when hovered or resizing */}
        {!isTask && onResizeStart && (isHovered || isResizing) && (
          <>
            {/* Left resize handle */}
            <div
              className={cn(
                "absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-primary/30 transition-colors",
                isResizing && resizingEdge === 'start' && "bg-primary/50"
              )}
              onMouseDown={handleResizeMouseDown('start')}
            />
            {/* Right resize handle */}
            <div
              className={cn(
                "absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-primary/30 transition-colors",
                isResizing && resizingEdge === 'end' && "bg-primary/50"
              )}
              onMouseDown={handleResizeMouseDown('end')}
            />
          </>
        )}
      </div>
    </div>
  );
}
