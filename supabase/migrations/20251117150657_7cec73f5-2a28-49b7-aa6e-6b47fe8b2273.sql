-- Create budget_items table
CREATE TABLE public.budget_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_name TEXT NOT NULL,
  cost NUMERIC(10, 2) NOT NULL,
  billing_frequency TEXT NOT NULL DEFAULT 'monthly',
  next_billing_date DATE NOT NULL,
  category TEXT NOT NULL DEFAULT 'software',
  status TEXT NOT NULL DEFAULT 'active',
  description TEXT,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT valid_billing_frequency CHECK (billing_frequency IN ('monthly', 'annual', 'quarterly', 'one-time')),
  CONSTRAINT valid_category CHECK (category IN ('software', 'marketing', 'infrastructure', 'other')),
  CONSTRAINT valid_status CHECK (status IN ('active', 'cancelled', 'trial'))
);

-- Enable Row Level Security
ALTER TABLE public.budget_items ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to manage all budget items
CREATE POLICY "Admins can access all budget items"
ON public.budget_items
FOR ALL
USING (get_current_user_admin_status() = true);

-- Create trigger for automatic timestamp updates
CREATE OR REPLACE FUNCTION public.update_budget_items_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER update_budget_items_updated_at
BEFORE UPDATE ON public.budget_items
FOR EACH ROW
EXECUTE FUNCTION public.update_budget_items_updated_at();

-- Create index for faster queries
CREATE INDEX idx_budget_items_next_billing_date ON public.budget_items(next_billing_date);
CREATE INDEX idx_budget_items_status ON public.budget_items(status);