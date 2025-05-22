
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StaffDocumentWithUrl } from '@/services/staff-documents/types';

interface DocumentTableProps {
  documents: StaffDocumentWithUrl[];
  assignedStaff: Record<string, any[]>;
  onAssign: (documentId: string) => void;
  onDelete: (documentId: string) => void;
}

const DocumentTable: React.FC<DocumentTableProps> = ({
  documents,
  assignedStaff,
  onAssign,
  onDelete
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Assigned To</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map((doc) => (
          <TableRow key={doc.id}>
            <TableCell className="font-medium">
              <a 
                href={doc.url} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center hover:text-blue-600"
              >
                <FileText className="h-4 w-4 mr-2" />
                {doc.name}
              </a>
            </TableCell>
            <TableCell>{doc.description || '-'}</TableCell>
            <TableCell>{doc.file_size}</TableCell>
            <TableCell>
              {assignedStaff[doc.id]?.length ? (
                <div className="flex flex-wrap gap-1">
                  {assignedStaff[doc.id].slice(0, 2).map((staff: any) => (
                    <Badge key={staff.id} variant="secondary">
                      {staff.full_name}
                    </Badge>
                  ))}
                  {assignedStaff[doc.id].length > 2 && (
                    <Badge variant="outline">
                      +{assignedStaff[doc.id].length - 2} more
                    </Badge>
                  )}
                </div>
              ) : (
                'Not assigned'
              )}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onAssign(doc.id)}
                  title="Assign to Staff"
                >
                  <Users className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(doc.id)}
                  title="Delete Document"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DocumentTable;
