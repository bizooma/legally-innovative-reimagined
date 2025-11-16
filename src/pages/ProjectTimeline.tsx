import React, { useState, useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAllProjectsWithClients } from '@/hooks/useAllProjectsWithClients';
import { useDragProjectDate } from '@/hooks/useDragProjectDate';
import { useResizeGanttBar } from '@/hooks/useResizeGanttBar';
import { useGanttCalculations } from '@/components/client-workspace/gantt/useGanttCalculations';
import { TimelineGrid, TimelineHeader } from '@/components/client-workspace/gantt/TimelineGrid';
import { AdminGanttFilters } from '@/components/dashboard/AdminGanttFilters';
import { addDays, subDays, format, differenceInDays } from 'date-fns';
import { ProjectStatusBadge } from '@/components/client-workspace/ProjectStatusBadge';
import { ChevronDown, ChevronRight, Calendar, Maximize2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const ROW_HEIGHT = 48;
const RESIZE_HANDLE_WIDTH = 8;

const ProjectTimeline = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const timelineRef = useRef<HTMLDivElement>(null);
  const { projects, isLoading } = useAllProjectsWithClients();
  
  const [dateRange, setDateRange] = useState({
    start: subDays(new Date(), 30),
    end: addDays(new Date(), 60),
  });
  const [selectedClient, setSelectedClient] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [groupByClient, setGroupByClient] = useState(true);
  const [expandedClients, setExpandedClients] = useState<Set<string>>(new Set());

  const { calculateBarPosition, timelineMarkers, todayPosition } = useGanttCalculations(dateRange, 'month');

  const handleProjectsUpdate = () => {
    queryClient.invalidateQueries({ queryKey: ['projects'] });
  };

  const {
    dragState,
    startDrag,
    updateDrag,
    endDrag,
    getDragOffset,
  } = useDragProjectDate(dateRange, handleProjectsUpdate);

  const {
    resizeState,
    startResize,
    updateResize,
    endResize,
    getResizeOffset,
  } = useResizeGanttBar();

  // Get unique clients
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

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const projectStart = new Date(project.start_date);
      const projectEnd = new Date(project.end_date);
      
      const inDateRange = projectStart <= dateRange.end && projectEnd >= dateRange.start;
      if (!inDateRange) return false;
      
      if (selectedClient !== 'all' && project.client_id !== selectedClient) return false;
      if (selectedStatus !== 'all' && project.status !== selectedStatus) return false;
      
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        return project.name.toLowerCase().includes(query) || 
               project.client_name.toLowerCase().includes(query);
      }
      
      return true;
    });
  }, [projects, dateRange, selectedClient, selectedStatus, searchQuery]);

  // Group projects by client
  const projectsByClient = useMemo(() => {
    const grouped = new Map<string, typeof filteredProjects>();
    filteredProjects.forEach(project => {
      const clientProjects = grouped.get(project.client_id) || [];
      grouped.set(project.client_id, [...clientProjects, project]);
    });
    return grouped;
  }, [filteredProjects]);

  const toggleClientExpansion = (clientId: string) => {
    setExpandedClients(prev => {
      const newSet = new Set(prev);
      if (newSet.has(clientId)) {
        newSet.delete(clientId);
      } else {
        newSet.add(clientId);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    setExpandedClients(new Set(uniqueClients.map(c => c.id)));
  };

  const collapseAll = () => {
    setExpandedClients(new Set());
  };

  const handleClearFilters = () => {
    setSelectedClient('all');
    setSelectedStatus('all');
    setSearchQuery('');
  };

  const handleAutoFit = () => {
    if (filteredProjects.length === 0) return;
    
    const startDates = filteredProjects.map(p => new Date(p.start_date));
    const endDates = filteredProjects.map(p => new Date(p.end_date));
    
    const minStart = new Date(Math.min(...startDates.map(d => d.getTime())));
    const maxEnd = new Date(Math.max(...endDates.map(d => d.getTime())));
    
    setDateRange({
      start: subDays(minStart, 7),
      end: addDays(maxEnd, 7),
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragState?.isDragging) {
      updateDrag(e.clientX);
    }
    if (resizeState?.isResizing) {
      updateResize(e.clientX);
    }
  };

  const handleMouseUp = () => {
    if (dragState?.isDragging && timelineRef.current) {
      endDrag(timelineRef.current.offsetWidth);
    }
    if (resizeState?.isResizing && timelineRef.current) {
      endResize(dateRange.start, dateRange.end, timelineRef.current.offsetWidth);
    }
  };

  const renderProjectBar = (project: any, rowIndexNum: number) => {
    const position = calculateBarPosition(
      new Date(project.start_date),
      new Date(project.end_date)
    );

    const isDragging = dragState?.projectId === project.id;
    const isResizing = resizeState?.itemId === project.id;
    const dragOffset = isDragging ? getDragOffset() : 0;
    const resizeOffset = isResizing ? getResizeOffset() : 0;

    const getStatusColor = () => {
      switch (project.status) {
        case 'Completed':
          return 'bg-green-500 hover:bg-green-600';
        case 'In Progress':
          return 'bg-blue-500 hover:bg-blue-600';
        case 'On Hold':
          return 'bg-yellow-500 hover:bg-yellow-600';
        default:
          return 'bg-gray-400 hover:bg-gray-500';
      }
    };

    // Parse percentage strings to numbers for calculations
    let adjustedLeft = parseFloat(position.left);
    let adjustedWidth = parseFloat(position.width);

    // Convert pixel offsets to percentage offsets
    if (timelineRef.current) {
      const containerWidth = timelineRef.current.offsetWidth;
      const dragPercentage = (dragOffset / containerWidth) * 100;
      const resizePercentage = (resizeOffset / containerWidth) * 100;

      if (isDragging) {
        adjustedLeft += dragPercentage;
      }

      if (isResizing) {
        if (resizeState.edge === 'start') {
          adjustedLeft += resizePercentage;
          adjustedWidth -= resizePercentage;
        } else {
          adjustedWidth += resizePercentage;
        }
      }
    }

    return (
      <div
        key={project.id}
        className={`absolute h-8 rounded-md ${getStatusColor()} cursor-move flex items-center px-2 text-white text-xs font-medium shadow-md transition-opacity group ${
          isDragging || isResizing ? 'opacity-70 z-50' : 'hover:opacity-90'
        }`}
        style={{
          left: `${adjustedLeft}%`,
          width: `${adjustedWidth}%`,
          top: `${rowIndexNum * ROW_HEIGHT + 8}px`,
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          startDrag(project.id, e.clientX, project.start_date, project.end_date);
        }}
        onClick={() => navigate(`/portal/client/${project.client_id}`)}
      >
        {/* Resize handle - start */}
        <div
          className="absolute left-0 top-0 h-full w-2 cursor-ew-resize hover:bg-white/30 opacity-0 group-hover:opacity-100"
          onMouseDown={(e) => {
            e.stopPropagation();
            startResize(project.id, 'project', 'start', e.clientX, project.start_date, project.end_date);
          }}
        />
        
        <span className="truncate flex-1 select-none">
          {project.name}
        </span>
        
        {/* Resize handle - end */}
        <div
          className="absolute right-0 top-0 h-full w-2 cursor-ew-resize hover:bg-white/30 opacity-0 group-hover:opacity-100"
          onMouseDown={(e) => {
            e.stopPropagation();
            startResize(project.id, 'project', 'end', e.clientX, project.start_date, project.end_date);
          }}
        />
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Project Timeline</h1>
            <p className="text-muted-foreground">
              Visual timeline of all projects across clients. Drag to move, resize to adjust dates.
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Timeline View</CardTitle>
                  <CardDescription>
                    {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} shown
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleAutoFit}>
                    <Maximize2 className="h-4 w-4 mr-2" />
                    Auto Fit
                  </Button>
                  {groupByClient && (
                    <>
                      <Button variant="outline" size="sm" onClick={expandAll}>
                        Expand All
                      </Button>
                      <Button variant="outline" size="sm" onClick={collapseAll}>
                        Collapse All
                      </Button>
                    </>
                  )}
                  <Button
                    variant={groupByClient ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setGroupByClient(!groupByClient)}
                  >
                    Group by Client
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <AdminGanttFilters
                clients={uniqueClients}
                selectedClient={selectedClient}
                selectedStatus={selectedStatus}
                searchQuery={searchQuery}
                onClientChange={setSelectedClient}
                onStatusChange={setSelectedStatus}
                onSearchChange={setSearchQuery}
                onClearFilters={handleClearFilters}
              />
              
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDateRange({ start: subDays(new Date(), 30), end: addDays(new Date(), 30) })}
                >
                  This Month
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDateRange({ start: subDays(new Date(), 90), end: addDays(new Date(), 90) })}
                >
                  Quarter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDateRange({ start: subDays(new Date(), 180), end: addDays(new Date(), 180) })}
                >
                  6 Months
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <div
                className="relative"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <div className="flex border-b bg-muted/50">
                  <div className="w-80 flex-shrink-0 p-4 border-r font-medium">
                    {groupByClient ? 'Client / Project' : 'Project'}
                  </div>
                  <div className="flex-1 overflow-x-auto" ref={timelineRef}>
                    <TimelineHeader markers={timelineMarkers} />
                  </div>
                </div>

                <ScrollArea className="h-[600px]">
                  <div className="flex">
                    {/* Left column - Project names */}
                    <div className="w-80 flex-shrink-0 border-r">
                      {groupByClient ? (
                        // Grouped by client
                        Array.from(projectsByClient.entries()).map(([clientId, clientProjects]) => {
                          const client = uniqueClients.find(c => c.id === clientId);
                          const isExpanded = expandedClients.has(clientId);
                          
                          return (
                            <div key={clientId}>
                              <div
                                className="flex items-center gap-2 p-3 border-b bg-muted/30 cursor-pointer hover:bg-muted/50"
                                style={{ height: `${ROW_HEIGHT}px` }}
                                onClick={() => toggleClientExpansion(clientId)}
                              >
                                {isExpanded ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                                <span className="font-medium">{client?.name}</span>
                                <Badge variant="secondary" className="ml-auto">
                                  {clientProjects.length}
                                </Badge>
                              </div>
                              
                              {isExpanded && clientProjects.map((project) => (
                                <div
                                  key={project.id}
                                  className="flex items-center gap-3 p-3 pl-8 border-b hover:bg-muted/20"
                                  style={{ height: `${ROW_HEIGHT}px` }}
                                >
                                  <ProjectStatusBadge status={project.status} />
                                  <span className="text-sm flex-1 truncate">{project.name}</span>
                                </div>
                              ))}
                            </div>
                          );
                        })
                      ) : (
                        // Flat list
                        filteredProjects.map((project) => (
                          <div
                            key={project.id}
                            className="flex items-center gap-3 p-3 border-b hover:bg-muted/20"
                            style={{ height: `${ROW_HEIGHT}px` }}
                          >
                            <ProjectStatusBadge status={project.status} />
                            <div className="flex-1">
                              <div className="text-sm font-medium truncate">{project.name}</div>
                              <div className="text-xs text-muted-foreground truncate">{project.client_name}</div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Right column - Timeline */}
                    <div className="flex-1 relative" style={{
                      height: groupByClient 
                        ? `${Array.from(projectsByClient.entries()).reduce((acc, [clientId, projects]) => {
                            const isExpanded = expandedClients.has(clientId);
                            return acc + (1 + (isExpanded ? projects.length : 0)) * ROW_HEIGHT;
                          }, 0)}px`
                        : `${filteredProjects.length * ROW_HEIGHT}px`
                    }}>
                      {/* Timeline grid lines */}
                      <div className="absolute inset-0 pointer-events-none">
                        {timelineMarkers.map((marker, index) => (
                          <div
                            key={index}
                            className="absolute top-0 bottom-0 border-l border-border/30"
                            style={{ left: `${marker.position}%` }}
                          />
                        ))}
                        
                        {/* Today marker */}
                        {todayPosition >= 0 && todayPosition <= 100 && (
                          <div
                            className="absolute top-0 bottom-0 z-10 w-0.5 bg-destructive"
                            style={{ left: `${todayPosition}%` }}
                          >
                            <div className="absolute -left-8 -top-1 bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded whitespace-nowrap">
                              Today
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Render project bars */}
                      {groupByClient ? (
                        Array.from(projectsByClient.entries()).map(([clientId, clientProjects], clientIndex) => {
                          const isExpanded = expandedClients.has(clientId);
                          const rowIndexStart = Array.from(projectsByClient.entries())
                            .slice(0, clientIndex)
                            .reduce((acc, [cId, projects]) => {
                              const isExp = expandedClients.has(cId);
                              return acc + 1 + (isExp ? projects.length : 0);
                            }, 0) + 1;
                          
                          if (!isExpanded) return null;
                          
                          return clientProjects.map((project, projIndex) => {
                            return renderProjectBar(project, rowIndexStart + projIndex);
                          });
                        })
                      ) : (
                        filteredProjects.map((project, index) => renderProjectBar(project, index))
                      )}
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProjectTimeline;
