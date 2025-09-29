import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Loader2, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Surah } from '@/hooks/useQuranData';
import { useMemorizationProgress } from '@/hooks/useMemorizationProgress';

interface SurahSelectorProps {
  surahs: Surah[];
  loading: boolean;
  onSurahSelect: (surahId: number) => void;
}

export function SurahSelector({ surahs, loading, onSurahSelect }: SurahSelectorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isSurahMemorized } = useMemorizationProgress();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Loading Surahs...</span>
      </div>
    );
  }

  if (surahs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No surahs available</p>
      </div>
    );
  }

  const currentSurah = surahs[currentIndex];
  const isMemorized = isSurahMemorized(currentSurah.id);

  const handlePrevious = () => {
    setCurrentIndex(prev => prev > 0 ? prev - 1 : surahs.length - 1);
  };

  const handleNext = () => {
    setCurrentIndex(prev => prev < surahs.length - 1 ? prev + 1 : 0);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Choose a Surah to Memorize</h2>
        <p className="text-muted-foreground">Browse through the chapters and select one to begin your memorization journey</p>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} of {surahs.length}
        </span>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Surah Card */}
      <Card 
        className={`group hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/30 ${
          isMemorized ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800' : ''
        }`}
        onClick={() => onSurahSelect(currentSurah.id)}
      >
        <CardContent className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
              isMemorized 
                ? 'bg-green-100 group-hover:bg-green-200 dark:bg-green-900 dark:group-hover:bg-green-800' 
                : 'bg-primary/10 group-hover:bg-primary/20'
            }`}>
              {isMemorized ? (
                <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
              ) : (
                <BookOpen className="h-6 w-6 text-primary" />
              )}
            </div>
            <span className="text-lg text-muted-foreground font-medium">
              {currentSurah.id}
            </span>
          </div>
          
          <div className="space-y-4 text-center">
            <h3 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {currentSurah.name_en}
            </h3>
            <p className="text-3xl text-right font-arabic text-foreground/80" dir="rtl">
              {currentSurah.name_ar}
            </p>
            <div className="flex items-center justify-center gap-8 text-muted-foreground">
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                {currentSurah.ayah_count} verses
              </span>
              <span className="capitalize">{currentSurah.revelation_place}</span>
            </div>
          </div>

          <Button 
            variant="default"
            size="lg"
            className={`w-full mt-8 transition-colors ${
              isMemorized 
                ? 'bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-600' 
                : ''
            }`}
          >
            {isMemorized ? 'Review Memorized Surah' : 'Start Memorizing'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}