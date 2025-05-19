
import React from 'react';
import { Button } from '@/components/ui/button';
import { AddClientDialog } from '@/components/portal/AddClientDialog';
import { AddClientContactDialog } from '@/components/portal/AddClientContactDialog';
import { ChangePasswordDialog } from '@/components/auth/ChangePasswordDialog';
import { Client } from '@/types/database';
import { useNavigate } from 'react-router-dom';

interface AdminHeaderProps {
  onClientAdded: (client: Client) => void;
  onLogout: () => Promise<void>;
  clients: Client[];
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onClientAdded, onLogout, clients }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-4xl font-playfair font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome, Joe from Bizooma</p>
      </div>
      <div className="flex gap-3">
        <AddClientDialog onClientAdded={onClientAdded} />
        <AddClientContactDialog clients={clients} />
        <ChangePasswordDialog />
        <Button 
          variant="outline" 
          onClick={() => navigate('/portal')}
          className="bg-white hover:bg-gray-100"
        >
          Back to Portal
        </Button>
        <Button 
          variant="outline"
          onClick={onLogout}
          className="bg-white hover:bg-gray-100"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
