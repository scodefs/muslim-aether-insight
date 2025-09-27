// Script to generate SQL for complete Quran population
// This script processes the downloaded JSON files and outputs SQL

import fs from 'fs';
import path from 'path';

// Read the JSON files
const arabicData = JSON.parse(fs.readFileSync('temp/quran-complete.json', 'utf8'));
const englishData = JSON.parse(fs.readFileSync('temp/quran-english-sahih.json', 'utf8'));

console.log('Generating SQL for complete Quran...');

let ayahInsertSQL = '';
let translationInsertSQL = '';
let ayahIdCounter = 1;

// Process each Surah
for (let surahIndex = 0; surahIndex < arabicData.length; surahIndex++) {
  const surah = arabicData[surahIndex];
  const englishSurah = englishData.data.surahs[surahIndex];
  
  console.log(`Processing Surah ${surah.id}: ${surah.name} (${surah.verses.length} verses)`);

  // Generate INSERT statements for ayahs
  for (let verseIndex = 0; verseIndex < surah.verses.length; verseIndex++) {
    const verse = surah.verses[verseIndex];
    const englishVerse = englishSurah?.ayahs?.[verseIndex];
    
    // Escape single quotes in Arabic text
    const escapedText = verse.text.replace(/'/g, "''");
    
    ayahInsertSQL += `(${surah.id}, ${verse.id}, '${escapedText}'),\n`;
    
    // Add translation if available
    if (englishVerse) {
      const escapedTranslation = englishVerse.text.replace(/'/g, "''");
      translationInsertSQL += `(${ayahIdCounter}, 'en', '${escapedTranslation}', 'Sahih International'),\n`;
    }
    
    ayahIdCounter++;
  }
}

// Remove trailing commas
ayahInsertSQL = ayahInsertSQL.slice(0, -2) + ';';
translationInsertSQL = translationInsertSQL.slice(0, -2) + ';';

// Generate complete SQL migration
const completeMigration = `-- Complete Quran Data Population
-- This migration includes all 6,236 verses and their English translations

-- Insert all Ayahs
INSERT INTO public.ayahs (surah_id, ayah_number, text_ar) VALUES
${ayahInsertSQL}

-- Insert all English translations
-- Note: ayah_id references will be sequential from 1 to 6236
INSERT INTO public.translations (ayah_id, language_code, text_translated, translator_name) VALUES
${translationInsertSQL}
`;

// Write to file
fs.writeFileSync('scripts/complete-quran-data.sql', completeMigration);
console.log(`Generated SQL file with ${ayahIdCounter - 1} verses`);
console.log('SQL file saved as: scripts/complete-quran-data.sql');