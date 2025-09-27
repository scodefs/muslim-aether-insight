import { useState } from "react";
import { SurahSelector } from "@/components/quran/SurahSelector";
import { VerseSelector } from "@/components/quran/VerseSelector";
import { VerseDisplay } from "@/components/quran/VerseDisplay";
import { QuranDataLoader } from "@/components/quran/QuranDataLoader";
import { useSurahs } from "@/hooks/useQuranData";

export default function Quran() {
  const [selectedSurahId, setSelectedSurahId] = useState<number | null>(1); // Default to Al-Fatihah
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const { surahs, loading } = useSurahs();

  const handleSurahChange = (surahId: number) => {
    setSelectedSurahId(surahId);
    setSelectedVerse(null); // Reset verse selection when surah changes
  };

  const currentSurah = selectedSurahId ? surahs.find(s => s.id === selectedSurahId) : null;

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight">Quran</h1>
              <p className="text-muted-foreground">
                Read and reflect upon the holy Quran
              </p>
            </div>
            <QuranDataLoader />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1 w-full sm:w-auto">
              <SurahSelector
                selectedSurah={selectedSurahId}
                onSurahChange={handleSurahChange}
                surahs={surahs}
                loading={loading}
              />
            </div>
            
            {selectedSurahId && currentSurah && (
              <>
                <div className="hidden sm:block w-px h-6 bg-border"></div>
                <div className="w-full sm:w-auto">
                  <VerseSelector
                    totalVerses={currentSurah.ayah_count}
                    selectedVerse={selectedVerse}
                    onVerseChange={setSelectedVerse}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <VerseDisplay
          surahId={selectedSurahId}
          selectedVerse={selectedVerse}
        />
      </div>
    </div>
  );
}