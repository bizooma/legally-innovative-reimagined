import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GanttProject, GanttRow } from './types';
import { GanttTable } from './GanttTable';
import { GanttBar } from './GanttBar';
import { TimelineGrid, TimelineHeader } from './TimelineGrid';
import { DateRangeFilter } from './DateRangeFilter';
import { useGanttCalculations } from './useGanttCalculations';
import { useExpandedProjects } from './useExpandedProjects';
import { useMultipleProjectTasks } from '@/hooks/useMultipleProjectTasks';
import { useProjectTaskCounts } from '@/hooks/useProjectTaskCounts';
import { addDays, subDays, isWithinInterval } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface GanttChartViewProps {
  projects: GanttProject[];
  isLoading?: boolean;
  onProjectClick?: (project: GanttProject) => void;
}

const PROJECT_ROW_HEIGHT = 48;
const TASK_ROW_HEIGHT = 36;

export function GanttChartView({ projects, isLoading, onProjectClick }: GanttChartViewProps) {
  const today = new Date();
  const [dateRange, setDateRange] = useState({
    start: subDays(today, 45),
    end: addDays(today, 45)
  });

  const { expandedProjects, toggleProject, expandAll, collapseAll } = useExpandedProjects();
  const { calculateBarPosition, timelineMarkers, todayPosition } = useGanttCalculations(dateRange);

  // Filter projects within date range
  const visibleProjects = useMemo(() => {
    return projects.filter(project => {
      if (!project.start_date || !project.end_date) return false;
      
      const start = new Date(project.start_date);
      const end = new Date(project.end_date);
      
      return isWithinInterval(start, { start: dateRange.start, end: dateRange.end }) ||
             isWithinInterval(end, { start: dateRange.start, end: dateRange.end }) ||
             (start < dateRange.start && end > dateRange.end);
    });
  }, [projects, dateRange]);

  const visibleProjectIds = useMemo(() => visibleProjects.map(p => p.id), [visibleProjects]);
  const { taskCounts } = useProjectTaskCounts(visibleProjectIds);

  const expandedProjectIds = useMemo(() => 
    visibleProjects.filter(p => expandedProjects.has(p.id)).map(p => p.id),
    [visibleProjects, expandedProjects]
  );

  const { tasksByProject } = useMultipleProjectTasks(expandedProjectIds);

  // Build flat list of rows (projects + their tasks)
  const ganttRows = useMemo((): GanttRow[] => {
    const rows: GanttRow[] = [];
    
    visibleProjects.forEach(project => {
      rows.push({
        id: project.id,
        type: 'project',
        project,
        level: 0,
      });

      if (expandedProjects.has(project.id)) {
        const tasks = tasksByProject[project.id] || [];
        tasks.forEach(task => {
          rows.push({
            id: task.id,
            type: 'task',
            task,
            projectId: project.id,
            level: 1,
          });
        });
      }
    });

    return rows;
  }, [visibleProjects, expandedProjects, tasksByProject]);

  const handleRangeChange = (start: Date, end: Date) => {
    setDateRange({ start, end });
  };

  const handleProjectClick = (project: GanttProject) => {
    onProjectClick?.(project);
  };

  const handleExpandAll = () => {
    expandAll(visibleProjects.map(p => p.id));
  };

  const handleCollapseAll = () => {
    collapseAll();
  };

  const totalHeight = ganttRows.reduce((sum, row) => 
    sum + (row.type === 'project' ? PROJECT_ROW_HEIGHT : TASK_ROW_HEIGHT), 0
  );

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Project Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            Loading timeline...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (visibleProjects.length === 0) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Project Timeline</CardTitle>
          <DateRangeFilter
            startDate={dateRange.start}
            endDate={dateRange.end}
            onRangeChange={handleRangeChange}
          />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            No projects found in the selected date range
          </div>
        </CardContent>
      </Card>
    );
  }

  const hasAnyTasks = Object.keys(tasksByProject).some(pid => tasksByProject[pid].length > 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Project Timeline</CardTitle>
        <div className="flex items-center gap-2">
          {hasAnyTasks && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExpandAll}
              >
                Expand All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCollapseAll}
              >
                Collapse All
              </Button>
            </>
          )}
          <DateRangeFilter
            startDate={dateRange.start}
            endDate={dateRange.end}
            onRangeChange={handleRangeChange}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="border rounded-lg overflow-hidden mx-6 mb-6">
          <div className="flex">
            {/* Left: Table Section */}
            <GanttTable 
              rows={ganttRows}
              projectRowHeight={PROJECT_ROW_HEIGHT}
              taskRowHeight={TASK_ROW_HEIGHT}
              expandedProjects={expandedProjects}
              onToggleExpand={toggleProject}
              tasksByProject={tasksByProject}
              taskCounts={taskCounts}
            />
            
            {/* Right: Timeline Section */}
            <div className="flex-1 overflow-hidden">
              <TimelineHeader markers={timelineMarkers} />
              
              <ScrollArea className="h-[500px]">
                <div className="relative min-w-full" style={{ height: `${totalHeight}px` }}>
                  {/* Background grid */}
                  <TimelineGrid
                    markers={timelineMarkers}
                    todayPosition={todayPosition}
                    rows={ganttRows}
                    projectRowHeight={PROJECT_ROW_HEIGHT}
                    taskRowHeight={TASK_ROW_HEIGHT}
                  />
                  
                  {/* Row backgrounds and bars */}
                  {(() => {
                    let currentTop = 0;
                    return ganttRows.map((row, index) => {
                      const rowHeight = row.type === 'project' ? PROJECT_ROW_HEIGHT : TASK_ROW_HEIGHT;
                      const top = currentTop;
                      currentTop += rowHeight;

                      return (
                        <div key={row.id} className="absolute left-0 right-0" style={{ top: `${top}px`, height: `${rowHeight}px` }}>
                          <div
                            className={cn(
                              "absolute left-0 right-0 border-b h-full",
                              row.type === 'task' ? "bg-accent/10" : index % 2 === 0 ? "bg-card" : "bg-accent/20"
                            )}
                          />
                          
                          {row.type === 'project' && row.project && (
                            <GanttBar
                              project={row.project}
                              position={calculateBarPosition(
                                new Date(row.project.start_date),
                                new Date(row.project.end_date)
                              )}
                              rowHeight={rowHeight}
                              onClick={handleProjectClick}
                              isTask={false}
                            />
                          )}
                          
                          {row.type === 'task' && row.task && row.task.due_date && row.projectId && (
                            <GanttBar
                              project={{
                                ...visibleProjects.find(p => p.id === row.projectId)!,
                                name: row.task.title,
                                end_date: row.task.due_date,
                                status: row.task.status === 'completed' ? 'Completed' : 
                                        row.task.status === 'in_progress' ? 'In Progress' : 'Not Started',
                                progress: row.task.status === 'completed' ? 100 : 0,
                              }}
                              position={calculateBarPosition(
                                new Date(visibleProjects.find(p => p.id === row.projectId)!.start_date),
                                new Date(row.task.due_date)
                              )}
                              rowHeight={rowHeight}
                              onClick={() => {}}
                              isTask={true}
                              priority={row.task.priority}
                            />
                          )}
                        </div>
                      );
                    });
                  })()}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 px-6 pb-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-chart-1" />
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-chart-2" />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-chart-3" />
            <span>On Hold</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-muted" />
            <span>Not Started</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-destructive/90" />
            <span>Overdue</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
