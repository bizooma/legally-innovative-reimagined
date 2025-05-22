
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';
import { StaffMember } from '@/hooks/staff/types';
import { StaffDocumentWithUrl } from '@/types/staffDocument';
import {
  uploadStaffDocument,
  fetchAllDocuments,
  deleteDocument as deleteStaffDocument,
  assignDocumentToStaff,
  getStaffDocumentAssignments,
  removeDocumentAssignment
} from '@/services/staff-documents';

// Import our components
import UploadDocumentDialog from './UploadDocumentDialog';
import DocumentDeleteDialog from './DocumentDeleteDialog';
import AssignDocumentDialog from './AssignDocumentDialog';
import DocumentTable from './DocumentTable';
import EmptyDocumentState from './EmptyDocumentState';

const DocumentManagement: React.FC = () => {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [documents, setDocuments] = useState<StaffDocumentWithUrl[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [currentDocumentId, setCurrentDocumentId] = useState<string | null>(null);
  const [selectedStaffIds, setSelectedStaffIds] = useState<string[]>([]);
  const [assignedStaff, setAssignedStaff] = useState<Record<string, any[]>>({});
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);

  // Load staff members
  useEffect(() => {
    const fetchStaffMembers = async () => {
      try {
        const { data, error } = await fetch('/api/staff-members')
          .then(res => res.json());
        
        if (error) throw error;
        setStaffMembers(data || []);
      } catch (error) {
        console.error('Error loading staff members:', error);
      }
    };
    
    fetchStaffMembers();
  }, []);

  // Load all documents
  const loadDocuments = async () => {
    setIsLoading(true);
    const docs = await fetchAllDocuments();
    setDocuments(docs);
    setIsLoading(false);

    // Load assignments for each document
    const assignmentsMap: Record<string, any[]> = {};
    for (const doc of docs) {
      const assignments = await getStaffDocumentAssignments(doc.id);
      assignmentsMap[doc.id] = assignments;
    }
    setAssignedStaff(assignmentsMap);
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  // Handle document upload
  const handleUpload = async (file: File, description: string) => {
    try {
      const doc = await uploadStaffDocument(file, description || null);
      if (doc) {
        toast({
          title: 'Document uploaded',
          description: 'The document was uploaded successfully',
        });
        await loadDocuments();
      } else {
        throw new Error('Failed to upload document');
      }
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error; // Let the dialog component handle the error
    }
  };

  // Handle document deletion
  const confirmDelete = async () => {
    if (!documentToDelete) return;

    try {
      const success = await deleteStaffDocument(documentToDelete);
      if (success) {
        toast({
          title: 'Document deleted',
          description: 'The document was deleted successfully',
        });
        setDocuments(documents.filter(doc => doc.id !== documentToDelete));
      } else {
        throw new Error('Failed to delete document');
      }
    } catch (error) {
      toast({
        title: 'Deletion failed',
        description: 'There was an error deleting the document',
        variant: 'destructive',
      });
    } finally {
      setDeleteDialogOpen(false);
      setDocumentToDelete(null);
    }
  };

  // Open the assignment dialog
  const openAssignDialog = (documentId: string) => {
    setCurrentDocumentId(documentId);
    
    // Pre-select staff members who are already assigned
    const assigned = assignedStaff[documentId] || [];
    setSelectedStaffIds(assigned.map(staff => staff.id));
    
    setAssignDialogOpen(true);
  };

  // Handle staff selection
  const toggleStaffSelection = (staffId: string) => {
    setSelectedStaffIds(prev => 
      prev.includes(staffId) 
        ? prev.filter(id => id !== staffId) 
        : [...prev, staffId]
    );
  };

  // Assign document to selected staff
  const handleAssign = async () => {
    if (!currentDocumentId) return;

    try {
      // Get current assignments
      const currentlyAssigned = assignedStaff[currentDocumentId] || [];
      const currentlyAssignedIds = currentlyAssigned.map(staff => staff.id);
      
      // Determine which assignments to add and which to remove
      const toAdd = selectedStaffIds.filter(id => !currentlyAssignedIds.includes(id));
      const toRemove = currentlyAssignedIds.filter(id => !selectedStaffIds.includes(id));
      
      // Add new assignments
      if (toAdd.length > 0) {
        await assignDocumentToStaff(currentDocumentId, toAdd);
      }
      
      // Remove old assignments
      for (const staffId of toRemove) {
        await removeDocumentAssignment(currentDocumentId, staffId);
      }
      
      toast({
        title: 'Assignment updated',
        description: 'Document assignments have been updated',
      });
      
      // Reload document assignments
      await loadDocuments();
    } catch (error) {
      toast({
        title: 'Assignment failed',
        description: 'There was an error updating document assignments',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Staff Documents</CardTitle>
          <CardDescription>Upload and assign documents to staff members</CardDescription>
        </div>
        <Button 
          className="flex items-center" 
          onClick={() => setIsUploadDialogOpen(true)}
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-10">Loading documents...</div>
        ) : documents.length === 0 ? (
          <EmptyDocumentState />
        ) : (
          <DocumentTable 
            documents={documents}
            assignedStaff={assignedStaff}
            onAssign={openAssignDialog}
            onDelete={(id) => {
              setDocumentToDelete(id);
              setDeleteDialogOpen(true);
            }}
          />
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
        isOpen={assignDialogOpen}
        onOpenChange={setAssignDialogOpen}
        staffMembers={staffMembers}
        selectedStaffIds={selectedStaffIds}
        onToggleStaff={toggleStaffSelection}
        onSave={handleAssign}
      />
    </Card>
  );
};

export default DocumentManagement;
