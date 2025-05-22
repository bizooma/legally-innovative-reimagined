
import { useQuery } from '@tanstack/react-query';
import { 
  fetchAllDocuments,
  getStaffDocumentAssignments
} from '@/services/staff-documents';
import { getStaffDocuments } from '@/services/staff-documents/utils';

export function useDocumentQueries(staffId?: string) {
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
        const docs = await getStaffDocuments(staffId);
        console.log(`Retrieved ${docs.length} documents for staff ID ${staffId}`);
        return docs;
      } else {
        const allDocs = await fetchAllDocuments();
        console.log(`Retrieved ${allDocs.length} documents (all documents)`);
        return allDocs;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
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
