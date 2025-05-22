
import React from 'react';
import { User, PhoneCall, Building2, Pencil, Trash2 } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import AddStaffMemberDialog from './AddStaffMemberDialog';
import EditStaffMemberDialog from './EditStaffMemberDialog';
import { useStaffMembers } from '@/hooks/useStaffMembers';
import { useState } from 'react';

const StaffDirectory: React.FC = () => {
  const {
    staffMembers,
    isLoading,
    isError,
    isDialogOpen,
    openAddStaffDialog,
    closeAddStaffDialog,
    isEditDialogOpen,
    openEditStaffDialog,
    closeEditStaffDialog,
    currentStaffMember,
    deleteStaffMember,
    updateStaffMember
  } = useStaffMembers();
  
  const [staffToDelete, setStaffToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const handleDeleteClick = (id: string) => {
    setStaffToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (staffToDelete) {
      deleteStaffMember(staffToDelete);
      setIsDeleteDialogOpen(false);
      setStaffToDelete(null);
    }
  };
  
  const cancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setStaffToDelete(null);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Team Directory</CardTitle>
          <CardDescription>Staff members and contact information</CardDescription>
        </div>
        <Button onClick={openAddStaffDialog} size="sm" className="h-9">
          Add Staff Member
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-4">Loading staff directory...</div>
        ) : isError ? (
          <div className="text-center py-4 text-red-500">
            Failed to load staff directory. Please try again.
          </div>
        ) : staffMembers.length === 0 ? (
          <div className="text-center py-8">
            <User className="h-12 w-12 mx-auto text-gray-400" />
            <p className="mt-2 text-gray-600">No staff members added yet.</p>
            <Button 
              onClick={openAddStaffDialog} 
              variant="outline" 
              className="mt-4"
            >
              Add your first staff member
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Phone</TableHead>
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
                    <TableCell>{staff.phone || '-'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => openEditStaffDialog(staff)}
                          className="h-8 w-8"
                          title="Edit staff member"
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteClick(staff.id)}
                          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-100"
                          title="Delete staff member"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      <AddStaffMemberDialog 
        isOpen={isDialogOpen} 
        onClose={closeAddStaffDialog} 
      />
      
      {currentStaffMember && (
        <EditStaffMemberDialog 
          isOpen={isEditDialogOpen} 
          onClose={closeEditStaffDialog}
          staffMember={currentStaffMember}
          onUpdate={updateStaffMember}
        />
      )}
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the staff member from the directory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default StaffDirectory;
