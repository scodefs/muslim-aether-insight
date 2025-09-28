-- Create reciters table
CREATE TABLE public.reciters (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  name_ar TEXT,
  identifier TEXT NOT NULL UNIQUE,
  language_code TEXT NOT NULL DEFAULT 'ar',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add reciter_id to ayahs table
ALTER TABLE public.ayahs ADD COLUMN reciter_id INTEGER REFERENCES public.reciters(id);

-- Insert default reciters
INSERT INTO public.reciters (name, name_ar, identifier, language_code) VALUES
('Abdul Rahman Al-Sudais', 'عبد الرحمن السديس', 'ar.abdurrahmaansudais', 'ar'),
('Mishari Rashid Al-Afasy', 'مشاري راشد العفاسي', 'ar.alafasy', 'ar');

-- Enable RLS on reciters table
ALTER TABLE public.reciters ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to reciters
CREATE POLICY "Public read access for reciters" 
ON public.reciters 
FOR SELECT 
USING (true);