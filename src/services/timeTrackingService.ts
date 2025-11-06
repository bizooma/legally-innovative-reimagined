import { supabase } from '@/integrations/supabase/client';
import { TimeEntry } from '@/types/timeEntry';

export const timeTrackingService = {
  async createTimeEntry(entry: {
    client_id: string;
    start_time: string;
    end_time: string | null;
    duration_seconds: number | null;
    description: string | null;
  }): Promise<TimeEntry> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('time_entries')
      .insert({
        ...entry,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateTimeEntry(
    id: string,
    updates: Partial<TimeEntry>
  ): Promise<TimeEntry> {
    const { data, error } = await supabase
      .from('time_entries')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteTimeEntry(id: string): Promise<void> {
    const { error } = await supabase
      .from('time_entries')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getTimeEntries(filters?: {
    clientId?: string;
    startDate?: string;
    endDate?: string;
    userId?: string;
  }): Promise<TimeEntry[]> {
    let query = supabase
      .from('time_entries')
      .select('*')
      .order('start_time', { ascending: false });

    if (filters?.clientId) {
      query = query.eq('client_id', filters.clientId);
    }

    if (filters?.userId) {
      query = query.eq('user_id', filters.userId);
    }

    if (filters?.startDate) {
      query = query.gte('start_time', filters.startDate);
    }

    if (filters?.endDate) {
      query = query.lte('start_time', filters.endDate);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  },
};
