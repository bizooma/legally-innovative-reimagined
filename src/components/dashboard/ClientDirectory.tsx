
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AddClientDialog } from '@/components/portal/AddClientDialog';
import { Client } from '@/types/database';
import { useNavigate } from 'react-router-dom';
import ClientLogoUploader from '@/components/client-workspace/ClientLogoUploader';
import { supabase } from '@/integrations/supabase/client';

interface ClientDirectoryProps {
  clients: Client[];
  isLoading: boolean;
  onClientAdded: (client: Client) => void;
}

export const ClientDirectory: React.FC<ClientDirectoryProps> = ({ clients, isLoading, onClientAdded }) => {
  const navigate = useNavigate();
  
  const handleViewDetails = (clientId: string) => {
    navigate(`/portal/client/${clientId}`);
  };
  
  const handleLogoUpdated = async (clientId: string, logoUrl: string) => {
    // Find and update the client in the local state
    const updatedClients = clients.map(client => 
      client.id === clientId ? { ...client, logo_url: logoUrl } : client
    );
    
    // This will trigger a re-render with the updated logo
    onClientAdded({ ...clients.find(c => c.id === clientId)!, logo_url: logoUrl });
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Client Directory</CardTitle>
          <CardDescription>All registered portal clients</CardDescription>
        </div>
        <AddClientDialog onClientAdded={onClientAdded} />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-center py-4">Loading clients...</p>
        ) : clients.length > 0 ? (
          <div className="space-y-4">
            {clients.map(client => (
              <div key={client.id} className="flex justify-between items-center p-4 border rounded-md hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <ClientLogoUploader 
                    clientId={client.id}
                    existingLogoUrl={client.logo_url}
                    onLogoUpdated={(logoUrl) => handleLogoUpdated(client.id, logoUrl)}
                    size="sm"
                  />
                  <div>
                    <h3 className="font-medium">{client.company_name}</h3>
                    <p className="text-sm text-gray-500">{client.contact_name} • {client.contact_email}</p>
                    {client.contact_phone && <p className="text-sm text-gray-500">{client.contact_phone}</p>}
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleViewDetails(client.id)}
                >
                  View Workspace
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
  );
};
