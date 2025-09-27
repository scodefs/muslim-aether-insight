-- Add unique constraints for conflict resolution
ALTER TABLE ayahs ADD CONSTRAINT ayahs_surah_ayah_unique UNIQUE (surah_id, ayah_number);
ALTER TABLE translations ADD CONSTRAINT translations_ayah_lang_unique UNIQUE (ayah_id, language_code);