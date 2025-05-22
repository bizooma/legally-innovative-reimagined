
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { handleStorageOperation, StorageOperationResult } from "@/utils/storageErrorUtils";

export const useFileDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadFile = async (bucketName: string, fileName: string, displayName?: string): Promise<boolean> => {
    setIsDownloading(true);
    
    try {
      console.log(`Attempting to download ${fileName} from bucket ${bucketName}`);
      
      // First check if the bucket exists
      const bucketsResult = await handleStorageOperation(
        () => supabase.storage.listBuckets(),
        false
      );
      
      if (!bucketsResult.success) {
        console.error("Error checking buckets:", bucketsResult.errorMessage);
        toast({
          title: "Download failed",
          description: bucketsResult.errorMessage,
          variant: "destructive",
        });
        return false;
      }
      
      const bucket = bucketsResult.data?.find(b => b.name === bucketName);
      if (!bucket) {
        console.error(`Bucket "${bucketName}" does not exist`);
        toast({
          title: "Download failed",
          description: `Storage location "${bucketName}" not found.`,
          variant: "destructive",
        });
        return false;
      }
      
      console.log(`Bucket "${bucketName}" found, public: ${bucket.public}`);
      
      // List files in the bucket to check if the file exists
      const filesResult = await handleStorageOperation(
        () => supabase.storage.from(bucketName).list(),
        false
      );
      
      if (!filesResult.success) {
        console.error("Error listing files:", filesResult.errorMessage);
        toast({
          title: "Download failed",
          description: "Could not verify if the file exists. Please try again later.",
          variant: "destructive",
        });
        return false;
      }
      
      console.log("Files in bucket:", filesResult.data?.map(f => f.name));
      
      const fileExists = filesResult.data?.some(f => f.name === fileName);
      if (!fileExists) {
        console.error(`File "${fileName}" not found in bucket "${bucketName}"`);
        toast({
          title: "Download failed",
          description: `The file "${fileName}" could not be found.`,
          variant: "destructive",
        });
        return false;
      }
      
      // If bucket and file exist, try to download
      const downloadResult = await handleStorageOperation(
        () => supabase.storage.from(bucketName).download(fileName),
        false
      );
      
      if (!downloadResult.success) {
        toast({
          title: "Download failed",
          description: downloadResult.errorMessage,
          variant: "destructive",
        });
        return false;
      }
      
      if (downloadResult.data) {
        // Create a URL for the file and trigger download
        const url = URL.createObjectURL(downloadResult.data);
        const a = document.createElement('a');
        a.href = url;
        a.download = displayName || fileName;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        toast({
          title: "Download started",
          description: `${displayName || fileName} is downloading.`,
        });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Unexpected error downloading file:", error);
      toast({
        title: "Download failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    isDownloading,
    downloadFile
  };
};
