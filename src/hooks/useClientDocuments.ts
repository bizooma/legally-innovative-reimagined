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
      console.log('=== ENVIRONMENT DEBUGGING ===');
      console.log('Current URL:', window.location.href);
      console.log('Hostname:', window.location.hostname);
      console.log('Is Live Site:', window.location.hostname.includes('legallyinnovative.com'));
      console.log('Is Preview:', window.location.hostname.includes('lovableproject.com'));
      console.log('Client ID being used:', clientId);
      console.log('Timestamp:', new Date().toISOString());
      console.log('=== END ENVIRONMENT DEBUG ===');
      
      const docs = await fetchClientDocuments(clientId);
      console.log('=== FETCH RESULTS ===');
      console.log('Documents returned:', docs);
      console.log('Document count:', docs.length);
      console.log('Document IDs:', docs.map(d => d.id));
      console.log('Document names:', docs.map(d => d.name));
      console.log('=== END FETCH RESULTS ===');
      
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
    console.log('Environment:', window.location.hostname);
    console.log('Attempting to delete document:', { docPath, docName });
    console.log('Current documents count before delete:', documents.length);
    console.log('Document to delete path:', docPath);
    
    // Store original state for potential rollback
    const originalDocuments = [...documents];
    
    try {
      console.log('Calling deleteClientDocument service...');
      const success = await deleteClientDocument(docPath);
      
      console.log('Delete service returned:', success);
      
      if (success) {
        console.log('✓ Delete reported as successful');
        toast.success(`"${docName}" deleted successfully`);
        
        // Force immediate reload to check actual database state
        console.log('Forcing immediate reload to verify deletion...');
        await loadDocuments();
        
      } else {
        console.error('❌ Delete service returned false');
        toast.error(`Failed to delete "${docName}"`);
      }
    } catch (error) {
      console.error('❌ Delete error in handler:', error);
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
        console.log('Description update successful, updating local state');
        setEditDialogOpen(false);
        
        // Update the document in the local state immediately
        setDocuments(prevDocs => 
          prevDocs.map(doc => 
            doc.id === editingDoc.id 
              ? { ...doc, description: newDescription } 
              : doc
          )
        );
        
        console.log('Local state updated, reloading to verify update');
        
        // Reload documents to ensure consistency
        setTimeout(() => {
          console.log('Reloading documents to verify description update');
          loadDocuments();
        }, 500);
      } else {
        console.error('Description update failed');
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
