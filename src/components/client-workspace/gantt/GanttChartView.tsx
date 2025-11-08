import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GanttProject, GanttRow } from './types';
import { GanttTable } from './GanttTable';
import { GanttBar } from './GanttBar';
import { TimelineGrid, TimelineHeader } from './TimelineGrid';
import { DateRangeFilter } from './DateRangeFilter';
import { useGanttCalculations, ZoomLevel } from './useGanttCalculations';
import { useExpandedProjects } from './useExpandedProjects';
import { useMultipleProjectTasks } from '@/hooks/useMultipleProjectTasks';
import { useProjectTaskCounts } from '@/hooks/useProjectTaskCounts';
import { useDragTaskDate } from '@/hooks/useDragTaskDate';
import { useResizeGanttBar } from '@/hooks/useResizeGanttBar';
import { addDays, subDays, isWithinInterval, min, max } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, Maximize2, ZoomIn, ZoomOut } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';

interface GanttChartViewProps {
  projects: GanttProject[];
  isLoading?: boolean;
  onProjectClick?: (project: GanttProject) => void;
}

const PROJECT_ROW_HEIGHT = 48;
const TASK_ROW_HEIGHT = 36;

export function GanttChartView({ projects, isLoading, onProjectClick }: GanttChartViewProps) {
  const today = new Date();
  const queryClient = useQueryClient();
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const [dateRange, setDateRange] = useState({
    start: subDays(today, 45),
    end: addDays(today, 45)
  });
  
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>('month');

  // Auto-fit all projects on initial load
  useEffect(() => {
    if (projects.length === 0) return;
    
    const projectsWithDates = projects.filter(p => p.start_date && p.end_date);
    
    if (projectsWithDates.length === 0) return;
    
    // Find earliest start and latest end
    const startDates = projectsWithDates.map(p => new Date(p.start_date));
    const endDates = projectsWithDates.map(p => new Date(p.end_date));
    
    const earliestStart = min(startDates);
    const latestEnd = max(endDates);
    
    // Add a small buffer (7 days on each side)
    const bufferStart = subDays(earliestStart, 7);
    const bufferEnd = addDays(latestEnd, 7);
    
    setDateRange({ start: bufferStart, end: bufferEnd });
  }, [projects]);

  const { expandedProjects, toggleProject, expandAll, collapseAll } = useExpandedProjects();
  const { calculateBarPosition, timelineMarkers, todayPosition } = useGanttCalculations(dateRange, zoomLevel);

  const handleTasksUpdate = () => {
    queryClient.invalidateQueries({ queryKey: ['project_tasks'] });
  };

  const handleProjectsUpdate = () => {
    queryClient.invalidateQueries({ queryKey: ['projects'] });
  };

  const {
    dragState,
    startDrag,
    updateDrag,
    endDrag,
    getDragOffset,
  } = useDragTaskDate(dateRange, handleTasksUpdate);

  const {
    resizeState,
    startResize,
    updateResize,
    endResize,
    getResizeOffset,
  } = useResizeGanttBar();

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

  const handleFitAllProjects = () => {
    // Find all projects with dates
    const projectsWithDates = projects.filter(p => p.start_date && p.end_date);
    
    if (projectsWithDates.length === 0) return;
    
    // Find earliest start and latest end
    const startDates = projectsWithDates.map(p => new Date(p.start_date));
    const endDates = projectsWithDates.map(p => new Date(p.end_date));
    
    const earliestStart = min(startDates);
    const latestEnd = max(endDates);
    
    // Add a small buffer (7 days on each side)
    const bufferStart = subDays(earliestStart, 7);
    const bufferEnd = addDays(latestEnd, 7);
    
    setDateRange({ start: bufferStart, end: bufferEnd });
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
          {/* Zoom Controls */}
          <div className="flex items-center gap-1 border rounded-md p-1">
            <Button
              variant={zoomLevel === 'day' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setZoomLevel('day')}
              className={cn("h-8 px-2", zoomLevel === 'day' && "pointer-events-none")}
            >
              Day
            </Button>
            <Button
              variant={zoomLevel === 'week' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setZoomLevel('week')}
              className={cn("h-8 px-2", zoomLevel === 'week' && "pointer-events-none")}
            >
              Week
            </Button>
            <Button
              variant={zoomLevel === 'month' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setZoomLevel('month')}
              className={cn("h-8 px-2", zoomLevel === 'month' && "pointer-events-none")}
            >
              Month
            </Button>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleFitAllProjects}
            className="gap-2"
          >
            <Maximize2 className="h-4 w-4" />
            Fit All Projects
          </Button>
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
                <div ref={timelineRef} className="relative min-w-full" style={{ height: `${totalHeight}px` }}>
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
                              onResizeStart={(edge, clientX) => {
                                startResize(
                                  row.project!.id,
                                  'project',
                                  edge,
                                  clientX,
                                  row.project!.start_date,
                                  row.project!.end_date
                                );
                              }}
                              onResizeMove={updateResize}
                              onResizeEnd={async () => {
                                const containerWidth = timelineRef.current?.offsetWidth || 1000;
                                await endResize(dateRange.start, dateRange.end, containerWidth);
                                handleProjectsUpdate();
                              }}
                              resizeOffset={resizeState?.itemId === row.project!.id ? getResizeOffset() : 0}
                              isResizing={resizeState?.itemId === row.project!.id && resizeState?.isResizing}
                              resizingEdge={resizeState?.itemId === row.project!.id ? resizeState?.edge : undefined}
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
                              taskId={row.task.id}
                              onDragStart={startDrag}
                              onDragMove={updateDrag}
                              onDragEnd={() => {
                                const containerWidth = timelineRef.current?.offsetWidth || 1000;
                                endDrag(row.task!.due_date!, containerWidth);
                              }}
                              dragOffset={dragState?.taskId === row.task.id ? getDragOffset() : 0}
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
