
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
import { ContactForm, ContactFormValues } from './ContactForm';
import { createClientContact } from '@/services/contactService';

interface AddClientContactDialogProps {
  clients: Client[];
}

export function AddClientContactDialog({ clients }: AddClientContactDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    try {
      await createClientContact(data);
      
      toast({
        title: "Contact Added Successfully",
        description: `${data.firstName} ${data.lastName} has been added as a client contact.`,
      });
      
      setOpen(false);
    } catch (error: any) {
      console.error("Error adding client contact:", error);
      toast({
        title: "Error Adding Contact",
        description: error.message || "An error occurred while adding the contact.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-2" variant="outline">
          <UserPlus size={18} />
          <span>Add Client Contact</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add Client Contact</DialogTitle>
          <DialogDescription>
            Create a new contact that can access their client workspace.
          </DialogDescription>
        </DialogHeader>
        
        <ContactForm 
          clients={clients} 
          onSubmit={handleSubmit} 
          onCancel={() => setOpen(false)} 
          isSubmitting={isSubmitting} 
        />
      </DialogContent>
    </Dialog>
  );
}
