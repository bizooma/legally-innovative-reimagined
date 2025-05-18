
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Project } from '@/types/database';
import { toast as sonnerToast } from 'sonner';

export function useClientProjects(clientId: string) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load projects from Supabase
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
        
        setProjects(data as Project[]);
      } catch (error: any) {
        console.error('Error fetching projects:', error);
        toast({
          title: "Error",
          description: "Could not load project data: " + (error.message || "Unknown error"),
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjects();
  }, [clientId, toast]);

  // Add a new project
  const addProject = async (projectData: Omit<Project, 'id' | 'created_at' | 'updated_at' | 'created_by'>) => {
    try {
      // Get current user ID
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('projects')
        .insert({
          ...projectData,
          created_by: session.user.id
        })
        .select()
        .single();
        
      if (error) {
        throw error;
      }
      
      setProjects(prev => [data as Project, ...prev]);
      sonnerToast.success('Project created successfully');
      return data as Project;
    } catch (error: any) {
      console.error('Error creating project:', error);
      toast({
        title: "Error",
        description: "Could not create project: " + (error.message || "Unknown error"),
        variant: "destructive",
      });
      throw error;
    }
  };

  // Update an existing project
  const updateProject = async (id: string, updates: Partial<Omit<Project, 'id' | 'created_at' | 'created_by'>>) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
        
      if (error) {
        throw error;
      }
      
      setProjects(prev => prev.map(p => p.id === id ? { ...p, ...data } as Project : p));
      sonnerToast.success('Project updated successfully');
      return data as Project;
    } catch (error: any) {
      console.error('Error updating project:', error);
      toast({
        title: "Error",
        description: "Could not update project: " + (error.message || "Unknown error"),
        variant: "destructive",
      });
      throw error;
    }
  };

  // Delete a project
  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      setProjects(prev => prev.filter(p => p.id !== id));
      sonnerToast.success('Project deleted successfully');
    } catch (error: any) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Could not delete project: " + (error.message || "Unknown error"),
        variant: "destructive",
      });
    }
  };

  return {
    projects,
    isLoading,
    addProject,
    updateProject,
    deleteProject
  };
}
