
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
      
      // Check if user is admin or client user and route accordingly
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('is_admin, client_id')
        .eq('id', data.user.id)
        .single();
      
      if (userError) {
        console.error('useAuth: Error fetching user data:', userError);
        throw new Error('Failed to fetch user permissions');
      }
      
      if (userData.is_admin) {
        console.log('useAuth: Routing admin user to admin dashboard');
        navigate('/portal/admin-dashboard');
      } else if (userData.client_id) {
        console.log('useAuth: Routing client user to their workspace');
        navigate(`/portal/clients/${userData.client_id}`);
      } else {
        console.log('useAuth: User has no assigned client, routing to admin dashboard');
        navigate('/portal/admin-dashboard');
      }
      
      toast({
        title: "Login Successful",
        description: "Welcome to your dashboard.",
      });
      
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
