
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface DocumentUploadDialogProps {
  clientId: string;
  onDocumentUploaded: (success: boolean) => void;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive" | null;
  size?: "default" | "sm" | "lg" | "icon" | null;
  children?: React.ReactNode;
  className?: string;
}

export const DocumentUploadDialog: React.FC<DocumentUploadDialogProps> = ({ 
  clientId, 
  onDocumentUploaded,
  variant = "default",
  size = "default",
  children,
  className
}) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Define accepted file types
  const acceptedFileTypes = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.jpg,.jpeg,.png";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    setIsUploading(true);
    
    try {
      const { uploadDocument } = await import('@/services/documentService');
      const result = await uploadDocument(clientId, file, description);
      
      if (result) {
        toast.success("Document uploaded successfully");
        setOpen(false);
        setFile(null);
        setDescription('');
        onDocumentUploaded(true);
      } else {
        toast.error("Failed to upload document");
      }
    } catch (error: any) {
      toast.error(`Upload failed: ${error.message}`);
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setDescription('');
    setOpen(false);
  };

  const triggerButton = children || (
    <Button variant={variant} size={size} className={className}>
      <Plus className="mr-2 h-4 w-4" />
      Upload Document
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>
            Upload a file to share with this client.
          </DialogDescription>
        </DialogHeader>
        <div 
          className="grid gap-4 py-4"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div 
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 text-center">
              {file ? file.name : "Click to select or drag and drop a file here"}
            </p>
            {file && (
              <p className="text-xs text-gray-500 mt-1">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            )}
            <p className="text-xs text-gray-400 mt-3">
              Accepted formats: PDF, Word, Excel, PowerPoint, Text, CSV, Images
            </p>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept={acceptedFileTypes}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description (optional)
            </label>
            <Textarea
              id="description"
              placeholder="Enter a brief description of this document"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter className="flex space-x-2 sm:justify-end">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleUpload} 
            disabled={!file || isUploading}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentUploadDialog;
