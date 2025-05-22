
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { StaffMember } from '@/hooks/staff/types';

// Define form schema
const staffMemberSchema = z.object({
  full_name: z.string().min(2, { message: 'Full name must be at least 2 characters' }),
  position: z.string().min(2, { message: 'Position is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().optional(),
  department: z.string().optional(),
});

interface EditStaffMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  staffMember: StaffMember;
  onUpdate: (staffMember: StaffMember) => void;
}

const EditStaffMemberDialog: React.FC<EditStaffMemberDialogProps> = ({
  isOpen,
  onClose,
  staffMember,
  onUpdate,
}) => {
  // Initialize form
  const form = useForm<z.infer<typeof staffMemberSchema>>({
    resolver: zodResolver(staffMemberSchema),
    defaultValues: {
      full_name: staffMember.full_name,
      position: staffMember.position,
      email: staffMember.email,
      phone: staffMember.phone || '',
      department: staffMember.department || '',
    },
  });

  // Handle form submission
  const onSubmit = (data: z.infer<typeof staffMemberSchema>) => {
    onUpdate({
      ...staffMember,
      ...data,
      phone: data.phone || null,
      department: data.department || null,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Staff Member</DialogTitle>
          <DialogDescription>
            Update the staff member's information. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditStaffMemberDialog;
