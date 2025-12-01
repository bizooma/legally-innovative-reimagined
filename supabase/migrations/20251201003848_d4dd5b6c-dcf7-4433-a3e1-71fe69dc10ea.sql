-- Create marketing KPIs table for tracking metrics over time
CREATE TABLE IF NOT EXISTS public.marketing_kpis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL,
  metric_value NUMERIC NOT NULL,
  target_value NUMERIC,
  metric_unit TEXT,
  category TEXT NOT NULL, -- 'leads', 'traffic', 'conversion', 'cost', 'seo', 'brand'
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb,
  CONSTRAINT valid_period CHECK (period_end >= period_start)
);

-- Create index for faster queries
CREATE INDEX idx_marketing_kpis_client_id ON public.marketing_kpis(client_id);
CREATE INDEX idx_marketing_kpis_metric_name ON public.marketing_kpis(metric_name);
CREATE INDEX idx_marketing_kpis_category ON public.marketing_kpis(category);
CREATE INDEX idx_marketing_kpis_period ON public.marketing_kpis(period_start, period_end);

-- Enable RLS
ALTER TABLE public.marketing_kpis ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins can manage all marketing KPIs"
  ON public.marketing_kpis
  FOR ALL
  USING (get_current_user_admin_status() = true);

CREATE POLICY "Client users can view their marketing KPIs"
  ON public.marketing_kpis
  FOR SELECT
  USING (
    (get_current_user_admin_status() = true) OR 
    (client_id = get_current_user_client_id())
  );

-- Create trigger for updated_at
CREATE TRIGGER update_marketing_kpis_updated_at
  BEFORE UPDATE ON public.marketing_kpis
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for Puget Law Group (client_id: 9d7fc8c7-795e-4a3d-acd1-3b34173a53f8)
INSERT INTO public.marketing_kpis (client_id, metric_name, metric_value, target_value, metric_unit, category, period_start, period_end, metadata) VALUES
-- Current month metrics
('9d7fc8c7-795e-4a3d-acd1-3b34173a53f8', 'monthly_leads', 42, 50, 'leads', 'leads', CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE, '{"trend": "up", "change_pct": 15}'),
('9d7fc8c7-795e-4a3d-acd1-3b34173a53f8', 'conversion_rate', 4.2, 5.0, 'percentage', 'conversion', CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE, '{"trend": "up", "change_pct": 8}'),
('9d7fc8c7-795e-4a3d-acd1-3b34173a53f8', 'organic_traffic', 8420, 12000, 'visitors', 'traffic', CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE, '{"trend": "up", "change_pct": 32}'),
('9d7fc8c7-795e-4a3d-acd1-3b34173a53f8', 'cost_per_lead', 185, 150, 'dollars', 'cost', CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE, '{"trend": "down", "change_pct": -5}'),
('9d7fc8c7-795e-4a3d-acd1-3b34173a53f8', 'google_rating', 4.8, 5.0, 'stars', 'brand', CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE, '{"trend": "up", "change_pct": 4}'),
('9d7fc8c7-795e-4a3d-acd1-3b34173a53f8', 'monthly_reviews', 28, 40, 'reviews', 'brand', CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE, '{"trend": "up", "change_pct": 12}'),
('9d7fc8c7-795e-4a3d-acd1-3b34173a53f8', 'branded_searches', 1850, 3000, 'searches', 'brand', CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE, '{"trend": "up", "change_pct": 22}'),
('9d7fc8c7-795e-4a3d-acd1-3b34173a53f8', 'seo_score', 92, 95, 'score', 'seo', CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE, '{"trend": "stable", "change_pct": 2}'),
('9d7fc8c7-795e-4a3d-acd1-3b34173a53f8', 'page_load_time', 3.2, 2.5, 'seconds', 'seo', CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE, '{"trend": "stable", "change_pct": 0}'),

-- PLG Goals
('9d7fc8c7-795e-4a3d-acd1-3b34173a53f8', 'plg_top3_rankings', 4, 10, 'keywords', 'seo', CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE, '{"brand": "plg"}'),
('9d7fc8c7-795e-4a3d-acd1-3b34173a53f8', 'plg_content_published', 18, 30, 'articles', 'content', CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE, '{"brand": "plg"}'),

-- Win With Casey Goals
('9d7fc8c7-795e-4a3d-acd1-3b34173a53f8', 'wwc_domain_authority', 12, 30, 'DA', 'seo', CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE, '{"brand": "wwc"}'),
('9d7fc8c7-795e-4a3d-acd1-3b34173a53f8', 'wwc_keyword_rankings', 2, 5, 'keywords', 'seo', CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE, '{"brand": "wwc"}'),
('9d7fc8c7-795e-4a3d-acd1-3b34173a53f8', 'wwc_monthly_leads', 8, 25, 'leads', 'leads', CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE, '{"brand": "wwc"}'),
('9d7fc8c7-795e-4a3d-acd1-3b34173a53f8', 'wwc_content_published', 24, 50, 'articles', 'content', CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE, '{"brand": "wwc"}');

COMMENT ON TABLE public.marketing_kpis IS 'Stores marketing KPI metrics over time for tracking and historical analysis';