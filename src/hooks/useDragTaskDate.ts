import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { differenceInDays, addDays, format } from 'date-fns';

interface DragState {
  taskId: string;
  startX: number;
  currentX: number;
  isDragging: boolean;
}

export function useDragTaskDate(
  dateRange: { start: Date; end: Date },
  onUpdate?: () => void
) {
  const [dragState, setDragState] = useState<DragState | null>(null);

  const calculateDateFromPosition = (xOffset: number, containerWidth: number): number => {
    const totalDays = differenceInDays(dateRange.end, dateRange.start);
    const daysPerPixel = totalDays / containerWidth;
    const daysDelta = Math.round(xOffset * daysPerPixel);
    return daysDelta;
  };

  const startDrag = (taskId: string, clientX: number) => {
    setDragState({
      taskId,
      startX: clientX,
      currentX: clientX,
      isDragging: true,
    });
  };

  const updateDrag = (clientX: number) => {
    if (dragState) {
      setDragState({
        ...dragState,
        currentX: clientX,
      });
    }
  };

  const endDrag = async (currentDueDate: string, containerWidth: number) => {
    if (!dragState) return;

    const xOffset = dragState.currentX - dragState.startX;
    const daysDelta = calculateDateFromPosition(xOffset, containerWidth);

    if (daysDelta === 0) {
      setDragState(null);
      return;
    }

    const oldDate = new Date(currentDueDate);
    const newDate = addDays(oldDate, daysDelta);

    try {
      const { error } = await supabase
        .from('project_tasks')
        .update({ due_date: newDate.toISOString() })
        .eq('id', dragState.taskId);

      if (error) throw error;

      toast.success(`Task due date updated to ${format(newDate, 'MMM dd, yyyy')}`);
      onUpdate?.();
    } catch (error) {
      console.error('Error updating task due date:', error);
      toast.error('Failed to update task due date');
    }

    setDragState(null);
  };

  const cancelDrag = () => {
    setDragState(null);
  };

  const getDragOffset = () => {
    if (!dragState) return 0;
    return dragState.currentX - dragState.startX;
  };

  return {
    dragState,
    startDrag,
    updateDrag,
    endDrag,
    cancelDrag,
    getDragOffset,
    isDragging: dragState?.isDragging || false,
  };
}
