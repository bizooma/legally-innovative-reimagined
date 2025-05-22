
import React from 'react';
import { Pencil, Trash2, Key } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { StaffMember } from '@/hooks/staff/types';

interface StaffTableRowProps {
  staff: StaffMember;
  isAdmin: boolean;
  onEdit: (staff: StaffMember) => void;
  onDelete: (id: string) => void;
  onPassword: (staff: StaffMember) => void;
}

const StaffTableRow: React.FC<StaffTableRowProps> = ({ 
  staff, 
  isAdmin, 
  onEdit, 
  onDelete, 
  onPassword 
}) => {
  return (
    <TableRow key={staff.id}>
      <TableCell className="font-medium">{staff.full_name}</TableCell>
      <TableCell>{staff.position}</TableCell>
      <TableCell>{staff.email}</TableCell>
      <TableCell>{staff.department || '-'}</TableCell>
      <TableCell className="text-right flex justify-end gap-2">
        {isAdmin && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onPassword(staff)}
              title="Assign Password"
            >
              <Key className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(staff)}
              title="Edit Staff Member"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(staff.id)}
              title="Delete Staff Member"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default StaffTableRow;
