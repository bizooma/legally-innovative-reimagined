import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { addDays, format, differenceInDays, isBefore } from 'date-fns';

type ResizeEdge = 'start' | 'end';

interface ResizeState {
  itemId: string;
  itemType: 'project' | 'task';
  edge: ResizeEdge;
  startX: number;
  currentX: number;
  isResizing: boolean;
  originalStartDate: string;
  originalEndDate: string;
}

export function useResizeGanttBar() {
  const [resizeState, setResizeState] = useState<ResizeState | null>(null);

  const startResize = (
    itemId: string,
    itemType: 'project' | 'task',
    edge: ResizeEdge,
    clientX: number,
    startDate: string,
    endDate: string
  ) => {
    setResizeState({
      itemId,
      itemType,
      edge,
      startX: clientX,
      currentX: clientX,
      isResizing: true,
      originalStartDate: startDate,
      originalEndDate: endDate,
    });
  };

  const updateResize = (clientX: number) => {
    if (!resizeState) return;
    
    setResizeState(prev => 
      prev ? { ...prev, currentX: clientX } : null
    );
  };

  const endResize = async (
    dateRangeStart: Date,
    dateRangeEnd: Date,
    containerWidth: number
  ) => {
    if (!resizeState) return;

    const pixelOffset = resizeState.currentX - resizeState.startX;
    const totalDays = differenceInDays(dateRangeEnd, dateRangeStart) + 1;
    const daysPerPixel = totalDays / containerWidth;
    const dayOffset = Math.round(pixelOffset * daysPerPixel);

    const originalStart = new Date(resizeState.originalStartDate);
    const originalEnd = new Date(resizeState.originalEndDate);

    let newStartDate: Date;
    let newEndDate: Date;

    if (resizeState.edge === 'start') {
      newStartDate = addDays(originalStart, dayOffset);
      newEndDate = originalEnd;
      
      // Ensure start is before end (minimum 1 day duration)
      if (!isBefore(newStartDate, newEndDate)) {
        newStartDate = addDays(newEndDate, -1);
      }
    } else {
      newStartDate = originalStart;
      newEndDate = addDays(originalEnd, dayOffset);
      
      // Ensure end is after start (minimum 1 day duration)
      if (!isBefore(newStartDate, newEndDate)) {
        newEndDate = addDays(newStartDate, 1);
      }
    }

    try {
      if (resizeState.itemType === 'project') {
        const { error } = await supabase
          .from('projects')
          .update({
            start_date: format(newStartDate, 'yyyy-MM-dd'),
            end_date: format(newEndDate, 'yyyy-MM-dd'),
          })
          .eq('id', resizeState.itemId);

        if (error) throw error;
        
        toast.success('Project dates updated');
      } else {
        const { error } = await supabase
          .from('project_tasks')
          .update({
            due_date: format(newEndDate, 'yyyy-MM-dd'),
          })
          .eq('id', resizeState.itemId);

        if (error) throw error;
        
        toast.success('Task date updated');
      }
    } catch (error) {
      console.error('Error updating dates:', error);
      toast.error('Failed to update dates');
    } finally {
      setResizeState(null);
    }
  };

  const cancelResize = () => {
    setResizeState(null);
  };

  const getResizeOffset = (): number => {
    if (!resizeState) return 0;
    return resizeState.currentX - resizeState.startX;
  };

  return {
    resizeState,
    startResize,
    updateResize,
    endResize,
    cancelResize,
    getResizeOffset,
  };
}
