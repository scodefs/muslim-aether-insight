-- Fix the unique constraint for ayahs to support multiple reciters
ALTER TABLE public.ayahs 
DROP CONSTRAINT IF EXISTS ayahs_surah_id_ayah_number_key;

ALTER TABLE public.ayahs 
DROP CONSTRAINT IF EXISTS ayahs_surah_id_ayah_number_reciter_id_key;

ALTER TABLE public.ayahs 
ADD CONSTRAINT ayahs_surah_id_ayah_number_reciter_id_key 
UNIQUE (surah_id, ayah_number, reciter_id);