
import { z } from 'zod';

// Form validation schema
export const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

// Type for the form values
export type LoginFormValues = z.infer<typeof loginFormSchema>;

// Admin configuration - hardcoded for demo purposes
export const ADMIN_EMAILS = ["joe@bizooma.com", "angafford@yahoo.com"];
export const ADMIN_TEMP_PASSWORD = "admin123";
