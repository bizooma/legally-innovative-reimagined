
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { LoginFormValues, ADMIN_EMAIL, ADMIN_TEMP_PASSWORD } from '@/schemas/authSchema';

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
      // For demo purposes, we'll continue to support the hardcoded admin
      const isAdmin = values.email.toLowerCase() === ADMIN_EMAIL;
      
      if (isAdmin && values.password === ADMIN_TEMP_PASSWORD) {
        // Successful admin login - create a Supabase account if it doesn't exist
        try {
          // Check if admin exists first
          const { data: existingUser } = await supabase
            .from('users')
            .select()
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
          .select()
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

  return {
    isLoading,
    handleLogin
  };
}
