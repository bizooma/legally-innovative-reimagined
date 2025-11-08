
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { ClientDirectory } from '@/components/dashboard/ClientDirectory';
import { AdminHeader } from '@/components/dashboard/AdminHeader';
import { TimeTrackingSection } from '@/components/dashboard/TimeTrackingSection';
import { useDashboard } from '@/hooks/useDashboard';

const AdminDashboard = () => {
  const { clients, isLoading, stats, user, handleAddClient, handleLogout, isAdmin } = useDashboard();

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
              <div className="mb-8">
                <h2 className="text-2xl font-playfair font-bold mb-6">Time Tracking</h2>
                <TimeTrackingSection clients={clients} />
              </div>
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
