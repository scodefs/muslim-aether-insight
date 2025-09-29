import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Loader2, Check } from 'lucide-react';
import { Surah } from '@/hooks/useQuranData';
import { useMemorizationProgress } from '@/hooks/useMemorizationProgress';

interface SurahGridSelectorProps {
  surahs: Surah[];
  loading: boolean;
  onSurahSelect: (surahId: number) => void;
}

export function SurahGridSelector({ surahs, loading, onSurahSelect }: SurahGridSelectorProps) {
  const { isSurahMemorized } = useMemorizationProgress();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Loading Surahs...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Choose a Surah to Memorize</h2>
        <p className="text-muted-foreground">Select any chapter to begin your memorization journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {surahs.map((surah) => {
          const isMemorized = isSurahMemorized(surah.id);
          return (
            <Card 
              key={surah.id} 
              className={`group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-border/50 hover:border-primary/30 ${
                isMemorized ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800' : ''
              }`}
              onClick={() => onSurahSelect(surah.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    isMemorized 
                      ? 'bg-green-100 group-hover:bg-green-200 dark:bg-green-900 dark:group-hover:bg-green-800' 
                      : 'bg-primary/10 group-hover:bg-primary/20'
                  }`}>
                    {isMemorized ? (
                      <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <BookOpen className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">
                    {surah.id}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {surah.name_en}
                  </h3>
                  <p className="text-lg text-right font-arabic text-foreground/80" dir="rtl">
                    {surah.name_ar}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{surah.ayah_count} verses</span>
                    <span className="capitalize">{surah.revelation_place}</span>
                  </div>
                </div>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`w-full mt-4 transition-colors ${
                    isMemorized 
                      ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800' 
                      : 'group-hover:bg-primary/10 group-hover:text-primary'
                  }`}
                >
                  {isMemorized ? 'Memorized' : 'Start Memorizing'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}