
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Client } from '@/types/database';

export function useDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState({
    activeClients: 0,
    pendingApprovals: 0,
    newMessages: 0,
  });
  const [user, setUser] = useState<any>(null);

  // Check auth status and admin permissions
  useEffect(() => {
    const checkUser = async () => {
      console.log('useDashboard: Checking user authentication...');
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.log('useDashboard: No session found, redirecting to portal');
        toast({
          title: "Authentication Required",
          description: "Please login to access the dashboard",
          variant: "destructive",
        });
        navigate('/portal');
        return;
      }
      
      console.log('useDashboard: Valid session found for user:', session.user.email);
      setUser(session.user);
      
      // Check if user is admin
      console.log('useDashboard: Checking admin status...');
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', session.user.id)
        .maybeSingle();
        
      if (!userError && userData) {
        console.log('useDashboard: Admin status:', userData.is_admin);
        setIsAdmin(userData.is_admin || false);
      } else {
        console.log('useDashboard: Could not determine admin status, defaulting to false');
        setIsAdmin(false);
      }
    };
    
    checkUser();
  }, [navigate, toast]);

  // Load clients from Supabase
  useEffect(() => {
    const fetchClients = async () => {
      if (!user) {
        console.log('useDashboard: No user, skipping client fetch');
        return;
      }

      try {
        console.log('useDashboard: Fetching clients for user:', user.email);
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('clients')
          .select('*')
          .order('date_added', { ascending: false });
          
        if (error) {
          console.error('useDashboard: Error fetching clients:', error);
          throw error;
        }
        
        console.log('useDashboard: Successfully fetched', data?.length || 0, 'clients');
        
        if (data) {
          setClients(data as Client[]);
          setStats(prev => ({
            ...prev,
            activeClients: data.length
          }));
        } else {
          console.log('useDashboard: No client data returned');
          setClients([]);
        }
      } catch (error: any) {
        console.error('useDashboard: Error in fetchClients:', error);
        toast({
          title: "Error",
          description: "Could not load client data: " + (error.message || "Unknown error"),
          variant: "destructive",
        });
        setClients([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchClients();
  }, [user, toast]);

  // Handle adding a new client (admin only)
  const handleAddClient = (client: Client) => {
    if (!isAdmin) {
      console.log('useDashboard: Non-admin user attempted to add client');
      return;
    }
    console.log('useDashboard: Adding new client to local state');
    setClients(prev => [client, ...prev]);
    setStats(prev => ({
      ...prev,
      activeClients: prev.activeClients + 1
    }));
  };

  // Handle logout with improved session error handling
  const handleLogout = async () => {
    try {
      console.log('Starting logout process...');
      
      // Clear local state immediately
      setUser(null);
      setClients([]);
      setIsAdmin(false);
      
      // Check if we have a valid session before attempting logout
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        console.log('No valid session found, proceeding with local logout');
        toast({
          title: "Logged Out",
          description: "You have been logged out",
        });
        navigate('/portal');
        return;
      }
      
      // Attempt to sign out from Supabase only if we have a valid session
      console.log('Valid session found, attempting Supabase logout...');
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Logout error:', error);
        // Don't treat session errors as failures since we're logging out anyway
        if (error.message?.includes('session') || error.message?.includes('Session')) {
          console.log('Session-related logout error, treating as successful logout');
        }
      } else {
        console.log('Logout successful');
      }
      
      toast({
        title: "Logged Out", 
        description: "You have been successfully logged out",
      });
      
      // Always navigate to portal
      navigate('/portal');
      
    } catch (error: any) {
      console.error('Unexpected logout error:', error);
      
      // Ensure we still clear state and redirect on any error
      setUser(null);
      setClients([]);
      setIsAdmin(false);
      
      toast({
        title: "Logged Out",
        description: "Session ended",
      });
      
      navigate('/portal');
    }
  };

  return {
    clients,
    isLoading,
    stats,
    user,
    isAdmin,
    handleAddClient,
    handleLogout
  };
}
