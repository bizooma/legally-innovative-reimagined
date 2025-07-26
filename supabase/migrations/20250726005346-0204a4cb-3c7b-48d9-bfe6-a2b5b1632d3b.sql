-- Create table for social media posts from Sociamonials
CREATE TABLE public.social_media_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL,
  post_id TEXT NOT NULL UNIQUE,
  platform TEXT NOT NULL,
  content TEXT,
  media_urls TEXT[],
  post_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  engagement_metrics JSONB,
  webhook_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.social_media_posts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can access all social media posts" 
ON public.social_media_posts 
FOR ALL 
USING (get_current_user_admin_status() = true);

CREATE POLICY "Client users can only access their client social media posts" 
ON public.social_media_posts 
FOR ALL 
USING ((get_current_user_admin_status() = true) OR (client_id = get_current_user_client_id()));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_social_media_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_social_media_posts_updated_at
BEFORE UPDATE ON public.social_media_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_social_media_posts_updated_at();

-- Add index for better performance
CREATE INDEX idx_social_media_posts_client_id ON public.social_media_posts(client_id);
CREATE INDEX idx_social_media_posts_published_at ON public.social_media_posts(published_at DESC);