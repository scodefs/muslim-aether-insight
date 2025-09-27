-- Create Quran Database Schema
-- Tables for Surahs, Ayahs, and Translations with full-text search capabilities

-- Create surahs table
CREATE TABLE public.surahs (
    id SERIAL PRIMARY KEY,
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    ayah_count INTEGER NOT NULL,
    revelation_place TEXT NOT NULL CHECK (revelation_place IN ('Mecca', 'Medina')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ayahs table
CREATE TABLE public.ayahs (
    id SERIAL PRIMARY KEY,
    surah_id INTEGER NOT NULL REFERENCES public.surahs(id) ON DELETE CASCADE,
    ayah_number INTEGER NOT NULL,
    text_ar TEXT NOT NULL,
    audio_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(surah_id, ayah_number)
);

-- Create translations table
CREATE TABLE public.translations (
    id SERIAL PRIMARY KEY,
    ayah_id INTEGER NOT NULL REFERENCES public.ayahs(id) ON DELETE CASCADE,
    language_code TEXT NOT NULL,
    text_translated TEXT NOT NULL,
    translator_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(ayah_id, language_code, translator_name)
);

-- Create indexes for performance
CREATE INDEX idx_ayahs_surah_id ON public.ayahs(surah_id);
CREATE INDEX idx_ayahs_surah_ayah ON public.ayahs(surah_id, ayah_number);
CREATE INDEX idx_translations_ayah_id ON public.translations(ayah_id);
CREATE INDEX idx_translations_language ON public.translations(language_code);

-- Create full-text search indexes
CREATE INDEX idx_ayahs_text_ar_fts ON public.ayahs USING gin(to_tsvector('arabic', text_ar));
CREATE INDEX idx_translations_text_fts ON public.translations USING gin(to_tsvector('english', text_translated));

-- Enable Row Level Security (optional - remove if you want public access)
ALTER TABLE public.surahs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ayahs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.translations ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (adjust as needed)
CREATE POLICY "Public read access for surahs" ON public.surahs FOR SELECT USING (true);
CREATE POLICY "Public read access for ayahs" ON public.ayahs FOR SELECT USING (true);
CREATE POLICY "Public read access for translations" ON public.translations FOR SELECT USING (true);

-- Insert sample data for first 5 Surahs
INSERT INTO public.surahs (name_ar, name_en, ayah_count, revelation_place) VALUES
('الفاتحة', 'Al-Fatihah', 7, 'Mecca'),
('البقرة', 'Al-Baqarah', 286, 'Medina'),
('آل عمران', 'Al Imran', 200, 'Medina'),
('النساء', 'An-Nisa', 176, 'Medina'),
('المائدة', 'Al-Maidah', 120, 'Medina');

-- Insert Al-Fatihah ayahs (Surah 1)
INSERT INTO public.ayahs (surah_id, ayah_number, text_ar) VALUES
(1, 1, 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ'),
(1, 2, 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ'),
(1, 3, 'ٱلرَّحْمَٰنِ ٱلرَّحِيمِ'),
(1, 4, 'مَٰلِكِ يَوْمِ ٱلدِّينِ'),
(1, 5, 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ'),
(1, 6, 'ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ'),
(1, 7, 'صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ');

-- Insert sample ayahs for Al-Baqarah (first 5 verses)
INSERT INTO public.ayahs (surah_id, ayah_number, text_ar) VALUES
(2, 1, 'الم'),
(2, 2, 'ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ فِيهِ هُدًى لِّلْمُتَّقِينَ'),
(2, 3, 'ٱلَّذِينَ يُؤْمِنُونَ بِٱلْغَيْبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقْنَٰهُمْ يُنفِقُونَ'),
(2, 4, 'وَٱلَّذِينَ يُؤْمِنُونَ بِمَآ أُنزِلَ إِلَيْكَ وَمَآ أُنزِلَ مِن قَبْلِكَ وَبِٱلْءَاخِرَةِ هُمْ يُوقِنُونَ'),
(2, 5, 'أُولَٰٓئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ وَأُولَٰٓئِكَ هُمُ ٱلْمُفْلِحُونَ');

-- Insert English translations for Al-Fatihah
INSERT INTO public.translations (ayah_id, language_code, text_translated, translator_name) VALUES
(1, 'en', 'In the name of Allah, the Entirely Merciful, the Especially Merciful.', 'Sahih International'),
(2, 'en', 'All praise is due to Allah, Lord of the worlds.', 'Sahih International'),
(3, 'en', 'The Entirely Merciful, the Especially Merciful,', 'Sahih International'),
(4, 'en', 'Sovereign of the Day of Recompense.', 'Sahih International'),
(5, 'en', 'It is You we worship and You we ask for help.', 'Sahih International'),
(6, 'en', 'Guide us to the straight path', 'Sahih International'),
(7, 'en', 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.', 'Sahih International');

-- Insert English translations for Al-Baqarah (first 5 verses)
INSERT INTO public.translations (ayah_id, language_code, text_translated, translator_name) VALUES
(8, 'en', 'Alif, Lam, Meem.', 'Sahih International'),
(9, 'en', 'This is the Book about which there is no doubt, a guidance for those conscious of Allah', 'Sahih International'),
(10, 'en', 'Who believe in the unseen, establish prayer, and spend out of what We have provided for them,', 'Sahih International'),
(11, 'en', 'And who believe in what has been revealed to you, [O Muhammad], and what was revealed before you, and of the Hereafter they are certain [in faith].', 'Sahih International'),
(12, 'en', 'Those are upon [right] guidance from their Lord, and it is those who are the successful.', 'Sahih International');

-- Create helper functions for search
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

-- Create function to get surah with translations
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