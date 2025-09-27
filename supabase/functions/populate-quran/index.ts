import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Download complete Quran data
    console.log('Fetching complete Quran data...')
    
    // Fetch Arabic text from the JSON we know is working
    const arabicResponse = await fetch('https://raw.githubusercontent.com/risan/quran-json/main/dist/quran.json')
    const arabicData = await arabicResponse.json()
    
    // Fetch English translations
    const englishResponse = await fetch('https://api.alquran.cloud/v1/quran/en.sahih')
    const englishData = await englishResponse.json()

    console.log(`Processing ${arabicData.length} surahs...`)

    // Process each Surah
    for (let surahIndex = 0; surahIndex < arabicData.length; surahIndex++) {
      const surah = arabicData[surahIndex]
      const englishSurah = englishData.data.surahs[surahIndex]
      
      console.log(`Processing Surah ${surah.id}: ${surah.name}`)

      // Insert all ayahs for this surah
      const ayahsToInsert = surah.verses.map((verse: any) => ({
        surah_id: surah.id,
        ayah_number: verse.id,
        text_ar: verse.text
      }))

      const { data: insertedAyahs, error: ayahError } = await supabase
        .from('ayahs')
        .insert(ayahsToInsert)
        .select('id, ayah_number')

      if (ayahError) {
        console.error(`Error inserting ayahs for surah ${surah.id}:`, ayahError)
        continue
      }

      console.log(`Inserted ${insertedAyahs.length} ayahs for Surah ${surah.id}`)

      // Insert translations for each ayah
      const translationsToInsert = insertedAyahs.map((ayah: any, index: number) => {
        const englishVerse = englishSurah?.ayahs?.[index]
        return {
          ayah_id: ayah.id,
          language_code: 'en',
          text_translated: englishVerse?.text || '',
          translator_name: 'Sahih International'
        }
      }).filter(t => t.text_translated) // Only insert if translation exists

      if (translationsToInsert.length > 0) {
        const { error: translationError } = await supabase
          .from('translations')
          .insert(translationsToInsert)

        if (translationError) {
          console.error(`Error inserting translations for surah ${surah.id}:`, translationError)
        } else {
          console.log(`Inserted ${translationsToInsert.length} translations for Surah ${surah.id}`)
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Complete Quran data populated successfully',
        totalSurahs: arabicData.length
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error populating Quran data:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to populate Quran data', 
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})