import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ProjectTask } from '@/types/task';
import { format } from 'date-fns';
import { Calendar, Clock, Flag, Pencil, Trash2, User } from 'lucide-react';
import { TaskFormDialog } from './TaskFormDialog';

interface TaskDetailsModalProps {
  task: ProjectTask | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<ProjectTask>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const priorityConfig = {
  low: { color: 'bg-blue-500/10 text-blue-500 border-blue-500/20', icon: '🔵' },
  medium: { color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20', icon: '🟡' },
  high: { color: 'bg-orange-500/10 text-orange-500 border-orange-500/20', icon: '🟠' },
  urgent: { color: 'bg-red-500/10 text-red-500 border-red-500/20', icon: '🔴' },
};

const statusConfig = {
  idea: { label: 'Idea', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
  in_progress: { label: 'In Progress', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  review: { label: 'Review', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
  completed: { label: 'Completed', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
};

export const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  task,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!task) return null;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      try {
        await onDelete(task.id);
        onClose();
      } catch (error) {
        console.error('Error deleting task:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleUpdateTask = async (updates: Partial<ProjectTask>) => {
    await onUpdate(task.id, updates);
    setIsEditing(false);
  };

  return (
    <>
      <Dialog open={isOpen && !isEditing} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl pr-12">{task.title}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="flex flex-wrap gap-2">
              <Badge className={statusConfig[task.status].color} variant="outline">
                {statusConfig[task.status].label}
              </Badge>
              <Badge className={priorityConfig[task.priority].color} variant="outline">
                <Flag className="h-3 w-3 mr-1" />
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </Badge>
            </div>

            {task.description && (
              <div>
                <h4 className="font-semibold mb-2 text-sm">Description</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {task.description}
                </p>
              </div>
            )}

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {task.due_date && (
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Due Date</p>
                    <p className="text-sm">
                      {format(new Date(task.due_date), 'EEEE, MMMM d, yyyy')}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Created</p>
                  <p className="text-sm">
                    {format(new Date(task.created_at), 'MMM d, yyyy h:mm a')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Last Updated</p>
                  <p className="text-sm">
                    {format(new Date(task.updated_at), 'MMM d, yyyy h:mm a')}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex gap-2">
              <Button onClick={handleEdit} className="flex-1">
                <Pencil className="h-4 w-4 mr-2" />
                Edit Task
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {isDeleting ? 'Deleting...' : 'Delete Task'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <TaskFormDialog
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSubmit={handleUpdateTask}
        task={task}
      />
    </>
  );
};
