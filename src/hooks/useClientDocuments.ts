
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
      console.log('Loading documents for client:', clientId);
      const docs = await fetchClientDocuments(clientId);
      console.log('Documents loaded from database:', docs);
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
      console.log('Document uploaded, reloading list...');
      await loadDocuments();
    }
  };

  const handleDelete = async (docPath: string, docName: string) => {
    if (!window.confirm(`Are you sure you want to delete "${docName}"?`)) {
      return;
    }

    console.log('=== DELETION HANDLER START ===');
    console.log('Attempting to delete document:', { docPath, docName });
    console.log('Current documents count:', documents.length);
    
    // Store original state for potential rollback
    const originalDocuments = [...documents];
    
    try {
      // Optimistically update UI
      setDocuments(prev => {
        const filtered = prev.filter(doc => doc.path !== docPath);
        console.log('Optimistically updated documents:', {
          before: prev.length,
          after: filtered.length,
          removedPath: docPath
        });
        return filtered;
      });
      
      console.log('Calling deleteClientDocument...');
      const success = await deleteClientDocument(docPath);
      
      if (success) {
        console.log('✓ Document deleted successfully from backend');
        toast.success(`"${docName}" deleted successfully`);
        
        // Wait a moment then force reload to ensure consistency
        console.log('Scheduling reload to verify deletion...');
        setTimeout(async () => {
          console.log('Executing scheduled reload...');
          try {
            await loadDocuments();
            console.log('✓ Reload completed after deletion');
          } catch (reloadError) {
            console.error('Error during post-deletion reload:', reloadError);
          }
        }, 2000); // Increased delay for live environment
        
      } else {
        console.error('❌ Document deletion failed');
        console.log('Rolling back UI state...');
        setDocuments(originalDocuments);
        toast.error(`Failed to delete "${docName}"`);
      }
    } catch (error) {
      console.error('❌ Delete error in handler:', error);
      console.log('Rolling back UI state due to error...');
      setDocuments(originalDocuments);
      toast.error(`Error deleting "${docName}": ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    
    console.log('=== DELETION HANDLER END ===');
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
