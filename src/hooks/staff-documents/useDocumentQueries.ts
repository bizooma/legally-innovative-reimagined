
import { useQuery } from '@tanstack/react-query';
import { 
  fetchAllDocuments,
  getStaffDocumentAssignments,
  getDocumentAssignments
} from '@/services/staff-documents';
import { getStaffDocuments } from '@/services/staff-documents/utils';
import { ensureStorageBucket } from '@/services/staff-documents/storage';
import { useEffect } from 'react';

export function useDocumentQueries(staffId?: string) {
  // Check storage bucket exists on first load
  useEffect(() => {
    ensureStorageBucket().then(exists => {
      if (!exists) {
        console.error('Storage bucket does not exist or could not be created');
      }
    });
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
      console.log('useStaffDocuments hook fetching with staffId:', staffId);
      if (staffId) {
        console.log(`Fetching documents for staff member: ${staffId}`);
        const docs = await getStaffDocuments(staffId);
        console.log(`Retrieved ${docs.length} documents for staff ID ${staffId}`, docs);
        return docs;
      } else {
        console.log('Fetching all documents (admin view)');
        const allDocs = await fetchAllDocuments();
        console.log(`Retrieved ${allDocs.length} documents (all documents)`);
        return allDocs;
      }
    },
    staleTime: 1000 * 60, // 1 minute - reduced from 5 minutes for more frequent updates
    retry: 2,
    refetchOnWindowFocus: true,
  });
  
  // Fetch document assignments
  const { 
    data: documentAssignments = {},
    isLoading: isLoadingAssignments,
    error: assignmentError,
    refetch: refetchAssignments
  } = useQuery({
    queryKey: ['documentAssignments', documents],
    queryFn: async () => {
      if (!documents.length) return {};
      
      console.log('Fetching assignments for documents:', documents.map(d => d.id));
      const assignments: Record<string, any[]> = {};
      
      // Fetch assignments for each document
      for (const doc of documents) {
        console.log(`Fetching assignments for document: ${doc.id} - ${doc.name}`);
        assignments[doc.id] = await getDocumentAssignments(doc.id);
        console.log(`Document ${doc.id} has ${assignments[doc.id].length} assignments`);
      }
      
      console.log('Document assignments retrieved:', assignments);
      return assignments;
    },
    enabled: documents.length > 0,
    staleTime: 1000 * 30, // 30 seconds for assignments to improve refresh rate
    refetchOnWindowFocus: true,
  });

  return {
    documents,
    documentAssignments,
    isLoading,
    isLoadingAssignments,
    error,
    assignmentError,
    refetch,
    refetchAssignments
  };
}
