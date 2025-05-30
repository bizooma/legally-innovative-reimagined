
import { supabase } from '@/integrations/supabase/client';

export const makeUserAdmin = async (email: string) => {
  try {
    console.log(`Making ${email} an admin...`);
    
    const { data, error } = await supabase
      .from('users')
      .update({ is_admin: true })
      .eq('email', email)
      .select();

    if (error) {
      console.error('Error making user admin:', error);
      throw error;
    }

    if (data && data.length > 0) {
      console.log(`Successfully made ${email} an admin`);
      return data[0];
    } else {
      throw new Error(`User with email ${email} not found`);
    }
  } catch (error) {
    console.error('Failed to make user admin:', error);
    throw error;
  }
};

// Immediately execute to make alanna_1989@hotmail.com an admin
makeUserAdmin('alanna_1989@hotmail.com')
  .then(() => {
    console.log('✅ alanna_1989@hotmail.com is now an admin');
  })
  .catch((error) => {
    console.error('❌ Failed to make alanna_1989@hotmail.com an admin:', error);
  });
