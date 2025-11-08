import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GanttProject } from './types';
import { GanttTable } from './GanttTable';
import { GanttBar } from './GanttBar';
import { TimelineGrid, TimelineHeader } from './TimelineGrid';
import { DateRangeFilter } from './DateRangeFilter';
import { useGanttCalculations } from './useGanttCalculations';
import { addDays, subDays, isWithinInterval } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';

interface GanttChartViewProps {
  projects: GanttProject[];
  isLoading?: boolean;
  onProjectClick?: (project: GanttProject) => void;
}

const ROW_HEIGHT = 44;

export function GanttChartView({ projects, isLoading, onProjectClick }: GanttChartViewProps) {
  const today = new Date();
  const [dateRange, setDateRange] = useState({
    start: subDays(today, 45),
    end: addDays(today, 45)
  });

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

  const handleRangeChange = (start: Date, end: Date) => {
    setDateRange({ start, end });
  };

  const handleProjectClick = (project: GanttProject) => {
    onProjectClick?.(project);
  };

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
      <CardContent className="p-0">
        <div className="border rounded-lg overflow-hidden mx-6 mb-6">
          <div className="flex">
            {/* Left: Table Section */}
            <GanttTable projects={visibleProjects} rowHeight={ROW_HEIGHT} />
            
            {/* Right: Timeline Section */}
            <div className="flex-1 overflow-hidden">
              <TimelineHeader markers={timelineMarkers} />
              
              <ScrollArea className="h-[500px]">
                <div className="relative min-w-full" style={{ height: `${visibleProjects.length * ROW_HEIGHT}px` }}>
                  {/* Background grid */}
                  <TimelineGrid
                    markers={timelineMarkers}
                    todayPosition={todayPosition}
                    rowHeight={ROW_HEIGHT}
                    rowCount={visibleProjects.length}
                  />
                  
                  {/* Row backgrounds */}
                  {visibleProjects.map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        "absolute left-0 right-0 border-b",
                        index % 2 === 0 ? "bg-card" : "bg-accent/20"
                      )}
                      style={{
                        top: `${index * ROW_HEIGHT}px`,
                        height: `${ROW_HEIGHT}px`
                      }}
                    />
                  ))}
                  
                  {/* Project bars */}
                  {visibleProjects.map((project, index) => {
                    const position = calculateBarPosition(
                      new Date(project.start_date),
                      new Date(project.end_date)
                    );
                    
                    return (
                      <div
                        key={project.id}
                        className="absolute left-0 right-0"
                        style={{
                          top: `${index * ROW_HEIGHT}px`,
                          height: `${ROW_HEIGHT}px`
                        }}
                      >
                        <GanttBar
                          project={project}
                          position={position}
                          rowHeight={ROW_HEIGHT}
                          onClick={handleProjectClick}
                        />
                      </div>
                    );
                  })}
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
