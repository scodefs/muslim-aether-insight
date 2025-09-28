-- Fix cron setup with correct syntax
SELECT cron.schedule(
  'update-daily-verse',
  '0 12 * * *', -- Every day at 12:00 PM UTC (7:00 AM EST)
  $$
  SELECT
    net.http_post(
        url:='https://mlghlhmcwwxdqujszaku.supabase.co/functions/v1/update-daily-verse',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sZ2hsaG1jd3d4ZHF1anN6YWt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NDk5MjAsImV4cCI6MjA3NDQyNTkyMH0.riC_Vyb7jvs3_GiU6snTqGLZYytEnTySaZsfzE6TLHA"}'::jsonb,
        body:='{"source": "cron"}'::jsonb
    ) as request_id;
  $$
);