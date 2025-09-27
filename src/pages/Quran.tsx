import { useState } from "react";
import { SurahSelector } from "@/components/quran/SurahSelector";
import { VerseSelector } from "@/components/quran/VerseSelector";
import { VerseDisplay } from "@/components/quran/VerseDisplay";
import { QuranDataLoader } from "@/components/quran/QuranDataLoader";
import { AudioDataLoader } from "@/components/quran/AudioDataLoader";
import { TranslationSelector } from "@/components/quran/TranslationSelector";
import { useSurahs } from "@/hooks/useQuranData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Quran() {
  const [selectedSurahId, setSelectedSurahId] = useState<number | null>(1); // Default to Al-Fatihah
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [selectedTranslator, setSelectedTranslator] = useState<string>("Hilali & Khan");
  const { surahs, loading } = useSurahs();

  const handleSurahChange = (surahId: number) => {
    setSelectedSurahId(surahId);
    setSelectedVerse(null); // Reset verse selection when surah changes
  };

  const currentSurah = selectedSurahId ? surahs.find(s => s.id === selectedSurahId) : null;

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header Section - Mobile First */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Title and Data Loaders */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Quran</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Read and reflect upon the holy Quran
              </p>
            </div>
            
            {/* Data Loaders - Hidden on mobile, visible on tablet+ */}
            <div className="hidden md:flex gap-2">
              <Tabs defaultValue="text" className="w-auto">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="text" className="text-xs">Text Data</TabsTrigger>
                  <TabsTrigger value="audio" className="text-xs">Audio Data</TabsTrigger>
                </TabsList>
                <TabsContent value="text" className="mt-2">
                  <QuranDataLoader />
                </TabsContent>
                <TabsContent value="audio" className="mt-2">
                  <AudioDataLoader />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Controls Section - Mobile First Layout */}
          <div className="space-y-3 sm:space-y-0">
            {/* Surah Selector - Full width on mobile */}
            <div className="w-full">
              <SurahSelector
                selectedSurah={selectedSurahId}
                onSurahChange={handleSurahChange}
                surahs={surahs}
                loading={loading}
              />
            </div>
            
            {/* Secondary Controls - Always stacked vertically */}
            {selectedSurahId && currentSurah && (
              <div className="flex flex-col gap-3">
                <div className="w-full">
                  <VerseSelector
                    totalVerses={currentSurah.ayah_count}
                    selectedVerse={selectedVerse}
                    onVerseChange={setSelectedVerse}
                  />
                </div>
                
                <div className="w-full">
                  <TranslationSelector
                    selectedTranslator={selectedTranslator}
                    onTranslatorChange={setSelectedTranslator}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Mobile Data Loaders - Only visible on mobile */}
          <div className="md:hidden">
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="text" className="text-xs">Text Data</TabsTrigger>
                <TabsTrigger value="audio" className="text-xs">Audio Data</TabsTrigger>
              </TabsList>
              <TabsContent value="text" className="mt-3">
                <QuranDataLoader />
              </TabsContent>
              <TabsContent value="audio" className="mt-3">
                <AudioDataLoader />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        <VerseDisplay
          surahId={selectedSurahId}
          selectedVerse={selectedVerse}
          translatorName={selectedTranslator}
        />
      </div>
    </div>
  );
}