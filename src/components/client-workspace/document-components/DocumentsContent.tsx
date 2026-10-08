
import React from 'react';
import { Document } from '@/services/documentService';
import DocumentItem from './DocumentItem';
import EmptyDocumentState from './EmptyDocumentState';

interface DocumentsContentProps {
  documents: Document[];
  isLoading: boolean;
  clientId: string;
  onDocumentUploaded: (success: boolean) => Promise<void>;
  onEdit?: (doc: Document) => void;
  onView: (url: string) => void;
  onDownload: (url: string, filename: string) => void;
  onDelete?: (path: string, name: string) => Promise<void>;
  role?: 'admin' | 'client';
  onToggleVisibility?: (doc: Document) => void;
  togglingId?: string | null;
}

const DocumentsContent: React.FC<DocumentsContentProps> = ({
  documents,
  isLoading,
  clientId,
  onDocumentUploaded,
  onEdit,
  onView,
  onDownload,
  onDelete,
  role = 'client',
  onToggleVisibility,
  togglingId
}) => {
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
        onDocumentUploaded={onDocumentUploaded}
        role={role}
      />
    );
  }

  return (
    <div className="grid gap-4">
      {documents.map(doc => (
        <DocumentItem
          key={doc.id}
          doc={doc}
          onEdit={onEdit}
          onView={onView}
          onDownload={onDownload}
          onDelete={onDelete}
          onToggleVisibility={role === 'admin' ? onToggleVisibility : undefined}
          toggling={togglingId === doc.id}
        />
      ))}
    </div>
  );
};

export default DocumentsContent;
