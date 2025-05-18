
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ClientProjectsProps {
  clientId: string;
}

const ClientProjects: React.FC<ClientProjectsProps> = ({ clientId }) => {
  // This would be a real API call in a production app
  const projects = [
    { id: '1', name: 'Website Redesign', status: 'In Progress', lastUpdated: '2025-05-10', progress: 65 },
    { id: '2', name: 'SEO Campaign', status: 'In Progress', lastUpdated: '2025-05-15', progress: 30 },
    { id: '3', name: 'Brand Identity', status: 'Completed', lastUpdated: '2025-05-01', progress: 100 },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Client Projects</CardTitle>
          <CardDescription>Manage client projects and track progress</CardDescription>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Project
        </Button>
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
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      project.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {project.status}
                    </span>
                  </TableCell>
                  <TableCell>{project.lastUpdated}</TableCell>
                  <TableCell>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{project.progress}%</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No projects yet</p>
            <Button className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Create First Project
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientProjects;
