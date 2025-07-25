
import { supabase } from '@/integrations/supabase/client';

export const resetAdminPassword = async (email: string, newPassword: string) => {
  try {
    console.log(`Resetting password for ${email}`);
    
    const { data, error } = await supabase.functions.invoke('admin-password-management', {
      body: {
        email: email,
        password: newPassword,
        action: 'create_or_update'
      }
    });

    if (error) {
      console.error('Password reset error:', error);
      throw error;
    }

    console.log('Password reset successful:', data);
    return data;
  } catch (error) {
    console.error('Failed to reset password:', error);
    throw error;
  }
};

// Helper function to reset Joe's password specifically
export const resetJoePassword = () => {
  return resetAdminPassword('joe@bizooma.com', 'admin123');
};

// Function to create Puget Law Group user
export const createPugetLawUser = () => {
  return resetAdminPassword('dmontgomery@pugetlawgroup.com', 'pugetlawgroup2025');
};
