-- Modify daily_verse table to use timestamp instead of date for testing
ALTER TABLE public.daily_verse 
ALTER COLUMN date TYPE text;

-- Update the column name to be more descriptive
ALTER TABLE public.daily_verse 
RENAME COLUMN date TO time_key;