
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { LoginFormValues, ADMIN_EMAILS, ADMIN_TEMP_PASSWORD } from '@/schemas/authSchema';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values: LoginFormValues) => {
    setIsLoading(true);
    
    toast({
      title: "Logging in...",
      description: "Please wait while we verify your credentials.",
    });
    
    try {
      // For demo purposes, check hardcoded admin credentials first
      const isAdmin = ADMIN_EMAILS.includes(values.email.toLowerCase());
      
      if (isAdmin && values.password === ADMIN_TEMP_PASSWORD) {
        // Successful admin login - just navigate without Supabase auth for demo
        toast({
          title: "Login Successful",
          description: "You have been logged in as the portal administrator.",
        });
        
        navigate('/portal/admin-dashboard');
        return;
      }
      
      // For non-admin users, try regular Supabase auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password
      });
      
      if (error) {
        throw error;
      }
      
      // Check if user is admin or client
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*, clients(*)')
        .eq('id', data.user?.id)
        .maybeSingle();
        
      if (userError) {
        console.error('Error fetching user data:', userError);
        // Continue with basic login - don't throw here to allow login to proceed
        toast({
          title: "Login Successful",
          description: "User data could not be fully loaded",
        });
      }
        
      if (userData?.is_admin) {
        toast({
          title: "Login Successful",
          description: "You have been logged in as an administrator.",
        });
        navigate('/portal/admin-dashboard');
      } else if (userData?.client_id) {
        toast({
          title: "Login Successful",
          description: "Welcome to your client workspace.",
        });
        // Redirect to the specific client workspace
        navigate(`/portal/client/${userData.client_id}`);
      } else {
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
