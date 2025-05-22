
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
    currentAssignedIds: string[] = []
  ) => {
    setCurrentDocument(document);
    
    // Pre-select currently assigned staff
    setSelectedStaffIds(currentAssignedIds);
    
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
