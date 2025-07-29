import { supabase } from '@/integrations/supabase/client';

export async function resetUserPassword(email: string, newPassword: string): Promise<void> {
  try {
    console.log(`Attempting to reset password for ${email}`);
    
    const { data, error } = await supabase.functions.invoke('admin-password-management', {
      body: {
        email,
        password: newPassword,
        action: 'create_or_update'
      }
    });

    if (error) {
      console.error('Edge function error:', error);
      throw error;
    }

    console.log('Edge function response:', data);
    
    if (data && !data.success) {
      throw new Error(data.error || 'Password reset failed');
    }
    
    console.log(`Password reset successfully for ${email}`);
  } catch (error) {
    console.error('Failed to reset password:', error);
    throw error;
  }
}

// Execute the password reset for alanna_1989@hotmail.com
console.log('Starting password reset...');
resetUserPassword('alanna_1989@hotmail.com', 'Scott1019!')
  .then(() => console.log('Password reset completed successfully'))
  .catch(error => console.error('Password reset failed:', error));