import { Project } from '@/types/database';

export interface GanttProject extends Project {
  start_date: string;
  end_date: string;
}

export interface DateRange {
  start: Date;
  end: Date;
}

export interface BarPosition {
  left: string;
  width: string;
  isVisible: boolean;
}

export interface TimelineMarker {
  date: Date;
  label: string;
  position: number;
}
