import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Project } from '@/types/database';

export interface ProjectWithClient extends Project {
  start_date: string;
  end_date: string;
  client_name: string;
}

export function useAllProjectsWithClients() {
  const [projects, setProjects] = useState<ProjectWithClient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select(`
            *,
            clients!inner(
              id,
              company_name
            )
          `)
          .not('start_date', 'is', null)
          .not('end_date', 'is', null)
          .order('start_date', { ascending: true });
          
        if (error) {
          throw error;
        }
        
        // Transform the data to flatten the client information
        const transformedProjects = (data || []).map((project: any) => ({
          ...project,
          client_name: project.clients.company_name,
          client_id: project.clients.id,
        })) as ProjectWithClient[];
        
        setProjects(transformedProjects);
      } catch (error: any) {
        console.error('Error fetching all projects:', error);
        toast({
          title: "Error",
          description: "Could not load projects: " + (error.message || "Unknown error"),
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjects();
  }, [toast]);

  return {
    projects,
    isLoading
  };
}
