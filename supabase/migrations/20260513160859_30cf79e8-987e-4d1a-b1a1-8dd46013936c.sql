ALTER TABLE public.acc_websites
  DROP COLUMN IF EXISTS verification_status,
  DROP COLUMN IF EXISTS verification_token,
  DROP COLUMN IF EXISTS verified_at,
  DROP COLUMN IF EXISTS verification_last_checked_at,
  DROP COLUMN IF EXISTS verification_last_error;