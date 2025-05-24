import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Plus } from 'lucide-react';
import { useAdminStatus } from '@/hooks/staff/useAdminStatus';
import CreateAnnouncementDialog from './CreateAnnouncementDialog';

interface DashboardCardsProps {
  loading: boolean;
  userEmail: string | undefined;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ loading, userEmail }) => {
  const { isAdmin } = useAdminStatus();
  const [isAnnouncementDialogOpen, setIsAnnouncementDialogOpen] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  console.log('DashboardCards render:', { 
    isAdmin, 
    userEmail, 
    isAnnouncementDialogOpen,
    announcementsCount: announcements.length 
  });

  const handlePlatformClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCreateAnnouncement = () => {
    console.log('DashboardCards: Create Announcement button clicked');
    console.log('DashboardCards: Current isAdmin status:', isAdmin);
    console.log('DashboardCards: Current dialog state before:', isAnnouncementDialogOpen);
    setIsAnnouncementDialogOpen(true);
    console.log('DashboardCards: Dialog state set to true');
    // Force a small delay to ensure state is updated
    setTimeout(() => {
      console.log('DashboardCards: Dialog state after timeout:', isAnnouncementDialogOpen);
    }, 100);
  };

  const handleAnnouncementCreated = (announcement: Announcement) => {
    console.log('DashboardCards: New announcement created:', announcement);
    setAnnouncements(prev => {
      const updated = [announcement, ...prev];
      console.log('DashboardCards: Updated announcements array:', updated);
      return updated;
    });
  };

  return (
    <>
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
              <Button 
                variant="outline" 
                className="w-full justify-between" 
                disabled={loading}
                onClick={() => handlePlatformClick('https://acumbamail.com/app/newsletter/')}
              >
                <div className="flex items-center gap-2">
                  <img 
                    src="/lovable-uploads/59e51f8e-610f-44a9-9530-a964b738ff51.png" 
                    alt="Acumbamail" 
                    className="w-4 h-4"
                    onError={(e) => {
                      console.error('Failed to load Acumbamail image');
                      e.currentTarget.style.display = 'none';
                    }}
                    onLoad={() => console.log('Acumbamail image loaded successfully')}
                  />
                  Acumbamail
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
            <div className="space-y-2">
              <Button variant="outline" className="w-full" disabled>Read Updates</Button>
              {isAdmin && (
                <Button 
                  variant="default" 
                  className="w-full"
                  onClick={handleCreateAnnouncement}
                  disabled={loading}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Announcement
                </Button>
              )}
              {!isAdmin && (
                <div className="text-sm text-gray-500 mt-2">
                  Admin access required to create announcements
                </div>
              )}
            </div>
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

      {/* Announcements Section */}
      {announcements.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Company Announcements</h2>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    <span className="text-sm text-gray-500">
                      {new Date(announcement.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 whitespace-pre-wrap">{announcement.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <CreateAnnouncementDialog
        open={isAnnouncementDialogOpen}
        onOpenChange={setIsAnnouncementDialogOpen}
        onAnnouncementCreated={handleAnnouncementCreated}
      />
    </>
  );
};

export default DashboardCards;
