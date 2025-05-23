
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  error: Error | null;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error instanceof Error ? error.message : 'Failed to load documents'}
      </AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
