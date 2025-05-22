
import React from 'react';
import { Table, TableBody } from '@/components/ui/table';
import { StaffMember } from '@/hooks/staff/types';
import StaffTableHeader from './StaffTableHeader';
import StaffTableRow from './StaffTableRow';

interface StaffTableProps {
  staffMembers: StaffMember[];
  isAdmin: boolean;
  onEdit: (staff: StaffMember) => void;
  onDelete: (id: string) => void;
  onPassword: (staff: StaffMember) => void;
}

const StaffTable: React.FC<StaffTableProps> = ({ 
  staffMembers, 
  isAdmin, 
  onEdit, 
  onDelete, 
  onPassword 
}) => {
  return (
    <Table>
      <StaffTableHeader />
      <TableBody>
        {staffMembers.map((staff) => (
          <StaffTableRow
            key={staff.id}
            staff={staff}
            isAdmin={isAdmin}
            onEdit={onEdit}
            onDelete={onDelete}
            onPassword={onPassword}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default StaffTable;
