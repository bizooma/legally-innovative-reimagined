
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
      
      console.log('Document assignment changes:', {
        documentId,
        staffIds,
        currentIds,
        currentlyAssigned
      });
      
      // Clear all existing assignments first to avoid duplicate key errors
      // This is a simple approach to ensure we don't have issues with duplicate assignments
      for (const staffId of currentIds) {
        await removeDocumentAssignment(documentId, staffId);
      }
      
      // Add new assignments
      if (staffIds.length > 0) {
        const success = await assignDocumentToStaff(documentId, staffIds);
        if (!success) {
          throw new Error("Failed to assign document to staff members");
        }
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
