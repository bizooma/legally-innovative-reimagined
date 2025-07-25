import { supabase } from '@/integrations/supabase/client';
import { createPugetLawUser } from './resetAdminPassword';

export const createAndLinkClientUser = async (email: string, clientId: string) => {
  try {
    console.log(`Creating user ${email} and linking to client ${clientId}`);
    
    // First create the user via the edge function
    await createPugetLawUser();
    
    // Wait a moment for the user to be created
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Now update the user to link them to the client
    const { data: userData, error: userError } = await supabase
      .from('users')
      .update({ 
        client_id: clientId,
        is_admin: false 
      })
      .eq('email', email)
      .select();

    if (userError) {
      console.error('Error linking user to client:', userError);
      throw userError;
    }

    if (!userData || userData.length === 0) {
      throw new Error(`User with email ${email} not found after creation`);
    }

    console.log('User successfully created and linked to client:', userData[0]);
    return userData[0];
  } catch (error) {
    console.error('Failed to create and link client user:', error);
    throw error;
  }
};

// Create the Puget Law Group user specifically
export const createPugetLawGroupUser = () => {
  return createAndLinkClientUser('dmontgomery@pugetlawgroup.com', '9d7fc8c7-795e-4a3d-acd1-3b34173a53f8');
};