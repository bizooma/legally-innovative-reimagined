
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  // Initialize the form with validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Mock login function - in a real app, this would connect to your authentication system
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Simple mock authentication
    console.log("Login attempt:", values);
    
    // Show loading toast
    toast({
      title: "Logging in...",
      description: "Please wait while we verify your credentials.",
    });
    
    // Simulate API call delay
    setTimeout(() => {
      // For now, just show an error message since we don't have actual authentication
      toast({
        title: "Login Failed",
        description: "This is a demo. In the actual app, credentials would be verified against your database.",
        variant: "destructive",
      });
    }, 1500);
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
              <Button type="submit" className="w-full bg-legal-primary hover:bg-legal-secondary">
                Log In
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <p className="text-sm text-muted-foreground">
          Don't have credentials? Contact your account manager for access.
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
