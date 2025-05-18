
import { supabase } from '@/integrations/supabase/client';
import { Client } from '@/types/database';
import { ClientFormValues } from '@/schemas/clientSchema';
import { DatabaseTables } from '@/types/supabase';

export async function addClient(data: ClientFormValues, userId: string): Promise<Client> {
  // Use the proper type casting with our DatabaseTables interface
  const { data: client, error } = await supabase
    .from<DatabaseTables['clients']>('clients')
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
