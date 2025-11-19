-- Add new fields to provider_status_configs for enhanced design
ALTER TABLE provider_status_configs
ADD COLUMN IF NOT EXISTS logo_url text,
ADD COLUMN IF NOT EXISTS description text,
ADD COLUMN IF NOT EXISTS category text DEFAULT 'cloud',
ADD COLUMN IF NOT EXISTS brand_color text DEFAULT '#3B82F6';

-- Add check constraint for category
ALTER TABLE provider_status_configs
ADD CONSTRAINT valid_category CHECK (category IN ('cloud', 'deployment', 'version_control'));

-- Update existing providers with categories
UPDATE provider_status_configs SET category = 'cloud' WHERE slug IN ('cloudflare', 'aws', 'google_cloud', 'azure', 'digitalocean', 'linode', 'vultr');
UPDATE provider_status_configs SET category = 'deployment' WHERE slug IN ('vercel', 'netlify', 'render', 'fly_io');
UPDATE provider_status_configs SET category = 'version_control' WHERE slug IN ('github', 'gitlab', 'bitbucket');

-- Add descriptions for providers
UPDATE provider_status_configs SET description = 'Global CDN and DDoS protection' WHERE slug = 'cloudflare';
UPDATE provider_status_configs SET description = 'Cloud computing services' WHERE slug = 'aws';
UPDATE provider_status_configs SET description = 'Cloud platform and infrastructure' WHERE slug = 'google_cloud';
UPDATE provider_status_configs SET description = 'Cloud computing platform' WHERE slug = 'azure';
UPDATE provider_status_configs SET description = 'Cloud infrastructure provider' WHERE slug = 'digitalocean';
UPDATE provider_status_configs SET description = 'Cloud hosting services' WHERE slug = 'linode';
UPDATE provider_status_configs SET description = 'High-performance cloud compute' WHERE slug = 'vultr';
UPDATE provider_status_configs SET description = 'Frontend deployment platform' WHERE slug = 'vercel';
UPDATE provider_status_configs SET description = 'Web application deployment' WHERE slug = 'netlify';
UPDATE provider_status_configs SET description = 'Unified cloud platform' WHERE slug = 'render';
UPDATE provider_status_configs SET description = 'Global application platform' WHERE slug = 'fly_io';
UPDATE provider_status_configs SET description = 'Code hosting and collaboration' WHERE slug = 'github';
UPDATE provider_status_configs SET description = 'DevOps lifecycle platform' WHERE slug = 'gitlab';
UPDATE provider_status_configs SET description = 'Git repository management' WHERE slug = 'bitbucket';

-- Add brand colors
UPDATE provider_status_configs SET brand_color = '#F38020' WHERE slug = 'cloudflare';
UPDATE provider_status_configs SET brand_color = '#FF9900' WHERE slug = 'aws';
UPDATE provider_status_configs SET brand_color = '#4285F4' WHERE slug = 'google_cloud';
UPDATE provider_status_configs SET brand_color = '#0078D4' WHERE slug = 'azure';
UPDATE provider_status_configs SET brand_color = '#0080FF' WHERE slug = 'digitalocean';
UPDATE provider_status_configs SET brand_color = '#00A95C' WHERE slug = 'linode';
UPDATE provider_status_configs SET brand_color = '#007BFC' WHERE slug = 'vultr';
UPDATE provider_status_configs SET brand_color = '#000000' WHERE slug = 'vercel';
UPDATE provider_status_configs SET brand_color = '#00C7B7' WHERE slug = 'netlify';
UPDATE provider_status_configs SET brand_color = '#46E3B7' WHERE slug = 'render';
UPDATE provider_status_configs SET brand_color = '#7B3FF2' WHERE slug = 'fly_io';
UPDATE provider_status_configs SET brand_color = '#181717' WHERE slug = 'github';
UPDATE provider_status_configs SET brand_color = '#FC6D26' WHERE slug = 'gitlab';
UPDATE provider_status_configs SET brand_color = '#0052CC' WHERE slug = 'bitbucket';