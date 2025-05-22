
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

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
  const downloadFile = async () => {
    try {
      console.log(`Attempting to download ${fileName} from bucket ${bucketName}`);
      
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
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Button 
        className="bg-legal-primary hover:bg-legal-secondary"
        onClick={downloadFile}
      >
        {buttonText}
      </Button>
    </div>
  );
};
