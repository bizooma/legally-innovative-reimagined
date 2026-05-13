CREATE TABLE IF NOT EXISTS public.acc_widget_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL,
  website_id uuid NOT NULL,
  event_type text NOT NULL,
  feature_key text,
  session_hash text,
  page_url text,
  referrer_host text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS acc_widget_events_org_created_idx
  ON public.acc_widget_events (organization_id, created_at DESC);
CREATE INDEX IF NOT EXISTS acc_widget_events_site_created_idx
  ON public.acc_widget_events (website_id, created_at DESC);
CREATE INDEX IF NOT EXISTS acc_widget_events_type_idx
  ON public.acc_widget_events (organization_id, event_type, created_at DESC);

ALTER TABLE public.acc_widget_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Org members view widget events"
  ON public.acc_widget_events FOR SELECT
  USING (acc_is_org_member(organization_id) OR get_current_user_admin_status());