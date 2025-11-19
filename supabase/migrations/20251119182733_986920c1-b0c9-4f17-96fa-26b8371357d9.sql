-- Create a cron job to fetch provider incidents every 30 minutes
SELECT cron.schedule(
  'fetch-provider-incidents-job',
  '*/30 * * * *', -- Every 30 minutes
  $$
  SELECT
    net.http_post(
      url:='https://hvyjvbdforunsjgqhhny.supabase.co/functions/v1/fetch-provider-incidents',
      headers:=jsonb_build_object(
        'Content-Type','application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
      ),
      body:='{}'::jsonb
    ) as request_id;
  $$
);