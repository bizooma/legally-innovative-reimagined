
import React from 'react';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyDocumentStateProps {
  onRefresh: () => void;
}

const EmptyDocumentState: React.FC<EmptyDocumentStateProps> = ({ onRefresh }) => {
  return (
    <div className="text-center py-10">
      <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
      <p className="text-gray-500">No documents available</p>
      <Button 
        variant="outline"
        size="sm"
        onClick={onRefresh}
        className="mt-4"
      >
        Check for Documents
      </Button>
    </div>
  );
};

export default EmptyDocumentState;
