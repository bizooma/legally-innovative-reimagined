
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Bug } from 'lucide-react';
import DocumentEditDialog from './document-components/DocumentEditDialog';
import DocumentsContent from './document-components/DocumentsContent';
import { DocumentUploadDialog } from './DocumentUploadDialog';
import { useClientDocuments } from '@/hooks/useClientDocuments';
import { handleView, handleDownload } from '@/utils/documentActions';

interface ClientDocumentsProps {
  clientId: string;
}

const ClientDocuments: React.FC<ClientDocumentsProps> = ({ clientId }) => {
  const {
    documents,
    isLoading,
    editingDoc,
    newDescription,
    editDialogOpen,
    setNewDescription,
    setEditDialogOpen,
    handleDocumentUploaded,
    handleDelete,
    openEditDialog,
    handleSaveDescription
  } = useClientDocuments(clientId);

  const [showDebug, setShowDebug] = useState(false);
  const isLiveEnvironment = window.location.hostname !== 'localhost' && !window.location.hostname.includes('lovable.app');

  const handleForceRefresh = async () => {
    console.log('Force refresh triggered by user');
    window.location.reload();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Client Documents</CardTitle>
          <CardDescription>
            Manage and share documents
            {isLiveEnvironment && (
              <span className="ml-2 text-blue-600 font-medium">🌐 Live Environment</span>
            )}
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowDebug(!showDebug)}
          >
            <Bug className="h-4 w-4 mr-1" />
            Debug
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleForceRefresh}
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Force Refresh
          </Button>
          <DocumentUploadDialog 
            clientId={clientId} 
            onDocumentUploaded={handleDocumentUploaded}
          />
        </div>
      </CardHeader>
      <CardContent>
        {showDebug && (
          <div className="mb-4 p-3 bg-gray-100 rounded text-xs">
            <strong>Debug Info:</strong><br/>
            Environment: {isLiveEnvironment ? 'Live' : 'Preview'}<br/>
            Documents count: {documents.length}<br/>
            Loading: {isLoading ? 'Yes' : 'No'}<br/>
            Client ID: {clientId}<br/>
            Current time: {new Date().toISOString()}<br/>
            Documents: {documents.map(d => `${d.name} (${d.id.substring(0, 8)}...)`).join(', ')}
          </div>
        )}
        
        <DocumentsContent
          documents={documents}
          isLoading={isLoading}
          clientId={clientId}
          onDocumentUploaded={handleDocumentUploaded}
          onEdit={openEditDialog}
          onView={handleView}
          onDownload={handleDownload}
          onDelete={handleDelete}
        />
      </CardContent>

      <DocumentEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        document={editingDoc}
        description={newDescription}
        onDescriptionChange={setNewDescription}
        onSave={handleSaveDescription}
      />
    </Card>
  );
};

export default ClientDocuments;
