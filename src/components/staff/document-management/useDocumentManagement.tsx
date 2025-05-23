
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useStaffDocuments } from '@/hooks/staff-documents';
import { toast } from '@/hooks/use-toast';
import { StaffMember } from '@/hooks/staff/types';

export function useDocumentManagement() {
  // Get staff members for assignment
  const { data: staffMembers = [], isLoading: isStaffLoading } = useQuery({
    queryKey: ['staffMembers'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('staff_members')
          .select('*')
          .order('full_name', { ascending: true });
        
        if (error) throw error;
        console.log("Fetched staff members:", data?.length || 0);
        return data || [];
      } catch (error) {
        console.error('Error loading staff members:', error);
        return [];
      }
    },
  });

  // Use our custom hook for document management
  const {
    documents,
    documentAssignments,
    isLoading,
    isLoadingAssignments,
    isUploadDialogOpen,
    setIsUploadDialogOpen,
    isAssignDialogOpen,
    setIsAssignDialogOpen,
    currentDocument,
    selectedStaffIds,
    setSelectedStaffIds,
    openAssignDialog,
    handleUpload, // Make sure we're accessing this from the useStaffDocuments hook
    handleDelete,
    handleAssignment,
    refetch,
    refetchAssignments,
    bucketExists,
    bucketChecked
  } = useStaffDocuments();

  const [refreshing, setRefreshing] = useState(false);

  // States for delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);

  // Handle document deletion request
  const onDeleteRequest = (id: string) => {
    setDocumentToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Confirm delete action
  const confirmDelete = async () => {
    if (!documentToDelete) return;

    await handleDelete(documentToDelete);
    setDeleteDialogOpen(false);
    setDocumentToDelete(null);
  };

  // Handle manual refresh of assignments
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
      await refetchAssignments();
      toast({
        title: "Refreshed",
        description: "Document assignments updated",
      });
    } catch (err) {
      console.error("Error refreshing:", err);
      toast({
        title: "Error",
        description: "Failed to refresh assignments",
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  };

  // Open assignment dialog with the current document
  const onAssignRequest = (documentId: string) => {
    const document = documents.find(doc => doc.id === documentId);
    if (document) {
      // Get current assignments and pre-select them in the dialog
      const assignedStaff = documentAssignments[documentId] || [];
      const currentAssignedIds = assignedStaff.map(staff => staff.id);
      
      console.log('Opening assignment dialog with:', {
        documentId,
        document: document.name,
        assignedStaffCount: assignedStaff.length,
        currentAssignedIds
      });
      
      openAssignDialog(document, currentAssignedIds);
    }
  };

  // Handle assignment save
  const saveAssignment = async () => {
    if (!currentDocument) return;
    
    console.log('Saving assignments:', {
      documentId: currentDocument.id,
      documentName: currentDocument.name,
      selectedStaffIds,
      selectedStaffCount: selectedStaffIds.length,
      currentAssignments: documentAssignments ? Object.keys(documentAssignments).length : 0
    });
    
    const success = await handleAssignment(currentDocument.id, selectedStaffIds, documentAssignments);
    
    if (success) {
      // Close the dialog
      setIsAssignDialogOpen(false);
      
      toast({
        title: "Assignments saved",
        description: `Document assigned to ${selectedStaffIds.length} staff members`
      });
      
      // Force refetch assignments after save with a delay to ensure DB is updated
      setTimeout(() => {
        console.log("Refreshing all data after save");
        refetch();
        refetchAssignments();
      }, 1500);
    }
  };

  // Toggle staff selection for document assignment
  const toggleStaffSelection = (staffId: string) => {
    console.log(`Toggling selection for staff ID: ${staffId}`);
    setSelectedStaffIds(prev => 
      prev.includes(staffId) 
        ? prev.filter(id => id !== staffId) 
        : [...prev, staffId]
    );
  };

  return {
    staffMembers,
    isStaffLoading,
    documents,
    documentAssignments,
    isLoading,
    isLoadingAssignments,
    isUploadDialogOpen,
    setIsUploadDialogOpen,
    isAssignDialogOpen,
    setIsAssignDialogOpen,
    currentDocument,
    selectedStaffIds,
    deleteDialogOpen,
    setDeleteDialogOpen,
    documentToDelete,
    refreshing,
    onDeleteRequest,
    confirmDelete,
    handleRefresh,
    onAssignRequest,
    saveAssignment,
    toggleStaffSelection,
    handleUpload, // Make sure to include handleUpload in the returned object
    bucketExists,
    bucketChecked
  };
}

export default useDocumentManagement;
