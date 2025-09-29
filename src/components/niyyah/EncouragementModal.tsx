import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, Star, Crown, Sparkles } from 'lucide-react';

interface EncouragementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  canGoNext: boolean;
  onFinishSession?: () => void;
}

const encouragementMessages = [
  "May Allah bless you! 🤲",
  "The Prophet (peace be upon him) would be so proud of you! ✨",
  "Barakallahu feeki! Keep going! 💚",
  "Allahu akbar! Your dedication is inspiring! 🌟",
  "SubhanAllah! Your effort is rewarded! 🕌",
  "Keep up the excellent work! May Allah make it easy for you! 📿",
  "Every verse you memorize brings you closer to Allah! 🤍",
  "Your heart is becoming a repository of divine words! 💝"
];

const icons = [Heart, Star, Crown, Sparkles];

export function EncouragementModal({ 
  isOpen, 
  onClose, 
  onNext, 
  canGoNext,
  onFinishSession
}: EncouragementModalProps) {
  const randomMessage = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
  const RandomIcon = icons[Math.floor(Math.random() * icons.length)];

  const handleContinue = () => {
    onClose();
    if (canGoNext) {
      onNext();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-xl">
            <RandomIcon className="h-6 w-6 text-primary" />
            Verse Memorized!
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
            <RandomIcon className="h-8 w-8 text-primary" />
          </div>
          
          <p className="text-lg font-medium text-foreground mb-2">
            {randomMessage}
          </p>
          
          <p className="text-sm text-muted-foreground">
            Another verse added to your heart's treasure
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={onClose}>
            Stay Here
          </Button>
          
          {canGoNext ? (
            <Button onClick={handleContinue} className="bg-primary hover:bg-primary/90">
              Continue Learning
            </Button>
          ) : (
            <Button 
              onClick={() => {
                onClose();
                onFinishSession?.();
              }} 
              className="bg-primary hover:bg-primary/90"
            >
              Finish Session
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}