
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { format, parseISO, addDays, isBefore, startOfDay } from 'date-fns';
import { ProjectWithDates } from '@/hooks/useClientProjectsWithDates';

interface GanttItem {
  name: string;
  type: 'project' | 'campaign';
  id: string;
  start: Date;
  end: Date;
}

interface ClientGanttChartProps {
  projects: ProjectWithDates[];
  campaigns?: any[]; // Will be typed properly when campaigns are implemented
  isLoading: boolean;
  onProjectClick?: (project: ProjectWithDates) => void;
}

const ClientGanttChart: React.FC<ClientGanttChartProps> = ({ 
  projects, 
  campaigns = [], 
  isLoading,
  onProjectClick 
}) => {
  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'hsl(var(--chart-1))'; // Green
      case 'In Progress':
        return 'hsl(var(--chart-2))'; // Blue
      case 'On Hold':
        return 'hsl(var(--chart-3))'; // Yellow
      case 'Not Started':
        return 'hsl(var(--muted))'; // Gray
      default:
        return 'hsl(var(--muted))';
    }
  };

  // Prepare data for the Gantt chart
  const ganttData = useMemo(() => {
    const items: (GanttItem & { status: string; progress: number })[] = [
      ...projects
        .filter(project => project.start_date && project.end_date) // Only show projects with dates
        .map(project => ({
          name: project.name,
          type: 'project' as const,
          id: project.id,
          start: parseISO(project.start_date!),
          end: parseISO(project.end_date!),
          status: project.status,
          progress: project.progress
        })),
      ...campaigns.map(campaign => ({
        name: campaign.name,
        type: 'campaign' as const,
        id: campaign.id,
        start: parseISO(campaign.start_date),
        end: parseISO(campaign.end_date),
        status: 'In Progress',
        progress: 50
      }))
    ];

    // Sort by start date
    return items.sort((a, b) => a.start.getTime() - b.start.getTime());
  }, [projects, campaigns]);

  // Find the min and max dates for the chart
  const { minDate, maxDate } = useMemo(() => {
    if (ganttData.length === 0) {
      const now = new Date();
      return {
        minDate: now,
        maxDate: addDays(now, 30)
      };
    }

    return ganttData.reduce((acc, item) => {
      return {
        minDate: item.start < acc.minDate ? item.start : acc.minDate,
        maxDate: item.end > acc.maxDate ? item.end : acc.maxDate
      };
    }, { minDate: ganttData[0].start, maxDate: ganttData[0].end });
  }, [ganttData]);

  // Convert data for recharts with progress visualization
  const chartData = useMemo(() => {
    return ganttData.map((item, index) => {
      const startTime = item.start.getTime();
      const endTime = item.end.getTime();
      const totalDuration = endTime - startTime;
      const completedDuration = (totalDuration * item.progress) / 100;
      const remainingDuration = totalDuration - completedDuration;
      const isOverdue = isBefore(item.end, startOfDay(new Date())) && item.status !== 'Completed';
      
      return {
        name: item.name,
        type: item.type,
        id: item.id,
        index,
        start: startTime,
        completedDuration,
        remainingDuration,
        status: item.status,
        progress: item.progress,
        end: endTime,
        isOverdue,
        statusColor: getStatusColor(item.status)
      };
    });
  }, [ganttData]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center">
          <p>Loading timeline data...</p>
        </CardContent>
      </Card>
    );
  }

  if (ganttData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
        </CardHeader>
        <CardContent className="h-64 flex flex-col items-center justify-center">
          <p className="text-muted-foreground">No timeline data available</p>
          <p className="text-sm text-muted-foreground">Add start and end dates to projects to see them on the timeline</p>
        </CardContent>
      </Card>
    );
  }

  const today = new Date().getTime();

  const formatXAxis = (timestamp: number) => {
    return format(new Date(timestamp), 'MMM d');
  };

  const handleBarClick = (data: any) => {
    if (data && data.type === 'project' && onProjectClick) {
      const project = projects.find(p => p.id === data.id);
      if (project) {
        onProjectClick(project);
      }
    }
  };

  const renderTooltipContent = (props: any) => {
    if (!props.active || !props.payload || props.payload.length === 0) {
      return null;
    }
    
    const data = props.payload[0].payload;
    const start = new Date(data.start);
    const end = new Date(data.end);

    return (
      <div className="bg-popover text-popover-foreground p-3 shadow-lg rounded-lg border z-50">
        <p className="font-medium text-sm">{data.name}</p>
        <p className="text-xs text-muted-foreground capitalize mb-2">{data.type}</p>
        <div className="space-y-1">
          <p className="text-xs">
            <span className="font-medium">Status:</span> {data.status}
          </p>
          <p className="text-xs">
            <span className="font-medium">Progress:</span> {data.progress}%
          </p>
          <p className="text-xs">
            {format(start, 'MMM d, yyyy')} - {format(end, 'MMM d, yyyy')}
          </p>
          {data.isOverdue && (
            <p className="text-xs text-destructive font-medium">⚠️ Overdue</p>
          )}
        </div>
        {onProjectClick && data.type === 'project' && (
          <p className="text-xs text-muted-foreground mt-2 italic">Click to edit</p>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              barGap={0}
              barCategoryGap={10}
              margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
            >
              <XAxis 
                type="number" 
                domain={[minDate.getTime(), maxDate.getTime()]} 
                tickFormatter={formatXAxis}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={90} 
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                content={renderTooltipContent}
                cursor={{ fill: 'rgba(155, 135, 245, 0.1)' }}
                wrapperStyle={{ 
                  zIndex: 1000,
                  pointerEvents: 'none',
                  visibility: 'visible'
                }}
                allowEscapeViewBox={{ x: false, y: false }}
                isAnimationActive={false}
                position={{ x: 0, y: 0 }}
              />
              {/* Today's date indicator */}
              <ReferenceLine 
                x={today} 
                stroke="hsl(var(--destructive))" 
                strokeWidth={2}
                strokeDasharray="3 3"
                label={{ value: 'Today', position: 'top', fill: 'hsl(var(--destructive))' }}
              />
              {/* Completed portion of the bar */}
              <Bar 
                dataKey="completedDuration" 
                stackId="a" 
                radius={[4, 0, 0, 4]}
                isAnimationActive={false}
                onClick={handleBarClick}
                cursor={onProjectClick ? "pointer" : "default"}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`completed-${index}`} 
                    fill={entry.isOverdue ? 'hsl(var(--destructive))' : entry.statusColor}
                    opacity={0.9}
                  />
                ))}
              </Bar>
              {/* Remaining portion of the bar */}
              <Bar 
                dataKey="remainingDuration" 
                stackId="a" 
                radius={[0, 4, 4, 0]}
                isAnimationActive={false}
                onClick={handleBarClick}
                cursor={onProjectClick ? "pointer" : "default"}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`remaining-${index}`} 
                    fill={entry.isOverdue ? 'hsl(var(--destructive))' : entry.statusColor}
                    opacity={0.3}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center mt-4 gap-4 text-xs flex-wrap">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(var(--muted))' }}></div>
            <span>Not Started</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(var(--chart-2))' }}></div>
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(var(--chart-3))' }}></div>
            <span>On Hold</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(var(--chart-1))' }}></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(var(--destructive))' }}></div>
            <span>Overdue</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientGanttChart;
