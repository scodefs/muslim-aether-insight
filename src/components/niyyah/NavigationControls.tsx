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
    <div className="flex justify-center gap-2 sm:gap-4 px-4 sm:px-0">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className="flex items-center gap-1 sm:gap-2 min-w-24 sm:min-w-32 text-xs sm:text-sm px-3 sm:px-4 py-2"
      >
        <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
        Previous
      </Button>
      
      <Button
        variant="outline"
        onClick={onNext}
        disabled={!canGoNext}
        className="flex items-center gap-1 sm:gap-2 min-w-24 sm:min-w-32 text-xs sm:text-sm px-3 sm:px-4 py-2"
      >
        Next
        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
      </Button>
    </div>
  );
}