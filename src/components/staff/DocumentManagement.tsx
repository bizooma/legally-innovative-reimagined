import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Upload, FileText, X, Check, Users } from 'lucide-react';
import { useStaffMembers } from '@/hooks/useStaffMembers';
import { StaffDocumentWithUrl } from '@/types/staffDocument';
import {
  uploadStaffDocument,
  fetchAllDocuments,
  deleteDocument as deleteStaffDocument,
  assignDocumentToStaff,
  getDocumentAssignments,
  removeDocumentAssignment
} from '@/services/staffDocumentService';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';

const DocumentManagement: React.FC = () => {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [documents, setDocuments] = useState<StaffDocumentWithUrl[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [currentDocumentId, setCurrentDocumentId] = useState<string | null>(null);
  const [selectedStaffIds, setSelectedStaffIds] = useState<string[]>([]);
  const [assignedStaff, setAssignedStaff] = useState<Record<string, any[]>>({});

  const { staffMembers } = useStaffMembers();

  // Load all documents
  const loadDocuments = async () => {
    setIsLoading(true);
    const docs = await fetchAllDocuments();
    setDocuments(docs);
    setIsLoading(false);

    // Load assignments for each document
    const assignmentsMap: Record<string, any[]> = {};
    for (const doc of docs) {
      const assignments = await getDocumentAssignments(doc.id);
      assignmentsMap[doc.id] = assignments;
    }
    setAssignedStaff(assignmentsMap);
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Upload document
  const handleUpload = async () => {
    if (!file) {
      toast({
        title: 'No file selected',
        description: 'Please select a file to upload',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    try {
      const doc = await uploadStaffDocument(file, description || null);
      if (doc) {
        toast({
          title: 'Document uploaded',
          description: 'The document was uploaded successfully',
        });
        setIsUploadDialogOpen(false);
        setFile(null);
        setDescription('');
        await loadDocuments();
      } else {
        throw new Error('Failed to upload document');
      }
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: 'There was an error uploading the document',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
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
    } finally {
      setAssignDialogOpen(false);
      setCurrentDocumentId(null);
      setSelectedStaffIds([]);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Staff Documents</CardTitle>
          <CardDescription>Upload and assign documents to staff members</CardDescription>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center">
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
              <DialogDescription>
                Upload a document to share with staff members
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="file">Document</Label>
                <Input
                  id="file"
                  type="file"
                  className="mt-2"
                  onChange={handleFileChange}
                />
                {file && (
                  <p className="text-sm text-gray-500 mt-1">
                    {file.name} - {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  className="mt-2"
                  placeholder="Enter a description for this document"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsUploadDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleUpload}
                disabled={!file || isUploading}
              >
                {isUploading ? 'Uploading...' : 'Upload'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-10">Loading documents...</div>
        ) : documents.length === 0 ? (
          <div className="text-center py-10">
            <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No documents uploaded yet</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">
                    <a 
                      href={doc.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center hover:text-blue-600"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      {doc.name}
                    </a>
                  </TableCell>
                  <TableCell>{doc.description || '-'}</TableCell>
                  <TableCell>{doc.file_size}</TableCell>
                  <TableCell>
                    {assignedStaff[doc.id]?.length ? (
                      <div className="flex flex-wrap gap-1">
                        {assignedStaff[doc.id].slice(0, 2).map((staff: any) => (
                          <Badge key={staff.id} variant="secondary">
                            {staff.full_name}
                          </Badge>
                        ))}
                        {assignedStaff[doc.id].length > 2 && (
                          <Badge variant="outline">
                            +{assignedStaff[doc.id].length - 2} more
                          </Badge>
                        )}
                      </div>
                    ) : (
                      'Not assigned'
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openAssignDialog(doc.id)}
                        title="Assign to Staff"
                      >
                        <Users className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setDocumentToDelete(doc.id);
                          setDeleteDialogOpen(true);
                        }}
                        title="Delete Document"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      {/* Assign Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Document</DialogTitle>
            <DialogDescription>
              Select staff members who should have access to this document
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 max-h-[300px] overflow-y-auto">
            {staffMembers.map((staff) => (
              <div key={staff.id} className="flex items-center space-x-2 py-2 border-b">
                <Checkbox
                  id={`staff-${staff.id}`}
                  checked={selectedStaffIds.includes(staff.id)}
                  onCheckedChange={() => toggleStaffSelection(staff.id)}
                />
                <Label htmlFor={`staff-${staff.id}`} className="flex-1">
                  {staff.full_name}
                  <span className="block text-xs text-gray-500">
                    {staff.position}
                  </span>
                </Label>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssign}>
              Save Assignments
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              document and remove all assignments.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default DocumentManagement;
