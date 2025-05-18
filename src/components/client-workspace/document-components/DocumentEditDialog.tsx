
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Document } from '@/types/document';

interface DocumentEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document: Document | null;
  description: string;
  onDescriptionChange: (description: string) => void;
  onSave: () => Promise<void>;
}

const DocumentEditDialog: React.FC<DocumentEditDialogProps> = ({
  open,
  onOpenChange,
  document,
  description,
  onDescriptionChange,
  onSave
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Document Description</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm font-medium mb-2">Document: {document?.name}</p>
          <Textarea
            placeholder="Enter a description for this document"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            rows={5}
            className="w-full"
          />
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button onClick={onSave}>
            Save Description
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentEditDialog;
