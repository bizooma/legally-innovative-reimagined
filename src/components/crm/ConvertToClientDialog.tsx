import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  FormDescription,
} from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Lead } from '@/types/crm';
import { Loader2, CheckCircle2, Building2 } from 'lucide-react';

const convertToClientSchema = z.object({
  company_name: z.string().min(1, 'Company name is required').max(200),
  contact_name: z.string().min(1, 'Contact name is required').max(200),
  contact_email: z.string().email('Invalid email address').max(255),
  contact_phone: z.string().max(50).optional().or(z.literal('')),
  status: z.enum(['active', 'onboarding', 'inactive']),
  notes: z.string().max(2000).optional().or(z.literal('')),
});

type ConvertToClientFormValues = z.infer<typeof convertToClientSchema>;

interface ConvertToClientDialogProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (clientId: string) => void;
}

export const ConvertToClientDialog: React.FC<ConvertToClientDialogProps> = ({
  lead,
  open,
  onOpenChange,
  onSuccess,
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ConvertToClientFormValues>({
    resolver: zodResolver(convertToClientSchema),
    defaultValues: {
      company_name: lead?.company_name || '',
      contact_name: lead?.contact_name || '',
      contact_email: lead?.contact_email || '',
      contact_phone: lead?.contact_phone || '',
      status: 'onboarding',
      notes: lead?.notes || '',
    },
  });

  // Reset form when lead changes
  React.useEffect(() => {
    if (lead && open) {
      form.reset({
        company_name: lead.company_name,
        contact_name: lead.contact_name,
        contact_email: lead.contact_email,
        contact_phone: lead.contact_phone || '',
        status: 'onboarding',
        notes: lead.notes || '',
      });
    }
  }, [lead, open, form]);

  const convertToClientMutation = useMutation({
    mutationFn: async (values: ConvertToClientFormValues) => {
      if (!lead) throw new Error('No lead selected');

      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');

      // Start a transaction-like operation
      // First, create the client
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .insert({
          company_name: values.company_name,
          contact_name: values.contact_name,
          contact_email: values.contact_email,
          contact_phone: values.contact_phone || null,
          notes: values.notes || null,
          status: values.status,
          created_by: userData.user.id,
        })
        .select()
        .single();

      if (clientError) throw clientError;

      // Then, update the lead to mark it as won and link to the client
      const { error: leadError } = await supabase
        .from('leads')
        .update({
          status: 'won',
          converted_to_client_id: clientData.id,
          updated_at: new Date().toISOString(),
        })
        .eq('id', lead.id);

      if (leadError) {
        // Rollback: delete the client if lead update fails
        await supabase.from('clients').delete().eq('id', clientData.id);
        throw leadError;
      }

      // Optionally log the conversion as an activity
      await supabase.from('crm_activities').insert({
        lead_id: lead.id,
        activity_type: 'note',
        summary: 'Lead converted to client',
        notes: `Successfully converted to client: ${values.company_name}`,
        created_by: userData.user.id,
      });

      return clientData;
    },
    onSuccess: (clientData) => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['crm-activities', lead?.id] });
      
      toast({
        title: 'Lead converted successfully!',
        description: `${clientData.company_name} is now a client.`,
      });
      
      form.reset();
      onOpenChange(false);
      
      if (onSuccess) {
        onSuccess(clientData.id);
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Conversion failed',
        description: error.message || 'Failed to convert lead to client.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (values: ConvertToClientFormValues) => {
    convertToClientMutation.mutate(values);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !convertToClientMutation.isPending) {
      form.reset();
    }
    onOpenChange(newOpen);
  };

  if (!lead) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-playfair">
                Convert Lead to Client
              </DialogTitle>
              <DialogDescription>
                Create a new client record from this lead
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="bg-muted/30 border rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold">{lead.company_name}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Review and adjust the information below before converting this lead to a client.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={convertToClientMutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Name *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={convertToClientMutation.isPending}
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
                        {...field}
                        disabled={convertToClientMutation.isPending}
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
                        {...field}
                        disabled={convertToClientMutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={convertToClientMutation.isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="onboarding">Onboarding</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Set the initial status for this client
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any additional notes..."
                      rows={3}
                      {...field}
                      disabled={convertToClientMutation.isPending}
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
                disabled={convertToClientMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={convertToClientMutation.isPending}
                className="bg-green-600 hover:bg-green-700"
              >
                {convertToClientMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Convert to Client
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
