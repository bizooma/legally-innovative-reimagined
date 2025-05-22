
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useStorageBucketCheck } from "@/hooks/useStorageBucketCheck";
import { useFileDownload } from "@/hooks/useFileDownload";
import { ResourceCard } from "./ResourceCard";
import { ResourceErrorState } from "./ResourceErrorState";
import { ResourceDownloadButton } from "./ResourceDownloadButton";

interface DownloadableResourceProps {
  title: string;
  description: string;
  bucketName: string;
  fileName: string;
  displayName?: string;
  buttonText?: string;
}

export const DownloadableResource = ({
  title,
  description,
  bucketName,
  fileName,
  displayName,
  buttonText = "Download"
}: DownloadableResourceProps) => {
  const [fileNotFound, setFileNotFound] = useState(false);
  const [checkingFile, setCheckingFile] = useState(true);
  
  const { 
    hasError: bucketError, 
    isRetrying, 
    retryBucketCheck, 
    checkFileExists 
  } = useStorageBucketCheck(bucketName);
  
  const { isDownloading, downloadFile } = useFileDownload();

  // Check file existence after bucket check completes
  useEffect(() => {
    if (!bucketError) {
      setCheckingFile(true);
      checkFileExists(fileName)
        .then(exists => {
          setFileNotFound(!exists);
          setCheckingFile(false);
        })
        .catch(() => {
          setFileNotFound(true);
          setCheckingFile(false);
        });
    }
  }, [bucketError, fileName, checkFileExists]);

  const handleRetry = async () => {
    setFileNotFound(false);
    setCheckingFile(true);
    
    await retryBucketCheck();
    
    // If bucket check passes, check file existence again
    if (!bucketError) {
      const exists = await checkFileExists(fileName);
      setFileNotFound(!exists);
    }
    
    setCheckingFile(false);
    
    // Notify about retry attempt
    toast({
      title: bucketError ? "Checking connection" : "Checking file",
      description: bucketError 
        ? "Verifying storage connection. Please wait..." 
        : `Checking if "${fileName}" exists. Please wait...`,
    });
  };

  const handleDownload = async () => {
    const success = await downloadFile(bucketName, fileName, displayName);
    
    if (success) {
      // Update error state in case it was previously in error
      retryBucketCheck();
      setFileNotFound(false);
    }
  };

  // Handle loading state
  if (checkingFile && !bucketError) {
    return (
      <ResourceCard title={title} description={description}>
        <div className="flex items-center justify-center py-2">
          <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
          <span className="ml-2 text-sm text-gray-500">Checking file...</span>
        </div>
      </ResourceCard>
    );
  }

  // Only show error state if there's a connection issue or the file wasn't found
  const showErrorState = bucketError || fileNotFound;

  return (
    <ResourceCard title={title} description={description}>
      {showErrorState ? (
        <ResourceErrorState 
          isRetrying={isRetrying || checkingFile} 
          onRetry={handleRetry}
          errorMessage={
            bucketError 
              ? "Storage connection issue detected" 
              : `File not available`
          }
          errorType={bucketError ? "connection" : "not-found"}
        />
      ) : (
        <ResourceDownloadButton 
          isDownloading={isDownloading} 
          buttonText={buttonText}
          onDownload={handleDownload}
        />
      )}
    </ResourceCard>
  );
};
