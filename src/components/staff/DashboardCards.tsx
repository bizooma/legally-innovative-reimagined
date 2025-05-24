
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface DashboardCardsProps {
  loading: boolean;
  userEmail: string | undefined;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ loading, userEmail }) => {
  const handlePlatformClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Platforms</CardTitle>
          <CardDescription>Quick access to team platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Access the platforms your team uses daily.</p>
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-between" 
              disabled={loading}
              onClick={() => handlePlatformClick('https://app.unum.la/home')}
            >
              <div className="flex items-center gap-2">
                <img 
                  src="/lovable-uploads/429b2bde-e490-457e-89c8-e3a1d9fc62a7.png" 
                  alt="Unum" 
                  className="w-4 h-4"
                />
                Unum
              </div>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
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
