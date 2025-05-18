
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Client } from '@/types/database';

interface RecentActivityProps {
  clients: Client[];
  isLoading: boolean;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ clients, isLoading }) => {
  return (
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
  );
};
