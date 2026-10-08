
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Bug } from 'lucide-react';
import DocumentEditDialog from './document-components/DocumentEditDialog';
import DocumentsContent from './document-components/DocumentsContent';
import { DocumentUploadDialog } from './DocumentUploadDialog';
import { useClientDocuments } from '@/hooks/useClientDocuments';
import { handleView, handleDownload } from '@/utils/documentActions';
import { setDocumentClientVisibility } from '@/services/documents/updateDocumentDescription';
import { Document } from '@/types/document';
import { toast } from 'sonner';

interface ClientDocumentsProps {
  clientId: string;
  role?: 'admin' | 'client';
}

const ClientDocuments: React.FC<ClientDocumentsProps> = ({ clientId, role = 'client' }) => {
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

  const isAdmin = role === 'admin';
  const [visibility, setVisibility] = useState<Record<string, boolean>>({});
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const shownDocuments = documents.map((d) =>
    d.id in visibility ? { ...d, isClientVisible: visibility[d.id] } : d
  );

  const handleToggleVisibility = async (doc: Document) => {
    if (!isAdmin || togglingId) return;
    const next = !doc.isClientVisible;
    setTogglingId(doc.id);
    setVisibility((v) => ({ ...v, [doc.id]: next }));
    try {
      await setDocumentClientVisibility(doc.id, next);
      toast.success(next ? `"${doc.name}" is now shared with the client` : `"${doc.name}" is now internal`);
    } catch (e: any) {
      setVisibility((v) => ({ ...v, [doc.id]: !next }));
      toast.error(`Could not change sharing: ${e?.message ?? e}`);
    } finally {
      setTogglingId(null);
    }
  };
  const [showDebug, setShowDebug] = useState(false);
  const isLiveEnvironment = window.location.hostname !== 'localhost' && !window.location.hostname.includes('lovable.app');

  const handleForceRefresh = async () => {
    console.log('Force refresh triggered by user');
    window.location.reload();
  };

  // Get Supabase config info for debugging - using environment variables directly
  const supabaseUrl = "https://hvyjvbdforunsjgqhhny.supabase.co";
  const expectedKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2eWp2YmRmb3J1bnNqZ3FoaG55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NzM3MDksImV4cCI6MjA2MzE0OTcwOX0.USDrrMPieE3Twwou7ZkARUGttkrrQEyFsiTpMqrLUV4";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Client Documents</CardTitle>
          <CardDescription>
            {isAdmin ? 'Manage and share documents' : 'View and download documents'}
            {isLiveEnvironment && (
              <span className="ml-2 text-blue-600 font-medium">🌐 Live Environment</span>
            )}
          </CardDescription>
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowDebug(!showDebug)}
            >
              <Bug className="h-4 w-4 mr-1" />
              Debug
            </Button>
          )}
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
            role={role}
          />
        </div>
      </CardHeader>
      <CardContent>
        {showDebug && isAdmin && (
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
              <strong>Netlify Environment Check:</strong>
            </div>
            <div>Expected Supabase URL: {supabaseUrl}</div>
            <div>Expected Key (first 20 chars): {expectedKey.substring(0, 20)}...</div>
            <div className="font-bold text-green-600">
              ✅ Environment variables should be configured in Netlify
            </div>
            <div className="text-sm text-gray-600">
              If deletion still doesn't work after setting env vars, try:
              <br/>1. Clear browser cache and hard refresh (Cmd+Shift+R)
              <br/>2. Wait 5-10 minutes for Netlify deployment to complete
              <br/>3. Check Netlify deploy logs for any errors
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
          documents={shownDocuments}
          isLoading={isLoading}
          clientId={clientId}
          onDocumentUploaded={handleDocumentUploaded}
          onEdit={isAdmin ? openEditDialog : undefined}
          onView={handleView}
          onDownload={handleDownload}
          onDelete={isAdmin ? handleDelete : undefined}
          role={role}
          onToggleVisibility={handleToggleVisibility}
          togglingId={togglingId}
        />
      </CardContent>

      {isAdmin && (
        <DocumentEditDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          document={editingDoc}
          description={newDescription}
          onDescriptionChange={setNewDescription}
          onSave={handleSaveDescription}
        />
      )}
    </Card>
  );
};

export default ClientDocuments;
