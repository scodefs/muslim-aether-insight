import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface QuranWord {
  id: number;
  surah_id: number;
  ayah_number: number;
  word_position: number;
  location: string;
  text_uthmani: string;
}

export function useQuranWords(surahId: number | null, ayahNumber: number | null) {
  return useQuery({
    queryKey: ['quran-words', surahId, ayahNumber],
    queryFn: async () => {
      if (!surahId || !ayahNumber) return [];

      const { data, error } = await supabase
        .from('quran_words')
        .select('*')
        .eq('surah_id', surahId)
        .eq('ayah_number', ayahNumber)
        .order('word_position', { ascending: true });

      if (error) throw error;
      return data as QuranWord[];
    },
    enabled: !!surahId && !!ayahNumber,
  });
}
