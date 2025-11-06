-- Create time_entries table for tracking work time on clients
CREATE TABLE public.time_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  duration_seconds INTEGER,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.time_entries ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Admins can access all time entries"
  ON public.time_entries
  FOR ALL
  USING (get_current_user_admin_status() = true);

CREATE POLICY "Users can access their own time entries"
  ON public.time_entries
  FOR ALL
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_time_entries_client_id ON public.time_entries(client_id);
CREATE INDEX idx_time_entries_user_id ON public.time_entries(user_id);
CREATE INDEX idx_time_entries_start_time ON public.time_entries(start_time DESC);

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION public.update_time_entries_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_time_entries_updated_at
  BEFORE UPDATE ON public.time_entries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_time_entries_updated_at();