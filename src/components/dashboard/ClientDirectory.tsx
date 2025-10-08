
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AddClientDialog } from '@/components/portal/AddClientDialog';
import { Client } from '@/types/database';
import { useNavigate } from 'react-router-dom';
import ClientLogoUploader from '@/components/client-workspace/ClientLogoUploader';
import { ClientStatusBadge } from './ClientStatusBadge';
import { ClientStatusSelect } from './ClientStatusSelect';
import { updateClientStatus } from '@/services/clientService';
import { useToast } from '@/hooks/use-toast';

interface ClientDirectoryProps {
  clients: Client[];
  isLoading: boolean;
  onClientAdded: (client: Client) => void;
  isAdmin?: boolean;
}

export const ClientDirectory: React.FC<ClientDirectoryProps> = ({ 
  clients, 
  isLoading, 
  onClientAdded,
  isAdmin = false
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  
  const handleViewDetails = (clientId: string) => {
    navigate(`/portal/client/${clientId}`);
  };
  
  const handleLogoUpdated = async (clientId: string, logoUrl: string) => {
    // Only allow logo updates for admins
    if (!isAdmin) return;
    
    // Find the updated client and pass it to the parent callback
    const client = clients.find(c => c.id === clientId);
    if (client) {
      onClientAdded({ ...client, logo_url: logoUrl });
    }
  };

  const handleStatusChange = async (clientId: string, newStatus: 'active' | 'paused' | 'terminated') => {
    if (!isAdmin) return;
    
    setUpdatingStatus(clientId);
    
    try {
      await updateClientStatus(clientId, newStatus);
      
      // Find the updated client and pass it to the parent callback with the new status
      const client = clients.find(c => c.id === clientId);
      if (client) {
        onClientAdded({ ...client, status: newStatus });
      }
      
      toast({
        title: 'Status updated',
        description: `Client status changed to ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating client status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update client status',
        variant: 'destructive',
      });
    } finally {
      setUpdatingStatus(null);
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Client Directory</CardTitle>
          <CardDescription>
            {isAdmin ? 'All registered portal clients' : 'View client workspaces and projects'}
          </CardDescription>
        </div>
        {isAdmin && <AddClientDialog onClientAdded={onClientAdded} />}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-center py-4">Loading clients...</p>
        ) : clients.length > 0 ? (
          <div className="space-y-4">
            {clients.map(client => (
              <div key={client.id} className="flex justify-between items-center p-4 border rounded-md hover:bg-gray-50">
                <div className="flex items-center gap-4 flex-1">
                  {isAdmin ? (
                    <ClientLogoUploader 
                      clientId={client.id}
                      existingLogoUrl={client.logo_url}
                      onLogoUpdated={(logoUrl) => handleLogoUpdated(client.id, logoUrl)}
                      size="sm"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                      {client.logo_url ? (
                        <img 
                          src={client.logo_url} 
                          alt={`${client.company_name} logo`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">Logo</span>
                      )}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-medium">{client.company_name}</h3>
                      <ClientStatusBadge status={client.status || 'active'} />
                      {isAdmin && (
                        <ClientStatusSelect 
                          status={client.status || 'active'}
                          onStatusChange={(newStatus) => handleStatusChange(client.id, newStatus)}
                          disabled={updatingStatus === client.id}
                        />
                      )}
                    </div>
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
            <p>
              {isAdmin 
                ? 'No clients yet. Click "Add New Client" to get started' 
                : 'No clients available to view'
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
