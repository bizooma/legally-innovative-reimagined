
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AddClientDialog } from '@/components/portal/AddClientDialog';

const AdminDashboard = () => {
  const navigate = useNavigate();

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
                <AddClientDialog />
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
              <StatCard title="Active Clients" value="0" description="Currently active marketing clients" />
              <StatCard title="Pending Approvals" value="0" description="Materials awaiting client approval" />
              <StatCard title="New Messages" value="0" description="Unread client messages" />
            </div>

            {/* Recent Activity */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest client interactions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-8 text-center text-gray-500">
                  <p>No recent activity to display</p>
                </div>
              </CardContent>
            </Card>

            {/* Client List */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Client Directory</CardTitle>
                  <CardDescription>All registered portal clients</CardDescription>
                </div>
                <AddClientDialog />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-8 text-center text-gray-500">
                  <p>No clients yet. Click "Add New Client" to get started</p>
                </div>
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
