
import { useState, useEffect } from 'react';
import { Document, fetchClientDocuments, deleteClientDocument, updateDocumentDescription } from '@/services/documentService';
import { toast } from 'sonner';

export const useClientDocuments = (clientId: string) => {
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
      const success = await deleteClientDocument(docPath);
      if (success) {
        toast.success(`"${docName}" deleted successfully`);
        await loadDocuments();
      }
    }
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

  return {
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
  };
};
