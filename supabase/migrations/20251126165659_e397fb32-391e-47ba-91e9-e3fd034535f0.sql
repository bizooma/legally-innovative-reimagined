-- Create audit access codes table
CREATE TABLE public.audit_access_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  client_name TEXT NOT NULL,
  website_url TEXT NOT NULL,
  gbp_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create audit results table
CREATE TABLE public.audit_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  access_code_id UUID NOT NULL REFERENCES public.audit_access_codes(id) ON DELETE CASCADE,
  audit_type TEXT NOT NULL,
  category TEXT NOT NULL,
  item_name TEXT NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  status TEXT NOT NULL CHECK (status IN ('pass', 'warning', 'fail')),
  details JSONB,
  recommendations TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.audit_access_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_results ENABLE ROW LEVEL SECURITY;

-- RLS Policies for audit_access_codes
CREATE POLICY "Admins can manage all access codes"
  ON public.audit_access_codes
  FOR ALL
  USING (get_current_user_admin_status() = true);

CREATE POLICY "Anyone can verify codes exist"
  ON public.audit_access_codes
  FOR SELECT
  USING (is_active = true AND (expires_at IS NULL OR expires_at > now()));

-- RLS Policies for audit_results
CREATE POLICY "Admins can manage all audit results"
  ON public.audit_results
  FOR ALL
  USING (get_current_user_admin_status() = true);

CREATE POLICY "Anyone can view results with valid code"
  ON public.audit_results
  FOR SELECT
  USING (
    access_code_id IN (
      SELECT id FROM public.audit_access_codes 
      WHERE is_active = true 
      AND (expires_at IS NULL OR expires_at > now())
    )
  );

-- Create indexes for performance
CREATE INDEX idx_audit_access_codes_code ON public.audit_access_codes(code);
CREATE INDEX idx_audit_access_codes_active ON public.audit_access_codes(is_active, expires_at);
CREATE INDEX idx_audit_results_code_id ON public.audit_results(access_code_id);
CREATE INDEX idx_audit_results_type ON public.audit_results(audit_type);

-- Trigger to update updated_at timestamp
CREATE TRIGGER update_audit_access_codes_updated_at
  BEFORE UPDATE ON public.audit_access_codes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_audit_results_updated_at
  BEFORE UPDATE ON public.audit_results
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();