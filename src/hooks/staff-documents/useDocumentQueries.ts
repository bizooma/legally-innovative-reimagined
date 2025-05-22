
import { useQuery } from '@tanstack/react-query';
import { 
  fetchAllDocuments,
  getStaffDocumentAssignments,
  getDocumentAssignments
} from '@/services/staff-documents';
import { getStaffDocuments } from '@/services/staff-documents/utils';
import { ensureStorageBucket } from '@/services/staff-documents/storage';
import { useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';

export function useDocumentQueries(staffId?: string) {
  // State to track if bucket exists
  const [bucketExists, setBucketExists] = useState<boolean | null>(null);

  // Check storage bucket exists on first load
  useEffect(() => {
    const checkBucket = async () => {
      try {
        console.log("useDocumentQueries: Checking bucket existence");
        const exists = await ensureStorageBucket();
        console.log(`useDocumentQueries: Bucket exists: ${exists}`);
        setBucketExists(exists);
        if (!exists) {
          console.error('Storage bucket does not exist or could not be created');
        }
      } catch (error) {
        console.error("Error checking bucket:", error);
        setBucketExists(false);
      }
    };
    
    checkBucket();
  }, []);

  // Fetch all documents or just those assigned to a specific staff member
  const { 
    data: documents = [], 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['staffDocuments', staffId],
    queryFn: async () => {
      console.log('useDocumentQueries: Fetching with staffId:', staffId);
      if (staffId) {
        console.log(`useDocumentQueries: Fetching for staff member: ${staffId}`);
        try {
          // If bucket doesn't exist and we've checked, show warning
          if (bucketExists === false) {
            toast({
              title: "Storage not configured",
              description: "Document storage is not properly configured. Please contact an administrator.",
              variant: "destructive", 
            });
          }
          
          const docs = await getStaffDocuments(staffId);
          console.log(`useDocumentQueries: Retrieved ${docs.length} docs for staff ${staffId}`);
          return docs;
        } catch (error) {
          console.error("Error fetching staff documents:", error);
          throw error;
        }
      } else {
        console.log('useDocumentQueries: Fetching all documents (admin view)');
        try {
          const allDocs = await fetchAllDocuments();
          console.log(`useDocumentQueries: Retrieved ${allDocs.length} docs (all documents)`);
          return allDocs;
        } catch (error) {
          console.error("Error fetching all documents:", error);
          throw error;
        }
      }
    },
    staleTime: 1000 * 10, // 10 seconds instead of 30 for more frequent updates
    retry: 3,
    refetchOnWindowFocus: true,
    // Only run the query if we've checked the bucket status or if we're in admin mode (no staffId)
    enabled: bucketExists !== null || !staffId,
  });
  
  // Fetch document assignments
  const { 
    data: documentAssignments = {},
    isLoading: isLoadingAssignments,
    error: assignmentError,
    refetch: refetchAssignments
  } = useQuery({
    queryKey: ['documentAssignments', documents.map(d => d.id).join(',')],
    queryFn: async () => {
      if (!documents.length) return {};
      
      console.log('useDocumentQueries: Fetching assignments for documents:', 
        documents.map(d => d.id));
      
      const assignments: Record<string, any[]> = {};
      
      // Fetch assignments for each document
      for (const doc of documents) {
        try {
          console.log(`useDocumentQueries: Fetching assignments for doc: ${doc.id}`);
          assignments[doc.id] = await getDocumentAssignments(doc.id);
          console.log(`useDocumentQueries: Doc ${doc.id} has ${assignments[doc.id].length} assignments`);
        } catch (error) {
          console.error(`Error fetching assignments for document ${doc.id}:`, error);
          assignments[doc.id] = [];
        }
      }
      
      console.log('useDocumentQueries: All assignments retrieved:', 
        Object.keys(assignments).length);
      
      return assignments;
    },
    enabled: documents.length > 0,
    staleTime: 1000 * 10, // 10 seconds
    refetchOnWindowFocus: true,
  });

  // Function to force refresh all data
  const refreshAllData = async () => {
    try {
      await refetch();
      if (documents.length > 0) {
        await refetchAssignments();
      }
      return true;
    } catch (error) {
      console.error("Error refreshing document data:", error);
      return false;
    }
  };

  return {
    documents,
    documentAssignments,
    isLoading,
    isLoadingAssignments,
    error,
    assignmentError,
    refetch,
    refetchAssignments,
    refreshAllData,
    bucketExists
  };
}
