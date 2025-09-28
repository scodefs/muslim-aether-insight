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
    
    // Fetch English translations and audio data from both reciters
    const [sahihResponse, hilaliResponse, sudaisResponse, afasyResponse] = await Promise.all([
      fetch('https://api.alquran.cloud/v1/quran/en.sahih'),
      fetch('https://api.alquran.cloud/v1/quran/en.hilali'),
      fetch('https://api.alquran.cloud/v1/quran/ar.abdurrahmaansudais'), // Abdul Rahman Al-Sudais audio
      fetch('https://api.alquran.cloud/v1/quran/ar.alafasy') // Mishari Rashid Al-Afasy audio
    ])
    
    const sahihData = await sahihResponse.json()
    const hilaliData = await hilaliResponse.json()
    const sudaisData = await sudaisResponse.json()
    const afasyData = await afasyResponse.json()

    console.log(`Processing ${arabicData.length} surahs...`)

    // Process each Surah
    for (let surahIndex = 0; surahIndex < Math.min(arabicData.length, 5); surahIndex++) { // Start with first 5 surahs for testing
      const surah = arabicData[surahIndex]
      const sahihSurah = sahihData.data.surahs[surahIndex]
      const hilaliSurah = hilaliData.data.surahs[surahIndex]
      const sudaisSurah = sudaisData.data.surahs[surahIndex]
      const afasySurah = afasyData.data.surahs[surahIndex]
      
      console.log(`Processing Surah ${surah.id}: ${surah.name}`)
      console.log(`Al-Sudais ayahs available: ${sudaisSurah?.ayahs?.length || 0}`)
      console.log(`Al-Afasy ayahs available: ${afasySurah?.ayahs?.length || 0}`)

      // First, ensure Al-Sudais ayahs exist (these should already be there)
      // Then add Al-Afasy ayahs
      const afasyAyahs = surah.verses.map((verse: any, index: number) => ({
        surah_id: surah.id,
        ayah_number: verse.id,
        text_ar: verse.text,
        audio_url: afasySurah?.ayahs?.[index]?.audio || null,
        reciter_id: 2 // Al-Afasy
      }))

      console.log(`Inserting ${afasyAyahs.length} Al-Afasy ayahs for Surah ${surah.id}`)

      // Insert only Al-Afasy ayahs (Al-Sudais already exist)
      const { data: insertedAyahs, error: ayahError } = await supabase
        .from('ayahs')
        .insert(afasyAyahs)
        .select('id, ayah_number, reciter_id')

      if (ayahError) {
        console.error(`Error inserting Al-Afasy ayahs for surah ${surah.id}:`, ayahError)
        console.error('Error details:', JSON.stringify(ayahError, null, 2))
        // Continue with next surah instead of failing completely
        continue
      }

      console.log(`Successfully inserted ${insertedAyahs?.length || 0} Al-Afasy ayahs for Surah ${surah.id}`)
    }

    // Count final results
    const { data: finalCount, error: countError } = await supabase
      .from('ayahs')
      .select('reciter_id', { count: 'exact' })

    if (!countError && finalCount) {
      console.log(`Final ayah count: ${finalCount.length}`)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Complete Quran data populated successfully',
        totalSurahs: arabicData.length,
        debug: 'Check edge function logs for detailed processing information'
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