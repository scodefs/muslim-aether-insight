-- Fix security warnings by setting proper search_path for functions

-- Drop and recreate search_quran function with proper security settings
DROP FUNCTION IF EXISTS search_quran(TEXT, TEXT);

CREATE OR REPLACE FUNCTION search_quran(search_term TEXT, lang TEXT DEFAULT 'en')
RETURNS TABLE (
    surah_name TEXT,
    surah_name_ar TEXT,
    ayah_number INTEGER,
    ayah_text TEXT,
    translation TEXT,
    rank REAL
) 
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT 
        s.name_en,
        s.name_ar,
        a.ayah_number,
        a.text_ar,
        t.text_translated,
        CASE 
            WHEN lang = 'ar' THEN ts_rank(to_tsvector('arabic', a.text_ar), plainto_tsquery('arabic', search_term))
            ELSE ts_rank(to_tsvector('english', t.text_translated), plainto_tsquery('english', search_term))
        END as rank
    FROM public.ayahs a
    JOIN public.surahs s ON a.surah_id = s.id
    LEFT JOIN public.translations t ON a.id = t.ayah_id AND t.language_code = lang
    WHERE 
        CASE 
            WHEN lang = 'ar' THEN to_tsvector('arabic', a.text_ar) @@ plainto_tsquery('arabic', search_term)
            ELSE to_tsvector('english', t.text_translated) @@ plainto_tsquery('english', search_term)
        END
    ORDER BY rank DESC, s.id, a.ayah_number;
$$;

-- Drop and recreate get_surah_with_translations function with proper security settings
DROP FUNCTION IF EXISTS get_surah_with_translations(INTEGER, TEXT);

CREATE OR REPLACE FUNCTION get_surah_with_translations(surah_id_param INTEGER, lang_code TEXT DEFAULT 'en')
RETURNS TABLE (
    surah_name TEXT,
    surah_name_ar TEXT,
    ayah_number INTEGER,
    ayah_text_ar TEXT,
    translation TEXT
)
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT 
        s.name_en,
        s.name_ar,
        a.ayah_number,
        a.text_ar,
        t.text_translated
    FROM public.ayahs a
    JOIN public.surahs s ON a.surah_id = s.id
    LEFT JOIN public.translations t ON a.id = t.ayah_id AND t.language_code = lang_code
    WHERE s.id = surah_id_param
    ORDER BY a.ayah_number;
$$;