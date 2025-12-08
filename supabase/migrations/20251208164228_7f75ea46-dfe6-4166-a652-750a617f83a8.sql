-- Add budget_breakdown column to marketing_plans table to store editable budget line items
ALTER TABLE public.marketing_plans 
ADD COLUMN IF NOT EXISTS budget_breakdown jsonb DEFAULT '[]'::jsonb;

-- Comment for documentation
COMMENT ON COLUMN public.marketing_plans.budget_breakdown IS 'Array of budget line items with category, monthly, annual, and description fields';