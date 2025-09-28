import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface DailyVerse {
  surah_name: string;
  surah_name_ar: string;
  ayah_number: number;
  ayah_text_ar: string;
  translation: string;
  reference: string;
}

export function useDailyVerse() {
  const [verse, setVerse] = useState<DailyVerse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDailyVerse() {
      try {
        // Get today's date
        const today = new Date().toISOString().split('T')[0];
        
        // First, get the daily verse entry
        const { data: dailyVerseData, error: dailyVerseError } = await supabase
          .from('daily_verse')
          .select('ayah_id')
          .eq('date', today)
          .single();

        if (dailyVerseError) {
          throw dailyVerseError;
        }

        // Get the ayah with surah info and translation
        const { data: ayahData, error: ayahError } = await supabase
          .from('ayahs')
          .select(`
            id,
            text_ar,
            ayah_number,
            surah_id,
            surahs!inner (
              id,
              name_en,
              name_ar
            ),
            translations!inner (
              text_translated
            )
          `)
          .eq('id', dailyVerseData.ayah_id)
          .eq('translations.language_code', 'en')
          .limit(1, { foreignTable: 'translations' })
          .single();

        if (ayahError) {
          throw ayahError;
        }

        const formattedVerse: DailyVerse = {
          surah_name: ayahData.surahs.name_en,
          surah_name_ar: ayahData.surahs.name_ar,
          ayah_number: ayahData.ayah_number,
          ayah_text_ar: ayahData.text_ar,
          translation: ayahData.translations[0]?.text_translated || '',
          reference: `Surah ${ayahData.surahs.name_en} ${ayahData.surahs.id}:${ayahData.ayah_number}`
        };

        setVerse(formattedVerse);
      } catch (err) {
        console.error('Error fetching daily verse:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch daily verse');
      } finally {
        setLoading(false);
      }
    }

    fetchDailyVerse();
  }, []);

  return { verse, loading, error };
}