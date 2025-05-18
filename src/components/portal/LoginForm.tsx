import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Form validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

// Admin configuration - hardcoded for demo purposes
const ADMIN_EMAIL = "joe@bizooma.com";
const ADMIN_TEMP_PASSWORD = "admin123"; 

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Initialize the form with validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle login with Supabase
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Show loading toast
    toast({
      title: "Logging in...",
      description: "Please wait while we verify your credentials.",
    });
    
    try {
      // For demo purposes, we'll continue to support the hardcoded admin
      const isAdmin = values.email.toLowerCase() === ADMIN_EMAIL;
      
      if (isAdmin && values.password === ADMIN_TEMP_PASSWORD) {
        // Successful admin login - create a Supabase account if it doesn't exist
        try {
          // Check if admin exists first
          const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('email', ADMIN_EMAIL)
            .maybeSingle();
            
          if (!existingUser) {
            // Try to sign up
            await supabase.auth.signUp({
              email: ADMIN_EMAIL,
              password: ADMIN_TEMP_PASSWORD,
              options: {
                data: {
                  full_name: "Joe from Bizooma",
                }
              }
            });
          }
          
          // Now sign in
          const { error } = await supabase.auth.signInWithPassword({
            email: ADMIN_EMAIL,
            password: ADMIN_TEMP_PASSWORD,
          });
          
          if (error) throw error;
          
          toast({
            title: "Login Successful",
            description: "You have been logged in as the portal administrator.",
          });
          
          navigate('/portal/admin-dashboard');
        } catch (err) {
          console.error("Admin login error:", err);
          // Fall back to navigation without Supabase auth for demo
          toast({
            title: "Login Successful",
            description: "You have been logged in as the portal administrator (demo mode).",
          });
          navigate('/portal/admin-dashboard');
        }
      } else {
        // Regular user login attempt
        const { data, error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password
        });
        
        if (error) {
          throw error;
        }
        
        // Check if user is admin
        const { data: userData } = await supabase
          .from('users')
          .select('is_admin')
          .eq('id', data.user?.id)
          .maybeSingle();
          
        toast({
          title: "Login Successful",
          description: userData?.is_admin 
            ? "You have been logged in as an administrator."
            : "You have been logged in successfully.",
        });
        
        // Navigate based on admin status
        if (userData?.is_admin) {
          navigate('/portal/admin-dashboard');
        } else {
          navigate('/portal/client-dashboard');
        }
      }
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
    <Card className="border-legal-light">
      <CardHeader>
        <CardTitle>Client Login</CardTitle>
        <CardDescription>
          Access your exclusive marketing portal
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
                    <Input placeholder="yourname@lawfirm.com" {...field} type="email" />
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
                    <div className="relative">
                      <Input 
                        placeholder="Enter your password" 
                        type={showPassword ? "text" : "password"} 
                        {...field} 
                      />
                      <button 
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
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
      <CardFooter className="flex flex-col items-start">
        <p className="text-sm text-muted-foreground">
          Don't have credentials? Contact your account manager for access.
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          <strong>Administrator:</strong> Use email joe@bizooma.com with password "admin123"
        </p>
        <Button 
          variant="link" 
          className="p-0 h-auto text-legal-primary" 
          onClick={() => window.location.href = "mailto:joe@bizooma.com?subject=Portal%20Access%20Request&body=Hello,%0A%0AI'd%20like%20to%20request%20access%20to%20the%20client%20portal.%20Please%20provide%20me%20with%20login%20credentials.%0A%0AThank%20you."}
        >
          Request Access
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
