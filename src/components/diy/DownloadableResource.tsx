
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
  const { 
    hasError, 
    isRetrying, 
    retryBucketCheck, 
    checkFileExists 
  } = useStorageBucketCheck(bucketName);
  
  const { isDownloading, downloadFile } = useFileDownload();

  // Check file existence after bucket check completes
  useEffect(() => {
    if (!hasError) {
      checkFileExists(fileName).then(exists => {
        setFileNotFound(!exists);
      });
    }
  }, [hasError, fileName]);

  const handleRetry = async () => {
    setFileNotFound(false);
    retryBucketCheck(fileName);
    
    // Notify about retry attempt
    toast({
      title: "Checking connection",
      description: "Verifying storage connection. Please wait...",
    });
  };

  const handleDownload = async () => {
    const success = await downloadFile(bucketName, fileName, displayName);
    
    if (success) {
      // Update error state in case it was previously in error
      retryBucketCheck();
    }
  };

  // Only show error state if there's a connection issue or the file wasn't found
  const showErrorState = hasError || fileNotFound;

  return (
    <ResourceCard title={title} description={description}>
      {showErrorState ? (
        <ResourceErrorState 
          isRetrying={isRetrying} 
          onRetry={handleRetry}
          errorMessage={fileNotFound ? `File not available` : "Storage connection issue detected"}
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
