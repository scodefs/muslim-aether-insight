-- Update unique constraint to allow multiple translators per language
ALTER TABLE translations DROP CONSTRAINT IF EXISTS translations_ayah_lang_unique;
ALTER TABLE translations ADD CONSTRAINT translations_ayah_lang_translator_unique UNIQUE (ayah_id, language_code, translator_name);