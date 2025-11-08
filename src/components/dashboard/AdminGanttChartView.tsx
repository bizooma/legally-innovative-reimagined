import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminGanttTable } from './AdminGanttTable';
import { GanttBar } from '@/components/client-workspace/gantt/GanttBar';
import { TimelineGrid, TimelineHeader } from '@/components/client-workspace/gantt/TimelineGrid';
import { DateRangeFilter } from '@/components/client-workspace/gantt/DateRangeFilter';
import { useGanttCalculations } from '@/components/client-workspace/gantt/useGanttCalculations';
import { DateRange } from '@/components/client-workspace/gantt/types';
import { ProjectWithClient } from '@/hooks/useAllProjectsWithClients';
import { addDays, subDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface AdminGanttChartViewProps {
  projects: ProjectWithClient[];
  isLoading?: boolean;
}

const ROW_HEIGHT = 48;

export function AdminGanttChartView({ projects, isLoading }: AdminGanttChartViewProps) {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<DateRange>({
    start: subDays(new Date(), 30),
    end: addDays(new Date(), 60),
  });

  const { calculateBarPosition, timelineMarkers, todayPosition } = useGanttCalculations(dateRange);

  // Filter projects that overlap with the current date range
  const visibleProjects = useMemo(() => {
    return projects.filter(project => {
      const projectStart = new Date(project.start_date);
      const projectEnd = new Date(project.end_date);
      
      // Project is visible if it overlaps with the date range
      return projectStart <= dateRange.end && projectEnd >= dateRange.start;
    });
  }, [projects, dateRange]);

  const handleProjectClick = (project: ProjectWithClient) => {
    navigate(`/portal/client-details/${project.client_id}?tab=projects`);
  };

  const handleRangeChange = (start: Date, end: Date) => {
    setDateRange({ start, end });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Master Project Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (projects.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Master Project Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">No projects with dates found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Master Project Timeline</CardTitle>
          <DateRangeFilter
            startDate={dateRange.start}
            endDate={dateRange.end}
            onRangeChange={handleRangeChange}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex border-t overflow-hidden">
          {/* Left: Data Table */}
          <AdminGanttTable projects={visibleProjects} rowHeight={ROW_HEIGHT} />
          
          {/* Right: Timeline */}
          <div className="flex-1 overflow-x-auto">
            <TimelineHeader markers={timelineMarkers} />
            
            <div className="relative">
              <TimelineGrid
                markers={timelineMarkers}
                todayPosition={todayPosition}
                rowCount={visibleProjects.length}
                rowHeight={ROW_HEIGHT}
              />
              
              {/* Project Bars */}
              <div className="relative" style={{ minHeight: `${visibleProjects.length * ROW_HEIGHT}px` }}>
                {visibleProjects.map((project, index) => {
                  const position = calculateBarPosition(
                    new Date(project.start_date),
                    new Date(project.end_date)
                  );
                  
                  return (
                    <GanttBar
                      key={project.id}
                      project={project}
                      position={position}
                      rowHeight={ROW_HEIGHT}
                      onClick={handleProjectClick}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex items-center gap-6 px-6 py-4 border-t bg-muted/50 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-muted border" />
            <span>Not Started</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-chart-1" />
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-chart-2" />
            <span>On Hold</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-chart-3" />
            <span>Completed</span>
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
