
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AddClientDialog } from '@/components/portal/AddClientDialog';
import { useToast } from '@/hooks/use-toast';

// Define the client type
interface Client {
  id: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  notes?: string;
  dateAdded: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>([]);
  const [stats, setStats] = useState({
    activeClients: 0,
    pendingApprovals: 0,
    newMessages: 0,
  });

  // Load clients from localStorage on component mount
  useEffect(() => {
    const storedClients = localStorage.getItem('clients');
    if (storedClients) {
      try {
        const parsedClients = JSON.parse(storedClients);
        setClients(parsedClients);
        setStats(prev => ({
          ...prev,
          activeClients: parsedClients.length
        }));
      } catch (error) {
        console.error('Error parsing stored clients:', error);
        toast({
          title: "Error",
          description: "Could not load client data",
          variant: "destructive",
        });
      }
    }
  }, []);

  // Handle adding a new client
  const handleAddClient = (client: Omit<Client, 'id' | 'dateAdded'>) => {
    const newClient: Client = {
      ...client,
      id: crypto.randomUUID(),
      dateAdded: new Date().toISOString(),
    };
    
    const updatedClients = [...clients, newClient];
    setClients(updatedClients);
    
    // Update stats
    setStats(prev => ({
      ...prev,
      activeClients: updatedClients.length
    }));
    
    // Save to localStorage
    localStorage.setItem('clients', JSON.stringify(updatedClients));
    
    toast({
      title: "Success",
      description: `${client.companyName} has been added to your client list.`,
    });
  };

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
                {clients.length > 0 ? (
                  <div className="space-y-4">
                    {clients.slice(-3).reverse().map(client => (
                      <div key={client.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                        <div>
                          <p className="font-medium">{client.companyName}</p>
                          <p className="text-sm text-gray-500">Client added on {new Date(client.dateAdded).toLocaleDateString()}</p>
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
                {clients.length > 0 ? (
                  <div className="space-y-4">
                    {clients.map(client => (
                      <div key={client.id} className="flex justify-between items-center p-4 border rounded-md hover:bg-gray-50">
                        <div>
                          <h3 className="font-medium">{client.companyName}</h3>
                          <p className="text-sm text-gray-500">{client.contactName} • {client.contactEmail}</p>
                          {client.contactPhone && <p className="text-sm text-gray-500">{client.contactPhone}</p>}
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
