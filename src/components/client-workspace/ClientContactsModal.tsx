
import React from 'react';
import { Mail, Phone, User, Key } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useClientContacts } from '@/hooks/useClientContacts';
import { ChangePasswordDialog } from '@/components/auth/ChangePasswordDialog';
import { Button } from '@/components/ui/button';

interface ClientContactsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientId: string;
  clientName: string;
}

const ClientContactsModal: React.FC<ClientContactsModalProps> = ({
  open,
  onOpenChange,
  clientId,
  clientName,
}) => {
  const { contacts, isLoading } = useClientContacts(clientId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">{clientName} Contacts</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : contacts && contacts.length > 0 ? (
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div key={contact.id} className="border rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{contact.full_name || contact.email}</span>
                    </div>
                    
                    <ChangePasswordDialog 
                      isPrimaryContact={contact.id === 'primary'} 
                      email={contact.email}
                    />
                  </div>
                  
                  <div className="space-y-2 ml-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                        {contact.email}
                      </a>
                    </div>
                    
                    {contact.id === 'primary' ? (
                      <div className="text-xs text-muted-foreground">
                        Primary Contact (No portal access)
                      </div>
                    ) : (
                      <div className="text-xs text-muted-foreground">
                        Client Portal User
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center">
              <p className="text-muted-foreground">No contacts found for this client.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClientContactsModal;
