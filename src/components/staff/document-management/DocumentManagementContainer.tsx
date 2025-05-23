
import React from 'react';
import { Card } from '@/components/ui/card';

// Import our refactored components
import DocumentHeader from './DocumentHeader';
import DocumentContent from './DocumentContent';
import UploadDocumentDialog from './UploadDocumentDialog';
import DocumentDeleteDialog from './DocumentDeleteDialog';
import AssignDocumentDialog from './AssignDocumentDialog';
import useDocumentManagement from './useDocumentManagement';

const DocumentManagementContainer: React.FC = () => {
  const {
    staffMembers,
    documents,
    documentAssignments,
    isLoading,
    isLoadingAssignments,
    isUploadDialogOpen,
    setIsUploadDialogOpen,
    isAssignDialogOpen,
    setIsAssignDialogOpen,
    selectedStaffIds,
    deleteDialogOpen,
    setDeleteDialogOpen,
    refreshing,
    onDeleteRequest,
    confirmDelete,
    handleRefresh,
    onAssignRequest,
    saveAssignment,
    toggleStaffSelection,
    handleUpload
  } = useDocumentManagement();

  return (
    <Card>
      <DocumentHeader 
        onUploadClick={() => setIsUploadDialogOpen(true)}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
      
      <DocumentContent 
        isLoading={isLoading}
        documents={documents}
        documentAssignments={documentAssignments}
        onAssign={onAssignRequest}
        onDelete={onDeleteRequest}
        isLoadingAssignments={isLoadingAssignments}
      />

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
