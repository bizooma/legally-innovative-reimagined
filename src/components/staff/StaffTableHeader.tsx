
import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const StaffTableHeader: React.FC = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Position</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Department</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default StaffTableHeader;
