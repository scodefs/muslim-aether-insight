import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export function NavigationControls({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}: NavigationControlsProps) {
  return (
    <div className="flex justify-center gap-4">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className="flex items-center gap-2 min-w-32"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
      
      <Button
        variant="outline"
        onClick={onNext}
        disabled={!canGoNext}
        className="flex items-center gap-2 min-w-32"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}