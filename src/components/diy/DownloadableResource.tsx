
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
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

  const downloadFile = async () => {
    setIsDownloading(true);
    
    try {
      console.log(`Attempting to download ${fileName} from bucket ${bucketName}`);
      
      // First check if the bucket exists
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
      
      const bucketExists = buckets.some(b => b.name === bucketName);
      if (!bucketExists) {
        console.error(`Bucket "${bucketName}" does not exist`);
        toast({
          title: "Download failed",
          description: `Storage location "${bucketName}" not found.`,
          variant: "destructive",
        });
        setIsDownloading(false);
        return;
      }
      
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
      
      console.log("Files in bucket:", files.map(f => f.name));
      
      const fileExists = files.some(f => f.name === fileName);
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
    </div>
  );
};
