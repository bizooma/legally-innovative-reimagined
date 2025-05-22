
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Form schema validation for staff member
const staffMemberSchema = z.object({
  full_name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  position: z.string().min(2, { message: 'Position is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().optional(),
  department: z.string().optional(),
});

type StaffMemberValues = z.infer<typeof staffMemberSchema>;

interface AddStaffMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddStaffMemberDialog: React.FC<AddStaffMemberDialogProps> = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  // Initialize the form
  const form = useForm<StaffMemberValues>({
    resolver: zodResolver(staffMemberSchema),
    defaultValues: {
      full_name: '',
      position: '',
      email: '',
      phone: '',
      department: '',
    },
  });

  // Handle form submission
  const onSubmit = async (values: StaffMemberValues) => {
    setIsSubmitting(true);
    try {
      // Add new staff member to the database
      const { data, error } = await supabase
        .from('staff_members')
        .insert([{
          full_name: values.full_name,
          position: values.position,
          email: values.email,
          phone: values.phone || null,
          department: values.department || null,
        }])
        .select();
      
      if (error) {
        throw error;
      }
      
      // Show success toast and close the dialog
      toast({
        title: 'Staff Member Added',
        description: `${values.full_name} has been added successfully.`,
      });
      
      // Reset the form and close the dialog
      form.reset();
      onClose();
      
      // Invalidate the staff members query to refetch the latest data
      queryClient.invalidateQueries({ queryKey: ['staffMembers'] });
    } catch (error: any) {
      console.error('Error adding staff member:', error);
      toast({
        title: 'Error Adding Staff Member',
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Reset the form when the dialog closes
  React.useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [isOpen, form]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Staff Member</DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
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
                    <Input {...field} placeholder="John Smith" />
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
                    <Input {...field} placeholder="Marketing Manager" />
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
                    <Input {...field} type="email" placeholder="john.smith@example.com" />
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
                  <FormLabel>Phone (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="+1 (555) 123-4567" />
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
                  <FormLabel>Department (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Marketing" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Staff Member"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStaffMemberDialog;
