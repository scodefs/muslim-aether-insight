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

    console.log('Testing Al-Afasy ayah insertion...')

    // Try to insert a single Al-Afasy ayah
    const testAyah = {
      surah_id: 1,
      ayah_number: 1,
      text_ar: 'بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ',
      audio_url: 'https://cdn.islamic.network/quran/audio/64/ar.alafasy/1.mp3',
      reciter_id: 2
    }

    console.log('Attempting to insert test ayah:', JSON.stringify(testAyah))

    const { data, error } = await supabase
      .from('ayahs')
      .upsert([testAyah], { 
        onConflict: 'surah_id,ayah_number,reciter_id',
        ignoreDuplicates: false 
      })
      .select()

    if (error) {
      console.error('Insertion error:', JSON.stringify(error, null, 2))
      throw error
    }

    console.log('Successfully inserted:', data)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Test Al-Afasy ayah inserted successfully',
        data: data
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in test function:', error)
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