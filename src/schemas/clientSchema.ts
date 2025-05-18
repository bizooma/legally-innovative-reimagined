
import { z } from 'zod';

export const clientFormSchema = z.object({
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  contactName: z.string().min(2, {
    message: "Contact name must be at least 2 characters.",
  }),
  contactEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  contactPhone: z.string().optional(),
  notes: z.string().optional(),
});

export type ClientFormValues = z.infer<typeof clientFormSchema>;
