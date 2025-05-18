
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
        
        // For now, we'll use created_at as start_date and add 30 days for end_date
        // This is temporary until we add proper date fields to the projects table
        const projectsWithDates = (data as Project[]).map(project => {
          const startDate = new Date(project.created_at);
          const endDate = new Date(startDate);
          endDate.setDate(endDate.getDate() + 30);
          
          return {
            ...project,
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString()
          };
        });
        
        setProjects(projectsWithDates);
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
