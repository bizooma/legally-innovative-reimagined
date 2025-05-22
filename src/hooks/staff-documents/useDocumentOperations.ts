
import { toast } from '@/hooks/use-toast';
import { 
  uploadStaffDocument,
  deleteDocument as deleteStaffDocument,
  assignDocumentToStaff,
  removeDocumentAssignment,
  removeAllDocumentAssignments
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
  const handleAssignment = async (documentId: string, staffIds: string[], currentAssignments: Record<string, any[]> = {}) => {
    try {
      console.log('Document assignment operation starting:', {
        documentId,
        staffIds,
        currentAssignments: currentAssignments[documentId] ? currentAssignments[documentId].length : 0,
      });
      
      // First, completely remove all existing assignments
      console.log('Removing all existing assignments for document:', documentId);
      await removeAllDocumentAssignments(documentId);
      
      // Wait to ensure removals are processed
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Now add all new assignments if any are selected
      if (staffIds.length > 0) {
        console.log(`Adding ${staffIds.length} new assignments...`);
        try {
          const success = await assignDocumentToStaff(documentId, staffIds);
          if (!success) {
            throw new Error("Failed to assign document to staff members");
          }
          console.log('Successfully added new assignments');
        } catch (err) {
          console.error('Error adding new assignments:', err);
          throw err;
        }
      } else {
        console.log('No new assignments to add');
      }
      
      toast({
        title: "Success",
        description: "Document assignments updated",
      });
      
      // Refresh assignments
      if (refetchAssignments) {
        console.log('Requesting assignment data refresh...');
        // Delay the refetch to ensure database has time to update
        setTimeout(() => {
          console.log('Refreshing assignment data now');
          refetchAssignments();
        }, 1500);
      }
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
