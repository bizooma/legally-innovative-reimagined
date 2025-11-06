import { useState, useEffect } from 'react';
import { TimeEntry, TimeEntryWithClient, ClientTimeTotal } from '@/types/timeEntry';
import { timeTrackingService } from '@/services/timeTrackingService';
import { Client } from '@/types/database';
import { useToast } from '@/hooks/use-toast';
import { formatDuration } from './useTimeTracker';

interface UseTimeEntriesOptions {
  clients: Client[];
  autoRefresh?: boolean;
}

export function useTimeEntries({ clients, autoRefresh = false }: UseTimeEntriesOptions) {
  const { toast } = useToast();
  const [entries, setEntries] = useState<TimeEntryWithClient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    clientId: '',
    startDate: '',
    endDate: '',
  });

  const fetchEntries = async () => {
    setIsLoading(true);
    try {
      const data = await timeTrackingService.getTimeEntries({
        clientId: filters.clientId || undefined,
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
      });

      // Enrich with client names
      const enriched = data.map((entry) => ({
        ...entry,
        client_name: clients.find((c) => c.id === entry.client_id)?.company_name,
      }));

      setEntries(enriched);
    } catch (error) {
      console.error('Error fetching time entries:', error);
      toast({
        title: 'Error',
        description: 'Failed to load time entries',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [filters, clients]);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(fetchEntries, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [autoRefresh, filters, clients]);

  const deleteEntry = async (id: string) => {
    try {
      await timeTrackingService.deleteTimeEntry(id);
      toast({
        title: 'Success',
        description: 'Time entry deleted',
      });
      fetchEntries();
    } catch (error) {
      console.error('Error deleting time entry:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete time entry',
        variant: 'destructive',
      });
    }
  };

  const updateEntry = async (id: string, updates: Partial<TimeEntry>) => {
    try {
      await timeTrackingService.updateTimeEntry(id, updates);
      toast({
        title: 'Success',
        description: 'Time entry updated',
      });
      fetchEntries();
    } catch (error) {
      console.error('Error updating time entry:', error);
      toast({
        title: 'Error',
        description: 'Failed to update time entry',
        variant: 'destructive',
      });
    }
  };

  const getClientTotals = (): ClientTimeTotal[] => {
    const totalsMap = new Map<string, { seconds: number; count: number; name: string }>();

    entries.forEach((entry) => {
      const existing = totalsMap.get(entry.client_id) || {
        seconds: 0,
        count: 0,
        name: entry.client_name || 'Unknown Client',
      };
      totalsMap.set(entry.client_id, {
        seconds: existing.seconds + (entry.duration_seconds || 0),
        count: existing.count + 1,
        name: existing.name,
      });
    });

    return Array.from(totalsMap.entries()).map(([clientId, data]) => ({
      client_id: clientId,
      client_name: data.name,
      total_seconds: data.seconds,
      total_formatted: formatDuration(data.seconds),
      entry_count: data.count,
    }));
  };

  const getTotalSeconds = (): number => {
    return entries.reduce((sum, entry) => sum + (entry.duration_seconds || 0), 0);
  };

  return {
    entries,
    isLoading,
    filters,
    setFilters,
    deleteEntry,
    updateEntry,
    refreshEntries: fetchEntries,
    getClientTotals,
    getTotalSeconds,
  };
}
