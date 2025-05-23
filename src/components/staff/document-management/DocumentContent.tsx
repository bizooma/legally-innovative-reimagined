
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { StaffDocumentWithUrl } from '@/types/staffDocument';
import DocumentTable from './DocumentTable';
import EmptyDocumentState from './EmptyDocumentState';

interface DocumentContentProps {
  isLoading: boolean;
  documents: StaffDocumentWithUrl[];
  documentAssignments: Record<string, any[]>;
  onAssign: (documentId: string) => void;
  onDelete: (documentId: string) => void;
  isLoadingAssignments: boolean;
}

const DocumentContent: React.FC<DocumentContentProps> = ({
  isLoading,
  documents,
  documentAssignments,
  onAssign,
  onDelete,
  isLoadingAssignments
}) => {
  return (
    <CardContent>
      {isLoading ? (
        <div className="text-center py-10">Loading documents...</div>
      ) : documents.length === 0 ? (
        <EmptyDocumentState />
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
