
import { useQuery } from '@tanstack/react-query';
import { 
  fetchAllDocuments,
  getStaffDocumentAssignments
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
    refetch: refetchAssignments
  } = useQuery({
    queryKey: ['documentAssignments', documents],
    queryFn: async () => {
      if (!documents.length) return {};
      
      console.log('Fetching assignments for documents:', documents.map(d => d.id));
      const assignments: Record<string, any[]> = {};
      for (const doc of documents) {
        assignments[doc.id] = await getStaffDocumentAssignments(doc.id);
      }
      
      console.log('Document assignments retrieved:', assignments);
      return assignments;
    },
    enabled: documents.length > 0 && !staffId,
  });

  return {
    documents,
    documentAssignments,
    isLoading,
    error,
    refetch,
    refetchAssignments
  };
}
