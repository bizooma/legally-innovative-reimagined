
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
      checkFileExists(fileName);
    }
  }, [hasError, fileName]);

  const handleRetry = async () => {
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

  return (
    <ResourceCard title={title} description={description}>
      {hasError ? (
        <ResourceErrorState isRetrying={isRetrying} onRetry={handleRetry} />
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
