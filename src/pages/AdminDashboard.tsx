
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
              <StatCard title="Active Clients" value="24" description="Currently active marketing clients" />
              <StatCard title="Pending Approvals" value="7" description="Materials awaiting client approval" />
              <StatCard title="New Messages" value="13" description="Unread client messages" />
            </div>

            {/* Recent Activity */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest client interactions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start pb-4 border-b last:border-0">
                      <div className={`w-3 h-3 rounded-full mt-1.5 mr-3 ${activity.color}`}></div>
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
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
                <div className="space-y-4">
                  {clients.map((client, index) => (
                    <div key={index} className="flex justify-between items-center pb-4 border-b last:border-0">
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-sm text-gray-500">{client.company}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Message</Button>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
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

// Sample data for the dashboard
const recentActivities = [
  {
    title: "New document uploaded",
    description: "Smith & Associates uploaded 'Marketing Plan Q3'",
    time: "Today, 10:32 AM",
    color: "bg-blue-500"
  },
  {
    title: "Campaign approval",
    description: "Johnson Law approved the 'Summer PPC Campaign'",
    time: "Yesterday, 4:15 PM",
    color: "bg-green-500"
  },
  {
    title: "Revision requested",
    description: "Roberts Legal requested changes to 'Website Redesign Draft'",
    time: "Yesterday, 2:41 PM",
    color: "bg-amber-500"
  },
  {
    title: "New client registration",
    description: "Marshall & Partners registered for portal access",
    time: "May 16, 2025, 11:23 AM",
    color: "bg-purple-500"
  }
];

const clients = [
  { name: "Sarah Johnson", company: "Johnson Law Firm" },
  { name: "Michael Roberts", company: "Roberts Legal Services" },
  { name: "Emily Smith", company: "Smith & Associates" },
  { name: "David Wilson", company: "Wilson Legal Group" },
  { name: "Lisa Marshall", company: "Marshall & Partners" }
];

export default AdminDashboard;
