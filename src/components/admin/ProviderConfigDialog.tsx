import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ProviderConfig } from "@/types/providerStatus";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9_]+$/, "Slug must be lowercase letters, numbers, and underscores"),
  icon_initials: z.string().min(1).max(4, "Max 4 characters"),
  status_endpoint: z.string().url().optional().or(z.literal("")),
  check_method: z.enum(["api", "mock"]),
  is_active: z.boolean(),
  display_order: z.number().int().min(0),
});

type FormValues = z.infer<typeof formSchema>;

interface ProviderConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  provider: ProviderConfig | null;
  onSuccess: () => void;
}

export const ProviderConfigDialog = ({
  open,
  onOpenChange,
  provider,
  onSuccess,
}: ProviderConfigDialogProps) => {
  const { toast } = useToast();
  const isEditing = !!provider;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: provider
      ? {
          name: provider.name,
          slug: provider.slug,
          icon_initials: provider.icon_initials,
          status_endpoint: provider.status_endpoint || "",
          check_method: provider.check_method,
          is_active: provider.is_active,
          display_order: provider.display_order,
        }
      : {
          name: "",
          slug: "",
          icon_initials: "",
          status_endpoint: "",
          check_method: "mock",
          is_active: true,
          display_order: 0,
        },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const payload = {
        ...values,
        status_endpoint: values.status_endpoint || null,
      };

      if (isEditing) {
        const { error } = await supabase
          .from("provider_status_configs")
          .update(payload)
          .eq("id", provider.id);

        if (error) throw error;
        toast({ title: "Provider updated successfully" });
      } else {
        const { error } = await supabase
          .from("provider_status_configs")
          .insert(payload);

        if (error) throw error;
        toast({ title: "Provider created successfully" });
      }

      form.reset();
      onSuccess();
    } catch (error: any) {
      toast({
        title: isEditing ? "Error updating provider" : "Error creating provider",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Provider" : "Add New Provider"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Provider Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Cloudflare" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., cloudflare" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon_initials"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon Initials</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., CF" maxLength={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status_endpoint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status Endpoint URL (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://status.example.com/api" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="check_method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Check Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="mock">Mock</SelectItem>
                      <SelectItem value="api">API</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="display_order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Order</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <FormLabel className="mb-0">Active</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">{isEditing ? "Update" : "Create"}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
