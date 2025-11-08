
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useClientProjects } from '@/hooks/useClientProjects';
import AddProjectDialog from './AddProjectDialog';
import ProjectDetailsDialog from './ProjectDetailsDialog';
import { Project } from '@/types/database';

interface ClientProjectsProps {
  clientId: string;
}

const ClientProjects: React.FC<ClientProjectsProps> = ({ clientId }) => {
  const { projects, isLoading, addProject, updateProject, deleteProject } = useClientProjects(clientId);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'On Hold':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Client Projects</CardTitle>
          <CardDescription>Manage client projects and track progress</CardDescription>
        </div>
        <AddProjectDialog 
          clientId={clientId} 
          onAddProject={handleAddProject} 
        />
      </CardHeader>
      <CardContent>
        {projects.length > 0 ? (
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
              {projects.map(project => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
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
            <p className="text-gray-500">No projects yet</p>
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
