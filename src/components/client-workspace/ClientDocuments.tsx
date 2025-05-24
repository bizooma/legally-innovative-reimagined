
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DocumentEditDialog from './document-components/DocumentEditDialog';
import DocumentsContent from './document-components/DocumentsContent';
import { DocumentUploadDialog } from './DocumentUploadDialog';
import { useClientDocuments } from '@/hooks/useClientDocuments';
import { handleView, handleDownload } from '@/utils/documentActions';

interface ClientDocumentsProps {
  clientId: string;
}

const ClientDocuments: React.FC<ClientDocumentsProps> = ({ clientId }) => {
  const {
    documents,
    isLoading,
    editingDoc,
    newDescription,
    editDialogOpen,
    setNewDescription,
    setEditDialogOpen,
    handleDocumentUploaded,
    handleDelete,
    openEditDialog,
    handleSaveDescription
  } = useClientDocuments(clientId);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Client Documents</CardTitle>
          <CardDescription>Manage and share documents</CardDescription>
        </div>
        <div className="flex gap-2">
          <DocumentUploadDialog 
            clientId={clientId} 
            onDocumentUploaded={handleDocumentUploaded}
          />
        </div>
      </CardHeader>
      <CardContent>
        <DocumentsContent
          documents={documents}
          isLoading={isLoading}
          clientId={clientId}
          onDocumentUploaded={handleDocumentUploaded}
          onEdit={openEditDialog}
          onView={handleView}
          onDownload={handleDownload}
          onDelete={handleDelete}
        />
      </CardContent>

      <DocumentEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        document={editingDoc}
        description={newDescription}
        onDescriptionChange={setNewDescription}
        onSave={handleSaveDescription}
      />
    </Card>
  );
};

export default ClientDocuments;
