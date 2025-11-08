import { Project } from '@/types/database';
import { ProjectTask } from '@/types/task';

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

export type GanttRowType = 'project' | 'task';

export interface GanttRow {
  id: string;
  type: GanttRowType;
  project?: GanttProject;
  task?: ProjectTask;
  projectId?: string;
  level: number;
}
