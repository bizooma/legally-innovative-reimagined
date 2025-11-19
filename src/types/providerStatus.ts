export type ProviderId = 
  | "cloudflare" 
  | "aws" 
  | "google_cloud" 
  | "azure" 
  | "digitalocean" 
  | "linode" 
  | "vultr" 
  | "vercel" 
  | "netlify" 
  | "render" 
  | "fly_io" 
  | "github" 
  | "gitlab" 
  | "bitbucket";

export type ProviderStatus = 
  | "operational" 
  | "degraded" 
  | "major_outage" 
  | "unknown";

export interface ProviderStatusRecord {
  id: string;
  slug: ProviderId;
  name: string;
  icon_initials: string;
  status: ProviderStatus;
  summary: string;
  last_checked: string;
  display_order: number;
  logo_url: string | null;
  description: string | null;
  category: "cloud" | "deployment" | "version_control";
  brand_color: string;
}

export interface ProviderConfig {
  id: string;
  slug: string;
  name: string;
  icon_initials: string;
  status_endpoint: string | null;
  check_method: "api" | "mock";
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
  logo_url: string | null;
  description: string | null;
  category: "cloud" | "deployment" | "version_control";
  brand_color: string;
}

export interface ProviderStatusCache {
  id: string;
  provider_id: string;
  status: ProviderStatus;
  summary: string;
  last_checked: string;
  created_at: string;
}
