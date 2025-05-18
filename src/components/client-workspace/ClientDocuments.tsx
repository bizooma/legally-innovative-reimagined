
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Plus, Trash2, ExternalLink } from 'lucide-react';
import { DocumentUploadDialog } from './DocumentUploadDialog';
import { Document, fetchClientDocuments, deleteDocument } from '@/services/documentService';
import { toast } from 'sonner';

interface ClientDocumentsProps {
  clientId: string;
}

const ClientDocuments: React.FC<ClientDocumentsProps> = ({ clientId }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadDocuments = async () => {
    setIsLoading(true);
    try {
      const docs = await fetchClientDocuments(clientId);
      setDocuments(docs);
    } catch (error) {
      console.error('Error loading documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, [clientId]);

  const handleDocumentUploaded = async (success: boolean) => {
    if (success) {
      await loadDocuments();
    }
  };

  const handleDelete = async (docPath: string, docName: string) => {
    if (window.confirm(`Are you sure you want to delete "${docName}"?`)) {
      const success = await deleteDocument(docPath);
      if (success) {
        toast.success(`"${docName}" deleted successfully`);
        await loadDocuments();
      }
    }
  };

  const handleView = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Client Documents</CardTitle>
          <CardDescription>Manage and share documents</CardDescription>
        </div>
        <DocumentUploadDialog 
          clientId={clientId} 
          onDocumentUploaded={handleDocumentUploaded}
        />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Loading documents...</p>
          </div>
        ) : documents.length > 0 ? (
          <div className="grid gap-4">
            {documents.map(doc => (
              <div 
                key={doc.id}
                className="border rounded-lg p-4 bg-white flex flex-col md:flex-row md:items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-md flex items-center justify-center mr-4 ${
                    doc.type === 'PDF' ? 'bg-red-100 text-red-800' : 
                    doc.type === 'XLSX' || doc.type === 'XLS' ? 'bg-green-100 text-green-800' : 
                    doc.type === 'DOCX' || doc.type === 'DOC' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    <span className="text-xs font-bold">{doc.type}</span>
                  </div>
                  <div>
                    <h3 className="font-medium">{doc.name}</h3>
                    <p className="text-sm text-gray-500">{doc.size} • Updated {doc.lastUpdated}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3 md:mt-0">
                  <Button variant="outline" size="sm" onClick={() => handleView(doc.url)}>
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDownload(doc.url, doc.name)}>
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(doc.path, doc.name)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No documents yet</p>
            <DocumentUploadDialog
              clientId={clientId}
              onDocumentUploaded={handleDocumentUploaded}
              variant="outline"
              className="mt-4"
            >
              <Button variant="outline" className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Upload First Document
              </Button>
            </DocumentUploadDialog>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientDocuments;
