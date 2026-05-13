ALTER TABLE public.acc_widget_settings
  ADD COLUMN IF NOT EXISTS default_language text NOT NULL DEFAULT 'auto',
  ADD COLUMN IF NOT EXISTS available_languages text[] NOT NULL DEFAULT ARRAY['en','es','fr','pt','de']::text[];