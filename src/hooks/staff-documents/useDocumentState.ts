
import { useState } from 'react';
import { StaffDocumentWithUrl } from '@/types/staffDocument';

export function useDocumentState() {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<StaffDocumentWithUrl | null>(null);
  const [selectedStaffIds, setSelectedStaffIds] = useState<string[]>([]);

  // Open assignment dialog with pre-selected staff
  const openAssignDialog = (
    document: StaffDocumentWithUrl,
    currentAssignments: Record<string, any[]> = {}
  ) => {
    setCurrentDocument(document);
    
    // Pre-select currently assigned staff
    const assigned = currentAssignments[document.id] || [];
    setSelectedStaffIds(assigned.map((staff: any) => staff.id));
    
    setIsAssignDialogOpen(true);
  };

  return {
    isUploadDialogOpen,
    setIsUploadDialogOpen,
    isAssignDialogOpen,
    setIsAssignDialogOpen,
    currentDocument,
    setCurrentDocument,
    selectedStaffIds,
    setSelectedStaffIds,
    openAssignDialog
  };
}
