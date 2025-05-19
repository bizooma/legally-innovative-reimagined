
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { supabase } from '@/integrations/supabase/client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from '@/components/ui/password-input';

interface ChangePasswordFormProps {
  isPrimaryContact?: boolean;
  email?: string;
}

export function ChangePasswordForm({ isPrimaryContact = false, email }: ChangePasswordFormProps) {
  const { toast } = useToast();
  
  // Create a dynamic schema based on whether this is a primary contact
  const passwordChangeSchema = z.object({
    ...(isPrimaryContact ? {} : {
      currentPassword: z.string().min(6, {
        message: "Current password is required",
      })
    }),
    newPassword: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password confirmation is required",
    }),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  type PasswordChangeFormValues = z.infer<typeof passwordChangeSchema>;

  const form = useForm<PasswordChangeFormValues>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      ...(isPrimaryContact ? {} : { currentPassword: "" }),
      newPassword: "",
      confirmPassword: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: PasswordChangeFormValues) => {
    try {
      if (isPrimaryContact) {
        // For primary contacts, create a new account with the provided email and password
        const { error } = await supabase.auth.signInWithOtp({
          email: email || '',
          options: {
            shouldCreateUser: false,
          }
        });

        if (error) {
          throw error;
        }

        toast({
          title: "Success",
          description: "A password reset link has been sent to the email address.",
        });
      } else {
        // If not a primary contact, verify the current password by attempting a login
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email: email || (await supabase.auth.getUser()).data.user?.email || '',
          password: values.currentPassword!,
        });

        if (loginError) {
          toast({
            title: "Error",
            description: "Current password is incorrect",
            variant: "destructive",
          });
          return;
        }

        // Set or update the password
        const { error } = await supabase.auth.updateUser({
          password: values.newPassword
        });

        if (error) {
          throw error;
        }

        toast({
          title: "Success",
          description: "The password has been changed successfully.",
        });
      }

      // Reset the form
      form.reset();
    } catch (error: any) {
      toast({
        title: "Password Change Failed",
        description: error.message || "An error occurred while changing the password.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {!isPrimaryContact && (
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <PasswordInput 
                    placeholder="Enter your current password" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput 
                  placeholder="Enter your new password" 
                  {...field} 
                />
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
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <PasswordInput 
                  placeholder="Confirm your new password" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Processing..." : (isPrimaryContact ? "Send Password Reset Link" : "Change Password")}
        </Button>
      </form>
    </Form>
  );
}
