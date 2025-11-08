import { useMemo } from 'react';
import { 
  differenceInDays, 
  startOfMonth, 
  endOfMonth, 
  eachMonthOfInterval, 
  eachWeekOfInterval,
  eachDayOfInterval,
  startOfWeek,
  addDays, 
  isBefore, 
  isAfter, 
  isWithinInterval 
} from 'date-fns';
import { BarPosition, TimelineMarker, DateRange } from './types';

export type ZoomLevel = 'day' | 'week' | 'month';

export function useGanttCalculations(dateRange: DateRange, zoomLevel: ZoomLevel = 'month') {
  const totalDays = useMemo(() => 
    differenceInDays(dateRange.end, dateRange.start) + 1, // +1 to include end date
    [dateRange]
  );

  const calculateBarPosition = useMemo(() => 
    (itemStart: Date, itemEnd: Date): BarPosition => {
      // Clamp dates to visible range
      const clampedStart = isBefore(itemStart, dateRange.start) ? dateRange.start : itemStart;
      const clampedEnd = isAfter(itemEnd, dateRange.end) ? dateRange.end : itemEnd;
      
      // Check if visible
      const isVisible = isWithinInterval(clampedStart, { start: dateRange.start, end: dateRange.end }) ||
                       isWithinInterval(clampedEnd, { start: dateRange.start, end: dateRange.end }) ||
                       (isBefore(itemStart, dateRange.start) && isAfter(itemEnd, dateRange.end));
      
      if (!isVisible) {
        return { left: '0%', width: '0%', isVisible: false };
      }
      
      const startOffset = differenceInDays(clampedStart, dateRange.start);
      const duration = differenceInDays(clampedEnd, clampedStart) + 1; // +1 to include end date
      
      const left = (startOffset / totalDays) * 100;
      const width = (duration / totalDays) * 100;
      
      return {
        left: `${Math.max(0, left)}%`,
        width: `${Math.max(0, Math.min(100 - left, width))}%`,
        isVisible: true
      };
    },
    [dateRange, totalDays]
  );

  const timelineMarkers = useMemo((): TimelineMarker[] => {
    if (zoomLevel === 'day') {
      const days = eachDayOfInterval({ start: dateRange.start, end: dateRange.end });
      return days.map(day => {
        const offset = differenceInDays(day, dateRange.start);
        const position = (offset / totalDays) * 100;
        
        return {
          date: day,
          label: day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          position
        };
      });
    } else if (zoomLevel === 'week') {
      const weeks = eachWeekOfInterval(
        { start: dateRange.start, end: dateRange.end },
        { weekStartsOn: 0 } // Start on Sunday
      );
      return weeks.map(week => {
        const weekStart = startOfWeek(week, { weekStartsOn: 0 });
        const offset = differenceInDays(weekStart, dateRange.start);
        const position = (offset / totalDays) * 100;
        
        return {
          date: weekStart,
          label: `Week of ${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
          position
        };
      });
    } else {
      // month view (default)
      const months = eachMonthOfInterval({ start: dateRange.start, end: dateRange.end });
      return months.map(month => {
        const monthStart = startOfMonth(month);
        const offset = differenceInDays(monthStart, dateRange.start);
        const position = (offset / totalDays) * 100;
        
        return {
          date: monthStart,
          label: monthStart.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          position
        };
      });
    }
  }, [dateRange, totalDays, zoomLevel]);

  const todayPosition = useMemo(() => {
    const today = new Date();
    const offset = differenceInDays(today, dateRange.start);
    return (offset / totalDays) * 100;
  }, [dateRange, totalDays]);

  return {
    calculateBarPosition,
    timelineMarkers,
    todayPosition,
    totalDays
  };
}
