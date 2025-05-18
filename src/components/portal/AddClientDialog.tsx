
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { UserPlus } from 'lucide-react';
import { Client } from '@/types/database';
import { ClientForm } from './ClientForm';
import { ClientFormValues } from '@/schemas/clientSchema';
import { addClient } from '@/services/clientService';

interface AddClientDialogProps {
  onClientAdded?: (client: Client) => void;
}

export function AddClientDialog({ onClientAdded }: AddClientDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(data: ClientFormValues) {
    setIsSubmitting(true);
    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("You must be logged in to add a client");
      }
      
      // Use the client service to add a new client
      const client = await addClient(data, user.id);
      
      // Call the onClientAdded callback if provided
      if (onClientAdded && client) {
        onClientAdded(client);
      }
      
      toast({
        title: "Client Added Successfully",
        description: `${data.companyName} has been added to your client list.`,
      });
      
      // Close dialog
      setOpen(false);
    } catch (error: any) {
      console.error("Error adding client:", error);
      toast({
        title: "Error Adding Client",
        description: error.message || "An error occurred while adding the client. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleCancel = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-2">
          <UserPlus size={18} />
          <span>Add New Client</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>
            Create a new client workspace. Client contacts will be able to access their workspace once added.
          </DialogDescription>
        </DialogHeader>
        
        <ClientForm 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting} 
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
