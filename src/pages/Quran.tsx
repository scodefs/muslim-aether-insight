import { useState } from "react";
import { SurahSelector } from "@/components/quran/SurahSelector";
import { VerseSelector } from "@/components/quran/VerseSelector";

import { VerseDisplay } from "@/components/quran/VerseDisplay";
import { quranData } from "@/data/quranData";

export default function Quran() {
  const [selectedSurah, setSelectedSurah] = useState<string>("");
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  

  const handleSurahChange = (surahId: string) => {
    setSelectedSurah(surahId);
    setSelectedVerse(null); // Reset verse selection when surah changes
  };

  const currentSurah = selectedSurah ? quranData.surahs.find(s => s.id === selectedSurah) : null;

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Quran</h1>
            <p className="text-muted-foreground">
              Read and reflect upon the holy Quran
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1 w-full sm:w-auto">
              <SurahSelector
                selectedSurah={selectedSurah}
                onSurahChange={handleSurahChange}
              />
            </div>
            
            {selectedSurah && currentSurah && (
              <div className="w-full sm:w-auto">
                <VerseSelector
                  totalVerses={currentSurah.verses.length}
                  selectedVerse={selectedVerse}
                  onVerseChange={setSelectedVerse}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <VerseDisplay
          surah={currentSurah}
          selectedVerse={selectedVerse}
        />
      </div>
    </div>
  );
}