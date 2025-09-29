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
    <div className="perspective-1000">
      <div 
        className={`relative w-full h-80 transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front Side - Arabic Text */}
        <Card className="absolute inset-0 backface-hidden border-primary/20 shadow-lg">
          <CardContent className="h-full flex flex-col justify-center items-center p-8 text-center">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                Verse {verseNumber}
              </span>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <p 
                className="text-2xl md:text-3xl font-arabic leading-loose text-foreground px-4"
                dir="rtl"
                style={{ lineHeight: '2.5' }}
              >
                {verse.text_ar}
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={handleFlip}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Show Translation
              </Button>
              {isLastVerse && onCompleted && (
                <Button
                  onClick={onCompleted}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                >
                  <Check className="h-4 w-4" />
                  Completed
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Back Side - Translation */}
        <Card className="absolute inset-0 backface-hidden rotate-y-180 border-accent/20 shadow-lg">
          <CardContent className="h-full flex flex-col justify-center items-center p-8 text-center">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">
                Translation - Verse {verseNumber}
              </span>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <p className="text-xl md:text-2xl leading-relaxed text-foreground max-w-2xl">
                {verse.translation?.text_translated || 'Translation not available'}
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={handleFlip}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Show Arabic
              </Button>
              {isLastVerse && onCompleted && (
                <Button
                  onClick={onCompleted}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                >
                  <Check className="h-4 w-4" />
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