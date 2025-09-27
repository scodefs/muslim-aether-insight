import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudioControlsProps {
  audioUrl?: string;
  className?: string;
  size?: 'sm' | 'md';
  variant?: 'default' | 'minimal';
}

export const AudioControls = ({ 
  audioUrl, 
  className, 
  size = 'sm',
  variant = 'minimal'
}: AudioControlsProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const playAudio = async () => {
    if (!audioUrl) return;

    try {
      setIsLoading(true);
      
      // Stop any existing audio
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      // Create new audio instance
      const newAudio = new Audio(audioUrl);
      setAudio(newAudio);

      newAudio.addEventListener('ended', () => {
        setIsPlaying(false);
        setAudio(null);
      });

      newAudio.addEventListener('error', () => {
        setIsPlaying(false);
        setIsLoading(false);
        setAudio(null);
      });

      await newAudio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing audio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const stopAudio = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setAudio(null);
    }
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      playAudio();
    }
  };

  if (!audioUrl) {
    return null;
  }

  const buttonSize = size === 'sm' ? 'icon' : 'default';
  const iconSize = size === 'sm' ? 'h-3 w-3' : 'h-4 w-4';

  if (variant === 'minimal') {
    return (
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={togglePlayback}
        disabled={isLoading}
        className={cn(
          "opacity-60 hover:opacity-100 transition-opacity",
          size === 'sm' && "h-6 w-6",
          className
        )}
        aria-label={isPlaying ? "Stop audio" : "Play audio"}
      >
        {isLoading ? (
          <div className={cn(
            "animate-spin rounded-full border-2 border-primary border-t-transparent",
            size === 'sm' ? "h-3 w-3" : "h-4 w-4"
          )} />
        ) : isPlaying ? (
          <Pause className={iconSize} />
        ) : (
          <Play className={iconSize} />
        )}
      </Button>
    );
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Volume2 className="h-3 w-3 text-muted-foreground" />
      <Button
        variant="outline"
        size={buttonSize}
        onClick={togglePlayback}
        disabled={isLoading}
        className="gap-1"
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-3 w-3 border-2 border-primary border-t-transparent" />
        ) : isPlaying ? (
          <Pause className="h-3 w-3" />
        ) : (
          <Play className="h-3 w-3" />
        )}
        {size === 'md' && (isPlaying ? 'Stop' : 'Play')}
      </Button>
    </div>
  );
};