
import React, { useRef, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { adminSetPassword } from '@/services/contactService';
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
import TurnstileWidget, { TurnstileHandle } from '@/components/security/TurnstileWidget';

interface ChangePasswordFormProps {
  isPrimaryContact?: boolean;
  email?: string;
}

export function ChangePasswordForm({ isPrimaryContact = false, email }: ChangePasswordFormProps) {
  const { toast } = useToast();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileHandle>(null);
  
  // Create a schema that only requires new password fields (no current password)
  const passwordChangeSchema = z.object({
    newPassword: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password confirmation is required",
    }),
    ...(isPrimaryContact ? {} : {
      currentPassword: z.string().min(6, {
        message: "Current password is required",
      })
    }),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  type PasswordChangeFormValues = z.infer<typeof passwordChangeSchema>;

  const form = useForm<PasswordChangeFormValues>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
      ...(isPrimaryContact ? {} : { currentPassword: "" }),
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: PasswordChangeFormValues) => {
    if (!isPrimaryContact && !captchaToken) return;
    try {
      if (isPrimaryContact && email) {
        // For primary contacts, use our adminSetPassword service function
        await adminSetPassword(email, values.newPassword);
        
        toast({
          title: "Success",
          description: "Password has been set successfully.",
        });
      } else {
        // Non-primary contacts - verify current password first
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email: email || (await supabase.auth.getUser()).data.user?.email || '',
          password: values.currentPassword!,
          options: { captchaToken: captchaToken ?? undefined },
        });

        if (loginError) {
          setCaptchaToken(null);
          turnstileRef.current?.reset();
          toast({
            title: "Error",
            description: "Current password is incorrect",
            variant: "destructive",
          });
          return;
        }

        // Update the password
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
      setCaptchaToken(null);
      turnstileRef.current?.reset();
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
                  placeholder="Enter new password" 
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
                  placeholder="Confirm new password" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isPrimaryContact && (
          <TurnstileWidget
            ref={turnstileRef}
            onVerify={setCaptchaToken}
            onExpire={() => setCaptchaToken(null)}
          />
        )}
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || (!isPrimaryContact && !captchaToken)}
        >
          {isLoading ? "Processing..." : (isPrimaryContact ? "Set Password" : "Change Password")}
        </Button>
      </form>
    </Form>
  );
}
