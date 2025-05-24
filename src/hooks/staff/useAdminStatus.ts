
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useAdminStatus() {
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Check if current user is an admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      console.log('Checking admin status...');
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.log('No session found');
        return;
      }
      
      console.log('Session found, checking user admin status for:', session.user.email);
      
      const { data, error } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', session.user.id)
        .single();
      
      if (error) {
        console.error('Error checking admin status:', error);
        return;
      }
      
      console.log('Admin status data:', data);
      const adminStatus = data?.is_admin || false;
      setIsAdmin(adminStatus);
      console.log('Set isAdmin to:', adminStatus);
    };
    
    checkAdminStatus();
  }, []);

  return { isAdmin };
}
