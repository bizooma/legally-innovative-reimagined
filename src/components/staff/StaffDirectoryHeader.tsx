
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface StaffDirectoryHeaderProps {
  isAdmin: boolean;
  onAddClick: () => void;
}

const StaffDirectoryHeader: React.FC<StaffDirectoryHeaderProps> = ({ isAdmin, onAddClick }) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div>
        <CardTitle>Team Directory</CardTitle>
        <CardDescription>Manage staff members and contact information</CardDescription>
      </div>
      {isAdmin && (
        <Button onClick={onAddClick} className="flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Staff Member
        </Button>
      )}
    </div>
  );
};

export default StaffDirectoryHeader;
