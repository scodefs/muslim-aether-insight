import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Copy, Play } from "lucide-react";
import { toast } from "sonner";
import { useSurahWithAyahs, useSurahs, AyahWithTranslation } from "@/hooks/useQuranData";
import { BottomAudioPlayer } from "./BottomAudioPlayer";
import { useState } from "react";

interface VerseDisplayProps {
  surahId: number | null;
  selectedVerse: number | null;
  translatorName?: string;
}

export function VerseDisplay({ surahId, selectedVerse, translatorName = "Hilali & Khan" }: VerseDisplayProps) {
  const { surahs } = useSurahs();
  const { ayahs, loading, error } = useSurahWithAyahs(surahId, 'en', translatorName);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(null);
  const [showBottomPlayer, setShowBottomPlayer] = useState(false);
  
  const surah = surahId ? surahs.find(s => s.id === surahId) : null;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Verse copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  if (!surah) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <div className="p-4 bg-muted/20 rounded-lg inline-block">
            <div className="text-4xl mb-2">📖</div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Select a Surah</h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              Choose a Surah from the dropdown above to begin reading the Quran
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading verses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-xl">⚠️</div>
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  const versesToDisplay = selectedVerse 
    ? ayahs.filter(ayah => ayah.ayah_number === selectedVerse)
    : ayahs;

  const handlePlayVerse = (index: number) => {
    setCurrentPlayingIndex(index);
    setShowBottomPlayer(true);
  };

  const handleNext = () => {
    const nextIndex = currentPlayingIndex !== null ? currentPlayingIndex + 1 : 0;
    if (nextIndex < versesToDisplay.length) {
      setCurrentPlayingIndex(nextIndex);
    } else {
      setCurrentPlayingIndex(null);
      setShowBottomPlayer(false);
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentPlayingIndex !== null ? currentPlayingIndex - 1 : 0;
    if (prevIndex >= 0) {
      setCurrentPlayingIndex(prevIndex);
    }
  };

  const handleRepeat = () => {
    // Keep the current index, the bottom player will handle restarting
  };

  const handleClosePlayer = () => {
    setShowBottomPlayer(false);
    setCurrentPlayingIndex(null);
  };

  const currentVerse = currentPlayingIndex !== null ? versesToDisplay[currentPlayingIndex] : null;

  return (
    <>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-4xl mx-auto">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-2xl font-bold">
              {surah.name_en} ({surah.name_ar})
            </h2>
            {selectedVerse && (
              <p className="text-muted-foreground">Verse {selectedVerse}</p>
            )}
          </div>

          <div className="space-y-4">
            {versesToDisplay.map((ayah, index) => (
              <VerseCard
                key={ayah.id}
                ayah={ayah}
                surah={surah}
                onCopy={copyToClipboard}
                index={index}
                isCurrentlyPlaying={currentPlayingIndex === index}
                onPlay={() => handlePlayVerse(index)}
              />
            ))}
          </div>
        </div>
      </ScrollArea>

      {showBottomPlayer && (
        <BottomAudioPlayer
          currentVerse={currentVerse}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onRepeat={handleRepeat}
          onClose={handleClosePlayer}
        />
      )}
    </>
  );
}

interface VerseCardProps {
  ayah: AyahWithTranslation;
  surah: { id: number; name_en: string; name_ar: string };
  onCopy: (text: string) => void;
  index: number;
  isCurrentlyPlaying: boolean;
  onPlay: () => void;
}

function VerseCard({ ayah, surah, onCopy, index, isCurrentlyPlaying, onPlay }: VerseCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow animate-fade-in relative">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary">{ayah.ayah_number}</span>
          </div>
          
          <div className="flex-1 space-y-3">
            <p 
              className="leading-relaxed text-right text-xl font-medium"
              dir="rtl"
            >
              {ayah.text_ar}
            </p>
            
            <div className="space-y-2">
              <p 
                className="text-sm text-muted-foreground leading-relaxed"
                dir="ltr"
              >
                {ayah.translation?.text_translated}
              </p>
              
              {ayah.translation?.translator_name && (
                <p className="text-xs text-muted-foreground/70 italic">
                  — {ayah.translation.translator_name}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="absolute bottom-3 right-3 flex items-center gap-1">
          {ayah.audio_url && (
            <Button
              variant="ghost"
              size="icon"
              className={`h-6 w-6 transition-all ${
                isCurrentlyPlaying 
                  ? 'text-primary bg-primary/10' 
                  : 'opacity-60 hover:opacity-100'
              }`}
              onClick={onPlay}
            >
              <Play className="h-3 w-3" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 opacity-60 hover:opacity-100 transition-opacity"
            onClick={() => {
              onCopy(`${ayah.text_ar}\n\n${ayah.ayah_number}. ${ayah.translation?.text_translated || ''}\n\n(${surah.name_en} ${surah.id}:${ayah.ayah_number})`);
            }}
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}