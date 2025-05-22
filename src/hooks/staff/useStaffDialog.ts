
import { useState } from 'react';
import { StaffMember, StaffDialogState } from './types';

export function useStaffDialog() {
  const [dialogState, setDialogState] = useState<StaffDialogState>({
    isAddDialogOpen: false,
    isEditDialogOpen: false,
    isPasswordDialogOpen: false,
    currentStaffMember: null,
  });

  // Open the dialog for adding a new staff member
  const openAddStaffDialog = () => {
    setDialogState(prev => ({
      ...prev,
      isAddDialogOpen: true
    }));
  };

  // Close the dialog for adding a new staff member
  const closeAddStaffDialog = () => {
    setDialogState(prev => ({
      ...prev,
      isAddDialogOpen: false
    }));
  };
  
  // Open the dialog for editing a staff member
  const openEditStaffDialog = (staffMember: StaffMember) => {
    setDialogState(prev => ({
      ...prev,
      currentStaffMember: staffMember,
      isEditDialogOpen: true
    }));
  };

  // Close the dialog for editing a staff member
  const closeEditStaffDialog = () => {
    setDialogState(prev => ({
      ...prev,
      isEditDialogOpen: false,
      currentStaffMember: null
    }));
  };
  
  // Open the dialog for assigning password to a staff member
  const openPasswordDialog = (staffMember: StaffMember) => {
    setDialogState(prev => ({
      ...prev,
      currentStaffMember: staffMember,
      isPasswordDialogOpen: true
    }));
  };
  
  // Close the dialog for assigning password
  const closePasswordDialog = () => {
    setDialogState(prev => ({
      ...prev,
      isPasswordDialogOpen: false,
      currentStaffMember: null
    }));
  };

  return {
    ...dialogState,
    openAddStaffDialog,
    closeAddStaffDialog,
    openEditStaffDialog,
    closeEditStaffDialog,
    openPasswordDialog,
    closePasswordDialog,
  };
}
