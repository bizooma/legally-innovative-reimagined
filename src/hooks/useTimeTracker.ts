import { useState, useEffect, useCallback } from 'react';
import { TimerState } from '@/types/timeEntry';
import { timeTrackingService } from '@/services/timeTrackingService';
import { useToast } from '@/hooks/use-toast';

const STORAGE_KEY = 'active_timer';

export function useTimeTracker() {
  const { toast } = useToast();
  const [timerState, setTimerState] = useState<TimerState>({
    isRunning: false,
    clientId: null,
    startTime: null,
    description: '',
  });
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Load timer state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const state = JSON.parse(saved) as TimerState;
      if (state.isRunning && state.startTime) {
        setTimerState(state);
        const elapsed = Math.floor(
          (Date.now() - new Date(state.startTime).getTime()) / 1000
        );
        setElapsedSeconds(elapsed);
      }
    }
  }, []);

  // Save timer state to localStorage
  useEffect(() => {
    if (timerState.isRunning) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(timerState));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [timerState]);

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

  const startTimer = useCallback((clientId: string, description: string = '') => {
    const startTime = new Date().toISOString();
    setTimerState({
      isRunning: true,
      clientId,
      startTime,
      description,
    });
    setElapsedSeconds(0);
  }, []);

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
      });

      toast({
        title: 'Time entry saved',
        description: `Tracked ${formatDuration(durationSeconds)}`,
      });

      setTimerState({
        isRunning: false,
        clientId: null,
        startTime: null,
        description: '',
      });
      setElapsedSeconds(0);
    } catch (error) {
      console.error('Error saving time entry:', error);
      toast({
        title: 'Error',
        description: 'Failed to save time entry',
        variant: 'destructive',
      });
    }
  }, [timerState, toast]);

  const cancelTimer = useCallback(() => {
    setTimerState({
      isRunning: false,
      clientId: null,
      startTime: null,
      description: '',
    });
    setElapsedSeconds(0);
  }, []);

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
