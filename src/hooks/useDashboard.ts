
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
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please login to access the dashboard",
          variant: "destructive",
        });
        navigate('/portal');
        return;
      }
      
      setUser(session.user);
      
      // Check if user is admin
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', session.user.id)
        .maybeSingle();
        
      if (!userError && userData) {
        setIsAdmin(userData.is_admin || false);
      }
    };
    
    checkUser();
  }, [navigate, toast]);

  // Load clients from Supabase
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('clients')
          .select('*')
          .order('date_added', { ascending: false });
          
        if (error) {
          throw error;
        }
        
        if (data) {
          setClients(data as Client[]);
          setStats(prev => ({
            ...prev,
            activeClients: data.length
          }));
        }
      } catch (error: any) {
        console.error('Error fetching clients:', error);
        toast({
          title: "Error",
          description: "Could not load client data: " + (error.message || "Unknown error"),
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user) {
      fetchClients();
    }
  }, [user, toast]);

  // Handle adding a new client (admin only)
  const handleAddClient = (client: Client) => {
    if (!isAdmin) return;
    setClients(prev => [client, ...prev]);
    setStats(prev => ({
      ...prev,
      activeClients: prev.activeClients + 1
    }));
  };

  // Handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/portal');
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
