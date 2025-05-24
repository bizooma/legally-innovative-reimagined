
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
      
      // Check if user is admin or client
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*, clients(*)')
        .eq('id', data.user?.id)
        .maybeSingle();
        
      if (userError) {
        console.error('Error fetching user data:', userError);
        toast({
          title: "Login Successful",
          description: "User data could not be fully loaded",
        });
        navigate('/portal/client-dashboard');
        return;
      }
        
      if (userData?.is_admin) {
        console.log('useAuth: User is admin in database');
        toast({
          title: "Login Successful",
          description: "You have been logged in as an administrator.",
        });
        navigate('/portal/admin-dashboard');
      } else if (userData?.client_id) {
        console.log('useAuth: User has client_id:', userData.client_id);
        toast({
          title: "Login Successful",
          description: "Welcome to your client workspace.",
        });
        navigate(`/portal/client/${userData.client_id}`);
      } else {
        console.log('useAuth: Regular client user');
        toast({
          title: "Login Successful",
          description: "You have been logged in successfully.",
        });
        navigate('/portal/client-dashboard');
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

  return {
    isLoading,
    handleLogin
  };
}
