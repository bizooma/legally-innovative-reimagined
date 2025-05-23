
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Download, ExternalLink, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { StaffDocumentWithUrl } from '@/types/staffDocument';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface StaffDocumentsListProps {
  documents: StaffDocumentWithUrl[];
}

const StaffDocumentsList: React.FC<StaffDocumentsListProps> = ({ documents }) => {
  // Track any documents with missing URLs
  const documentsWithMissingUrls = documents.filter(doc => !doc.url).length;

  const handleDownload = (url: string, filename: string) => {
    if (!url) {
      toast({
        title: 'Document Not Available',
        description: 'Document URL not available. Storage setup may be needed.',
        variant: "default",
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
    <>
      {documentsWithMissingUrls > 0 && (
        <Alert variant="warning" className="mb-4">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <AlertDescription>
            {documentsWithMissingUrls} document(s) have missing URLs. Storage access may be restricted.
          </AlertDescription>
        </Alert>
      )}
    
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
                  {!doc.url && (
                    <span className="ml-2 text-xs text-amber-500">(URL unavailable)</span>
                  )}
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
                          description: 'URL not available. Storage access may be required.',
                          variant: 'default',
                        });
                      }
                    }}
                    title="View Document"
                    disabled={!doc.url}
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
        {documents.length} document(s) available
        {documentsWithMissingUrls > 0 && ` • ${documentsWithMissingUrls} with missing URLs`}
      </div>
    </>
  );
};

export default StaffDocumentsList;
