import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { StaffDocumentWithUrl } from '@/types/staffDocument';
import { StaffMember } from '@/hooks/useStaffMembers';
import { 
  fetchAllDocuments, 
  getDocumentAssignments,
  uploadStaffDocument,
  deleteDocument as deleteStaffDocument,
  assignDocumentToStaff,
  removeDocumentAssignment,
  getStaffDocuments
} from '@/services/documentService';

export const useStaffDocuments = (staffId?: string) => {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<StaffDocumentWithUrl | null>(null);
  const [selectedStaffIds, setSelectedStaffIds] = useState<string[]>([]);
  
  // Fetch all documents or just those assigned to a specific staff member
  const { 
    data: documents = [], 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['staffDocuments', staffId],
    queryFn: async () => {
      if (staffId) {
        return await getStaffDocuments(staffId);
      } else {
        return await fetchAllDocuments();
      }
    }
  });
  
  // Fetch document assignments
  const { 
    data: documentAssignments = {},
    refetch: refetchAssignments
  } = useQuery({
    queryKey: ['documentAssignments'],
    queryFn: async () => {
      if (!documents.length) return {};
      
      const assignments: Record<string, StaffMember[]> = {};
      for (const doc of documents) {
        assignments[doc.id] = await getDocumentAssignments(doc.id);
      }
      
      return assignments;
    },
    enabled: documents.length > 0 && !staffId,
  });
  
  // Handle upload
  const handleUpload = async (file: File, description?: string) => {
    try {
      const result = await uploadStaffDocument(file, description || null);
      if (result) {
        toast({
          title: "Success",
          description: "Document uploaded successfully",
        });
        refetch();
        return true;
      }
      throw new Error("Upload failed");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload document",
        variant: "destructive",
      });
      return false;
    }
  };
  
  // Handle delete
  const handleDelete = async (documentId: string) => {
    try {
      const success = await deleteStaffDocument(documentId);
      if (success) {
        toast({
          title: "Success",
          description: "Document deleted successfully",
        });
        refetch();
        return true;
      }
      throw new Error("Delete failed");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive",
      });
      return false;
    }
  };
  
  // Open assignment dialog
  const openAssignDialog = (document: StaffDocumentWithUrl) => {
    setCurrentDocument(document);
    
    // Pre-select currently assigned staff
    const assigned = documentAssignments[document.id] || [];
    setSelectedStaffIds(assigned.map((staff: StaffMember) => staff.id));
    
    setIsAssignDialogOpen(true);
  };
  
  // Handle document assignment
  const handleAssignment = async (documentId: string, staffIds: string[]) => {
    try {
      // Get current assignments
      const currentAssignments = documentAssignments[documentId] || [];
      const currentIds = currentAssignments.map((staff: StaffMember) => staff.id);
      
      // Find staff to add and remove
      const toAdd = staffIds.filter(id => !currentIds.includes(id));
      const toRemove = currentIds.filter(id => !staffIds.includes(id));
      
      // Add new assignments
      if (toAdd.length > 0) {
        await assignDocumentToStaff(documentId, toAdd);
      }
      
      // Remove old assignments
      for (const staffId of toRemove) {
        await removeDocumentAssignment(documentId, staffId);
      }
      
      toast({
        title: "Success",
        description: "Document assignments updated",
      });
      
      // Refresh assignments
      refetchAssignments();
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update assignments",
        variant: "destructive",
      });
      return false;
    }
  };
  
  return {
    documents,
    documentAssignments,
    isLoading,
    error,
    refetch,
    isUploadDialogOpen,
    setIsUploadDialogOpen,
    isAssignDialogOpen,
    setIsAssignDialogOpen,
    currentDocument,
    setCurrentDocument,
    selectedStaffIds,
    setSelectedStaffIds,
    handleUpload,
    handleDelete,
    openAssignDialog,
    handleAssignment,
  };
};
