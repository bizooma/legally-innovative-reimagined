
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StorageAlertProps {
  bucketExists: boolean;
  bucketChecked: boolean;
  onRefresh?: () => void;
}

const StorageAlert: React.FC<StorageAlertProps> = ({ bucketExists, bucketChecked, onRefresh }) => {
  if (!bucketChecked || bucketExists) {
    return null;
  }

  return (
    <Alert variant="warning" className="mb-4">
      <AlertCircle className="h-4 w-4 text-amber-500" />
      <AlertTitle className="text-amber-700">Storage Setup Required</AlertTitle>
      <AlertDescription className="text-amber-600">
        Document storage needs to be configured. You may only see document names until this is resolved.
        <div className="mt-2 text-sm">
          <p className="mb-2">
            If you are an administrator, please check Supabase storage settings:
          </p>
          <ul className="mt-1 list-disc pl-5 mb-3">
            <li>Verify the "staff_documents" bucket exists and is properly configured</li>
            <li>Ensure the bucket is set to public access</li>
            <li>Check that storage policies allow access to objects with bucket_id='staff_documents'</li>
          </ul>
          <div className="flex gap-2 mt-2">
            {onRefresh && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={onRefresh}
                className="text-amber-700 border-amber-300 hover:bg-amber-50"
              >
                Retry Connection
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="text-amber-700 border-amber-300 hover:bg-amber-50"
              onClick={() => window.open('https://supabase.com/dashboard/project/hvyjvbdforunsjgqhhny/storage/buckets', '_blank')}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Open Supabase Storage
            </Button>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default StorageAlert;
