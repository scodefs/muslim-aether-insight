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
    
    // Fetch English translations and audio data for both reciters
    const [sahihResponse, hilaliResponse, sudaisAudioResponse, afasyAudioResponse] = await Promise.all([
      fetch('https://api.alquran.cloud/v1/quran/en.sahih'),
      fetch('https://api.alquran.cloud/v1/quran/en.hilali'),
      fetch('https://api.alquran.cloud/v1/quran/ar.abdurrahmaansudais'), // Abdul Rahman Al-Sudais audio
      fetch('https://api.alquran.cloud/v1/quran/ar.alafasy') // Mishari Rashid Al-Afasy audio
    ])
    
    const sahihData = await sahihResponse.json()
    const hilaliData = await hilaliResponse.json()
    const sudaisAudioData = await sudaisAudioResponse.json()
    const afasyAudioData = await afasyAudioResponse.json()

    // Get reciter IDs
    const { data: reciters } = await supabase
      .from('reciters')
      .select('id, identifier');
    
    const sudaisReciter = reciters?.find(r => r.identifier === 'ar.abdurrahmaansudais');
    const afasyReciter = reciters?.find(r => r.identifier === 'ar.alafasy');

    console.log(`Processing ${arabicData.length} surahs...`)

    // Process each Surah
    for (let surahIndex = 0; surahIndex < arabicData.length; surahIndex++) {
      const surah = arabicData[surahIndex]
      const sahihSurah = sahihData.data.surahs[surahIndex]
      const hilaliSurah = hilaliData.data.surahs[surahIndex]
      const sudaisAudioSurah = sudaisAudioData.data.surahs[surahIndex]
      const afasyAudioSurah = afasyAudioData.data.surahs[surahIndex]
      
      console.log(`Processing Surah ${surah.id}: ${surah.name}`)

      // Insert all ayahs for this surah for both reciters
      const sudaisAyahsToInsert = surah.verses.map((verse: any, index: number) => ({
        surah_id: surah.id,
        ayah_number: verse.id,
        text_ar: verse.text,
        audio_url: sudaisAudioSurah?.ayahs?.[index]?.audio || null,
        reciter_id: sudaisReciter?.id
      }))

      const afasyAyahsToInsert = surah.verses.map((verse: any, index: number) => ({
        surah_id: surah.id,
        ayah_number: verse.id,
        text_ar: verse.text,
        audio_url: afasyAudioSurah?.ayahs?.[index]?.audio || null,
        reciter_id: afasyReciter?.id
      }))

      // Insert Al-Sudais ayahs
      const { data: sudaisInsertedAyahs, error: sudaisAyahError } = await supabase
        .from('ayahs')
        .upsert(sudaisAyahsToInsert, { 
          onConflict: 'surah_id,ayah_number,reciter_id',
          ignoreDuplicates: false 
        })
        .select('id, ayah_number')

      if (sudaisAyahError) {
        console.error(`Error inserting Al-Sudais ayahs for surah ${surah.id}:`, sudaisAyahError)
      }

      // Insert Al-Afasy ayahs
      const { data: afasyInsertedAyahs, error: afasyAyahError } = await supabase
        .from('ayahs')
        .upsert(afasyAyahsToInsert, { 
          onConflict: 'surah_id,ayah_number,reciter_id',
          ignoreDuplicates: false 
        })
        .select('id, ayah_number')

      if (afasyAyahError) {
        console.error(`Error inserting Al-Afasy ayahs for surah ${surah.id}:`, afasyAyahError)
      }

      const insertedAyahs = [...(sudaisInsertedAyahs || []), ...(afasyInsertedAyahs || [])]
      console.log(`Inserted ${insertedAyahs.length} ayahs for Surah ${surah.id} (both reciters)`)

      // Insert translations for each ayah - both Sahih International and Hilali & Khan
      const allTranslationsToInsert = []
      
      // Sahih International translations
      const sahihTranslations = insertedAyahs.map((ayah: any, index: number) => {
        const sahihVerse = sahihSurah?.ayahs?.[index]
        return {
          ayah_id: ayah.id,
          language_code: 'en',
          text_translated: sahihVerse?.text || '',
          translator_name: 'Sahih International'
        }
      }).filter(t => t.text_translated)
      
      // Hilali & Khan translations  
      const hilaliTranslations = insertedAyahs.map((ayah: any, index: number) => {
        const hilaliVerse = hilaliSurah?.ayahs?.[index]
        return {
          ayah_id: ayah.id,
          language_code: 'en',
          text_translated: hilaliVerse?.text || '',
          translator_name: 'Hilali & Khan'
        }
      }).filter(t => t.text_translated)
      
      allTranslationsToInsert.push(...sahihTranslations, ...hilaliTranslations)

      if (allTranslationsToInsert.length > 0) {
        // Insert translations in batches, handling conflicts properly
        const sahihBatch = allTranslationsToInsert.filter(t => t.translator_name === 'Sahih International');
        const hilaliBatch = allTranslationsToInsert.filter(t => t.translator_name === 'Hilali & Khan');
        
        // Insert Sahih International translations
        if (sahihBatch.length > 0) {
          const { error: sahihError } = await supabase
            .from('translations')
            .upsert(sahihBatch, { 
              onConflict: 'ayah_id,language_code,translator_name',
              ignoreDuplicates: false 
            })

          if (sahihError) {
            console.error(`Error inserting Sahih translations for surah ${surah.id}:`, sahihError)
          }
        }
        
        // Insert Hilali & Khan translations
        if (hilaliBatch.length > 0) {
          const { error: hilaliError } = await supabase
            .from('translations')
            .upsert(hilaliBatch, { 
              onConflict: 'ayah_id,language_code,translator_name',
              ignoreDuplicates: false 
            })

          if (hilaliError) {
            console.error(`Error inserting Hilali translations for surah ${surah.id}:`, hilaliError)
          }
        }
        
        console.log(`Processed ${allTranslationsToInsert.length} translations for Surah ${surah.id}`)
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