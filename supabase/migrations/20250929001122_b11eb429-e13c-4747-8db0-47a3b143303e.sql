-- Add INSERT policy for daily_verse table to allow public inserts
CREATE POLICY "Public insert access for daily_verse"
ON public.daily_verse
FOR INSERT
WITH CHECK (true);