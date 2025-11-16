import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Lead } from '@/types/crm';

const editLeadSchema = z.object({
  company_name: z.string().min(1, 'Company name is required').max(200),
  contact_name: z.string().min(1, 'Contact name is required').max(200),
  contact_email: z.string().email('Invalid email address').max(255),
  contact_phone: z.string().max(50).optional().or(z.literal('')),
  source: z.string().max(100).optional().or(z.literal('')),
  estimated_value: z.string().optional().or(z.literal('')),
  commission_value: z.string().optional().or(z.literal('')),
  payment_type: z.enum(['monthly', 'one_time']),
  notes: z.string().max(2000).optional().or(z.literal('')),
  status: z.enum(['new', 'contacted', 'qualified', 'proposal_sent', 'won', 'lost']),
  next_follow_up: z.string().optional().or(z.literal('')),
});

type EditLeadFormValues = z.infer<typeof editLeadSchema>;

interface EditLeadDialogProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditLeadDialog: React.FC<EditLeadDialogProps> = ({
  lead,
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<EditLeadFormValues>({
    resolver: zodResolver(editLeadSchema),
    defaultValues: {
      company_name: '',
      contact_name: '',
      contact_email: '',
      contact_phone: '',
      source: '',
      estimated_value: '',
      commission_value: '',
      payment_type: 'one_time',
      notes: '',
      status: 'new',
      next_follow_up: '',
    },
  });

  // Update form values when lead changes
  useEffect(() => {
    if (lead) {
      form.reset({
        company_name: lead.company_name,
        contact_name: lead.contact_name,
        contact_email: lead.contact_email,
        contact_phone: lead.contact_phone || '',
        source: lead.source || '',
        estimated_value: lead.estimated_value?.toString() || '',
        commission_value: lead.commission_value?.toString() || '',
        payment_type: lead.payment_type || 'one_time',
        notes: lead.notes || '',
        status: lead.status,
        next_follow_up: lead.next_follow_up || '',
      });
    }
  }, [lead, form]);

  const updateLeadMutation = useMutation({
    mutationFn: async (values: EditLeadFormValues) => {
      if (!lead?.id) throw new Error('Lead ID is required');

      const leadData = {
        company_name: values.company_name,
        contact_name: values.contact_name,
        contact_email: values.contact_email,
        contact_phone: values.contact_phone || null,
        source: values.source || null,
        estimated_value: values.estimated_value
          ? parseFloat(values.estimated_value)
          : null,
        commission_value: values.commission_value
          ? parseFloat(values.commission_value)
          : null,
        payment_type: values.payment_type,
        notes: values.notes || null,
        status: values.status,
        next_follow_up: values.next_follow_up || null,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('leads')
        .update(leadData)
        .eq('id', lead.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['lead', lead?.id] });
      toast({
        title: 'Lead updated',
        description: 'The lead has been updated successfully.',
      });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update lead.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (values: EditLeadFormValues) => {
    updateLeadMutation.mutate(values);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !updateLeadMutation.isPending) {
      form.reset();
    }
    onOpenChange(newOpen);
  };

  if (!lead) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Lead</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Company Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Acme Corporation"
                          {...field}
                          disabled={updateLeadMutation.isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lead Source</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={updateLeadMutation.isPending}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select source" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="referral">Referral</SelectItem>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                          <SelectItem value="email">Email Campaign</SelectItem>
                          <SelectItem value="phone">Phone Call</SelectItem>
                          <SelectItem value="event">Event</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="contact_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Smith"
                          {...field}
                          disabled={updateLeadMutation.isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contact_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                          disabled={updateLeadMutation.isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contact_phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          {...field}
                          disabled={updateLeadMutation.isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="estimated_value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated Value ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="50000"
                          step="0.01"
                          {...field}
                          disabled={updateLeadMutation.isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="commission_value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>My Cut ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="25000"
                          step="0.01"
                          {...field}
                          disabled={updateLeadMutation.isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="payment_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-4"
                          disabled={updateLeadMutation.isPending}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="monthly" id="edit-monthly" />
                            <Label htmlFor="edit-monthly" className="cursor-pointer font-normal">
                              Monthly
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="one_time" id="edit-one_time" />
                            <Label htmlFor="edit-one_time" className="cursor-pointer font-normal">
                              One Time Fee
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Lead Status & Follow-up */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Status & Follow-up</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lead Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={updateLeadMutation.isPending}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="qualified">Qualified</SelectItem>
                          <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
                          <SelectItem value="won">Won</SelectItem>
                          <SelectItem value="lost">Lost</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="next_follow_up"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Next Follow-up Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          disabled={updateLeadMutation.isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any relevant information about this lead..."
                      className="min-h-[100px]"
                      {...field}
                      disabled={updateLeadMutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={updateLeadMutation.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateLeadMutation.isPending}>
                {updateLeadMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Update Lead
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
