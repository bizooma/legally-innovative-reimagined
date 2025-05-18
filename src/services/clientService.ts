
import { supabase } from '@/integrations/supabase/client';
import { Client } from '@/types/database';
import { ClientFormValues } from '@/schemas/clientSchema';

export async function addClient(data: ClientFormValues, userId: string): Promise<Client> {
  // Cast to any to work around type issues with Supabase client
  const { data: client, error } = await (supabase
    .from('clients') as any)
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
  
  return client as Client;
}
