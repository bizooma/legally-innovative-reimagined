
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SocialMediaEvent } from '@/types/database';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, MessageSquare } from 'lucide-react';

interface ClientSocialPostsProps {
  clientId: string;
}

const ClientSocialPosts = ({ clientId }: ClientSocialPostsProps) => {
  const [events, setEvents] = useState<SocialMediaEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSocialEvents = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('social_media_events')
          .select('*')
          .eq('client_id', clientId)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setEvents(data as SocialMediaEvent[]);
      } catch (error: any) {
        console.error('Error fetching social media events:', error);
        toast({
          title: 'Error',
          description: 'Failed to load social media events',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSocialEvents();
  }, [clientId, toast]);

  const getEventIcon = (eventType: string) => {
    switch (eventType.toLowerCase()) {
      case 'post_published':
        return <MessageSquare className="h-4 w-4 mr-1 text-green-500" />;
      case 'post_scheduled':
        return <Calendar className="h-4 w-4 mr-1 text-blue-500" />;
      case 'publishing_post_failed':
        return <MessageSquare className="h-4 w-4 mr-1 text-red-500" />;
      default:
        return <MessageSquare className="h-4 w-4 mr-1 text-gray-500" />;
    }
  };

  const getEventBadge = (eventType: string) => {
    switch (eventType.toLowerCase()) {
      case 'post_published':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Published</Badge>;
      case 'post_scheduled':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Scheduled</Badge>;
      case 'publishing_post_failed':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Failed</Badge>;
      default:
        return <Badge variant="outline">{eventType}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center p-8">
        <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium">No social posts yet</h3>
        <p className="text-muted-foreground mt-2">
          Social media events will appear here when they are received from the webhook.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Social Media Posts</h2>
      </div>
      <ScrollArea className="h-[500px]">
        <Table>
          <TableCaption>Social media events for this client</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Platform</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium capitalize">{event.platform}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {getEventIcon(event.event_type)}
                    <span className="ml-1">{getEventBadge(event.event_type)}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-md truncate">
                  {event.event_data && event.event_data.post_title ? 
                    event.event_data.post_title : 
                    event.event_data && event.event_data.message ? 
                      event.event_data.message : 'No details available'}
                </TableCell>
                <TableCell>{formatDate(event.created_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default ClientSocialPosts;
