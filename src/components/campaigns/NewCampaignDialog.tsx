
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CampaignForm } from "./CampaignForm";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NewCampaignDialogProps {
  clientId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewCampaignDialog({ clientId, open, onOpenChange }: NewCampaignDialogProps) {
  const handleSuccess = () => {
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Create New Marketing Campaign</DialogTitle>
          <DialogDescription>
            Fill out the details for your new marketing campaign. All fields are optional.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="pb-6">
            <CampaignForm 
              clientId={clientId} 
              onSuccess={handleSuccess} 
              onCancel={handleCancel} 
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
