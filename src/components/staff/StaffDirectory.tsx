
import React from 'react';
import { PlusCircle, Pencil, Trash2, Key } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useStaffMembers } from '@/hooks/useStaffMembers';
import AddStaffMemberDialog from './AddStaffMemberDialog';
import EditStaffMemberDialog from './EditStaffMemberDialog';
import AssignPasswordDialog from './AssignPasswordDialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const StaffDirectory: React.FC = () => {
  const { 
    staffMembers, 
    isLoading,
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
  } = useStaffMembers();
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [staffToDelete, setStaffToDelete] = React.useState<string | null>(null);

  // Handle delete confirmation
  const handleDeleteClick = (id: string) => {
    setStaffToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  // Confirm delete
  const confirmDelete = () => {
    if (staffToDelete) {
      deleteStaffMember(staffToDelete);
      setIsDeleteDialogOpen(false);
      setStaffToDelete(null);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Team Directory</CardTitle>
            <CardDescription>Manage staff members and contact information</CardDescription>
          </div>
          <Button onClick={openAddStaffDialog} className="flex items-center">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Staff Member
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-6 text-center">Loading staff directory...</div>
          ) : staffMembers.length === 0 ? (
            <div className="py-6 text-center">No staff members found. Add some!</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staffMembers.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell className="font-medium">{staff.full_name}</TableCell>
                    <TableCell>{staff.position}</TableCell>
                    <TableCell>{staff.email}</TableCell>
                    <TableCell>{staff.department || '-'}</TableCell>
                    <TableCell className="text-right flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openPasswordDialog(staff)}
                        title="Assign Password"
                      >
                        <Key className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditStaffDialog(staff)}
                        title="Edit Staff Member"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(staff.id)}
                        title="Delete Staff Member"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add Staff Member Dialog */}
      <AddStaffMemberDialog isOpen={isDialogOpen} onClose={closeAddStaffDialog} />
      
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
      {isPasswordDialogOpen && (
        <AssignPasswordDialog
          isOpen={isPasswordDialogOpen}
          onClose={closePasswordDialog}
          staffMember={currentStaffMember}
          onAssignPassword={assignPassword}
        />
      )}
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the staff member.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default StaffDirectory;
