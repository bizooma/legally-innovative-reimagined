
DO $$
DECLARE
  job_id bigint;
BEGIN
  SELECT jobid INTO job_id FROM cron.job WHERE jobname = 'acc-run-scheduled-scans';
  IF job_id IS NOT NULL THEN PERFORM cron.unschedule(job_id); END IF;

  SELECT jobid INTO job_id FROM cron.job WHERE jobname = 'acc-send-digests';
  IF job_id IS NOT NULL THEN PERFORM cron.unschedule(job_id); END IF;
END $$;

SELECT cron.schedule(
  'acc-run-scheduled-scans',
  '0 * * * *',
  $$ SELECT net.http_post(
    url := 'https://hvyjvbdforunsjgqhhny.supabase.co/functions/v1/acc-run-scheduled-scans',
    headers := '{"Content-Type":"application/json","apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2eWp2YmRmb3J1bnNqZ3FoaG55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NzM3MDksImV4cCI6MjA2MzE0OTcwOX0.USDrrMPieE3Twwou7ZkARUGttkrrQEyFsiTpMqrLUV4"}'::jsonb,
    body := '{}'::jsonb
  ) $$
);

SELECT cron.schedule(
  'acc-send-digests',
  '15 13 * * *',
  $$ SELECT net.http_post(
    url := 'https://hvyjvbdforunsjgqhhny.supabase.co/functions/v1/acc-send-digests',
    headers := '{"Content-Type":"application/json","apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2eWp2YmRmb3J1bnNqZ3FoaG55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NzM3MDksImV4cCI6MjA2MzE0OTcwOX0.USDrrMPieE3Twwou7ZkARUGttkrrQEyFsiTpMqrLUV4"}'::jsonb,
    body := '{}'::jsonb
  ) $$
);
