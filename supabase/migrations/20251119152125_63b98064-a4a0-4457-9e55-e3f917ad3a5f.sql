-- Create provider status configurations table
CREATE TABLE public.provider_status_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  icon_initials TEXT NOT NULL,
  status_endpoint TEXT,
  check_method TEXT NOT NULL DEFAULT 'mock' CHECK (check_method IN ('api', 'mock')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create provider status cache table
CREATE TABLE public.provider_status_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES public.provider_status_configs(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('operational', 'degraded', 'major_outage', 'unknown')),
  summary TEXT NOT NULL,
  last_checked TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.provider_status_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_status_cache ENABLE ROW LEVEL SECURITY;

-- RLS Policies for provider_status_configs
CREATE POLICY "Anyone can view active provider configs"
ON public.provider_status_configs
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage provider configs"
ON public.provider_status_configs
FOR ALL
USING (get_current_user_admin_status() = true);

-- RLS Policies for provider_status_cache
CREATE POLICY "Anyone can view provider status cache"
ON public.provider_status_cache
FOR SELECT
USING (true);

CREATE POLICY "Service role can manage status cache"
ON public.provider_status_cache
FOR ALL
USING (true);

-- Create trigger for updating updated_at
CREATE TRIGGER update_provider_configs_updated_at
BEFORE UPDATE ON public.provider_status_configs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed initial provider data
INSERT INTO public.provider_status_configs (slug, name, icon_initials, check_method, is_active, display_order)
VALUES 
  ('cloudflare', 'Cloudflare', 'CF', 'mock', true, 1),
  ('aws', 'AWS', 'AWS', 'mock', true, 2),
  ('google_cloud', 'Google Cloud', 'GCP', 'mock', true, 3),
  ('azure', 'Microsoft Azure', 'AZ', 'mock', true, 4),
  ('digitalocean', 'DigitalOcean', 'DO', 'mock', true, 5),
  ('linode', 'Linode', 'LN', 'mock', true, 6),
  ('vultr', 'Vultr', 'VT', 'mock', true, 7),
  ('vercel', 'Vercel', 'VC', 'mock', true, 8),
  ('netlify', 'Netlify', 'NF', 'mock', true, 9),
  ('render', 'Render', 'RD', 'mock', true, 10),
  ('fly_io', 'Fly.io', 'FLY', 'mock', true, 11),
  ('github', 'GitHub', 'GH', 'mock', true, 12),
  ('gitlab', 'GitLab', 'GL', 'mock', true, 13),
  ('bitbucket', 'Bitbucket', 'BB', 'mock', true, 14);

-- Initialize cache with unknown status for all providers
INSERT INTO public.provider_status_cache (provider_id, status, summary, last_checked)
SELECT id, 'unknown', 'Status not yet checked', now()
FROM public.provider_status_configs;