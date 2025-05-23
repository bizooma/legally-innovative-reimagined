
import React from 'react';
import StaffDocuments from '@/components/staff/StaffDocuments';

interface StaffDocumentsSectionProps {
  currentStaffMember: any;
}

const StaffDocumentsSection: React.FC<StaffDocumentsSectionProps> = ({ currentStaffMember }) => {
  if (!currentStaffMember) {
    return null;
  }
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Company Documents</h2>
      <StaffDocuments staffMemberId={currentStaffMember.id} />
    </div>
  );
};

export default StaffDocumentsSection;
