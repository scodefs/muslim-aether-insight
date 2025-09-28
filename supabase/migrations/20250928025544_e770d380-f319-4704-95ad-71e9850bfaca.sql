-- Fix security warning by setting search_path for the function
CREATE OR REPLACE FUNCTION public.get_random_verse()
RETURNS INTEGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    random_ayah_id INTEGER;
BEGIN
    SELECT id INTO random_ayah_id
    FROM public.ayahs
    ORDER BY RANDOM()
    LIMIT 1;
    
    RETURN random_ayah_id;
END;
$$;