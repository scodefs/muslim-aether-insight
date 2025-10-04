-- Create table for word-by-word Quran data (QPC V4)
CREATE TABLE IF NOT EXISTS public.quran_words (
  id INTEGER PRIMARY KEY,
  surah_id INTEGER NOT NULL,
  ayah_number INTEGER NOT NULL,
  word_position INTEGER NOT NULL,
  location TEXT NOT NULL,
  text_uthmani TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(surah_id, ayah_number, word_position)
);

-- Enable RLS
ALTER TABLE public.quran_words ENABLE ROW LEVEL SECURITY;

-- Create public read access policy
CREATE POLICY "Public read access for quran_words" 
ON public.quran_words 
FOR SELECT 
USING (true);

-- Create index for faster lookups
CREATE INDEX idx_quran_words_surah_ayah ON public.quran_words(surah_id, ayah_number);
CREATE INDEX idx_quran_words_location ON public.quran_words(location);