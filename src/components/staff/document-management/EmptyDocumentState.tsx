
import React from 'react';
import { FileText } from 'lucide-react';

const EmptyDocumentState: React.FC = () => {
  return (
    <div className="text-center py-10">
      <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
      <p className="text-gray-500">No documents uploaded yet</p>
    </div>
  );
};

export default EmptyDocumentState;
