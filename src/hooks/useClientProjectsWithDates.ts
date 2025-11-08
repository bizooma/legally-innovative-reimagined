
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Project } from '@/types/database';

export interface ProjectWithDates extends Project {
  start_date?: string;
  end_date?: string;
}

export function useClientProjectsWithDates(clientId: string) {
  const [projects, setProjects] = useState<ProjectWithDates[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('client_id', clientId)
          .order('created_at', { ascending: false });
          
        if (error) {
          throw error;
        }
        
        setProjects(data as ProjectWithDates[]);
      } catch (error: any) {
        console.error('Error fetching projects with dates:', error);
        toast({
          title: "Error",
          description: "Could not load project data: " + (error.message || "Unknown error"),
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (clientId) {
      fetchProjects();
    }
  }, [clientId, toast]);

  return {
    projects,
    isLoading
  };
}
