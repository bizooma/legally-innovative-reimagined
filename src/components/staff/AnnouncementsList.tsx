
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

interface Announcement {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

interface AnnouncementsListProps {
  announcements: Announcement[];
}

const AnnouncementsList: React.FC<AnnouncementsListProps> = ({ announcements }) => {
  if (announcements.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No announcements yet.</p>
        <p className="text-sm">Administrators can create announcements using the button above.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <Card key={announcement.id} className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{announcement.title}</CardTitle>
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(announcement.created_at), { addSuffix: true })}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 whitespace-pre-wrap">{announcement.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AnnouncementsList;
