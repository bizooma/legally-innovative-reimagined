import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Document, fetchClientDocuments, deleteDocument, updateDocumentDescription } from '@/services/documentService';
import { toast } from 'sonner';
import DocumentItem from './document-components/DocumentItem';
import DocumentEditDialog from './document-components/DocumentEditDialog';
import EmptyDocumentState from './document-components/EmptyDocumentState';
import { DocumentUploadDialog } from './DocumentUploadDialog';

interface ClientDocumentsProps {
  clientId: string;
}

const ClientDocuments: React.FC<ClientDocumentsProps> = ({ clientId }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  const [newDescription, setNewDescription] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const loadDocuments = async () => {
    setIsLoading(true);
    try {
      const docs = await fetchClientDocuments(clientId);
      setDocuments(docs);
    } catch (error) {
      console.error('Error loading documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, [clientId]);

  const handleDocumentUploaded = async (success: boolean) => {
    if (success) {
      await loadDocuments();
    }
  };

  const handleDelete = async (docPath: string, docName: string) => {
    if (window.confirm(`Are you sure you want to delete "${docName}"?`)) {
      const success = await deleteDocument(docPath);
      if (success) {
        toast.success(`"${docName}" deleted successfully`);
        await loadDocuments();
      }
    }
  };

  const handleView = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openEditDialog = (doc: Document) => {
    setEditingDoc(doc);
    setNewDescription(doc.description || '');
    setEditDialogOpen(true);
  };

  const handleSaveDescription = async () => {
    if (!editingDoc) return;

    try {
      const success = await updateDocumentDescription(editingDoc.path, newDescription);
      if (success) {
        toast.success("Description updated successfully");
        setEditDialogOpen(false);
        
        // Update the document in the local state
        const updatedDocuments = documents.map(doc => 
          doc.id === editingDoc.id 
            ? { ...doc, description: newDescription } 
            : doc
        );
        setDocuments(updatedDocuments);
      }
    } catch (error) {
      console.error("Error saving description:", error);
      toast.error("Failed to update description. Please try again.");
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center py-10">
          <p className="text-gray-500">Loading documents...</p>
        </div>
      );
    }

    if (documents.length === 0) {
      return (
        <EmptyDocumentState 
          clientId={clientId}
          onDocumentUploaded={handleDocumentUploaded}
        />
      );
    }

    return (
      <div className="grid gap-4">
        {documents.map(doc => (
          <DocumentItem
            key={doc.id}
            doc={doc}
            onEdit={openEditDialog}
            onView={handleView}
            onDownload={handleDownload}
            onDelete={handleDelete}
          />
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Client Documents</CardTitle>
          <CardDescription>Manage and share documents</CardDescription>
        </div>
        <DocumentUploadDialog 
          clientId={clientId} 
          onDocumentUploaded={handleDocumentUploaded}
        />
      </CardHeader>
      <CardContent>
        {renderContent()}
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
