
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DashboardCardsProps {
  loading: boolean;
  userEmail: string | undefined;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ loading, userEmail }) => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
          <CardDescription>Access company documents and forms</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Access internal documents, policies, and procedures.</p>
          <Button variant="outline" className="w-full" disabled={loading}>
            View Documents
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Announcements</CardTitle>
          <CardDescription>Latest company news and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Stay updated with the latest company news and announcements.</p>
          <Button variant="outline" className="w-full" disabled>Read Updates</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {userEmail}</CardTitle>
          <CardDescription>Your staff portal dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            This is your personalized staff dashboard. Here you can access important
            company resources, view announcements, and connect with team members.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCards;
