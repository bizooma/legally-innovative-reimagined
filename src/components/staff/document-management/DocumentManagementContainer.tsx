
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, RefreshCw } from 'lucide-react';
import { useStaffDocuments } from '@/hooks/staff-documents';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { StaffMember } from '@/hooks/staff/types';

// Import our components
import UploadDocumentDialog from './UploadDocumentDialog';
import DocumentDeleteDialog from './DocumentDeleteDialog';
import AssignDocumentDialog from './AssignDocumentDialog';
import DocumentTable from './DocumentTable';
import EmptyDocumentState from './EmptyDocumentState';
import { toast } from '@/hooks/use-toast';

const DocumentManagementContainer: React.FC = () => {
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
    handleUpload,
    handleDelete,
    handleAssignment,
    refetch,
    refetchAssignments
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

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Staff Documents</CardTitle>
          <CardDescription>Upload and assign documents to staff members</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            className="flex items-center" 
            onClick={() => setIsUploadDialogOpen(true)}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-10">Loading documents...</div>
        ) : documents.length === 0 ? (
          <EmptyDocumentState />
        ) : (
          <>
            <DocumentTable 
              documents={documents}
              assignedStaff={documentAssignments}
              onAssign={onAssignRequest}
              onDelete={onDeleteRequest}
              isLoadingAssignments={isLoadingAssignments}
            />
            {isLoadingAssignments && (
              <div className="mt-2 text-xs text-gray-500">Loading assignments...</div>
            )}
          </>
        )}
      </CardContent>

      {/* Dialogs */}
      <UploadDocumentDialog 
        isOpen={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
        onUpload={handleUpload}
      />

      <DocumentDeleteDialog 
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
      />

      <AssignDocumentDialog 
        isOpen={isAssignDialogOpen}
        onOpenChange={setIsAssignDialogOpen}
        staffMembers={staffMembers}
        selectedStaffIds={selectedStaffIds}
        onToggleStaff={toggleStaffSelection}
        onSave={saveAssignment}
      />
    </Card>
  );
};

export default DocumentManagementContainer;
