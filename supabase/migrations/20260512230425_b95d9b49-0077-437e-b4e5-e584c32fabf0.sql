
-- Role enum
CREATE TYPE public.acc_member_role AS ENUM ('owner', 'admin', 'developer', 'viewer');
CREATE TYPE public.acc_plan AS ENUM ('starter', 'professional', 'agency', 'enterprise');
CREATE TYPE public.acc_severity AS ENUM ('critical', 'high', 'medium', 'low');
CREATE TYPE public.acc_issue_status AS ENUM ('open', 'in_progress', 'resolved', 'ignored');
CREATE TYPE public.acc_scan_status AS ENUM ('queued', 'running', 'completed', 'failed');

-- Organizations
CREATE TABLE public.acc_organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  plan public.acc_plan NOT NULL DEFAULT 'starter',
  logo_url text,
  brand_color text DEFAULT '#7A0A0A',
  is_agency boolean NOT NULL DEFAULT false,
  white_label jsonb DEFAULT '{}'::jsonb,
  created_by uuid NOT NULL DEFAULT auth.uid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Members
CREATE TABLE public.acc_organization_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES public.acc_organizations(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  role public.acc_member_role NOT NULL DEFAULT 'viewer',
  invited_email text,
  invited_at timestamptz,
  joined_at timestamptz DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(organization_id, user_id)
);
CREATE INDEX idx_acc_members_user ON public.acc_organization_members(user_id);
CREATE INDEX idx_acc_members_org ON public.acc_organization_members(organization_id);

-- Helper functions (security definer to avoid RLS recursion)
CREATE OR REPLACE FUNCTION public.acc_is_org_member(_org_id uuid, _user_id uuid DEFAULT auth.uid())
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.acc_organization_members WHERE organization_id = _org_id AND user_id = _user_id);
$$;

CREATE OR REPLACE FUNCTION public.acc_org_role(_org_id uuid, _user_id uuid DEFAULT auth.uid())
RETURNS public.acc_member_role LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT role FROM public.acc_organization_members WHERE organization_id = _org_id AND user_id = _user_id LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.acc_can_manage_org(_org_id uuid, _user_id uuid DEFAULT auth.uid())
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.acc_organization_members
    WHERE organization_id = _org_id AND user_id = _user_id AND role IN ('owner','admin')
  );
$$;

-- Websites
CREATE TABLE public.acc_websites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES public.acc_organizations(id) ON DELETE CASCADE,
  name text NOT NULL,
  url text NOT NULL,
  verification_status text NOT NULL DEFAULT 'unverified',
  verification_token text DEFAULT gen_random_uuid()::text,
  widget_enabled boolean NOT NULL DEFAULT true,
  last_scan_at timestamptz,
  current_score integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_acc_websites_org ON public.acc_websites(organization_id);

-- Widget settings (1:1 with website)
CREATE TABLE public.acc_widget_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id uuid NOT NULL UNIQUE REFERENCES public.acc_websites(id) ON DELETE CASCADE,
  position text NOT NULL DEFAULT 'bottom-right',
  primary_color text DEFAULT '#7A0A0A',
  logo_url text,
  hide_branding boolean DEFAULT false,
  enabled_features jsonb DEFAULT '{}'::jsonb,
  custom_css text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Scans
CREATE TABLE public.acc_scans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id uuid NOT NULL REFERENCES public.acc_websites(id) ON DELETE CASCADE,
  organization_id uuid NOT NULL REFERENCES public.acc_organizations(id) ON DELETE CASCADE,
  status public.acc_scan_status NOT NULL DEFAULT 'queued',
  triggered_by uuid,
  pages_scanned integer DEFAULT 0,
  total_issues integer DEFAULT 0,
  score integer,
  wcag_aa_pct numeric,
  summary jsonb DEFAULT '{}'::jsonb,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_acc_scans_website ON public.acc_scans(website_id);

-- Scan pages
CREATE TABLE public.acc_scan_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_id uuid NOT NULL REFERENCES public.acc_scans(id) ON DELETE CASCADE,
  url text NOT NULL,
  score integer,
  issue_count integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_acc_scan_pages_scan ON public.acc_scan_pages(scan_id);

-- Issues
CREATE TABLE public.acc_accessibility_issues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_id uuid REFERENCES public.acc_scans(id) ON DELETE CASCADE,
  website_id uuid NOT NULL REFERENCES public.acc_websites(id) ON DELETE CASCADE,
  organization_id uuid NOT NULL REFERENCES public.acc_organizations(id) ON DELETE CASCADE,
  page_url text NOT NULL,
  rule_id text NOT NULL,
  title text NOT NULL,
  description text,
  severity public.acc_severity NOT NULL DEFAULT 'medium',
  wcag_reference text,
  element_selector text,
  element_html text,
  suggested_fix text,
  ai_recommendation text,
  status public.acc_issue_status NOT NULL DEFAULT 'open',
  assigned_to uuid,
  resolved_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_acc_issues_website ON public.acc_accessibility_issues(website_id);
CREATE INDEX idx_acc_issues_scan ON public.acc_accessibility_issues(scan_id);
CREATE INDEX idx_acc_issues_status ON public.acc_accessibility_issues(status);

-- AI recommendations
CREATE TABLE public.acc_ai_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id uuid NOT NULL REFERENCES public.acc_websites(id) ON DELETE CASCADE,
  organization_id uuid NOT NULL REFERENCES public.acc_organizations(id) ON DELETE CASCADE,
  category text NOT NULL,
  priority public.acc_severity NOT NULL DEFAULT 'medium',
  title text NOT NULL,
  message text NOT NULL,
  estimated_impact text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Reports
CREATE TABLE public.acc_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES public.acc_organizations(id) ON DELETE CASCADE,
  website_id uuid REFERENCES public.acc_websites(id) ON DELETE CASCADE,
  type text NOT NULL,
  format text NOT NULL DEFAULT 'pdf',
  file_url text,
  period_start date,
  period_end date,
  generated_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Notifications
CREATE TABLE public.acc_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  organization_id uuid REFERENCES public.acc_organizations(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  message text,
  link text,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_acc_notifications_user ON public.acc_notifications(user_id);

-- API keys
CREATE TABLE public.acc_api_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES public.acc_organizations(id) ON DELETE CASCADE,
  name text NOT NULL,
  key_prefix text NOT NULL,
  key_hash text NOT NULL,
  last_used_at timestamptz,
  created_by uuid NOT NULL DEFAULT auth.uid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  revoked_at timestamptz
);

-- Enable RLS
ALTER TABLE public.acc_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.acc_organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.acc_websites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.acc_widget_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.acc_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.acc_scan_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.acc_accessibility_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.acc_ai_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.acc_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.acc_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.acc_api_keys ENABLE ROW LEVEL SECURITY;

-- Organizations policies
CREATE POLICY "Members can view their orgs" ON public.acc_organizations FOR SELECT
  USING (public.acc_is_org_member(id) OR public.get_current_user_admin_status());
CREATE POLICY "Authenticated can create orgs" ON public.acc_organizations FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid());
CREATE POLICY "Owners/admins can update orgs" ON public.acc_organizations FOR UPDATE
  USING (public.acc_can_manage_org(id) OR public.get_current_user_admin_status());
CREATE POLICY "Owners can delete orgs" ON public.acc_organizations FOR DELETE
  USING (public.acc_org_role(id) = 'owner' OR public.get_current_user_admin_status());

-- Members policies
CREATE POLICY "Members can view org members" ON public.acc_organization_members FOR SELECT
  USING (user_id = auth.uid() OR public.acc_is_org_member(organization_id) OR public.get_current_user_admin_status());
CREATE POLICY "Owners/admins manage members" ON public.acc_organization_members FOR ALL
  USING (public.acc_can_manage_org(organization_id) OR public.get_current_user_admin_status())
  WITH CHECK (public.acc_can_manage_org(organization_id) OR public.get_current_user_admin_status());

-- Generic helper to write per-org policies
-- Websites
CREATE POLICY "Org members view websites" ON public.acc_websites FOR SELECT
  USING (public.acc_is_org_member(organization_id) OR public.get_current_user_admin_status());
CREATE POLICY "Org admins manage websites" ON public.acc_websites FOR ALL
  USING (public.acc_can_manage_org(organization_id) OR public.get_current_user_admin_status())
  WITH CHECK (public.acc_can_manage_org(organization_id) OR public.get_current_user_admin_status());

-- Widget settings (via website -> org)
CREATE POLICY "Org members view widget settings" ON public.acc_widget_settings FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.acc_websites w WHERE w.id = website_id AND (public.acc_is_org_member(w.organization_id) OR public.get_current_user_admin_status())));
CREATE POLICY "Org admins manage widget settings" ON public.acc_widget_settings FOR ALL
  USING (EXISTS (SELECT 1 FROM public.acc_websites w WHERE w.id = website_id AND (public.acc_can_manage_org(w.organization_id) OR public.get_current_user_admin_status())))
  WITH CHECK (EXISTS (SELECT 1 FROM public.acc_websites w WHERE w.id = website_id AND (public.acc_can_manage_org(w.organization_id) OR public.get_current_user_admin_status())));

-- Scans
CREATE POLICY "Org members view scans" ON public.acc_scans FOR SELECT
  USING (public.acc_is_org_member(organization_id) OR public.get_current_user_admin_status());
CREATE POLICY "Org members create scans" ON public.acc_scans FOR INSERT
  WITH CHECK (public.acc_is_org_member(organization_id) OR public.get_current_user_admin_status());
CREATE POLICY "Org admins update scans" ON public.acc_scans FOR UPDATE
  USING (public.acc_can_manage_org(organization_id) OR public.get_current_user_admin_status());

-- Scan pages
CREATE POLICY "Org members view scan pages" ON public.acc_scan_pages FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.acc_scans s WHERE s.id = scan_id AND (public.acc_is_org_member(s.organization_id) OR public.get_current_user_admin_status())));

-- Issues
CREATE POLICY "Org members view issues" ON public.acc_accessibility_issues FOR SELECT
  USING (public.acc_is_org_member(organization_id) OR public.get_current_user_admin_status());
CREATE POLICY "Org members update issues" ON public.acc_accessibility_issues FOR UPDATE
  USING (public.acc_is_org_member(organization_id) OR public.get_current_user_admin_status());

-- AI recommendations
CREATE POLICY "Org members view AI recs" ON public.acc_ai_recommendations FOR SELECT
  USING (public.acc_is_org_member(organization_id) OR public.get_current_user_admin_status());

-- Reports
CREATE POLICY "Org members view reports" ON public.acc_reports FOR SELECT
  USING (public.acc_is_org_member(organization_id) OR public.get_current_user_admin_status());
CREATE POLICY "Org members create reports" ON public.acc_reports FOR INSERT
  WITH CHECK (public.acc_is_org_member(organization_id) OR public.get_current_user_admin_status());

-- Notifications
CREATE POLICY "Users view own notifications" ON public.acc_notifications FOR SELECT
  USING (user_id = auth.uid() OR public.get_current_user_admin_status());
CREATE POLICY "Users update own notifications" ON public.acc_notifications FOR UPDATE
  USING (user_id = auth.uid());

-- API keys
CREATE POLICY "Org admins manage api keys" ON public.acc_api_keys FOR ALL
  USING (public.acc_can_manage_org(organization_id) OR public.get_current_user_admin_status())
  WITH CHECK (public.acc_can_manage_org(organization_id) OR public.get_current_user_admin_status());

-- Updated_at triggers
CREATE TRIGGER acc_orgs_updated BEFORE UPDATE ON public.acc_organizations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER acc_websites_updated BEFORE UPDATE ON public.acc_websites
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER acc_widget_updated BEFORE UPDATE ON public.acc_widget_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER acc_issues_updated BEFORE UPDATE ON public.acc_accessibility_issues
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
