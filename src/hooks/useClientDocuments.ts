
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
      toast.error('Failed to load documents');
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
    if (!window.confirm(`Are you sure you want to delete "${docName}"?`)) {
      return;
    }

    console.log('Attempting to delete document:', { docPath, docName });
    
    // Immediately remove from local state for better UX
    const originalDocuments = [...documents];
    setDocuments(prev => prev.filter(doc => doc.path !== docPath));
    
    try {
      const success = await deleteClientDocument(docPath);
      if (success) {
        toast.success(`"${docName}" deleted successfully`);
        // Force a fresh reload to ensure consistency
        setTimeout(async () => {
          await loadDocuments();
        }, 500); // Small delay to ensure backend has processed the deletion
      } else {
        // Restore original state if deletion failed
        setDocuments(originalDocuments);
        toast.error(`Failed to delete "${docName}"`);
      }
    } catch (error) {
      console.error('Delete error in handler:', error);
      // Restore original state if deletion failed
      setDocuments(originalDocuments);
      toast.error(`Error deleting "${docName}"`);
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
