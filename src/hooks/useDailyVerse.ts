import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

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
        // Get current date in EST timezone
        const estTimeZone = 'America/New_York';
        const nowInEST = toZonedTime(new Date(), estTimeZone);
        
        // Calculate the "verse day" - if it's before 7 AM EST, use previous day
        const sevenAM = new Date(nowInEST);
        sevenAM.setHours(7, 0, 0, 0);
        
        const verseDate = nowInEST >= sevenAM ? nowInEST : new Date(nowInEST.getTime() - 24 * 60 * 60 * 1000);
        const dailyKey = format(verseDate, 'yyyy-MM-dd');
        
        // First, check if we have a verse for this day, if not get a random one
        let { data: dailyVerseData, error: dailyVerseError } = await supabase
          .from('daily_verse')
          .select('ayah_id')
          .eq('time_key', dailyKey)
          .maybeSingle();

        // If no verse exists for this day, create one with a random verse
        if (!dailyVerseData) {
          // Get a random verse using the database function
          const { data: randomVerseId, error: randomError } = await supabase
            .rpc('get_random_verse');

          if (randomError) {
            throw randomError;
          }

          // Insert the new verse for this day
          const { data: insertData, error: insertError } = await supabase
            .from('daily_verse')
            .insert([{ time_key: dailyKey, ayah_id: randomVerseId }])
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

    // Set up interval to check for new day every hour
    const interval = setInterval(() => {
      fetchDailyVerse();
    }, 60 * 60 * 1000); // 1 hour

    return () => clearInterval(interval);
  }, []);

  return { verse, loading, error };
}