import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Starting daily verse update...');

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    console.log('Today:', today);

    // Check if we already have a verse for today
    const { data: existingVerse, error: checkError } = await supabase
      .from('daily_verse')
      .select('*')
      .eq('date', today)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing verse:', checkError);
      throw checkError;
    }

    if (existingVerse) {
      console.log('Verse already exists for today:', existingVerse);
      return new Response(
        JSON.stringify({ 
          message: 'Verse already exists for today', 
          verse: existingVerse 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    // Get a random verse ID using the database function
    const { data: randomVerseId, error: randomError } = await supabase
      .rpc('get_random_verse');

    if (randomError) {
      console.error('Error getting random verse:', randomError);
      throw randomError;
    }

    console.log('Random verse ID:', randomVerseId);

    // Insert the new daily verse
    const { data: newVerse, error: insertError } = await supabase
      .from('daily_verse')
      .insert({ ayah_id: randomVerseId as number, date: today })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting new verse:', insertError);
      throw insertError;
    }

    console.log('Successfully created new daily verse:', newVerse);

    return new Response(
      JSON.stringify({ 
        message: 'Daily verse updated successfully', 
        verse: newVerse 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in update-daily-verse function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to update daily verse', 
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});