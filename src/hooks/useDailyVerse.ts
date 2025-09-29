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
        // Get current minute for testing (format: YYYY-MM-DD-HH-mm)
        const now = new Date();
        const currentMinute = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}-${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}`;
        
        // First, check if we have a verse for this minute, if not get a random one
        let { data: dailyVerseData, error: dailyVerseError } = await supabase
          .from('daily_verse')
          .select('ayah_id')
          .eq('time_key', currentMinute)
          .maybeSingle();

        // If no verse exists for this minute, create one with a random verse
        if (!dailyVerseData) {
          // Get a random verse using the database function
          const { data: randomVerseId, error: randomError } = await supabase
            .rpc('get_random_verse');

          if (randomError) {
            throw randomError;
          }

          // Insert the new verse for this minute
          const { data: insertData, error: insertError } = await supabase
            .from('daily_verse')
            .insert([{ time_key: currentMinute, ayah_id: randomVerseId }])
            .select('ayah_id')
            .single();

          if (insertError) {
            throw insertError;
          }

          dailyVerseData = insertData;
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

    // Set up interval to refresh every minute for testing
    const interval = setInterval(() => {
      fetchDailyVerse();
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, []);

  return { verse, loading, error };
}