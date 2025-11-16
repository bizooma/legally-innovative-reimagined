-- Create leads table for CRM
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  source TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  estimated_value DECIMAL(10, 2),
  notes TEXT,
  assigned_to UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID NOT NULL,
  converted_to_client_id UUID,
  next_follow_up DATE,
  CONSTRAINT leads_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE CASCADE,
  CONSTRAINT leads_assigned_to_fkey FOREIGN KEY (assigned_to) REFERENCES auth.users(id) ON DELETE SET NULL,
  CONSTRAINT leads_converted_to_client_id_fkey FOREIGN KEY (converted_to_client_id) REFERENCES public.clients(id) ON DELETE SET NULL
);

-- Create proposals table
CREATE TABLE public.proposals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL,
  title TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  document_url TEXT,
  notes TEXT,
  sent_date DATE,
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID NOT NULL,
  CONSTRAINT proposals_lead_id_fkey FOREIGN KEY (lead_id) REFERENCES public.leads(id) ON DELETE CASCADE,
  CONSTRAINT proposals_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create CRM activities table
CREATE TABLE public.crm_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL,
  activity_type TEXT NOT NULL,
  activity_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  summary TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID NOT NULL,
  CONSTRAINT crm_activities_lead_id_fkey FOREIGN KEY (lead_id) REFERENCES public.leads(id) ON DELETE CASCADE,
  CONSTRAINT crm_activities_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_activities ENABLE ROW LEVEL SECURITY;

-- RLS Policies for leads
CREATE POLICY "Admins can access all leads"
  ON public.leads
  FOR ALL
  USING (get_current_user_admin_status() = true);

-- RLS Policies for proposals
CREATE POLICY "Admins can access all proposals"
  ON public.proposals
  FOR ALL
  USING (get_current_user_admin_status() = true);

-- RLS Policies for crm_activities
CREATE POLICY "Admins can access all crm activities"
  ON public.crm_activities
  FOR ALL
  USING (get_current_user_admin_status() = true);

-- Create indexes for better performance
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_created_by ON public.leads(created_by);
CREATE INDEX idx_leads_assigned_to ON public.leads(assigned_to);
CREATE INDEX idx_proposals_lead_id ON public.proposals(lead_id);
CREATE INDEX idx_proposals_status ON public.proposals(status);
CREATE INDEX idx_crm_activities_lead_id ON public.crm_activities(lead_id);
CREATE INDEX idx_crm_activities_activity_date ON public.crm_activities(activity_date);