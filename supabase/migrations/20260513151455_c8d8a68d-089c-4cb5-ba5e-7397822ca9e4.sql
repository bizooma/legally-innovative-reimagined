
ALTER TABLE public.acc_websites
  ADD COLUMN IF NOT EXISTS scan_frequency text NOT NULL DEFAULT 'off',
  ADD COLUMN IF NOT EXISTS next_scan_at timestamptz;

ALTER TABLE public.acc_websites
  DROP CONSTRAINT IF EXISTS acc_websites_scan_frequency_check;
ALTER TABLE public.acc_websites
  ADD CONSTRAINT acc_websites_scan_frequency_check
  CHECK (scan_frequency IN ('off','daily','weekly','monthly'));

ALTER TABLE public.acc_organizations
  ADD COLUMN IF NOT EXISTS digest_email text,
  ADD COLUMN IF NOT EXISTS digest_frequency text NOT NULL DEFAULT 'off',
  ADD COLUMN IF NOT EXISTS digest_last_sent_at timestamptz;

ALTER TABLE public.acc_organizations
  DROP CONSTRAINT IF EXISTS acc_organizations_digest_frequency_check;
ALTER TABLE public.acc_organizations
  ADD CONSTRAINT acc_organizations_digest_frequency_check
  CHECK (digest_frequency IN ('off','weekly','monthly'));

CREATE INDEX IF NOT EXISTS idx_acc_websites_next_scan ON public.acc_websites(next_scan_at) WHERE scan_frequency <> 'off';
