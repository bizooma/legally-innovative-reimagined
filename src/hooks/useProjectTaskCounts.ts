import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useProjectTaskCounts(projectIds: string[]) {
  const [taskCounts, setTaskCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (projectIds.length === 0) {
      setTaskCounts({});
      return;
    }

    const fetchTaskCounts = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('project_tasks')
          .select('project_id')
          .in('project_id', projectIds)
          .not('due_date', 'is', null);

        if (error) throw error;

        const counts = (data || []).reduce((acc, task) => {
          acc[task.project_id] = (acc[task.project_id] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        setTaskCounts(counts);
      } catch (error) {
        console.error('Error fetching task counts:', error);
        setTaskCounts({});
      } finally {
        setIsLoading(false);
      }
    };

    fetchTaskCounts();
  }, [JSON.stringify(projectIds)]);

  return { taskCounts, isLoading };
}
