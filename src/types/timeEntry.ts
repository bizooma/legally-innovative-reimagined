export interface TimeEntry {
  id: string;
  client_id: string;
  user_id: string;
  start_time: string;
  end_time: string | null;
  duration_seconds: number | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface TimeEntryWithClient extends TimeEntry {
  client_name?: string;
}

export interface ClientTimeTotal {
  client_id: string;
  client_name: string;
  total_seconds: number;
  total_formatted: string;
  entry_count: number;
}

export interface TimerState {
  isRunning: boolean;
  clientId: string | null;
  startTime: string | null;
  description: string;
}
