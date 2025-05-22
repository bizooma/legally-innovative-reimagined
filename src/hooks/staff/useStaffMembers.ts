
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { fetchStaffMembers, StaffMember } from './types';
import { useStaffDialog } from './useStaffDialog';
import { useStaffActions } from './useStaffActions';
import { useAdminStatus } from './useAdminStatus';

export { StaffMember } from './types';

export function useStaffMembers() {
  // Get admin status
  const { isAdmin } = useAdminStatus();
  
  // Handle deletion confirmation dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState<string | null>(null);
  
  // Fetch staff members from Supabase
  const { 
    data: staffMembers, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['staffMembers'],
    queryFn: fetchStaffMembers
  });
  
  // Get dialog state and handlers
  const dialogState = useStaffDialog();
  
  // Get staff action handlers
  const staffActions = useStaffActions(refetch);
  
  // Handle errors
  if (error) {
    console.error('Error fetching staff members:', error);
    toast({
      title: 'Error',
      description: 'Failed to load staff directory. Please try again.',
      variant: 'destructive',
    });
  }

  // Function to handle delete confirmation
  const handleDeleteClick = (id: string) => {
    setStaffToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  // Confirm delete
  const confirmDelete = () => {
    if (staffToDelete) {
      staffActions.deleteStaffMember(staffToDelete);
      setIsDeleteDialogOpen(false);
      setStaffToDelete(null);
    }
  };

  return {
    staffMembers: staffMembers || [],
    isLoading,
    isError: !!error,
    refetch,
    ...dialogState,
    ...staffActions,
    isAdmin,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    staffToDelete,
    handleDeleteClick,
    confirmDelete
  };
}
