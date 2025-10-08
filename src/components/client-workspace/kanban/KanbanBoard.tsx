import React, { useState, useMemo } from 'react';
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
import { TaskDetailsModal } from './TaskDetailsModal';
import { KanbanFilters } from './KanbanFilters';
import { KanbanStats } from './KanbanStats';
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
  const [viewingTask, setViewingTask] = useState<ProjectTask | null>(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('order');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;

    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        task =>
          task.title.toLowerCase().includes(search) ||
          task.description?.toLowerCase().includes(search)
      );
    }

    // Apply priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    // Apply sorting
    const sorted = [...filtered];
    switch (sortBy) {
      case 'priority':
        const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
        sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        break;
      case 'due_date':
        sorted.sort((a, b) => {
          if (!a.due_date) return 1;
          if (!b.due_date) return -1;
          return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
        });
        break;
      case 'created_at':
        sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        sorted.sort((a, b) => a.order_index - b.order_index);
    }

    return sorted;
  }, [tasks, searchTerm, priorityFilter, sortBy]);

  const hasActiveFilters = searchTerm !== '' || priorityFilter !== 'all' || sortBy !== 'order';

  const clearFilters = () => {
    setSearchTerm('');
    setPriorityFilter('all');
    setSortBy('order');
  };

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
    setViewingTask(null);
    setEditingTask(task);
    setDefaultStatus(task.status);
    setIsDialogOpen(true);
  };

  const handleViewTask = (task: ProjectTask) => {
    setViewingTask(task);
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
      <KanbanStats tasks={tasks} />
      
      <KanbanFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map(column => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={filteredAndSortedTasks.filter(t => t.status === column.id)}
              onAddTask={() => handleAddTask(column.id as ProjectTask['status'])}
              onEditTask={handleViewTask}
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

      <TaskDetailsModal
        task={viewingTask}
        isOpen={!!viewingTask}
        onClose={() => setViewingTask(null)}
        onUpdate={async (id, updates) => {
          await updateTask(id, updates);
        }}
        onDelete={deleteTask}
      />
    </>
  );
};
