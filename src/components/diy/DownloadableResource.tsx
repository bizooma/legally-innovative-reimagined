
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import { BUCKET_NAME } from "@/config/documentConfig";

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
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Check bucket existence on component mount
  useEffect(() => {
    const checkBucketExists = async () => {
      try {
        const { data: buckets, error } = await supabase.storage.listBuckets();
        if (error) {
          console.error("Error checking buckets:", error);
          setHasError(true);
          return;
        }

        const bucketExists = buckets.some(b => b.name === bucketName);
        if (!bucketExists) {
          console.warn(`Bucket "${bucketName}" not found in list:`, buckets.map(b => b.name));
          setHasError(true);
        } else {
          setHasError(false);
        }
      } catch (err) {
        console.error("Failed to check bucket existence:", err);
        setHasError(true);
      }
    };

    checkBucketExists();
  }, [bucketName]);

  const retryBucketCheck = async () => {
    setHasError(false);
    
    try {
      // Force a refresh of the buckets list
      const { data: buckets, error } = await supabase.storage.listBuckets();
      
      if (error) {
        console.error("Error checking buckets on retry:", error);
        setHasError(true);
        toast({
          title: "Connection error",
          description: "Could not verify storage availability. Please try again later.",
          variant: "destructive",
        });
        return;
      }
      
      const bucketExists = buckets.some(b => b.name === bucketName);
      
      if (!bucketExists) {
        console.warn(`Bucket "${bucketName}" still not found after retry.`);
        setHasError(true);
        toast({
          title: "Storage issue",
          description: "The requested resource storage is not available. Please contact support.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Connection restored",
          description: "Storage connection has been restored. You can now download the resource.",
        });
      }
    } catch (err) {
      console.error("Failed during retry:", err);
      setHasError(true);
    }
  };

  const downloadFile = async () => {
    setIsDownloading(true);
    
    try {
      console.log(`Attempting to download ${fileName} from bucket ${bucketName}`);
      
      // First check if the bucket exists and is public
      const { data: buckets, error: bucketError } = await supabase.storage
        .listBuckets();
      
      if (bucketError) {
        console.error("Error checking buckets:", bucketError);
        toast({
          title: "Download failed",
          description: "Could not access storage buckets. Please try again later.",
          variant: "destructive",
        });
        setIsDownloading(false);
        return;
      }
      
      const bucket = buckets.find(b => b.name === bucketName);
      if (!bucket) {
        console.error(`Bucket "${bucketName}" does not exist`);
        toast({
          title: "Download failed",
          description: `Storage location "${bucketName}" not found.`,
          variant: "destructive",
        });
        setIsDownloading(false);
        setHasError(true);
        return;
      }
      
      console.log(`Bucket "${bucketName}" found, public: ${bucket.public}`);
      
      // List files in the bucket to check if the file exists
      const { data: files, error: listError } = await supabase.storage
        .from(bucketName)
        .list();
      
      if (listError) {
        console.error("Error listing files:", listError);
        toast({
          title: "Download failed",
          description: "Could not verify if the file exists. Please try again later.",
          variant: "destructive",
        });
        setIsDownloading(false);
        return;
      }
      
      console.log("Files in bucket:", files?.map(f => f.name));
      
      const fileExists = files?.some(f => f.name === fileName);
      if (!fileExists) {
        console.error(`File "${fileName}" not found in bucket "${bucketName}"`);
        toast({
          title: "Download failed",
          description: `The file "${fileName}" could not be found.`,
          variant: "destructive",
        });
        setIsDownloading(false);
        return;
      }
      
      // If bucket and file exist, try to download
      const { data, error } = await supabase.storage
        .from(bucketName)
        .download(fileName);
      
      if (error) {
        toast({
          title: "Download failed",
          description: error.message,
          variant: "destructive",
        });
        console.error("Error downloading file:", error);
        setIsDownloading(false);
        return;
      }
      
      if (data) {
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
          title: "Download started",
          description: `${displayName || fileName} is downloading.`,
        });
        setHasError(false);
      }
    } catch (error) {
      console.error("Unexpected error downloading file:", error);
      toast({
        title: "Download failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      
      {hasError ? (
        <div className="flex flex-col gap-3">
          <p className="text-red-600 text-sm">Storage connection issue detected</p>
          <Button
            variant="outline"
            className="flex items-center"
            onClick={retryBucketCheck}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry connection
          </Button>
        </div>
      ) : (
        <Button 
          className="bg-legal-primary hover:bg-legal-secondary"
          onClick={downloadFile}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Downloading...
            </>
          ) : (
            buttonText
          )}
        </Button>
      )}
    </div>
  );
};
