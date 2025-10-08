import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { KanbanColumn } from './KanbanColumn';
import { TaskFormDialog } from './TaskFormDialog';
import { useProjectTasks } from '@/hooks/useProjectTasks';
import { ProjectTask } from '@/types/task';
import { TaskCard } from './TaskCard';

interface KanbanBoardProps {
  projectId: string;
}

const columns = [
  { id: 'idea', title: 'Idea' },
  { id: 'in_progress', title: 'In Progress' },
  { id: 'review', title: 'Review' },
  { id: 'completed', title: 'Completed' },
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ projectId }) => {
  const { tasks, isLoading, addTask, updateTask, deleteTask, updateTaskStatus } = useProjectTasks(projectId);
  const [activeTask, setActiveTask] = useState<ProjectTask | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<ProjectTask | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<ProjectTask['status']>('idea');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find(t => t.id === event.active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeTask = tasks.find(t => t.id === active.id);
    if (!activeTask) return;

    const overId = over.id as string;
    const newStatus = columns.find(col => col.id === overId)?.id as ProjectTask['status'] | undefined;

    if (newStatus && activeTask.status !== newStatus) {
      const tasksInNewColumn = tasks.filter(t => t.status === newStatus);
      updateTaskStatus(activeTask.id, newStatus, tasksInNewColumn.length);
    }
  };

  const handleAddTask = (status: ProjectTask['status']) => {
    setDefaultStatus(status);
    setEditingTask(null);
    setIsDialogOpen(true);
  };

  const handleEditTask = (task: ProjectTask) => {
    setEditingTask(task);
    setDefaultStatus(task.status);
    setIsDialogOpen(true);
  };

  const handleSubmitTask = async (data: Partial<ProjectTask>) => {
    if (editingTask) {
      await updateTask(editingTask.id, data);
    } else {
      const tasksInColumn = tasks.filter(t => t.status === defaultStatus);
      await addTask({
        ...data,
        project_id: projectId,
        status: defaultStatus,
        order_index: tasksInColumn.length,
      } as Omit<ProjectTask, 'id' | 'created_at' | 'updated_at' | 'created_by'>);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading tasks...</div>;
  }

  return (
    <>
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map(column => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={tasks.filter(t => t.status === column.id)}
              onAddTask={() => handleAddTask(column.id as ProjectTask['status'])}
              onEditTask={handleEditTask}
              onDeleteTask={deleteTask}
            />
          ))}
        </div>
        <DragOverlay>
          {activeTask && (
            <TaskCard
              task={activeTask}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          )}
        </DragOverlay>
      </DndContext>

      <TaskFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmitTask}
        task={editingTask}
        defaultStatus={defaultStatus}
      />
    </>
  );
};
