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

    console.log('Starting minimal Al-Afasy test...')

    // Test the Al-Afasy API first
    console.log('Fetching Al-Afasy data...')
    const afasyResponse = await fetch('https://api.alquran.cloud/v1/quran/ar.alafasy')
    const afasyData = await afasyResponse.json()
    
    console.log('Al-Afasy API response status:', afasyResponse.status)
    console.log('First surah has ayahs:', afasyData?.data?.surahs?.[0]?.ayahs?.length || 0)

    if (!afasyData?.data?.surahs?.[0]?.ayahs?.[0]?.audio) {
      throw new Error('No audio URL found in Al-Afasy API response')
    }

    // Try to insert just one Al-Afasy ayah (Surah 1, Ayah 1)
    const testAyah = {
      surah_id: 1,
      ayah_number: 8, // Use ayah 8 to avoid conflict with existing ayah 1
      text_ar: 'TEST - مِّنَ ٱلْجِنَّةِ وَٱلنَّاسِ',
      audio_url: afasyData.data.surahs[0].ayahs[0].audio,
      reciter_id: 2
    }

    console.log('Attempting to insert test ayah:', JSON.stringify(testAyah))

    const { data, error } = await supabase
      .from('ayahs')
      .insert([testAyah])
      .select()

    if (error) {
      console.error('Insertion error:', JSON.stringify(error, null, 2))
      throw error
    }

    console.log('SUCCESS! Inserted:', data)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Al-Afasy test ayah inserted successfully!',
        data: data,
        audioUrl: testAyah.audio_url
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in minimal test:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to insert test ayah', 
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})