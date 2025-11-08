import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Project } from '@/types/database';
import { format, formatDistanceToNow } from 'date-fns';
import { KanbanSquare, Calendar, Pencil } from 'lucide-react';
import { KanbanBoard } from './kanban/KanbanBoard';
import EditProjectDialog from './EditProjectDialog';

interface ProjectDetailsDialogProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => Promise<void>;
  onUpdate?: (id: string, updates: Partial<Project>) => Promise<void | Project>;
}

const ProjectDetailsDialog: React.FC<ProjectDetailsDialogProps> = ({
  project,
  isOpen,
  onClose,
  onDelete,
  onUpdate,
}) => {
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(project.id);
      onClose();
    } catch (error) {
      console.error('Error deleting project:', error);
    } finally {
      setIsDeleting(false);
      setConfirmDeleteOpen(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'On Hold':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl flex items-center gap-2">
                  <KanbanSquare className="h-6 w-6" />
                  {project.name}
                </DialogTitle>
                <DialogDescription>
                  Manage your project tasks and track progress
                </DialogDescription>
              </div>
              {onUpdate && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditOpen(true)}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Project
                </Button>
              )}
            </div>
          </DialogHeader>
          
          <Tabs defaultValue="kanban" className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
              <TabsTrigger value="details">Project Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="kanban" className="flex-1 overflow-hidden mt-4">
              <div className="h-full overflow-x-auto overflow-y-hidden">
                <KanbanBoard projectId={project.id} />
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="overflow-auto mt-4">
              <div className="space-y-6 py-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Status:</span>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Progress</h4>
                    <div className="w-full bg-secondary rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full transition-all" 
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">{project.progress}%</span>
                  </div>
                  
                  {project.description && (
                    <div className="space-y-2">
                      <span className="text-sm font-medium">Description:</span>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {project.description}
                      </p>
                    </div>
                  )}

                  {(project.start_date || project.end_date) && (
                    <div className="space-y-2">
                      <span className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Project Timeline
                      </span>
                      <div className="flex gap-4 text-sm">
                        {project.start_date && (
                          <div>
                            <span className="text-muted-foreground">Start:</span>
                            <p className="font-medium">{format(new Date(project.start_date), 'MMM d, yyyy')}</p>
                          </div>
                        )}
                        {project.end_date && (
                          <div>
                            <span className="text-muted-foreground">End:</span>
                            <p className="font-medium">{format(new Date(project.end_date), 'MMM d, yyyy')}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Created:</span>
                        <p className="text-muted-foreground">
                          {formatDistanceToNow(new Date(project.created_at), { addSuffix: true })}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">Last Updated:</span>
                        <p className="text-muted-foreground">
                          {formatDistanceToNow(new Date(project.updated_at), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <DialogFooter className="gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={onClose}>
                    Close
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={() => setConfirmDeleteOpen(true)}
                  >
                    Delete Project
                  </Button>
                </DialogFooter>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the project "{project.name}" and all associated tasks. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {onUpdate && (
        <EditProjectDialog
          project={project}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};

export default ProjectDetailsDialog;
