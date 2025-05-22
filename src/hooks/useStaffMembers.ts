
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

  // Open the dialog
  const openAddStaffDialog = () => {
    setIsDialogOpen(true);
  };

  // Close the dialog
  const closeAddStaffDialog = () => {
    setIsDialogOpen(false);
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
    closeAddStaffDialog
  };
};
