
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { StaffDocumentWithUrl } from '@/types/staffDocument';
import DocumentTable from './DocumentTable';
import EmptyDocumentState from './EmptyDocumentState';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface DocumentContentProps {
  isLoading: boolean;
  documents: StaffDocumentWithUrl[];
  documentAssignments: Record<string, any[]>;
  onAssign: (documentId: string) => void;
  onDelete: (documentId: string) => void;
  isLoadingAssignments: boolean;
  bucketExists?: boolean | null;
  onRefresh?: () => void;
}

const DocumentContent: React.FC<DocumentContentProps> = ({
  isLoading,
  documents,
  documentAssignments,
  onAssign,
  onDelete,
  isLoadingAssignments,
  bucketExists,
  onRefresh
}) => {
  const hasStoragePermissionIssue = bucketExists === false;

  return (
    <CardContent>
      {hasStoragePermissionIssue && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <AlertTitle>Storage Permission Issue</AlertTitle>
          <AlertDescription>
            Unable to access storage bucket. Admin privileges may be required for document management.
          </AlertDescription>
        </Alert>
      )}
      
      {isLoading ? (
        <div className="text-center py-10">Loading documents...</div>
      ) : documents.length === 0 ? (
        <EmptyDocumentState 
          onRefresh={onRefresh}
          hasStoragePermissionIssue={hasStoragePermissionIssue} 
        />
      ) : (
        <>
          <DocumentTable 
            documents={documents}
            assignedStaff={documentAssignments}
            onAssign={onAssign}
            onDelete={onDelete}
            isLoadingAssignments={isLoadingAssignments}
          />
          {isLoadingAssignments && (
            <div className="mt-2 text-xs text-gray-500">Loading assignments...</div>
          )}
        </>
      )}
    </CardContent>
  );
};

export default DocumentContent;
