-- Create storage bucket for Quran data files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('quran-data', 'quran-data', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for public read access
CREATE POLICY "Public read access for quran-data"
ON storage.objects FOR SELECT
USING (bucket_id = 'quran-data');

CREATE POLICY "Authenticated upload access for quran-data"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'quran-data' AND auth.role() = 'authenticated');