
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO, addDays } from 'date-fns';
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
}

const ClientGanttChart: React.FC<ClientGanttChartProps> = ({ 
  projects, 
  campaigns = [], 
  isLoading 
}) => {
  // Prepare data for the Gantt chart
  const ganttData = useMemo(() => {
    const items: GanttItem[] = [
      ...projects.map(project => ({
        name: project.name,
        type: 'project' as const,
        id: project.id,
        start: project.start_date ? parseISO(project.start_date) : new Date(),
        end: project.end_date ? parseISO(project.end_date) : addDays(new Date(), 30)
      })),
      ...campaigns.map(campaign => ({
        name: campaign.name,
        type: 'campaign' as const,
        id: campaign.id,
        start: parseISO(campaign.start_date),
        end: parseISO(campaign.end_date)
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

  // Convert data for recharts
  const chartData = useMemo(() => {
    return ganttData.map((item, index) => {
      const startTime = item.start.getTime();
      const endTime = item.end.getTime();
      const duration = endTime - startTime;
      
      return {
        name: item.name,
        type: item.type,
        id: item.id,
        index,
        start: startTime,
        duration,
        fill: item.type === 'project' ? '#9b87f5' : '#f97316'
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
          <p className="text-sm text-muted-foreground">Create projects or campaigns to see them on the timeline</p>
        </CardContent>
      </Card>
    );
  }

  const formatXAxis = (timestamp: number) => {
    return format(new Date(timestamp), 'MMM d');
  };

  const renderTooltipContent = (props: any) => {
    if (!props.active || !props.payload || props.payload.length === 0) {
      return null;
    }
    
    const data = props.payload[0].payload;
    const start = new Date(data.start);
    const end = new Date(data.start + data.duration);

    return (
      <div className="bg-popover text-popover-foreground p-3 shadow-lg rounded-lg border z-50">
        <p className="font-medium text-sm">{data.name}</p>
        <p className="text-xs text-muted-foreground capitalize">{data.type}</p>
        <p className="text-xs mt-1">
          {format(start, 'MMM d, yyyy')} - {format(end, 'MMM d, yyyy')}
        </p>
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
              <Bar 
                dataKey="duration" 
                stackId="a" 
                fill="#9b87f5" 
                radius={4}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center mt-4 text-sm">
          <div className="flex items-center mr-4">
            <div className="w-3 h-3 bg-[#9b87f5] rounded mr-1"></div>
            <span>Projects</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#f97316] rounded mr-1"></div>
            <span>Campaigns</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientGanttChart;
