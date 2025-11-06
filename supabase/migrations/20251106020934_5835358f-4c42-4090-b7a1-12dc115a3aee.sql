-- Create client_citations table to store client-specific citation nodes
CREATE TABLE public.client_citations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE NOT NULL,
  node_id TEXT NOT NULL,
  label TEXT NOT NULL,
  type TEXT NOT NULL,
  url TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(client_id, node_id)
);

-- Create index for better query performance
CREATE INDEX idx_client_citations_client_id ON public.client_citations(client_id);

-- Enable RLS
ALTER TABLE public.client_citations ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Admins can manage all citations
CREATE POLICY "Admins can access all citations"
ON public.client_citations
FOR ALL
USING (get_current_user_admin_status() = true);

-- RLS Policy: Client users can view their own client's citations
CREATE POLICY "Client users can view their client citations"
ON public.client_citations
FOR SELECT
USING (
  (get_current_user_admin_status() = true) OR 
  (client_id = get_current_user_client_id())
);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_client_citations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER update_client_citations_timestamp
BEFORE UPDATE ON public.client_citations
FOR EACH ROW
EXECUTE FUNCTION public.update_client_citations_updated_at();