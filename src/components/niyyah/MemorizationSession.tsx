import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shuffle, RotateCcw } from 'lucide-react';
import { useSurahWithAyahs, useSurahs } from '@/hooks/useQuranData';
import { MemorizationCard } from './MemorizationCard';
import { NavigationControls } from './NavigationControls';
import { EncouragementModal } from './EncouragementModal';
import { useMemorizationProgress } from '@/hooks/useMemorizationProgress';

interface MemorizationSessionProps {
  surahId: number;
  onBack: () => void;
}

export function MemorizationSession({ surahId, onBack }: MemorizationSessionProps) {
  const { surahs } = useSurahs();
  const { ayahs, loading } = useSurahWithAyahs(surahId);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [verseOrder, setVerseOrder] = useState<number[]>([]);
  const { markVerseMemorized, getProgress } = useMemorizationProgress();

  const currentSurah = surahs.find(s => s.id === surahId);
  const currentVerse = verseOrder.length > 0 && ayahs.length > 0 
    ? ayahs[verseOrder[currentVerseIndex]] 
    : null;

  useEffect(() => {
    if (ayahs.length > 0) {
      setVerseOrder(ayahs.map((_, index) => index));
    }
  }, [ayahs]);

  const handleSurahCompleted = () => {
    if (currentVerse) {
      markVerseMemorized(surahId, currentVerse.ayah_number);
      setShowEncouragement(true);
    }
  };

  const handleNextVerse = () => {
    if (currentVerseIndex < verseOrder.length - 1) {
      setCurrentVerseIndex(prev => prev + 1);
    }
  };

  const handlePreviousVerse = () => {
    if (currentVerseIndex > 0) {
      setCurrentVerseIndex(prev => prev - 1);
    }
  };

  const shuffleVerses = () => {
    const shuffled = [...verseOrder].sort(() => Math.random() - 0.5);
    setVerseOrder(shuffled);
    setCurrentVerseIndex(0);
  };

  const resetOrder = () => {
    setVerseOrder(ayahs.map((_, index) => index));
    setCurrentVerseIndex(0);
  };

  if (loading || !currentVerse || !currentSurah) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-muted-foreground">Loading verses...</p>
        </div>
      </div>
    );
  }

  const progress = getProgress(surahId);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Surahs
        </Button>
        
        <div className="text-center">
          <h2 className="text-xl font-semibold">{currentSurah.name_en}</h2>
          <p className="text-lg font-arabic" dir="rtl">{currentSurah.name_ar}</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={shuffleVerses}>
            <Shuffle className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={resetOrder}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Progress */}
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Verse {currentVerseIndex + 1} of {ayahs.length}
        </p>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentVerseIndex + 1) / ayahs.length) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {progress.memorizedVerses} verses memorized in this Surah
        </p>
      </div>

      {/* Memorization Card */}
      <MemorizationCard 
        verse={currentVerse}
        verseNumber={currentVerseIndex + 1}
        isLastVerse={currentVerseIndex === verseOrder.length - 1}
        onCompleted={handleSurahCompleted}
      />

      {/* Navigation */}
      <NavigationControls
        onPrevious={handlePreviousVerse}
        onNext={handleNextVerse}
        canGoPrevious={currentVerseIndex > 0}
        canGoNext={currentVerseIndex < verseOrder.length - 1}
      />

      {/* Encouragement Modal */}
      <EncouragementModal
        isOpen={showEncouragement}
        onClose={() => setShowEncouragement(false)}
        onNext={handleNextVerse}
        canGoNext={currentVerseIndex < verseOrder.length - 1}
      />
    </div>
  );
}