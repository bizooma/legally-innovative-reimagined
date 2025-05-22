
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useStorageBucketCheck } from "@/hooks/useStorageBucketCheck";
import { useFileDownload } from "@/hooks/useFileDownload";
import { ResourceCard } from "./ResourceCard";
import { ResourceErrorState } from "./ResourceErrorState";
import { ResourceDownloadButton } from "./ResourceDownloadButton";
import { Loader2 } from "lucide-react";

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
    errorMessage,
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
    } else {
      // Reset checking state if there's a bucket error
      setCheckingFile(false);
    }
  }, [bucketError, fileName, checkFileExists]);

  const handleRetry = async () => {
    setFileNotFound(false);
    setCheckingFile(true);
    
    try {
      await retryBucketCheck();
      
      // If bucket check passes, check file existence again
      if (!bucketError) {
        const exists = await checkFileExists(fileName);
        setFileNotFound(!exists);
      }
    } catch (error) {
      console.error("Error during retry:", error);
    } finally {
      setCheckingFile(false);
      
      toast({
        title: "Resource check",
        description: fileNotFound 
          ? `Looking for ${fileName} in the storage. Please verify the file has been uploaded.` 
          : "Checking storage connection."
      });
    }
  };

  const handleDownload = async () => {
    try {
      const success = await downloadFile(bucketName, fileName, displayName);
      
      if (success) {
        // Update error state in case it was previously in error
        retryBucketCheck();
        setFileNotFound(false);
      } else {
        // Check if the file exists
        const exists = await checkFileExists(fileName);
        setFileNotFound(!exists);
      }
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download failed",
        description: "An error occurred during download. Please try again.",
        variant: "destructive",
      });
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
              ? errorMessage || "Storage connection issue detected" 
              : `File "${displayName || fileName}" not found in storage. Please verify it has been uploaded with the exact filename.`
          }
          errorType={bucketError ? "connection" : "not-found"}
          fileName={fileName}
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
