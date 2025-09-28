import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Surah {
  id: number;
  name_ar: string;
  name_en: string;
  ayah_count: number;
  revelation_place: string;
}

export interface Ayah {
  id: number;
  surah_id: number;
  ayah_number: number;
  text_ar: string;
  audio_url?: string;
}

export interface Translation {
  id: number;
  ayah_id: number;
  language_code: string;
  text_translated: string;
  translator_name?: string;
}

export interface Reciter {
  id: number;
  name: string;
  name_ar: string | null;
  identifier: string;
  language_code: string;
  created_at: string | null;
}

export interface AyahWithTranslation extends Ayah {
  translation?: Translation;
}

export function useSurahs() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSurahs() {
      try {
        const { data, error } = await supabase
          .from('surahs')
          .select('*')
          .order('id');

        if (error) throw error;
        setSurahs(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch surahs');
      } finally {
        setLoading(false);
      }
    }

    fetchSurahs();
  }, []);

  return { surahs, loading, error };
}

export function useSurahWithAyahs(surahId: number | null, languageCode: string = 'en', translatorName: string = 'Hilali & Khan', reciterId: number = 1) {
  const [ayahs, setAyahs] = useState<AyahWithTranslation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!surahId) {
      setAyahs([]);
      return;
    }

    async function fetchAyahs() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('ayahs')
          .select(`
            *,
            translations!inner(
              id,
              language_code,
              text_translated,
              translator_name
            )
          `)
          .eq('surah_id', surahId)
          .eq('translations.language_code', languageCode)
          .eq('translations.translator_name', translatorName)
          .order('ayah_number');

        if (error) throw error;

        const ayahsWithTranslations: AyahWithTranslation[] = (data || []).map(ayah => ({
          id: ayah.id,
          surah_id: ayah.surah_id,
          ayah_number: ayah.ayah_number,
          text_ar: ayah.text_ar,
          audio_url: ayah.audio_url,
          translation: ayah.translations?.[0] ? {
            id: ayah.translations[0].id,
            ayah_id: ayah.id,
            language_code: ayah.translations[0].language_code,
            text_translated: ayah.translations[0].text_translated,
            translator_name: ayah.translations[0].translator_name
          } : undefined
        }));

        setAyahs(ayahsWithTranslations);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch ayahs');
      } finally {
        setLoading(false);
      }
    }

    fetchAyahs();
  }, [surahId, languageCode, translatorName, reciterId]);

  return { ayahs, loading, error };
}

export function useReciters() {
  // Hardcoded reciters for now
  const reciters: Reciter[] = [
    {
      id: 1,
      name: "Abdul Rahman Al-Sudais",
      name_ar: "عبد الرحمن السديس",
      identifier: "abdurrahmaansudais",
      language_code: "ar",
      created_at: null
    },
    {
      id: 2,
      name: "Mishari Rashid Al-Afasy",
      name_ar: "مشاري راشد العفاسي",
      identifier: "alafasy",
      language_code: "ar",
      created_at: null
    }
  ];

  return { reciters, loading: false, error: null };
}