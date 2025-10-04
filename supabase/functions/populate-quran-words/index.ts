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

    console.log('Fetching Quran word-by-word data from API...')
    
    const qpcData: Record<string, any> = {}
    let wordIdCounter = 1
    
    // Fetch word-by-word data for all 114 surahs
    for (let surahId = 1; surahId <= 114; surahId++) {
      console.log(`Fetching Surah ${surahId}/114...`)
      
      const response = await fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${surahId}`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch Surah ${surahId}: ${response.statusText}`)
      }
      
      const data = await response.json()
      
      data.verses.forEach((verse: any) => {
        const words = verse.text_uthmani.split(' ')
        words.forEach((word: string, index: number) => {
          const location = `${surahId}:${verse.verse_number}:${index + 1}`
          qpcData[location] = {
            id: wordIdCounter++,
            surah: surahId,
            ayah: verse.verse_number,
            word: index + 1,
            location: location,
            text: word
          }
        })
      })
    }
    
    console.log(`Processing word-by-word data for ${Object.keys(qpcData).length} entries...`)

    // Process in batches to avoid memory issues
    const batchSize = 500
    const entries = Object.entries(qpcData)
    const totalEntries = entries.length
    let processedCount = 0

    for (let i = 0; i < totalEntries; i += batchSize) {
      const batch = entries.slice(i, i + batchSize)
      
      const wordsToInsert = batch.map(([location, data]: [string, any]) => {
        const [surahId, ayahNumber, wordPosition] = location.split(':').map(Number)
        
        return {
          id: data.id,
          surah_id: surahId,
          ayah_number: ayahNumber,
          word_position: wordPosition,
          location: location,
          text_uthmani: data.text
        }
      })

      const { error } = await supabase
        .from('quran_words')
        .upsert(wordsToInsert, { 
          onConflict: 'surah_id,ayah_number,word_position',
          ignoreDuplicates: false 
        })

      if (error) {
        console.error(`Error inserting batch starting at ${i}:`, error)
        throw error
      }

      processedCount += wordsToInsert.length
      console.log(`Processed ${processedCount}/${totalEntries} words (${Math.round(processedCount/totalEntries*100)}%)`)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'QPC V4 word-by-word Quran data populated successfully',
        totalWords: processedCount
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error populating QPC word data:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to populate QPC word data', 
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
