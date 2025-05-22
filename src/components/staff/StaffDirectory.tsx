
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useStaffMembers } from '@/hooks/staff/useStaffMembers';
import AddStaffMemberDialog from './AddStaffMemberDialog';
import EditStaffMemberDialog from './EditStaffMemberDialog';
import AssignPasswordDialog from './AssignPasswordDialog';
import DeleteStaffDialog from './DeleteStaffDialog';
import StaffDirectoryHeader from './StaffDirectoryHeader';
import StaffDirectoryContent from './StaffDirectoryContent';

const StaffDirectory: React.FC = () => {
  const { 
    staffMembers, 
    isLoading,
    isAddDialogOpen,
    openAddStaffDialog,
    closeAddStaffDialog,
    isEditDialogOpen,
    openEditStaffDialog,
    closeEditStaffDialog,
    currentStaffMember,
    updateStaffMember,
    isPasswordDialogOpen,
    openPasswordDialog,
    closePasswordDialog,
    assignPassword,
    isAdmin,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleDeleteClick,
    confirmDelete
  } = useStaffMembers();

  return (
    <>
      <Card>
        <CardHeader>
          <StaffDirectoryHeader 
            isAdmin={isAdmin} 
            onAddClick={openAddStaffDialog} 
          />
        </CardHeader>
        <CardContent>
          <StaffDirectoryContent 
            isLoading={isLoading}
            staffMembers={staffMembers}
            isAdmin={isAdmin}
            onEdit={openEditStaffDialog}
            onDelete={handleDeleteClick}
            onPassword={openPasswordDialog}
          />
        </CardContent>
      </Card>

      {/* Add Staff Member Dialog */}
      <AddStaffMemberDialog isOpen={isAddDialogOpen} onClose={closeAddStaffDialog} />
      
      {/* Edit Staff Member Dialog */}
      {currentStaffMember && isEditDialogOpen && (
        <EditStaffMemberDialog
          isOpen={isEditDialogOpen}
          onClose={closeEditStaffDialog}
          staffMember={currentStaffMember}
          onUpdate={updateStaffMember}
        />
      )}
      
      {/* Assign Password Dialog */}
      {currentStaffMember && isPasswordDialogOpen && (
        <AssignPasswordDialog
          isOpen={isPasswordDialogOpen}
          onClose={closePasswordDialog}
          staffMember={currentStaffMember}
          onAssignPassword={assignPassword}
        />
      )}
      
      {/* Delete Confirmation Dialog */}
      <DeleteStaffDialog
        isOpen={isDeleteDialogOpen}
        onClose={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default StaffDirectory;
