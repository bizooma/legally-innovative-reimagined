
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AddClientDialog } from '@/components/portal/AddClientDialog';
import { Client } from '@/types/database';

interface ClientDirectoryProps {
  clients: Client[];
  isLoading: boolean;
  onClientAdded: (client: Client) => void;
}

export const ClientDirectory: React.FC<ClientDirectoryProps> = ({ clients, isLoading, onClientAdded }) => {
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
  );
};
