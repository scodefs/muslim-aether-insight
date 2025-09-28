-- Update existing ayahs to have the default reciter (Al-Sudais)
-- Since the existing audio URLs are from Al-Sudais, we'll assign them to reciter ID 1
UPDATE public.ayahs 
SET reciter_id = 1 
WHERE reciter_id IS NULL;

-- Add a constraint to prevent null reciter_id in the future
ALTER TABLE public.ayahs 
ALTER COLUMN reciter_id SET NOT NULL;

-- Update the unique constraint to include reciter_id
ALTER TABLE public.ayahs 
DROP CONSTRAINT IF EXISTS ayahs_surah_id_ayah_number_key;

ALTER TABLE public.ayahs 
ADD CONSTRAINT ayahs_surah_id_ayah_number_reciter_id_key 
UNIQUE (surah_id, ayah_number, reciter_id);