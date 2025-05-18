import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AddClientDialog } from '@/components/portal/AddClientDialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Client } from '@/types/database';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    activeClients: 0,
    pendingApprovals: 0,
    newMessages: 0,
  });
  const [user, setUser] = useState<any>(null);

  // Check auth status
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please login to access the admin dashboard",
          variant: "destructive",
        });
        navigate('/portal');
      } else {
        setUser(session.user);
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

  // Handle adding a new client
  const handleAddClient = (client: Client) => {
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

  if (isLoading && !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Admin Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-4xl font-playfair font-bold">Admin Dashboard</h1>
                <p className="text-gray-600">Welcome, Joe from Bizooma</p>
              </div>
              <div className="flex gap-3">
                <AddClientDialog onClientAdded={handleAddClient} />
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/portal')}
                  className="bg-white hover:bg-gray-100"
                >
                  Back to Portal
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleLogout}
                  className="bg-white hover:bg-gray-100"
                >
                  Logout
                </Button>
              </div>
            </div>

            {/* Dashboard Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <StatCard title="Active Clients" value={stats.activeClients.toString()} description="Currently active marketing clients" />
              <StatCard title="Pending Approvals" value={stats.pendingApprovals.toString()} description="Materials awaiting client approval" />
              <StatCard title="New Messages" value={stats.newMessages.toString()} description="Unread client messages" />
            </div>

            {/* Recent Activity */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest client interactions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p className="text-center py-4">Loading recent activity...</p>
                ) : clients.length > 0 ? (
                  <div className="space-y-4">
                    {clients.slice(0, 3).map(client => (
                      <div key={client.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                        <div>
                          <p className="font-medium">{client.company_name}</p>
                          <p className="text-sm text-gray-500">Client added on {new Date(client.date_added).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-8 text-center text-gray-500">
                    <p>No recent activity to display</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Client List */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Client Directory</CardTitle>
                  <CardDescription>All registered portal clients</CardDescription>
                </div>
                <AddClientDialog onClientAdded={handleAddClient} />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p className="text-center py-4">Loading clients...</p>
                ) : clients.length > 0 ? (
                  <div className="space-y-4">
                    {clients.map(client => (
                      <div key={client.id} className="flex justify-between items-center p-4 border rounded-md hover:bg-gray-50">
                        <div>
                          <h3 className="font-medium">{client.company_name}</h3>
                          <p className="text-sm text-gray-500">{client.contact_name} • {client.contact_email}</p>
                          {client.contact_phone && <p className="text-sm text-gray-500">{client.contact_phone}</p>}
                        </div>
                        <Button size="sm" variant="outline" onClick={() => console.log('View client', client.id)}>
                          View Details
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-8 text-center text-gray-500">
                    <p>No clients yet. Click "Add New Client" to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

// Reusable stat card component
interface StatCardProps {
  title: string;
  value: string;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="text-2xl font-bold">{value}</div>
      <div className="font-medium text-lg mt-2 mb-1">{title}</div>
      <div className="text-sm text-gray-500">{description}</div>
    </CardContent>
  </Card>
);

export default AdminDashboard;
