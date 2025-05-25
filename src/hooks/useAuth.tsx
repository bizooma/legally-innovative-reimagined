
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { LoginFormValues } from '@/schemas/authSchema';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values: LoginFormValues) => {
    setIsLoading(true);
    
    console.log('useAuth: Starting login process for:', values.email);
    
    toast({
      title: "Logging in...",
      description: "Please wait while we verify your credentials.",
    });
    
    try {
      // Use Supabase authentication for all users
      console.log('useAuth: Attempting Supabase authentication');
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password
      });
      
      if (error) {
        console.error('useAuth: Supabase auth error:', error);
        throw error;
      }
      
      console.log('useAuth: Supabase auth successful');
      
      // Route all users to admin dashboard - they'll see appropriate features based on their permissions
      console.log('useAuth: Routing user to admin dashboard');
      toast({
        title: "Login Successful",
        description: "Welcome to your dashboard.",
      });
      navigate('/portal/admin-dashboard');
      
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

  return {
    isLoading,
    handleLogin
  };
}
