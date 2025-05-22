
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Download, ExternalLink, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { getStaffDocuments } from '@/services/staff-documents/utils';
import { ensureStorageBucket } from '@/services/staff-documents/storage';
import { StaffDocumentWithUrl } from '@/types/staffDocument';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface StaffDocumentsProps {
  staffMemberId: string;
}

const StaffDocuments: React.FC<StaffDocumentsProps> = ({ staffMemberId }) => {
  // Check if storage bucket exists on component mount
  useEffect(() => {
    const checkBucket = async () => {
      console.log("StaffDocuments: Checking storage bucket existence");
      try {
        const exists = await ensureStorageBucket();
        console.log(`StaffDocuments: Storage bucket check result: ${exists}`);
      } catch (err) {
        console.error('StaffDocuments: Error ensuring storage bucket exists:', err);
      }
    };
    
    checkBucket();
  }, []);

  // Fetch staff documents with enhanced error handling
  const { 
    data: documents = [], 
    isLoading, 
    error, 
    refetch,
    isRefetching
  } = useQuery({
    queryKey: ['staffDocuments', staffMemberId],
    queryFn: async () => {
      console.log('StaffDocuments: Fetching documents for:', staffMemberId);
      if (!staffMemberId) {
        console.error('StaffDocuments: No staff member ID provided');
        throw new Error('No staff ID provided');
      }
      
      try {
        console.log(`StaffDocuments: Starting document fetch for ${staffMemberId}`);
        const docs = await getStaffDocuments(staffMemberId);
        console.log(`StaffDocuments: Successfully fetched ${docs.length} documents:`, 
          docs.map(d => ({ id: d.id, name: d.name, hasUrl: !!d.url })));
        return docs;
      } catch (err) {
        console.error('StaffDocuments: Error fetching documents:', err);
        toast({
          title: 'Error',
          description: 'Failed to load your documents. Please try refreshing.',
          variant: 'destructive',
        });
        throw err;
      }
    },
    enabled: !!staffMemberId,
    retry: 2,
    staleTime: 5000, // 5 seconds for frequent updates
    refetchOnWindowFocus: true,
  });

  const handleRefresh = () => {
    console.log("StaffDocuments: Manual refresh triggered");
    refetch();
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
                                title: 'Error',
                                description: 'Document URL not available. Please try refreshing.',
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
