
import React from 'react';
import { Button } from '@/components/ui/button';

interface StaffDashboardHeaderProps {
  handleLogout: () => Promise<void>;
}

const StaffDashboardHeader: React.FC<StaffDashboardHeaderProps> = ({ handleLogout }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold font-playfair">
        Staff <span className="text-legal-accent">Dashboard</span>
      </h1>
      <Button onClick={handleLogout} variant="outline">
        Log Out
      </Button>
    </div>
  );
};

export default StaffDashboardHeader;
