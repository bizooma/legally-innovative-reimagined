
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ResourceDownloadButtonProps {
  isDownloading: boolean;
  buttonText: string;
  onDownload: () => void;
}

export const ResourceDownloadButton = ({ 
  isDownloading, 
  buttonText, 
  onDownload 
}: ResourceDownloadButtonProps) => {
  return (
    <Button 
      className="bg-legal-primary hover:bg-legal-secondary"
      onClick={onDownload}
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
  );
};
