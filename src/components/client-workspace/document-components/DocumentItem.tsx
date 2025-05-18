
import React from 'react';
import { Button } from '@/components/ui/button';
import { Document } from '@/types/document';
import { Download, ExternalLink, Pencil, Trash2 } from 'lucide-react';

interface DocumentItemProps {
  doc: Document;
  onEdit: (doc: Document) => void;
  onView: (url: string) => void;
  onDownload: (url: string, filename: string) => void;
  onDelete: (path: string, name: string) => void;
}

const DocumentItem: React.FC<DocumentItemProps> = ({
  doc,
  onEdit,
  onView,
  onDownload,
  onDelete
}) => {
  return (
    <div 
      key={doc.id}
      className="border rounded-lg p-4 bg-white flex flex-col md:flex-row md:items-start justify-between hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-start">
        <div className={`w-10 h-10 rounded-md flex items-center justify-center mr-4 ${
          doc.type === 'PDF' ? 'bg-red-100 text-red-800' : 
          doc.type === 'XLSX' || doc.type === 'XLS' ? 'bg-green-100 text-green-800' : 
          doc.type === 'DOCX' || doc.type === 'DOC' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          <span className="text-xs font-bold">{doc.type}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{doc.name}</h3>
          <p className="text-sm text-gray-500 mb-1">{doc.size} • Updated {doc.lastUpdated}</p>
          {doc.description && (
            <p className="text-sm text-gray-700 mt-1 mb-2 bg-gray-50 p-2 rounded border border-gray-100">
              {doc.description}
            </p>
          )}
          {!doc.description && (
            <p className="text-sm text-gray-400 italic mt-1 mb-2">
              No description provided
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-2 mt-3 md:mt-0">
        <Button variant="outline" size="sm" onClick={() => onEdit(doc)}>
          <Pencil className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <Button variant="outline" size="sm" onClick={() => onView(doc.url)}>
          <ExternalLink className="h-4 w-4 mr-1" />
          View
        </Button>
        <Button variant="outline" size="sm" onClick={() => onDownload(doc.url, doc.name)}>
          <Download className="h-4 w-4 mr-1" />
          Download
        </Button>
        <Button variant="outline" size="sm" onClick={() => onDelete(doc.path, doc.name)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DocumentItem;
