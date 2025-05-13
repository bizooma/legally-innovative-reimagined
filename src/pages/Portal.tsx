
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Form validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

const Portal = () => {
  const navigate = useNavigate();
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
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
                Client Portal
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Streamlined communication and collaboration for your legal marketing projects
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Marketing Copy */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-playfair font-bold mb-4 text-legal-dark">
                  Enhance Your Marketing Experience
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-legal-primary rounded-full p-2 mr-4 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Centralized Project Management</h3>
                      <p className="text-gray-600">Access all your marketing materials, campaigns, and analytics in one secure location.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-legal-primary rounded-full p-2 mr-4 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Real-time Project Updates</h3>
                      <p className="text-gray-600">Stay informed with the latest updates and progress on your marketing initiatives.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-legal-primary rounded-full p-2 mr-4 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Seamless Communication</h3>
                      <p className="text-gray-600">Direct messaging with your dedicated marketing team for quick response and collaboration.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-legal-primary rounded-full p-2 mr-4 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Document Sharing</h3>
                      <p className="text-gray-600">Securely exchange important documents and approve content without email hassle.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Login Form */}
              <div>
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
                    <Button variant="link" className="p-0 h-auto text-legal-primary" onClick={() => window.open("https://calendly.com/joe-bizooma/30min", "_blank")}>
                      Request Access
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Portal;
