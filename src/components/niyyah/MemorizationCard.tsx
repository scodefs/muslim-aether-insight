import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, Check } from 'lucide-react';
import { AyahWithTranslation } from '@/hooks/useQuranData';

interface MemorizationCardProps {
  verse: AyahWithTranslation;
  verseNumber: number;
  onMemorized?: () => void;
  isLastVerse?: boolean;
  onCompleted?: () => void;
}

export function MemorizationCard({ verse, verseNumber, onMemorized, isLastVerse, onCompleted }: MemorizationCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="perspective-1000 w-full">
      <div 
        className={`relative w-full min-h-[400px] sm:min-h-[450px] md:h-96 transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front Side - Arabic Text */}
        <Card className="absolute inset-0 backface-hidden border-primary/20 shadow-lg">
          <CardContent className="h-full flex flex-col p-4 sm:p-6 md:p-8">
            <div className="flex-shrink-0 text-center mb-4">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs sm:text-sm font-medium rounded-full">
                Verse {verseNumber}
              </span>
            </div>
            
            <div className="flex-1 flex items-center justify-center px-2 sm:px-4 overflow-y-auto">
              <p 
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-arabic text-foreground text-center leading-loose"
                dir="rtl"
                style={{ lineHeight: '2.2' }}
              >
                {verse.text_ar}
              </p>
            </div>

            <div className="flex-shrink-0 flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
              <Button
                variant="outline"
                onClick={handleFlip}
                className="flex items-center justify-center gap-2 text-xs sm:text-sm px-3 sm:px-4 py-2 h-auto"
              >
                <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
                Show Translation
              </Button>
              {isLastVerse && onCompleted && (
                <Button
                  onClick={onCompleted}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm px-3 sm:px-4 py-2 h-auto"
                >
                  <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                  Completed
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Back Side - Translation */}
        <Card className="absolute inset-0 backface-hidden rotate-y-180 border-accent/20 shadow-lg">
          <CardContent className="h-full flex flex-col p-4 sm:p-6 md:p-8">
            <div className="flex-shrink-0 text-center mb-4">
              <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs sm:text-sm font-medium rounded-full">
                Translation - Verse {verseNumber}
              </span>
            </div>
            
            <div className="flex-1 flex items-center justify-center px-2 sm:px-4 overflow-y-auto">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-foreground text-center max-w-full">
                {verse.translation?.text_translated || 'Translation not available'}
              </p>
            </div>

            <div className="flex-shrink-0 flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
              <Button
                variant="outline"
                onClick={handleFlip}
                className="flex items-center justify-center gap-2 text-xs sm:text-sm px-3 sm:px-4 py-2 h-auto"
              >
                <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
                Show Arabic
              </Button>
              {isLastVerse && onCompleted && (
                <Button
                  onClick={onCompleted}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm px-3 sm:px-4 py-2 h-auto"
                >
                  <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                  Completed
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}