
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';
import { StaffMember } from '@/hooks/staff/types';

// Define form schema
const passwordSchema = z.object({
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

interface AssignPasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
  staffMember: StaffMember | null;
  onAssignPassword: (email: string, password: string) => Promise<boolean>;
}

const AssignPasswordDialog: React.FC<AssignPasswordDialogProps> = ({
  isOpen,
  onClose,
  staffMember,
  onAssignPassword,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize form
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    },
  });

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof passwordSchema>) => {
    if (!staffMember) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await onAssignPassword(staffMember.email, data.password);
      form.reset();
      onClose(); // Ensure dialog closes on success
    } catch (err) {
      console.error('Error in password assignment:', err);
      setError(err instanceof Error ? err.message : 'Failed to assign password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form and error when dialog opens/closes
  React.useEffect(() => {
    if (isOpen) {
      form.reset();
      setError(null);
    }
  }, [isOpen, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Password</DialogTitle>
          <DialogDescription>
            Set a password for {staffMember?.full_name}. The user will be able to log in with this password.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="p-3 text-sm bg-destructive/15 text-destructive rounded">
                {error}
              </div>
            )}
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Assigning..." : "Assign Password"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AssignPasswordDialog;
