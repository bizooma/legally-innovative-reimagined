
import React from 'react';
import { StaffMember } from '@/hooks/staff/types';
import StaffTable from './StaffTable';

interface StaffDirectoryContentProps {
  isLoading: boolean;
  staffMembers: StaffMember[];
  isAdmin: boolean;
  onEdit: (staff: StaffMember) => void;
  onDelete: (id: string) => void;
  onPassword: (staff: StaffMember) => void;
}

const StaffDirectoryContent: React.FC<StaffDirectoryContentProps> = ({
  isLoading,
  staffMembers,
  isAdmin,
  onEdit,
  onDelete,
  onPassword,
}) => {
  if (isLoading) {
    return <div className="py-6 text-center">Loading staff directory...</div>;
  }

  if (staffMembers.length === 0) {
    return <div className="py-6 text-center">No staff members found. Add some!</div>;
  }

  return (
    <StaffTable
      staffMembers={staffMembers}
      isAdmin={isAdmin}
      onEdit={onEdit}
      onDelete={onDelete}
      onPassword={onPassword}
    />
  );
};

export default StaffDirectoryContent;
