
import { StaffDocumentWithUrl } from '@/types/staffDocument';
import { useDocumentState } from './useDocumentState';
import { useDocumentOperations } from './useDocumentOperations';
import { useDocumentQueries } from './useDocumentQueries';

export function useStaffDocuments(staffId?: string) {
  // Get document queries
  const { 
    documents, 
    documentAssignments, 
    isLoading, 
    error, 
    refetch,
    refetchAssignments 
  } = useDocumentQueries(staffId);
  
  // Get document state
  const documentState = useDocumentState();
  
  // Get document operations
  const documentOperations = useDocumentOperations(refetch, refetchAssignments);

  // Handle document assignment with proper type handling
  const handleAssignment = async (documentId: string, staffIds: string[]) => {
    return documentOperations.handleAssignment(documentId, staffIds, documentAssignments);
  };
  
  return {
    // Document data
    documents,
    documentAssignments,
    isLoading,
    error,
    refetch,
    
    // Document state
    ...documentState,
    
    // Document operations
    handleUpload: documentOperations.handleUpload,
    handleDelete: documentOperations.handleDelete,
    handleAssignment,
  };
}

// Re-export all from the index file
export * from './useDocumentState';
export * from './useDocumentOperations';
export * from './useDocumentQueries';
