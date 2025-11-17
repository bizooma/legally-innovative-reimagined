-- Create function to update timestamps if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create table for tracking actual budget expenses
CREATE TABLE IF NOT EXISTS public.budget_expenses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  budget_item_id UUID NOT NULL REFERENCES public.budget_items(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  expense_date DATE NOT NULL,
  notes TEXT,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.budget_expenses ENABLE ROW LEVEL SECURITY;

-- RLS Policies for budget_expenses
CREATE POLICY "Admins can access all budget expenses"
  ON public.budget_expenses
  FOR ALL
  USING (get_current_user_admin_status() = true);

-- Create index for performance
CREATE INDEX idx_budget_expenses_item_id ON public.budget_expenses(budget_item_id);
CREATE INDEX idx_budget_expenses_date ON public.budget_expenses(expense_date);

-- Trigger for updated_at
CREATE TRIGGER update_budget_expenses_updated_at
  BEFORE UPDATE ON public.budget_expenses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();