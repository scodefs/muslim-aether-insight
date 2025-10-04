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

    console.log('Loading QPC V4 word-by-word Quran data from your uploaded file...')
    
    // Fetch the QPC V4 JSON data from Supabase storage bucket
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const qpcDataUrl = `${supabaseUrl}/storage/v1/object/public/quran-data/qpc-v4.json`
    
    console.log(`Fetching from: ${qpcDataUrl}`)
    const response = await fetch(qpcDataUrl)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch QPC V4 data: ${response.statusText}`)
    }

    const qpcData = await response.json()
    console.log(`Processing word-by-word data for ${Object.keys(qpcData).length} entries...`)

    // Process in batches to avoid memory issues
    const batchSize = 500
    const entries = Object.entries(qpcData)
    const totalEntries = entries.length
    let processedCount = 0

    for (let i = 0; i < totalEntries; i += batchSize) {
      const batch = entries.slice(i, i + batchSize)
      
      const wordsToInsert = batch.map(([location, data]: [string, any]) => {
        // Parse location string (e.g., "1:1:1" -> surah:1, ayah:1, word:1)
        const [surahId, ayahNumber, wordPosition] = location.split(':').map(Number)
        
        return {
          id: parseInt(data.id),
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
