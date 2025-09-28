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
    for (let surahIndex = 0; surahIndex < arabicData.length; surahIndex++) {
      const surah = arabicData[surahIndex]
      const sahihSurah = sahihData.data.surahs[surahIndex]
      const hilaliSurah = hilaliData.data.surahs[surahIndex]
      const sudaisSurah = sudaisData.data.surahs[surahIndex]
      const afasySurah = afasyData.data.surahs[surahIndex]
      
      console.log(`Processing Surah ${surah.id}: ${surah.name}`)
      console.log(`Al-Sudais ayahs available: ${sudaisSurah?.ayahs?.length || 0}`)
      console.log(`Al-Afasy ayahs available: ${afasySurah?.ayahs?.length || 0}`)

      // Insert ayahs for both reciters
      const sudaisAyahsToInsert = surah.verses.map((verse: any, index: number) => ({
        surah_id: surah.id,
        ayah_number: verse.id,
        text_ar: verse.text,
        audio_url: sudaisSurah?.ayahs?.[index]?.audio || null,
        reciter_id: 1 // Al-Sudais
      }))

      const afasyAyahs = surah.verses.map((verse: any, index: number) => ({
        surah_id: surah.id,
        ayah_number: verse.id,
        text_ar: verse.text,
        audio_url: afasySurah?.ayahs?.[index]?.audio || null,
        reciter_id: 2 // Al-Afasy
      }))

      const allAyahs = [...sudaisAyahsToInsert, ...afasyAyahs]
      console.log(`Total ayahs to insert: ${allAyahs.length} (${sudaisAyahsToInsert.length} Al-Sudais + ${afasyAyahs.length} Al-Afasy)`)

      const { data: insertedAyahs, error: ayahError } = await supabase
        .from('ayahs')
        .upsert(allAyahs, { 
          onConflict: 'surah_id,ayah_number,reciter_id',
          ignoreDuplicates: false 
        })
        .select('id, ayah_number, reciter_id')

      if (ayahError) {
        console.error(`Error inserting ayahs for surah ${surah.id}:`, ayahError)
        console.error('Error details:', JSON.stringify(ayahError, null, 2))
        continue
      }

      console.log(`Inserted ${insertedAyahs.length} ayahs for Surah ${surah.id}`)

      // Insert translations for each ayah - both Sahih International and Hilali & Khan
      // Only create translations for Al-Sudais ayahs to avoid duplication
      const sudaisAyahs = insertedAyahs.filter((ayah: any) => ayah.reciter_id === 1)
      console.log(`Found ${sudaisAyahs.length} Al-Sudais ayahs for translations`)
      
      const allTranslationsToInsert = []
      
      // Sahih International translations
      const sahihTranslations = sudaisAyahs.map((ayah: any, index: number) => {
        const sahihVerse = sahihSurah?.ayahs?.[index]
        return {
          ayah_id: ayah.id,
          language_code: 'en',
          text_translated: sahihVerse?.text || '',
          translator_name: 'Sahih International'
        }
      }).filter((t: any) => t.text_translated)
      
      // Hilali & Khan translations  
      const hilaliTranslations = sudaisAyahs.map((ayah: any, index: number) => {
        const hilaliVerse = hilaliSurah?.ayahs?.[index]
        return {
          ayah_id: ayah.id,
          language_code: 'en',
          text_translated: hilaliVerse?.text || '',
          translator_name: 'Hilali & Khan'
        }
      }).filter((t: any) => t.text_translated)
      
      allTranslationsToInsert.push(...sahihTranslations, ...hilaliTranslations)

      if (allTranslationsToInsert.length > 0) {
        // Insert translations in batches, handling conflicts properly
        const sahihBatch = allTranslationsToInsert.filter((t: any) => t.translator_name === 'Sahih International');
        const hilaliBatch = allTranslationsToInsert.filter((t: any) => t.translator_name === 'Hilali & Khan');
        
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