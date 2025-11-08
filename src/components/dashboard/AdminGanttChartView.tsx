import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AdminGanttTable } from './AdminGanttTable';
import { AdminGanttFilters } from './AdminGanttFilters';
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
  const [selectedClient, setSelectedClient] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { calculateBarPosition, timelineMarkers, todayPosition } = useGanttCalculations(dateRange);

  // Get unique clients for filter dropdown
  const uniqueClients = useMemo(() => {
    const clientMap = new Map<string, string>();
    projects.forEach(project => {
      if (!clientMap.has(project.client_id)) {
        clientMap.set(project.client_id, project.client_name);
      }
    });
    return Array.from(clientMap.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [projects]);

  // Filter projects by date range, client, status, and search query
  const visibleProjects = useMemo(() => {
    return projects.filter(project => {
      const projectStart = new Date(project.start_date);
      const projectEnd = new Date(project.end_date);
      
      // Date range filter - project must overlap with the date range
      const inDateRange = projectStart <= dateRange.end && projectEnd >= dateRange.start;
      if (!inDateRange) return false;
      
      // Client filter
      if (selectedClient !== 'all' && project.client_id !== selectedClient) {
        return false;
      }
      
      // Status filter
      if (selectedStatus !== 'all' && project.status !== selectedStatus) {
        return false;
      }
      
      // Search filter - search in project name and client name
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = project.name.toLowerCase().includes(query);
        const matchesClient = project.client_name.toLowerCase().includes(query);
        return matchesName || matchesClient;
      }
      
      return true;
    });
  }, [projects, dateRange, selectedClient, selectedStatus, searchQuery]);

  const handleProjectClick = (project: ProjectWithClient) => {
    navigate(`/portal/client-details/${project.client_id}?tab=projects`);
  };

  const handleRangeChange = (start: Date, end: Date) => {
    setDateRange({ start, end });
  };

  const handleClearFilters = () => {
    setSelectedClient('all');
    setSelectedStatus('all');
    setSearchQuery('');
  };

  const handleSearchChange = (value: string) => {
    // Sanitize input - limit length and trim
    const sanitized = value.slice(0, 100).trim();
    setSearchQuery(sanitized);
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

  const hasProjects = projects.length > 0;
  const hasVisibleProjects = visibleProjects.length > 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle>Master Project Timeline</CardTitle>
          <DateRangeFilter
            startDate={dateRange.start}
            endDate={dateRange.end}
            onRangeChange={handleRangeChange}
          />
        </div>
        <AdminGanttFilters
          clients={uniqueClients}
          selectedClient={selectedClient}
          selectedStatus={selectedStatus}
          searchQuery={searchQuery}
          onClientChange={setSelectedClient}
          onStatusChange={setSelectedStatus}
          onSearchChange={handleSearchChange}
          onClearFilters={handleClearFilters}
        />
      </CardHeader>
      <CardContent className="p-0">
        {!hasProjects ? (
          <div className="flex items-center justify-center h-64 border-t">
            <p className="text-muted-foreground">No projects with dates found</p>
          </div>
        ) : !hasVisibleProjects ? (
          <div className="flex items-center justify-center h-64 border-t">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">No projects match your filters</p>
              <Button variant="outline" size="sm" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </CardContent>
    </Card>
  );
}
