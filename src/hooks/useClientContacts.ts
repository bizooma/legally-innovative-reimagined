
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/database';
import { useToast } from '@/hooks/use-toast';

export function useClientContacts(clientId: string) {
  const [contacts, setContacts] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setIsLoading(true);
        
        // Get the primary client contact from the clients table
        const { data: clientData, error: clientError } = await supabase
          .from('clients')
          .select('contact_name, contact_email')
          .eq('id', clientId)
          .single();
          
        if (clientError) throw clientError;
        
        // Get any portal users associated with this client
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('client_id', clientId);
          
        if (userError) throw userError;
        
        // Combine the primary contact with any portal users
        const primaryContact: UserProfile = {
          id: 'primary',
          email: clientData.contact_email,
          full_name: clientData.contact_name,
          is_admin: false,
          client_id: clientId,
          created_at: new Date().toISOString(),
        };
        
        const allContacts = [primaryContact, ...(userData || [])];
        setContacts(allContacts);
      } catch (error: any) {
        console.error('Error fetching client contacts:', error);
        toast({
          title: "Error",
          description: "Could not load client contacts: " + (error.message || "Unknown error"),
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (clientId) {
      fetchContacts();
    }
  }, [clientId, toast]);

  return {
    contacts,
    isLoading
  };
}
