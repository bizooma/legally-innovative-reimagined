import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ProjectTask } from '@/types/task';

export function useMultipleProjectTasks(projectIds: string[]) {
  const [tasksByProject, setTasksByProject] = useState<Record<string, ProjectTask[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (projectIds.length === 0) {
      setTasksByProject({});
      return;
    }

    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('project_tasks')
          .select('*')
          .in('project_id', projectIds)
          .not('due_date', 'is', null)
          .order('due_date', { ascending: true });

        if (error) throw error;

        const grouped = (data as ProjectTask[]).reduce((acc, task) => {
          if (!acc[task.project_id]) {
            acc[task.project_id] = [];
          }
          acc[task.project_id].push(task);
          return acc;
        }, {} as Record<string, ProjectTask[]>);

        setTasksByProject(grouped);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setTasksByProject({});
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [JSON.stringify(projectIds)]);

  return { tasksByProject, isLoading };
}
