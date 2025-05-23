
import React from 'react';
import { FileText, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface EmptyDocumentStateProps {
  onRefresh?: () => void;
  hasStoragePermissionIssue?: boolean;
}

const EmptyDocumentState: React.FC<EmptyDocumentStateProps> = ({ 
  onRefresh,
  hasStoragePermissionIssue = false
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-4">
      <FileText className="h-16 w-16 text-gray-300" />
      <h3 className="text-lg font-medium">No Documents Available</h3>
      
      {hasStoragePermissionIssue ? (
        <Alert variant="warning" className="max-w-md">
          <AlertTitle>Storage Permission Issue</AlertTitle>
          <AlertDescription>
            There appears to be a storage permission issue. Admin privileges may be required to view or upload documents.
          </AlertDescription>
        </Alert>
      ) : (
        <p className="text-gray-500 text-center max-w-md">
          No documents have been uploaded yet. Upload some documents to get started.
        </p>
      )}
      
      {onRefresh && (
        <Button 
          variant="outline" 
          onClick={onRefresh} 
          className="mt-4 flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      )}
    </div>
  );
};

export default EmptyDocumentState;
