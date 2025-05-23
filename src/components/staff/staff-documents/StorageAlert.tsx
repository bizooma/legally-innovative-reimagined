
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface StorageAlertProps {
  bucketExists: boolean;
  bucketChecked: boolean;
}

const StorageAlert: React.FC<StorageAlertProps> = ({ bucketExists, bucketChecked }) => {
  if (!bucketChecked || bucketExists) {
    return null;
  }

  return (
    <Alert variant="default" className="mb-4 border-amber-300 bg-amber-50">
      <AlertCircle className="h-4 w-4 text-amber-500" />
      <AlertTitle className="text-amber-700">Storage Setup Required</AlertTitle>
      <AlertDescription className="text-amber-600">
        Document storage needs to be configured. You may only see document names until this is resolved.
        <div className="mt-2 text-sm">
          If you are an administrator, please check Supabase storage settings.
          <ul className="mt-1 list-disc pl-5">
            <li>Ensure the "staff_documents" bucket exists</li>
            <li>Make sure the bucket is set to public access</li>
            <li>Verify that storage policies allow access to objects</li>
          </ul>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default StorageAlert;
