
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChangePasswordForm } from './ChangePasswordForm';

interface ChangePasswordDialogProps {
  isPrimaryContact?: boolean;
  email?: string;
}

export function ChangePasswordDialog({ isPrimaryContact = false, email }: ChangePasswordDialogProps) {
  const [open, setOpen] = React.useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white hover:bg-gray-100">
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            {isPrimaryContact 
              ? "Set a password for this primary contact to enable portal access."
              : "Update your password. After saving, you'll use the new password to log in."}
          </DialogDescription>
        </DialogHeader>
        <ChangePasswordForm isPrimaryContact={isPrimaryContact} email={email} />
      </DialogContent>
    </Dialog>
  );
}
