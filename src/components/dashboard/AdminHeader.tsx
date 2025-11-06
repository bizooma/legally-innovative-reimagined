
import React from 'react';
import { Button } from '@/components/ui/button';
import { AddClientDialog } from '@/components/portal/AddClientDialog';
import { Client } from '@/types/database';
import { TimeTracker } from './TimeTracker';

interface AdminHeaderProps {
  onClientAdded: (client: Client) => void;
  onLogout: () => void;
  clients: Client[];
  isAdmin?: boolean;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ 
  onClientAdded, 
  onLogout, 
  clients,
  isAdmin = false
}) => {
  return (
    <div className="space-y-4 mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-playfair font-bold">
            {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
          </h1>
          <p className="text-gray-600">
            {isAdmin 
              ? `Managing ${clients.length} clients` 
              : `Viewing ${clients.length} clients`
            }
          </p>
        </div>
        <div className="flex gap-3">
          {isAdmin && (
            <AddClientDialog onClientAdded={onClientAdded} />
          )}
          <Button 
            variant="outline"
            onClick={onLogout}
            className="bg-white hover:bg-gray-100"
          >
            Logout
          </Button>
        </div>
      </div>
      
      {/* Time Tracker for Admins */}
      {isAdmin && <TimeTracker clients={clients} />}
    </div>
  );
};
