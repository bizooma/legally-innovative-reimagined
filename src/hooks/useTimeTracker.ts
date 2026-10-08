import { useState, useEffect, useCallback } from 'react';
import { TimerState } from '@/types/timeEntry';
import { timeTrackingService } from '@/services/timeTrackingService';
import { useToast } from '@/hooks/use-toast';

const STORAGE_KEY = 'active_timer';
const SYNC_EVENT = 'active-timer-change';
const IDLE: TimerState = { isRunning: false, clientId: null, startTime: null, description: '', projectId: null, taskId: null };

function readSaved(): TimerState | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    const state = JSON.parse(saved) as TimerState;
    return state.isRunning && state.startTime ? state : null;
  } catch {
    return null;
  }
}

export function useTimeTracker() {
  const { toast } = useToast();
  const [timerState, setTimerState] = useState<TimerState>(IDLE);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Load timer state from localStorage on mount, and follow changes made by other tracker instances on the page.
  useEffect(() => {
    const sync = () => {
      const state = readSaved() ?? IDLE;
      setTimerState((prev) => (JSON.stringify(prev) === JSON.stringify(state) ? prev : state));
      setElapsedSeconds(state.startTime ? Math.floor((Date.now() - new Date(state.startTime).getTime()) / 1000) : 0);
    };
    if (readSaved()) sync();
    window.addEventListener(SYNC_EVENT, sync);
    return () => window.removeEventListener(SYNC_EVENT, sync);
  }, []);

  const persist = useCallback((state: TimerState) => {
    try {
      if (state.isRunning) localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      else localStorage.removeItem(STORAGE_KEY);
    } catch { /* storage unavailable: timer still runs in this view */ }
    setTimerState(state);
    window.dispatchEvent(new Event(SYNC_EVENT));
  }, []);

  // Update elapsed time every second
  useEffect(() => {
    if (!timerState.isRunning || !timerState.startTime) {
      return;
    }

    const interval = setInterval(() => {
      const elapsed = Math.floor(
        (Date.now() - new Date(timerState.startTime!).getTime()) / 1000
      );
      setElapsedSeconds(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [timerState.isRunning, timerState.startTime]);

  const startTimer = useCallback((clientId: string, description: string = '', projectId: string | null = null, taskId: string | null = null) => {
    persist({ isRunning: true, clientId, startTime: new Date().toISOString(), description, projectId, taskId });
    setElapsedSeconds(0);
  }, [persist]);

  const stopTimer = useCallback(async () => {
    if (!timerState.clientId || !timerState.startTime) return;

    const endTime = new Date().toISOString();
    const durationSeconds = Math.floor(
      (new Date(endTime).getTime() - new Date(timerState.startTime).getTime()) / 1000
    );

    try {
      await timeTrackingService.createTimeEntry({
        client_id: timerState.clientId,
        start_time: timerState.startTime,
        end_time: endTime,
        duration_seconds: durationSeconds,
        description: timerState.description || null,
        project_id: timerState.projectId ?? null,
        task_id: timerState.taskId ?? null,
      });

      toast({
        title: 'Time entry saved',
        description: `Tracked ${formatDuration(durationSeconds)}`,
      });

      persist(IDLE);
      setElapsedSeconds(0);
    } catch (error) {
      console.error('Error saving time entry:', error);
      toast({
        title: 'Error',
        description: 'Failed to save time entry',
        variant: 'destructive',
      });
    }
  }, [timerState, toast, persist]);

  const cancelTimer = useCallback(() => {
    persist(IDLE);
    setElapsedSeconds(0);
  }, [persist]);

  return {
    timerState,
    elapsedSeconds,
    startTimer,
    stopTimer,
    cancelTimer,
    isRunning: timerState.isRunning,
  };
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
