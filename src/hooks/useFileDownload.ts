
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { handleStorageOperation } from "@/utils/storageErrorUtils";

export const useFileDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadFile = async (bucketName: string, fileName: string, displayName?: string): Promise<boolean> => {
    setIsDownloading(true);
    console.log(`Starting download for ${fileName} from bucket ${bucketName}`);
    
    try {
      // Try to download the file directly - this is more reliable than checking first
      const { data, error } = await supabase.storage.from(bucketName).download(fileName);
      
      // If there's an error downloading, handle it
      if (error) {
        console.error(`Error downloading file: ${error.message}`, error);
        
        // Check if the bucket exists and what files are available
        const { data: buckets } = await supabase.storage.listBuckets();
        const bucketExists = buckets?.some(b => b.name === bucketName);
        
        if (!bucketExists) {
          toast({
            title: "Download failed",
            description: `Storage bucket "${bucketName}" not found.`,
            variant: "destructive",
          });
          return false;
        }
        
        // List files in the bucket to show what's available
        const { data: files } = await supabase.storage.from(bucketName).list();
        console.log(`Files in bucket "${bucketName}":`, files?.map(f => f.name) || []);
        
        toast({
          title: "Download failed",
          description: `Could not download "${fileName}". ${error.message}`,
          variant: "destructive",
        });
        return false;
      }
      
      if (!data) {
        console.error("No data received from download");
        toast({
          title: "Download failed",
          description: "No file data received from storage",
          variant: "destructive",
        });
        return false;
      }
      
      console.log(`Successfully downloaded file: ${fileName}`);
      
      // Create a URL for the file and trigger download
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = displayName || fileName;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Download successful",
        description: `${displayName || fileName} is downloading.`,
      });
      return true;
    } catch (error) {
      console.error("Unexpected error downloading file:", error);
      toast({
        title: "Download failed",
        description: "An unexpected error occurred during download",
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
