import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Copy, Play, Pause } from "lucide-react";
import { toast } from "sonner";
import { useSurahWithAyahs, useSurahs, AyahWithTranslation } from "@/hooks/useQuranData";
import { BottomAudioPlayer, AudioPlayerRef } from "./BottomAudioPlayer";
import { useState, useRef, useEffect } from "react";

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
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioControlRef = useRef<AudioPlayerRef | null>(null);
  const verseRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  
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
    if (currentPlayingIndex === index) {
      // If clicking on the currently selected verse, toggle play/pause
      if (audioControlRef.current) {
        audioControlRef.current.togglePlayPause();
      }
    } else {
      // Otherwise switch to this verse and play
      setCurrentPlayingIndex(index);
      setShowBottomPlayer(true);
      setIsAudioPlaying(true);
    }
  };

  const handleNext = () => {
    const nextIndex = currentPlayingIndex !== null ? currentPlayingIndex + 1 : 0;
    if (nextIndex < versesToDisplay.length) {
      setCurrentPlayingIndex(nextIndex);
      // Scroll to the next verse
      setTimeout(() => {
        const verseElement = verseRefs.current[nextIndex];
        if (verseElement) {
          verseElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }, 100);
    } else {
      setCurrentPlayingIndex(null);
      setShowBottomPlayer(false);
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentPlayingIndex !== null ? currentPlayingIndex - 1 : 0;
    if (prevIndex >= 0) {
      setCurrentPlayingIndex(prevIndex);
      // Scroll to the previous verse
      setTimeout(() => {
        const verseElement = verseRefs.current[prevIndex];
        if (verseElement) {
          verseElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }, 100);
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
      <ScrollArea className="flex-1 p-3 sm:p-4 lg:p-6">
        <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto">
          {/* Surah Header - Mobile Optimized */}
          <div className="text-center space-y-1 sm:space-y-2 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
              <span className="block sm:inline">{surah.name_en}</span>
              <span className="block sm:inline text-lg sm:text-2xl lg:text-3xl mt-1 sm:mt-0 sm:ml-2">
                ({surah.name_ar})
              </span>
            </h2>
            {selectedVerse && (
              <p className="text-sm sm:text-base text-muted-foreground">
                Verse {selectedVerse}
              </p>
            )}
          </div>

          {/* Verses Container */}
          <div className="space-y-3 sm:space-y-4">
            {versesToDisplay.map((ayah, index) => (
              <div
                key={ayah.id}
                ref={el => verseRefs.current[index] = el}
              >
                <VerseCard
                  ayah={ayah}
                  surah={surah}
                  onCopy={copyToClipboard}
                  index={index}
                  isCurrentlyPlaying={currentPlayingIndex === index}
                  isAudioPlaying={isAudioPlaying}
                  onPlay={() => handlePlayVerse(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>

      {showBottomPlayer && (
        <BottomAudioPlayer
          ref={audioControlRef}
          currentVerse={currentVerse}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onRepeat={handleRepeat}
          onClose={handleClosePlayer}
          onPlayingStateChange={setIsAudioPlaying}
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
  isAudioPlaying: boolean;
  onPlay: () => void;
}

function VerseCard({ ayah, surah, onCopy, index, isCurrentlyPlaying, isAudioPlaying, onPlay }: VerseCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow animate-fade-in relative overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Verse Number Badge */}
          <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-xs sm:text-sm font-medium text-primary">{ayah.ayah_number}</span>
          </div>
          
          {/* Verse Content */}
          <div className="flex-1 space-y-3 min-w-0">
            {/* Arabic Text - Mobile Optimized */}
            <p 
              className="leading-relaxed text-right text-lg sm:text-xl lg:text-2xl font-medium break-words"
              dir="rtl"
            >
              {ayah.text_ar}
            </p>
            
            {/* Translation Section */}
            <div className="space-y-2">
              <p 
                className="text-sm sm:text-base text-muted-foreground leading-relaxed break-words"
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

        {/* Action Buttons - Mobile Optimized */}
        <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex items-center gap-1">
          {ayah.audio_url && (
            <Button
              variant="ghost"
              size="icon"
              className={`h-7 w-7 sm:h-8 sm:w-8 transition-all ${
                isCurrentlyPlaying 
                  ? 'text-primary bg-primary/10' 
                  : 'opacity-60 hover:opacity-100'
              }`}
              onClick={onPlay}
            >
              {isCurrentlyPlaying && isAudioPlaying ? (
                <Pause className="h-3 w-3 sm:h-4 sm:w-4" />
              ) : (
                <Play className="h-3 w-3 sm:h-4 sm:w-4" />
              )}
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 sm:h-8 sm:w-8 opacity-60 hover:opacity-100 transition-opacity"
            onClick={() => {
              onCopy(`${ayah.text_ar}\n\n${ayah.ayah_number}. ${ayah.translation?.text_translated || ''}\n\n(${surah.name_en} ${surah.id}:${ayah.ayah_number})`);
            }}
          >
            <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}