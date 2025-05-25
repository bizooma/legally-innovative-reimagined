
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Bug } from 'lucide-react';
import DocumentEditDialog from './document-components/DocumentEditDialog';
import DocumentsContent from './document-components/DocumentsContent';
import { DocumentUploadDialog } from './DocumentUploadDialog';
import { useClientDocuments } from '@/hooks/useClientDocuments';
import { handleView, handleDownload } from '@/utils/documentActions';
import { supabase } from '@/integrations/supabase/client';

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

  // Get Supabase config info for debugging
  const supabaseUrl = supabase.supabaseUrl;
  const supabaseKey = supabase.supabaseKey;

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
          <div className="mb-4 p-3 bg-gray-100 rounded text-xs space-y-2">
            <div><strong>Environment Debug Info:</strong></div>
            <div>Environment: {isLiveEnvironment ? 'Live' : 'Preview'}</div>
            <div>Hostname: {window.location.hostname}</div>
            <div>Full URL: {window.location.href}</div>
            <div>Documents count: {documents.length}</div>
            <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
            <div>Client ID: {clientId}</div>
            <div>Current time: {new Date().toISOString()}</div>
            <div className="border-t pt-2 mt-2">
              <strong>Supabase Configuration:</strong>
            </div>
            <div>Supabase URL: {supabaseUrl}</div>
            <div>Supabase Key (first 20 chars): {supabaseKey?.substring(0, 20)}...</div>
            <div>Expected URL: https://hvyjvbdforunsjgqhhny.supabase.co</div>
            <div className="font-bold text-red-600">
              URL Match: {supabaseUrl === 'https://hvyjvbdforunsjgqhhny.supabase.co' ? '✅ CORRECT' : '❌ WRONG'}
            </div>
            {documents.length > 0 && (
              <div className="border-t pt-2 mt-2">
                <strong>Documents:</strong><br/>
                {documents.map(d => `${d.name} (${d.id.substring(0, 8)}...)`).join(', ')}
              </div>
            )}
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
