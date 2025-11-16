import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { differenceInDays, addDays, format } from 'date-fns';

interface DragState {
  projectId: string;
  startX: number;
  currentX: number;
  isDragging: boolean;
  originalStartDate: string;
  originalEndDate: string;
}

export function useDragProjectDate(
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

  const startDrag = (projectId: string, clientX: number, startDate: string, endDate: string) => {
    setDragState({
      projectId,
      startX: clientX,
      currentX: clientX,
      isDragging: true,
      originalStartDate: startDate,
      originalEndDate: endDate,
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

  const endDrag = async (containerWidth: number) => {
    if (!dragState) return;

    const xOffset = dragState.currentX - dragState.startX;
    const daysDelta = calculateDateFromPosition(xOffset, containerWidth);

    if (daysDelta === 0) {
      setDragState(null);
      return;
    }

    const oldStartDate = new Date(dragState.originalStartDate);
    const oldEndDate = new Date(dragState.originalEndDate);
    const newStartDate = addDays(oldStartDate, daysDelta);
    const newEndDate = addDays(oldEndDate, daysDelta);

    try {
      const { error } = await supabase
        .from('projects')
        .update({ 
          start_date: format(newStartDate, 'yyyy-MM-dd'),
          end_date: format(newEndDate, 'yyyy-MM-dd')
        })
        .eq('id', dragState.projectId);

      if (error) throw error;

      toast.success(`Project dates updated: ${format(newStartDate, 'MMM dd')} - ${format(newEndDate, 'MMM dd, yyyy')}`);
      onUpdate?.();
    } catch (error) {
      console.error('Error updating project dates:', error);
      toast.error('Failed to update project dates');
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
