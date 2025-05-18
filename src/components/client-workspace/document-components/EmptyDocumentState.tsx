
import React from 'react';
import { DocumentUploadDialog } from '../DocumentUploadDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface EmptyDocumentStateProps {
  clientId: string;
  onDocumentUploaded: (success: boolean) => Promise<void>;
}

const EmptyDocumentState: React.FC<EmptyDocumentStateProps> = ({ 
  clientId, 
  onDocumentUploaded 
}) => {
  return (
    <div className="text-center py-10">
      <p className="text-gray-500">No documents yet</p>
      <DocumentUploadDialog
        clientId={clientId}
        onDocumentUploaded={onDocumentUploaded}
        variant="outline"
        className="mt-4"
      >
        <Button variant="outline" className="mt-4">
          <Plus className="mr-2 h-4 w-4" />
          Upload First Document
        </Button>
      </DocumentUploadDialog>
    </div>
  );
};

export default EmptyDocumentState;
