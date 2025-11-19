-- Enable required extensions for cron jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA cron TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA cron TO postgres;

-- Schedule the fetch-all-provider-status function to run every 5 minutes
SELECT cron.schedule(
  'fetch-provider-status-every-5-minutes',
  '*/5 * * * *', -- Every 5 minutes
  $$
  SELECT
    net.http_post(
        url:='https://hvyjvbdforunsjgqhhny.supabase.co/functions/v1/fetch-all-provider-status',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2eWp2YmRmb3J1bnNqZ3FoaG55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NzM3MDksImV4cCI6MjA2MzE0OTcwOX0.USDrrMPieE3Twwou7ZkARUGttkrrQEyFsiTpMqrLUV4"}'::jsonb,
        body:=concat('{"time": "', now(), '"}')::jsonb
    ) as request_id;
  $$
);