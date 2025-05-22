
import React from 'react';
import { User, PhoneCall, Building2 } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import AddStaffMemberDialog from './AddStaffMemberDialog';
import { useStaffMembers } from '@/hooks/useStaffMembers';

const StaffDirectory: React.FC = () => {
  const {
    staffMembers,
    isLoading,
    isError,
    isDialogOpen,
    openAddStaffDialog,
    closeAddStaffDialog
  } = useStaffMembers();

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
    </Card>
  );
};

export default StaffDirectory;
