
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { ClientDirectory } from '@/components/dashboard/ClientDirectory';
import { AdminHeader } from '@/components/dashboard/AdminHeader';
import { TimeTrackingSection } from '@/components/dashboard/TimeTrackingSection';
import { TimeTracker } from '@/components/dashboard/TimeTracker';
import { useDashboard } from '@/hooks/useDashboard';
import { useTimeTracker, formatDuration } from '@/hooks/useTimeTracker';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AdminDashboard = () => {
  const { clients, isLoading, stats, user, handleAddClient, handleLogout, isAdmin } = useDashboard();
  const { isRunning, elapsedSeconds } = useTimeTracker();
  const [isTimeTrackingOpen, setIsTimeTrackingOpen] = useState(false);

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
            <AdminHeader 
              onClientAdded={handleAddClient}
              onLogout={handleLogout}
              clients={clients}
              isAdmin={isAdmin}
            />

            {/* Time Tracking Section - Only show for admins */}
            {isAdmin && (
              <Collapsible 
                open={isTimeTrackingOpen} 
                onOpenChange={setIsTimeTrackingOpen}
                className="mb-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-playfair font-bold">Time Tracking</h2>
                    {isRunning && (
                      <Badge variant="secondary" className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="font-mono">{formatDuration(elapsedSeconds)}</span>
                      </Badge>
                    )}
                  </div>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      {isTimeTrackingOpen ? 'Collapse' : 'Expand'}
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isTimeTrackingOpen ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="space-y-4">
                  <TimeTracker clients={clients} />
                  <TimeTrackingSection clients={clients} />
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Client List */}
            <ClientDirectory 
              clients={clients} 
              isLoading={isLoading}
              onClientAdded={handleAddClient}
              isAdmin={isAdmin}
            />
            
            {/* Recent Activity - Only show for admins */}
            {isAdmin && (
              <RecentActivity clients={clients} isLoading={isLoading} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
