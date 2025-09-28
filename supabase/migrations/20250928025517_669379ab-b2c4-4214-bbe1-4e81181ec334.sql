-- Create table to store the current daily verse
CREATE TABLE public.daily_verse (
  id SERIAL PRIMARY KEY,
  ayah_id INTEGER NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_daily_verse_ayah FOREIGN KEY (ayah_id) REFERENCES public.ayahs(id)
);

-- Enable RLS
ALTER TABLE public.daily_verse ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public read access for daily_verse" 
ON public.daily_verse 
FOR SELECT 
USING (true);

-- Create unique index to ensure one verse per date
CREATE UNIQUE INDEX idx_daily_verse_date ON public.daily_verse (date);

-- Create function to get random verse
CREATE OR REPLACE FUNCTION public.get_random_verse()
RETURNS INTEGER AS $$
DECLARE
    random_ayah_id INTEGER;
BEGIN
    SELECT id INTO random_ayah_id
    FROM public.ayahs
    ORDER BY RANDOM()
    LIMIT 1;
    
    RETURN random_ayah_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert initial daily verse
INSERT INTO public.daily_verse (ayah_id, date)
SELECT public.get_random_verse(), CURRENT_DATE
ON CONFLICT (date) DO NOTHING;