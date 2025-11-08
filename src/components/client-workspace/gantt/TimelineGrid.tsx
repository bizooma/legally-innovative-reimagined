import { TimelineMarker } from './types';
import { format } from 'date-fns';

interface TimelineGridProps {
  markers: TimelineMarker[];
  todayPosition: number;
  rowHeight: number;
  rowCount: number;
}

export function TimelineGrid({ markers, todayPosition, rowHeight, rowCount }: TimelineGridProps) {
  const totalHeight = rowCount * rowHeight;
  const isToday = todayPosition >= 0 && todayPosition <= 100;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Month dividers */}
      {markers.map((marker, index) => (
        <div
          key={index}
          className="absolute top-0 bottom-0 border-l border-border/30"
          style={{ left: `${marker.position}%` }}
        />
      ))}
      
      {/* Today marker */}
      {isToday && (
        <div
          className="absolute top-0 z-10"
          style={{ left: `${todayPosition}%`, height: `${totalHeight}px` }}
        >
          <div className="relative">
            <div className="absolute w-0.5 bg-destructive" style={{ height: `${totalHeight}px` }} />
            <div className="absolute -left-8 -top-1 bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded whitespace-nowrap">
              Today
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface TimelineHeaderProps {
  markers: TimelineMarker[];
}

export function TimelineHeader({ markers }: TimelineHeaderProps) {
  return (
    <div className="sticky top-0 z-20 bg-muted border-b h-10 flex items-center relative">
      {markers.map((marker, index) => (
        <div
          key={index}
          className="absolute top-0 bottom-0 flex items-center px-2"
          style={{ left: `${marker.position}%` }}
        >
          <span className="text-xs font-medium text-muted-foreground">
            {marker.label}
          </span>
        </div>
      ))}
    </div>
  );
}
