
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Download, ExternalLink, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useDocumentQueries } from '@/hooks/staff-documents';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface StaffDocumentsProps {
  staffMemberId: string;
}

const StaffDocuments: React.FC<StaffDocumentsProps> = ({ staffMemberId }) => {
  // Use our hook to get documents, status, and refreshing capability
  const { 
    documents = [], 
    isLoading, 
    error, 
    refetch,
    bucketExists,
    bucketChecked,
    refreshAllData,
    isRefetching = false 
  } = useDocumentQueries(staffMemberId);

  const handleRefresh = () => {
    console.log("StaffDocuments: Manual refresh triggered");
    refreshAllData();
    toast({
      title: "Refreshing Documents",
      description: "Checking for new document assignments...",
    });
  };

  const handleDownload = (url: string, filename: string) => {
    if (!url) {
      toast({
        title: 'Error',
        description: 'Document URL not available. Please try refreshing.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download error:', err);
      toast({
        title: 'Error',
        description: 'Failed to download document',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>My Documents</CardTitle>
          <CardDescription>Documents assigned to you</CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          disabled={isRefetching}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {bucketChecked && !bucketExists && (
          <Alert variant="warning" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Storage Setup Required</AlertTitle>
            <AlertDescription>
              Document storage needs to be configured. You may only see document names until this is resolved.
            </AlertDescription>
          </Alert>
        )}
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error instanceof Error ? error.message : 'Failed to load documents'}
            </AlertDescription>
          </Alert>
        )}
        
        {isLoading ? (
          <div className="text-center py-10">Loading documents...</div>
        ) : documents.length === 0 ? (
          <div className="text-center py-10">
            <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No documents have been assigned to you</p>
            <p className="text-sm text-gray-400 mt-2">Staff ID: {staffMemberId}</p>
            <Button 
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="mt-4"
            >
              Check for New Documents
            </Button>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        {doc.name}
                      </div>
                    </TableCell>
                    <TableCell>{doc.description || '-'}</TableCell>
                    <TableCell>{doc.file_size}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            if (doc.url) {
                              window.open(doc.url, '_blank');
                            } else {
                              toast({
                                title: 'Document Preview',
                                description: 'URL not available. Storage access may be needed.',
                                variant: 'destructive',
                              });
                            }
                          }}
                          title="View Document"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownload(doc.url, doc.name)}
                          title="Download Document"
                          disabled={!doc.url}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 text-xs text-gray-400 text-right">
              {documents.length} document(s) assigned to you
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default StaffDocuments;
