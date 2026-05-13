ALTER TABLE public.acc_websites
  ADD COLUMN IF NOT EXISTS allowed_domains text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS verified_at timestamptz,
  ADD COLUMN IF NOT EXISTS verification_last_checked_at timestamptz,
  ADD COLUMN IF NOT EXISTS verification_last_error text;