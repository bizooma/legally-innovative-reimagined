
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Document, fetchClientDocuments, deleteClientDocument, updateDocumentDescription } from '@/services/documentService';
import { toast } from 'sonner';
import { RefreshCw } from 'lucide-react';
import DocumentItem from './document-components/DocumentItem';
import DocumentEditDialog from './document-components/DocumentEditDialog';
import EmptyDocumentState from './document-components/EmptyDocumentState';
import { DocumentUploadDialog } from './DocumentUploadDialog';
import { runDocumentMigration } from '@/utils/documentMigration';

interface ClientDocumentsProps {
  clientId: string;
}

const ClientDocuments: React.FC<ClientDocumentsProps> = ({ clientId }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  const [newDescription, setNewDescription] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);

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
      const success = await deleteClientDocument(docPath);
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
      console.log('Saving description for document:', editingDoc.id, 'with description:', newDescription);
      const success = await updateDocumentDescription(editingDoc.id, newDescription);
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

  const handleMigration = async () => {
    setIsMigrating(true);
    try {
      await runDocumentMigration();
      // Reload documents after migration
      await loadDocuments();
    } catch (error) {
      console.error('Migration error:', error);
    } finally {
      setIsMigrating(false);
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
        <div className="space-y-4">
          <EmptyDocumentState 
            clientId={clientId}
            onDocumentUploaded={handleDocumentUploaded}
          />
          
          {/* Migration button for empty state */}
          <div className="text-center py-4 border-t">
            <p className="text-sm text-gray-600 mb-3">
              If you had documents before, you can migrate them from storage:
            </p>
            <Button 
              variant="outline" 
              onClick={handleMigration}
              disabled={isMigrating}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isMigrating ? 'animate-spin' : ''}`} />
              {isMigrating ? 'Migrating...' : 'Migrate Existing Documents'}
            </Button>
          </div>
        </div>
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
        <div className="flex gap-2">
          {documents.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleMigration}
              disabled={isMigrating}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isMigrating ? 'animate-spin' : ''}`} />
              {isMigrating ? 'Migrating...' : 'Migrate'}
            </Button>
          )}
          <DocumentUploadDialog 
            clientId={clientId} 
            onDocumentUploaded={handleDocumentUploaded}
          />
        </div>
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
