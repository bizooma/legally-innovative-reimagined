
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Client } from '@/types/database';

export function useClientDetails(clientId?: string) {
  const [client, setClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check auth status and fetch client data
  useEffect(() => {
    const checkUserAndFetchClient = async () => {
      try {
        // Check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast({
            title: "Authentication Required",
            description: "Please login to access client details",
            variant: "destructive",
          });
          navigate('/portal');
          return;
        }
        
        // Fetch client data if we have a client ID
        if (clientId) {
          setIsLoading(true);
          const { data, error } = await supabase
            .from('clients')
            .select('*')
            .eq('id', clientId)
            .maybeSingle();
            
          if (error) {
            throw error;
          }
          
          setClient(data as Client | null);
        }
      } catch (error: any) {
        console.error('Error fetching client details:', error);
        toast({
          title: "Error",
          description: "Could not load client details: " + (error.message || "Unknown error"),
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUserAndFetchClient();
  }, [clientId, navigate, toast]);

  return {
    client,
    isLoading
  };
}
