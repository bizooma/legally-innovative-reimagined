ALTER TABLE public.acc_accessibility_issues
  ADD COLUMN IF NOT EXISTS ai_fix text,
  ADD COLUMN IF NOT EXISTS ai_fix_generated_at timestamptz;