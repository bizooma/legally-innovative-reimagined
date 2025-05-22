
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { StaffMember } from '@/hooks/staff/types';

interface AssignDocumentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  staffMembers: StaffMember[];
  selectedStaffIds: string[];
  onToggleStaff: (staffId: string) => void;
  onSave: () => Promise<void>;
}

const AssignDocumentDialog: React.FC<AssignDocumentDialogProps> = ({
  isOpen,
  onOpenChange,
  staffMembers,
  selectedStaffIds,
  onToggleStaff,
  onSave
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Document</DialogTitle>
          <DialogDescription>
            Select staff members who should have access to this document
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 max-h-[300px] overflow-y-auto">
          {staffMembers.map((staff) => (
            <div key={staff.id} className="flex items-center space-x-2 py-2 border-b">
              <Checkbox
                id={`staff-${staff.id}`}
                checked={selectedStaffIds.includes(staff.id)}
                onCheckedChange={() => onToggleStaff(staff.id)}
              />
              <Label htmlFor={`staff-${staff.id}`} className="flex-1">
                {staff.full_name}
                <span className="block text-xs text-gray-500">
                  {staff.position}
                </span>
              </Label>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>
            Save Assignments
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignDocumentDialog;
