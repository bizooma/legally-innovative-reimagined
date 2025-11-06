
import { supabase } from '@/integrations/supabase/client';
import { Client } from '@/types/database';
import { ClientFormValues } from '@/schemas/clientSchema';

export async function addClient(data: ClientFormValues, userId: string): Promise<Client> {
  // No need for type casting with generics anymore
  const { data: client, error } = await supabase
    .from('clients')
    .insert({
      company_name: data.companyName,
      contact_name: data.contactName,
      contact_email: data.contactEmail,
      contact_phone: data.contactPhone || null,
      notes: data.notes || null,
      created_by: userId
    })
    .select('*')
    .single();
  
  if (error) {
    throw error;
  }
  
  if (!client) {
    throw new Error('Failed to create client');
  }
  
  return client as Client;
}

export async function updateClientStatus(
  clientId: string, 
  status: 'active' | 'paused' | 'terminated'
): Promise<Client> {
  const { data: client, error } = await supabase
    .from('clients')
    .update({ status })
    .eq('id', clientId)
    .select('*')
    .single();
  
  if (error) {
    throw error;
  }
  
  if (!client) {
    throw new Error('Failed to update client status');
  }
  
  return client as Client;
}

export async function deleteClient(clientId: string): Promise<boolean> {
  const { data, error } = await supabase.rpc('delete_client', {
    client_id: clientId
  });
  
  if (error) {
    throw error;
  }
  
  return data as boolean;
}
