
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { StaffMember } from './types';

export function useStaffActions(refetch: () => void) {
  // Assign password to a staff member
  const assignPassword = async (email: string, password: string) => {
    try {
      const { error, data } = await supabase.functions.invoke('admin-password-management', {
        body: {
          email,
          password,
          action: 'create_or_update'
        }
      });
      
      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`Error: ${error.message}`);
      }
      
      if (data?.error) {
        console.error('Password management error:', data.error);
        throw new Error(data.error);
      }
      
      toast({
        title: 'Success',
        description: 'Password has been assigned successfully.',
      });
      
      return true;
    } catch (error) {
      console.error('Error assigning password:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to assign password';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      
      // Re-throw the error so the dialog component can handle it
      throw error;
    }
  };
  
  // Delete a staff member
  const deleteStaffMember = async (id: string) => {
    try {
      const { error } = await supabase
        .from('staff_members')
        .delete()
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Success',
        description: 'Staff member has been removed.',
      });
      
      refetch();
    } catch (error) {
      console.error('Error deleting staff member:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete staff member. Please try again.',
        variant: 'destructive',
      });
    }
  };
  
  // Update a staff member
  const updateStaffMember = async (staffMember: StaffMember) => {
    try {
      const { error } = await supabase
        .from('staff_members')
        .update({
          full_name: staffMember.full_name,
          position: staffMember.position,
          email: staffMember.email,
          phone: staffMember.phone,
          department: staffMember.department,
          updated_at: new Date().toISOString(),
        })
        .eq('id', staffMember.id);
        
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Success',
        description: 'Staff member has been updated.',
      });
      
      refetch();
      return true;
    } catch (error) {
      console.error('Error updating staff member:', error);
      toast({
        title: 'Error',
        description: 'Failed to update staff member. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  };

  return {
    assignPassword,
    deleteStaffMember,
    updateStaffMember
  };
}
