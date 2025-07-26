
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MessageSquare, ExternalLink, Heart, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SocialMediaPost {
  id: string;
  client_id: string;
  post_id: string;
  platform: string;
  content: string;
  media_urls: string[];
  post_url: string;
  published_at: string;
  engagement_metrics: any;
  webhook_data: any;
  created_at: string;
  updated_at: string;
}

interface ClientSocialPostsProps {
  clientId: string;
}

const ClientSocialPosts = ({ clientId }: ClientSocialPostsProps) => {
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSocialPosts = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('social_media_posts')
          .select('*')
          .eq('client_id', clientId)
          .order('published_at', { ascending: false });

        if (error) {
          throw error;
        }

        setPosts(data as SocialMediaPost[]);
      } catch (error: any) {
        console.error('Error fetching social media posts:', error);
        toast({
          title: 'Error',
          description: 'Failed to load social media posts',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSocialPosts();
  }, [clientId, toast]);

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return '📘';
      case 'instagram':
        return '📷';
      case 'twitter':
      case 'x':
        return '🐦';
      case 'linkedin':
        return '💼';
      case 'youtube':
        return '📺';
      default:
        return '📱';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return 'bg-blue-100 text-blue-800';
      case 'instagram':
        return 'bg-pink-100 text-pink-800';
      case 'twitter':
      case 'x':
        return 'bg-sky-100 text-sky-800';
      case 'linkedin':
        return 'bg-blue-100 text-blue-900';
      case 'youtube':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center p-8">
        <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium">No social posts yet</h3>
        <p className="text-muted-foreground mt-2 mb-4">
          Social media posts will appear here when they are received from Sociamonials.
        </p>
        <div className="text-sm text-muted-foreground">
          <p className="font-medium">Webhook URL for Sociamonials:</p>
          <code className="bg-gray-100 px-2 py-1 rounded text-xs">
            https://hvyjvbdforunsjgqhhny.supabase.co/functions/v1/social-media-webhook?client_id={clientId}
          </code>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Social Media Posts</h2>
        <div className="text-sm text-muted-foreground">
          {posts.length} post{posts.length !== 1 ? 's' : ''}
        </div>
      </div>
      
      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="w-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getPlatformIcon(post.platform)}</span>
                    <Badge className={getPlatformColor(post.platform)}>
                      {post.platform}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {formatDate(post.published_at)}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {post.content && (
                  <div className="text-sm">
                    <p>{truncateContent(post.content)}</p>
                  </div>
                )}
                
                {post.media_urls && post.media_urls.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.media_urls.slice(0, 3).map((url, index) => (
                      <div key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        📎 Media {index + 1}
                      </div>
                    ))}
                    {post.media_urls.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{post.media_urls.length - 3} more
                      </div>
                    )}
                  </div>
                )}
                
                {post.engagement_metrics && Object.keys(post.engagement_metrics).length > 0 && (
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    {post.engagement_metrics.likes && (
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{post.engagement_metrics.likes}</span>
                      </div>
                    )}
                    {post.engagement_metrics.shares && (
                      <div className="flex items-center space-x-1">
                        <Share className="h-4 w-4" />
                        <span>{post.engagement_metrics.shares}</span>
                      </div>
                    )}
                    {post.engagement_metrics.comments && (
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.engagement_metrics.comments}</span>
                      </div>
                    )}
                  </div>
                )}
                
                {post.post_url && (
                  <div className="pt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(post.post_url, '_blank')}
                      className="flex items-center space-x-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>View Post</span>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
      
      <div className="text-xs text-muted-foreground mt-4 p-3 bg-gray-50 rounded">
        <p className="font-medium mb-1">Webhook URL for Sociamonials:</p>
        <code className="bg-white px-2 py-1 rounded border text-xs">
          https://hvyjvbdforunsjgqhhny.supabase.co/functions/v1/social-media-webhook?client_id={clientId}
        </code>
      </div>
    </div>
  );
};

export default ClientSocialPosts;
