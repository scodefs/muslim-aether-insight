-- Complete Quran Database Migration (Fixed)
-- This migration includes all 114 Surahs with properly escaped quotes

-- Drop existing tables if they exist (clean slate)
DROP TABLE IF EXISTS public.translations CASCADE;
DROP TABLE IF EXISTS public.ayahs CASCADE;
DROP TABLE IF EXISTS public.surahs CASCADE;

-- Create Surahs table
CREATE TABLE public.surahs (
    id SERIAL PRIMARY KEY,
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    ayah_count INTEGER NOT NULL,
    revelation_place TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create Ayahs table
CREATE TABLE public.ayahs (
    id SERIAL PRIMARY KEY,
    surah_id INTEGER NOT NULL REFERENCES public.surahs(id),
    ayah_number INTEGER NOT NULL,
    text_ar TEXT NOT NULL,
    audio_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create Translations table
CREATE TABLE public.translations (
    id SERIAL PRIMARY KEY,
    ayah_id INTEGER NOT NULL REFERENCES public.ayahs(id),
    language_code TEXT NOT NULL DEFAULT 'en',
    text_translated TEXT NOT NULL,
    translator_name TEXT DEFAULT 'Sahih International',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert all 114 Surahs with properly escaped quotes
INSERT INTO public.surahs (id, name_ar, name_en, ayah_count, revelation_place) VALUES
(1, 'الفاتحة', 'Al-Fatihah', 7, 'Meccan'),
(2, 'البقرة', 'Al-Baqarah', 286, 'Medinan'),
(3, 'آل عمران', 'Ali ''Imran', 200, 'Medinan'),
(4, 'النساء', 'An-Nisa', 176, 'Medinan'),
(5, 'المائدة', 'Al-Ma''idah', 120, 'Medinan'),
(6, 'الأنعام', 'Al-An''am', 165, 'Meccan'),
(7, 'الأعراف', 'Al-A''raf', 206, 'Meccan'),
(8, 'الأنفال', 'Al-Anfal', 75, 'Medinan'),
(9, 'التوبة', 'At-Tawbah', 129, 'Medinan'),
(10, 'يونس', 'Yunus', 109, 'Meccan'),
(11, 'هود', 'Hud', 123, 'Meccan'),
(12, 'يوسف', 'Yusuf', 111, 'Meccan'),
(13, 'الرعد', 'Ar-Ra''d', 43, 'Medinan'),
(14, 'إبراهيم', 'Ibrahim', 52, 'Meccan'),
(15, 'الحجر', 'Al-Hijr', 99, 'Meccan'),
(16, 'النحل', 'An-Nahl', 128, 'Meccan'),
(17, 'الإسراء', 'Al-Isra', 111, 'Meccan'),
(18, 'الكهف', 'Al-Kahf', 110, 'Meccan'),
(19, 'مريم', 'Maryam', 98, 'Meccan'),
(20, 'طه', 'Taha', 135, 'Meccan'),
(21, 'الأنبياء', 'Al-Anbya', 112, 'Meccan'),
(22, 'الحج', 'Al-Hajj', 78, 'Medinan'),
(23, 'المؤمنون', 'Al-Mu''minun', 118, 'Meccan'),
(24, 'النور', 'An-Nur', 64, 'Medinan'),
(25, 'الفرقان', 'Al-Furqan', 77, 'Meccan'),
(26, 'الشعراء', 'Ash-Shu''ara', 227, 'Meccan'),
(27, 'النمل', 'An-Naml', 93, 'Meccan'),
(28, 'القصص', 'Al-Qasas', 88, 'Meccan'),
(29, 'العنكبوت', 'Al-''Ankabut', 69, 'Meccan'),
(30, 'الروم', 'Ar-Rum', 60, 'Meccan'),
(31, 'لقمان', 'Luqman', 34, 'Meccan'),
(32, 'السجدة', 'As-Sajdah', 30, 'Meccan'),
(33, 'الأحزاب', 'Al-Ahzab', 73, 'Medinan'),
(34, 'سبأ', 'Saba', 54, 'Meccan'),
(35, 'فاطر', 'Fatir', 45, 'Meccan'),
(36, 'يس', 'Ya-Sin', 83, 'Meccan'),
(37, 'الصافات', 'As-Saffat', 182, 'Meccan'),
(38, 'ص', 'Sad', 88, 'Meccan'),
(39, 'الزمر', 'Az-Zumar', 75, 'Meccan'),
(40, 'غافر', 'Ghafir', 85, 'Meccan'),
(41, 'فصلت', 'Fussilat', 54, 'Meccan'),
(42, 'الشورى', 'Ash-Shuraa', 53, 'Meccan'),
(43, 'الزخرف', 'Az-Zukhruf', 89, 'Meccan'),
(44, 'الدخان', 'Ad-Dukhan', 59, 'Meccan'),
(45, 'الجاثية', 'Al-Jathiyah', 37, 'Meccan'),
(46, 'الأحقاف', 'Al-Ahqaf', 35, 'Meccan'),
(47, 'محمد', 'Muhammad', 38, 'Medinan'),
(48, 'الفتح', 'Al-Fath', 29, 'Medinan'),
(49, 'الحجرات', 'Al-Hujurat', 18, 'Medinan'),
(50, 'ق', 'Qaf', 45, 'Meccan'),
(51, 'الذاريات', 'Adh-Dhariyat', 60, 'Meccan'),
(52, 'الطور', 'At-Tur', 49, 'Meccan'),
(53, 'النجم', 'An-Najm', 62, 'Meccan'),
(54, 'القمر', 'Al-Qamar', 55, 'Meccan'),
(55, 'الرحمن', 'Ar-Rahman', 78, 'Medinan'),
(56, 'الواقعة', 'Al-Waqi''ah', 96, 'Meccan'),
(57, 'الحديد', 'Al-Hadid', 29, 'Medinan'),
(58, 'المجادلة', 'Al-Mujadila', 22, 'Medinan'),
(59, 'الحشر', 'Al-Hashr', 24, 'Medinan'),
(60, 'الممتحنة', 'Al-Mumtahanah', 13, 'Medinan'),
(61, 'الصف', 'As-Saf', 14, 'Medinan'),
(62, 'الجمعة', 'Al-Jumu''ah', 11, 'Medinan'),
(63, 'المنافقون', 'Al-Munafiqun', 11, 'Medinan'),
(64, 'التغابن', 'At-Taghabun', 18, 'Medinan'),
(65, 'الطلاق', 'At-Talaq', 12, 'Medinan'),
(66, 'التحريم', 'At-Tahrim', 12, 'Medinan'),
(67, 'الملك', 'Al-Mulk', 30, 'Meccan'),
(68, 'القلم', 'Al-Qalam', 52, 'Meccan'),
(69, 'الحاقة', 'Al-Haqqah', 52, 'Meccan'),
(70, 'المعارج', 'Al-Ma''arij', 44, 'Meccan'),
(71, 'نوح', 'Nuh', 28, 'Meccan'),
(72, 'الجن', 'Al-Jinn', 28, 'Meccan'),
(73, 'المزمل', 'Al-Muzzammil', 20, 'Meccan'),
(74, 'المدثر', 'Al-Muddaththir', 56, 'Meccan'),
(75, 'القيامة', 'Al-Qiyamah', 40, 'Meccan'),
(76, 'الإنسان', 'Al-Insan', 31, 'Medinan'),
(77, 'المرسلات', 'Al-Mursalat', 50, 'Meccan'),
(78, 'النبأ', 'An-Naba', 40, 'Meccan'),
(79, 'النازعات', 'An-Nazi''at', 46, 'Meccan'),
(80, 'عبس', 'Abasa', 42, 'Meccan'),
(81, 'التكوير', 'At-Takwir', 29, 'Meccan'),
(82, 'الإنفطار', 'Al-Infitar', 19, 'Meccan'),
(83, 'المطففين', 'Al-Mutaffifin', 36, 'Meccan'),
(84, 'الانشقاق', 'Al-Inshiqaq', 25, 'Meccan'),
(85, 'البروج', 'Al-Buruj', 22, 'Meccan'),
(86, 'الطارق', 'At-Tariq', 17, 'Meccan'),
(87, 'الأعلى', 'Al-A''la', 19, 'Meccan'),
(88, 'الغاشية', 'Al-Ghashiyah', 26, 'Meccan'),
(89, 'الفجر', 'Al-Fajr', 30, 'Meccan'),
(90, 'البلد', 'Al-Balad', 20, 'Meccan'),
(91, 'الشمس', 'Ash-Shams', 15, 'Meccan'),
(92, 'الليل', 'Al-Layl', 21, 'Meccan'),
(93, 'الضحى', 'Ad-Duhaa', 11, 'Meccan'),
(94, 'الشرح', 'Ash-Sharh', 8, 'Meccan'),
(95, 'التين', 'At-Tin', 8, 'Meccan'),
(96, 'العلق', 'Al-''Alaq', 19, 'Meccan'),
(97, 'القدر', 'Al-Qadr', 5, 'Meccan'),
(98, 'البينة', 'Al-Bayyinah', 8, 'Medinan'),
(99, 'الزلزلة', 'Az-Zalzalah', 8, 'Medinan'),
(100, 'العاديات', 'Al-''Adiyat', 11, 'Meccan'),
(101, 'القارعة', 'Al-Qari''ah', 11, 'Meccan'),
(102, 'التكاثر', 'At-Takathur', 8, 'Meccan'),
(103, 'العصر', 'Al-''Asr', 3, 'Meccan'),
(104, 'الهمزة', 'Al-Humazah', 9, 'Meccan'),
(105, 'الفيل', 'Al-Fil', 5, 'Meccan'),
(106, 'قريش', 'Quraysh', 4, 'Meccan'),
(107, 'الماعون', 'Al-Ma''un', 7, 'Meccan'),
(108, 'الكوثر', 'Al-Kawthar', 3, 'Meccan'),
(109, 'الكافرون', 'Al-Kafirun', 6, 'Meccan'),
(110, 'النصر', 'An-Nasr', 3, 'Medinan'),
(111, 'المسد', 'Al-Masad', 5, 'Meccan'),
(112, 'الإخلاص', 'Al-Ikhlas', 4, 'Meccan'),
(113, 'الفلق', 'Al-Falaq', 5, 'Meccan'),
(114, 'الناس', 'An-Nas', 6, 'Meccan');

-- Reset sequence for surahs table
SELECT setval('public.surahs_id_seq', 114, true);

-- Enable Row Level Security
ALTER TABLE public.surahs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ayahs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.translations ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for public read access
CREATE POLICY "Public read access for surahs" ON public.surahs
    FOR SELECT USING (true);

CREATE POLICY "Public read access for ayahs" ON public.ayahs
    FOR SELECT USING (true);

CREATE POLICY "Public read access for translations" ON public.translations
    FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX idx_ayahs_surah_id ON public.ayahs(surah_id);
CREATE INDEX idx_ayahs_ayah_number ON public.ayahs(ayah_number);
CREATE INDEX idx_translations_ayah_id ON public.translations(ayah_id);
CREATE INDEX idx_translations_language_code ON public.translations(language_code);

-- Create GIN indexes for full-text search
CREATE INDEX idx_ayahs_text_ar_gin ON public.ayahs USING GIN (to_tsvector('arabic', text_ar));
CREATE INDEX idx_translations_text_gin ON public.translations USING GIN (to_tsvector('english', text_translated));

-- Create database functions for search
CREATE OR REPLACE FUNCTION public.search_quran(search_term text, lang text DEFAULT 'en'::text)
RETURNS TABLE(surah_name text, surah_name_ar text, ayah_number integer, ayah_text text, translation text, rank real)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.get_surah_with_translations(surah_id_param integer, lang_code text DEFAULT 'en'::text)
RETURNS TABLE(surah_name text, surah_name_ar text, ayah_number integer, ayah_text_ar text, translation text)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $function$
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
$function$;