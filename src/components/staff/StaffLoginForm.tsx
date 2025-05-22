
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ADMIN_EMAILS, ADMIN_TEMP_PASSWORD } from '@/schemas/authSchema';

// Form validation schema
const staffLoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

type StaffLoginValues = z.infer<typeof staffLoginSchema>;

const StaffLoginForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  
  // Initialize the form with validation
  const form = useForm<StaffLoginValues>({
    resolver: zodResolver(staffLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: StaffLoginValues) => {
    setIsLoading(true);
    
    try {
      toast({
        title: "Logging in...",
        description: "Please wait while we verify your credentials.",
      });
      
      // Check for admin credentials first
      const isAdmin = ADMIN_EMAILS.includes(values.email.toLowerCase());
      
      if (isAdmin && values.password === ADMIN_TEMP_PASSWORD) {
        // Admin login success
        toast({
          title: "Admin Login Successful",
          description: "Welcome to the staff portal, admin.",
        });
        
        // Try to sign in with Supabase 
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: ADMIN_TEMP_PASSWORD,
          });
          
          if (error) {
            // If sign in fails, try to create the admin account
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
              email: values.email,
              password: ADMIN_TEMP_PASSWORD,
              options: {
                data: {
                  full_name: values.email === "joe@bizooma.com" ? "Joe from Bizooma" : "Angela Afford",
                  is_admin: true
                }
              }
            });
            
            if (!signUpError) {
              console.log("Created admin account in Supabase");
            }
          }
        } catch (supabaseError) {
          // Silent catch - we'll still allow admin login for demo purposes
          console.log("Supabase admin auth error:", supabaseError);
        }
        
        navigate('/staff/dashboard');
        return;
      }
      
      // Not an admin or incorrect admin password, try regular Supabase auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Login Successful",
        description: "Welcome to the staff portal.",
      });
      
      navigate('/staff/dashboard');
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error.message || "An error occurred during login. Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Staff Login</CardTitle>
        <CardDescription>
          Access your staff intranet account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="yourname@legallyinnovative.com" {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button 
                type="submit" 
                className="w-full bg-legal-primary hover:bg-legal-secondary"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log In"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default StaffLoginForm;
