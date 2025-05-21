
import { supabase } from '@/integrations/supabase/client';
import { ContactFormValues } from '@/components/portal/ContactForm';

export async function createClientContact(data: ContactFormValues): Promise<void> {
  // First, create the user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: `${data.firstName} ${data.lastName}`,
        client_id: data.clientId,
      }
    }
  });
  
  if (authError) throw authError;

  // Make sure users table entry is created with the client_id
  if (authData.user) {
    const { error: updateError } = await supabase
      .from('users')
      .update({ 
        client_id: data.clientId,
        is_admin: false,
      })
      .eq('id', authData.user.id);
      
    if (updateError) throw updateError;
  }
}

export async function adminSetPassword(email: string, password: string): Promise<void> {
  // Call the admin-password-management edge function to set the password
  const { error } = await supabase.functions.invoke('admin-password-management', {
    body: {
      email,
      password,
      action: 'create_or_update' // Simplified to a single action
    }
  });
  
  if (error) throw error;
}
