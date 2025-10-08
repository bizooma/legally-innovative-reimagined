import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ProjectTask } from '@/types/task';
import { TaskCard } from './TaskCard';

interface KanbanColumnProps {
  id: string;
  title: string;
  tasks: ProjectTask[];
  onAddTask: () => void;
  onEditTask: (task: ProjectTask) => void;
  onDeleteTask: (id: string) => void;
}

const columnStyles = {
  idea: 'border-l-4 border-l-purple-500',
  in_progress: 'border-l-4 border-l-blue-500',
  review: 'border-l-4 border-l-yellow-500',
  completed: 'border-l-4 border-l-green-500',
};

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  id,
  title,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <Card className={`flex-1 min-w-[280px] ${columnStyles[id as keyof typeof columnStyles]} ${isOver ? 'bg-accent/50' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-sm">{title}</h3>
            <span className="text-xs text-muted-foreground">{tasks.length} tasks</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onAddTask}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent ref={setNodeRef} className="min-h-[200px]">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}
        </SortableContext>
      </CardContent>
    </Card>
  );
};
