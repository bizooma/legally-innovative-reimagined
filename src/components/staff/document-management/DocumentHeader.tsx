
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, RefreshCw } from 'lucide-react';

interface DocumentHeaderProps {
  onUploadClick: () => void;
  onRefresh: () => void;
  refreshing: boolean;
}

const DocumentHeader: React.FC<DocumentHeaderProps> = ({ 
  onUploadClick, 
  onRefresh, 
  refreshing 
}) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardTitle>Staff Documents</CardTitle>
        <CardDescription>Upload and assign documents to staff members</CardDescription>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline"
          onClick={onRefresh}
          disabled={refreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
        <Button 
          className="flex items-center" 
          onClick={onUploadClick}
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>
    </CardHeader>
  );
};

export default DocumentHeader;
