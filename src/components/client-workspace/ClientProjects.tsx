
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus, Filter } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useClientProjects } from '@/hooks/useClientProjects';
import AddProjectDialog from './AddProjectDialog';
import ProjectDetailsDialog from './ProjectDetailsDialog';
import { ProjectStatusBadge } from './ProjectStatusBadge';
import { ProjectStatusSelect } from './ProjectStatusSelect';
import { Project } from '@/types/database';
import { useToast } from '@/hooks/use-toast';

interface ClientProjectsProps {
  clientId: string;
}

const ClientProjects: React.FC<ClientProjectsProps> = ({ clientId }) => {
  const { projects, isLoading, addProject, updateProject, deleteProject } = useClientProjects(clientId);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();

  const handleAddProject = async (projectData: any) => {
    // We include the client_id here instead of in the AddProjectDialog
    await addProject({
      ...projectData,
      client_id: clientId,
    });
  };

  const handleDelete = async (id: string) => {
    await deleteProject(id);
  };

  const handleStatusChange = async (projectId: string, newStatus: 'Not Started' | 'In Progress' | 'On Hold' | 'Completed') => {
    try {
      await updateProject(projectId, { status: newStatus });
      toast({
        title: 'Status updated',
        description: `Project status changed to ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating project status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update project status',
        variant: 'destructive',
      });
    }
  };

  const filteredProjects = projects.filter(project => {
    if (statusFilter === 'all') return true;
    return project.status === statusFilter;
  });

  const projectStats = {
    total: projects.length,
    inProgress: projects.filter(p => p.status === 'In Progress').length,
    onHold: projects.filter(p => p.status === 'On Hold').length,
    completed: projects.filter(p => p.status === 'Completed').length,
    notStarted: projects.filter(p => p.status === 'Not Started').length,
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Client Projects</CardTitle>
            <CardDescription>Manage client projects and track progress</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10">
            <p className="text-gray-500">Loading projects...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Client Projects</CardTitle>
            <CardDescription>Manage client projects and track progress</CardDescription>
          </div>
          <AddProjectDialog 
            clientId={clientId} 
            onAddProject={handleAddProject} 
          />
        </div>
        
        {/* Project Summary Stats */}
        {projects.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('all')}
            >
              All Projects ({projectStats.total})
            </Button>
            <Button
              variant={statusFilter === 'In Progress' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('In Progress')}
            >
              In Progress ({projectStats.inProgress})
            </Button>
            <Button
              variant={statusFilter === 'On Hold' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('On Hold')}
            >
              On Hold ({projectStats.onHold})
            </Button>
            <Button
              variant={statusFilter === 'Completed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('Completed')}
            >
              Completed ({projectStats.completed})
            </Button>
            <Button
              variant={statusFilter === 'Not Started' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('Not Started')}
            >
              Not Started ({projectStats.notStarted})
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {filteredProjects.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map(project => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>
                    <ProjectStatusSelect
                      status={project.status}
                      onStatusChange={(newStatus) => handleStatusChange(project.id, newStatus)}
                    />
                  </TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(project.updated_at), { addSuffix: true })}
                  </TableCell>
                  <TableCell>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{project.progress}%</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedProject(project)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">
              {statusFilter === 'all' ? 'No projects yet' : `No ${statusFilter.toLowerCase()} projects`}
            </p>
            {statusFilter !== 'all' && (
              <Button
                variant="link"
                onClick={() => setStatusFilter('all')}
                className="mt-2"
              >
                View all projects
              </Button>
            )}
            {projects.length === 0 && (
              <AddProjectDialog 
                clientId={clientId} 
                onAddProject={handleAddProject} 
                triggerButton={
                  <Button className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Create First Project
                  </Button>
                }
              />
            )}
          </div>
        )}
      </CardContent>
      
      {selectedProject && (
        <ProjectDetailsDialog 
          project={selectedProject}
          isOpen={Boolean(selectedProject)}
          onClose={() => setSelectedProject(null)}
          onDelete={handleDelete}
          onUpdate={updateProject}
        />
      )}
    </Card>
  );
};

export default ClientProjects;
