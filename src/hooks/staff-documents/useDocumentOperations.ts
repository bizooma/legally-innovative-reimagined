
import { toast } from '@/hooks/use-toast';
import { 
  uploadStaffDocument,
  deleteDocument as deleteStaffDocument,
  assignDocumentToStaff,
  removeDocumentAssignment
} from '@/services/staff-documents';

export function useDocumentOperations(refetch: () => void, refetchAssignments?: () => void) {
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
      console.error('Error uploading document:', error);
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
      console.error('Error deleting document:', error);
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive",
      });
      return false;
    }
  };
  
  // Handle document assignment
  const handleAssignment = async (documentId: string, staffIds: string[], currentAssignments: Record<string, any[]>) => {
    try {
      // Get current assignments
      const currentlyAssigned = currentAssignments[documentId] || [];
      const currentIds = currentlyAssigned.map((staff: any) => staff.id);
      
      // Find staff to add and remove
      const toAdd = staffIds.filter(id => !currentIds.includes(id));
      const toRemove = currentIds.filter(id => !staffIds.includes(id));
      
      console.log('Document assignment changes:', {
        documentId,
        toAdd,
        toRemove,
        currentIds,
        newIds: staffIds
      });
      
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
      if (refetchAssignments) refetchAssignments();
      return true;
    } catch (error) {
      console.error('Error updating document assignments:', error);
      toast({
        title: "Error",
        description: "Failed to update assignments",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    handleUpload,
    handleDelete,
    handleAssignment
  };
}
