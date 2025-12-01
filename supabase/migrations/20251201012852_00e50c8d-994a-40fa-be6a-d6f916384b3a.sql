-- Create marketing_plans table to store customized marketing plans per client
CREATE TABLE public.marketing_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  title text NOT NULL DEFAULT 'Marketing Plan',
  executive_summary jsonb DEFAULT '{}'::jsonb,
  swot_analysis jsonb DEFAULT '{}'::jsonb,
  market_analysis jsonb DEFAULT '{}'::jsonb,
  target_audiences jsonb DEFAULT '[]'::jsonb,
  marketing_objectives jsonb DEFAULT '[]'::jsonb,
  strategies jsonb DEFAULT '{}'::jsonb,
  budget jsonb DEFAULT '{}'::jsonb,
  kpi_framework jsonb DEFAULT '{}'::jsonb,
  competitor_analysis jsonb DEFAULT '[]'::jsonb,
  implementation_timeline jsonb DEFAULT '[]'::jsonb,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(client_id)
);

-- Enable RLS
ALTER TABLE public.marketing_plans ENABLE ROW LEVEL SECURITY;

-- Admins can manage all marketing plans
CREATE POLICY "Admins can manage all marketing plans"
ON public.marketing_plans
FOR ALL
TO authenticated
USING (get_current_user_admin_status() = true);

-- Client users can view their own marketing plan
CREATE POLICY "Client users can view their marketing plan"
ON public.marketing_plans
FOR SELECT
TO authenticated
USING (
  get_current_user_admin_status() = true 
  OR client_id = get_current_user_client_id()
);

-- Create trigger for updated_at
CREATE TRIGGER update_marketing_plans_updated_at
  BEFORE UPDATE ON public.marketing_plans
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert Puget Law Group marketing plan data
INSERT INTO public.marketing_plans (
  client_id,
  title,
  executive_summary,
  swot_analysis,
  market_analysis,
  target_audiences,
  marketing_objectives,
  strategies,
  budget,
  kpi_framework
)
SELECT 
  id,
  'Puget Law Group - Comprehensive Marketing Strategy 2025',
  jsonb_build_object(
    'strengths', 'Dual-brand strategy with Puget Law Group and Win With Casey, former prosecutor expertise, SuperLawyer recognition, multi-domain architecture',
    'gaps', 'Limited social media presence, underdeveloped content marketing, need for enhanced voice search optimization'
  ),
  jsonb_build_object(
    'strengths', jsonb_build_array('Former prosecutor credibility', 'SuperLawyer status', 'Dual practice areas', 'Multi-domain strategy'),
    'weaknesses', jsonb_build_array('Limited online reviews', 'Social media engagement gaps'),
    'opportunities', jsonb_build_array('Voice search optimization', 'Personal injury market expansion', 'Content marketing growth'),
    'threats', jsonb_build_array('Intense competition in Seattle market', 'Digital marketing saturation')
  ),
  jsonb_build_object(
    'geographic_focus', 'Seattle and Tacoma with neighborhood-level targeting',
    'market_size', 'Seattle metro area with 4M+ population',
    'competitive_landscape', 'Highly competitive with 12+ major competitors'
  ),
  jsonb_build_array(
    jsonb_build_object('name', 'High-Stakes Criminal Defendants', 'description', 'Individuals facing serious felony charges', 'brand', 'Puget Law Group'),
    jsonb_build_object('name', 'DUI Defendants', 'description', 'First-time and repeat DUI offenders', 'brand', 'Puget Law Group'),
    jsonb_build_object('name', 'Injured Individuals', 'description', 'Personal injury victims seeking compensation', 'brand', 'Win With Casey')
  ),
  jsonb_build_array(
    jsonb_build_object('objective', 'Increase monthly leads by 40%', 'timeline', '12 months', 'target', 120),
    jsonb_build_object('objective', 'Improve conversion rate to 25%', 'timeline', '12 months', 'target', 25),
    jsonb_build_object('objective', 'Grow organic traffic by 60%', 'timeline', '12 months', 'target', 12000)
  ),
  jsonb_build_object(
    'dual_brand', true,
    'seo_focus', 'Topical authority and voice search optimization',
    'content_strategy', 'Educational content with sports metaphors for Win With Casey',
    'social_media', 'Personal brand building for Casey Arbenz'
  ),
  jsonb_build_object(
    'total', 204000,
    'plg_allocation', 102000,
    'wwc_allocation', 102000,
    'breakdown', jsonb_build_object(
      'website_optimization', 24000,
      'seo_content', 48000,
      'paid_advertising', 60000,
      'social_media', 36000,
      'email_marketing', 12000,
      'analytics_tools', 24000
    )
  ),
  jsonb_build_object(
    'monthly_leads', jsonb_build_object('current', 75, 'target', 120),
    'conversion_rate', jsonb_build_object('current', 18, 'target', 25),
    'organic_traffic', jsonb_build_object('current', 7500, 'target', 12000),
    'cost_per_lead', jsonb_build_object('current', 180, 'target', 150)
  )
FROM public.clients
WHERE company_name = 'Puget Law Group'
LIMIT 1;