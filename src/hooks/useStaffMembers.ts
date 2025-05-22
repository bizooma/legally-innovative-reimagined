
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface StaffMember {
  id: string;
  full_name: string;
  position: string;
  email: string;
  phone: string | null;
  department: string | null;
  created_at: string;
  updated_at: string;
}

export const useStaffMembers = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [currentStaffMember, setCurrentStaffMember] = useState<StaffMember | null>(null);
  
  // Fetch staff members from Supabase
  const { data: staffMembers, isLoading, error, refetch } = useQuery({
    queryKey: ['staffMembers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('staff_members')
        .select('*')
        .order('full_name', { ascending: true });
        
      if (error) {
        throw error;
      }
      
      return data as StaffMember[];
    }
  });

  // Open the dialog for adding a new staff member
  const openAddStaffDialog = () => {
    setIsDialogOpen(true);
  };

  // Close the dialog for adding a new staff member
  const closeAddStaffDialog = () => {
    setIsDialogOpen(false);
  };
  
  // Open the dialog for editing a staff member
  const openEditStaffDialog = (staffMember: StaffMember) => {
    setCurrentStaffMember(staffMember);
    setIsEditDialogOpen(true);
  };

  // Close the dialog for editing a staff member
  const closeEditStaffDialog = () => {
    setIsEditDialogOpen(false);
    setCurrentStaffMember(null);
  };
  
  // Open the dialog for assigning password to a staff member
  const openPasswordDialog = (staffMember: StaffMember) => {
    setCurrentStaffMember(staffMember);
    setIsPasswordDialogOpen(true);
  };
  
  // Close the dialog for assigning password
  const closePasswordDialog = () => {
    setIsPasswordDialogOpen(false);
    setCurrentStaffMember(null);
  };
  
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
      
      closePasswordDialog();
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
      
      closeEditStaffDialog();
      refetch();
    } catch (error) {
      console.error('Error updating staff member:', error);
      toast({
        title: 'Error',
        description: 'Failed to update staff member. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Handle errors
  if (error) {
    console.error('Error fetching staff members:', error);
    toast({
      title: 'Error',
      description: 'Failed to load staff directory. Please try again.',
      variant: 'destructive',
    });
  }

  return {
    staffMembers: staffMembers || [],
    isLoading,
    isError: !!error,
    refetch,
    isDialogOpen,
    openAddStaffDialog,
    closeAddStaffDialog,
    isEditDialogOpen,
    openEditStaffDialog,
    closeEditStaffDialog,
    currentStaffMember,
    deleteStaffMember,
    updateStaffMember,
    isPasswordDialogOpen,
    openPasswordDialog,
    closePasswordDialog,
    assignPassword
  };
};
