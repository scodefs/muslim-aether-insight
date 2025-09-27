import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2, RotateCcw, X } from "lucide-react";
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { AyahWithTranslation } from "@/hooks/useQuranData";

export interface AudioPlayerRef {
  togglePlayPause: () => void;
}

interface BottomAudioPlayerProps {
  currentVerse: AyahWithTranslation | null;
  onNext: () => void;
  onPrevious: () => void;
  onRepeat: () => void;
  onClose: () => void;
  onPlayingStateChange?: (isPlaying: boolean) => void;
}

export const BottomAudioPlayer = forwardRef<AudioPlayerRef, BottomAudioPlayerProps>(({
  currentVerse,
  onNext,
  onPrevious,
  onRepeat,
  onClose,
  onPlayingStateChange
}, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-play when current verse changes
  useEffect(() => {
    if (currentVerse?.audio_url && audioRef.current) {
      const audio = audioRef.current;
      audio.src = currentVerse.audio_url;
      audio.load();
      audio.play().then(() => {
        setIsPlaying(true);
        onPlayingStateChange?.(true);
      });
    }
  }, [currentVerse, onPlayingStateChange]);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      onPlayingStateChange?.(false);
      onNext();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onNext]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      onPlayingStateChange?.(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        onPlayingStateChange?.(true);
      });
    }
  };

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    togglePlayPause
  }));

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newVolume = value[0];
    setVolume(newVolume);
    audio.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentVerse) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:pl-64 p-2 bg-background/95 backdrop-blur-sm border-t animate-fade-in">
      <Card className="max-w-full lg:max-w-2xl mx-auto relative">
        <div className="p-2 sm:p-3">
          {/* Mobile layout - Stacked */}
          <div className="lg:hidden space-y-2">
            {/* Top row: Verse info and close button */}
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                Verse {currentVerse.ayah_number}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-6 w-6 opacity-40 hover:opacity-100 hover:scale-105 transition-all duration-200"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>

            {/* Middle row: Control buttons */}
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onPrevious}
                className="h-8 w-8 hover:scale-105 transition-transform"
              >
                <SkipBack className="h-4 w-4" />
              </Button>

              <Button
                variant="default"
                size="icon"
                onClick={togglePlayPause}
                className="h-10 w-10 hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={onNext}
                className="h-8 w-8 hover:scale-105 transition-transform"
              >
                <SkipForward className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const audio = audioRef.current;
                  if (audio) {
                    audio.currentTime = 0;
                    audio.play().then(() => setIsPlaying(true));
                  }
                  onRepeat();
                }}
                className="h-8 w-8 hover:scale-105 transition-transform"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="h-8 w-8 hover:scale-105 transition-transform"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Bottom row: Progress bar with times */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground min-w-fit">{formatTime(currentTime)}</span>
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={0.1}
                onValueChange={handleSeek}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground min-w-fit">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Desktop layout - Single row */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Verse info */}
            <div className="text-xs text-muted-foreground min-w-fit">
              Verse {currentVerse.ayah_number}
            </div>

            {/* Control buttons */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={onPrevious}
                className="h-6 w-6 hover:scale-105 transition-transform"
              >
                <SkipBack className="h-3 w-3" />
              </Button>

              <Button
                variant="default"
                size="icon"
                onClick={togglePlayPause}
                className="h-7 w-7 hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={onNext}
                className="h-6 w-6 hover:scale-105 transition-transform"
              >
                <SkipForward className="h-3 w-3" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const audio = audioRef.current;
                  if (audio) {
                    audio.currentTime = 0;
                    audio.play().then(() => setIsPlaying(true));
                  }
                  onRepeat();
                }}
                className="h-6 w-6 hover:scale-105 transition-transform"
              >
                <RotateCcw className="h-3 w-3" />
              </Button>
            </div>

            {/* Progress bar */}
            <div className="flex-1 flex items-center gap-2">
              <span className="text-xs text-muted-foreground min-w-fit">{formatTime(currentTime)}</span>
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={0.1}
                onValueChange={handleSeek}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground min-w-fit">{formatTime(duration)}</span>
            </div>

            {/* Volume control */}
            <div className="flex items-center gap-1 group">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="h-6 w-6 hover:scale-105 transition-transform"
              >
                <Volume2 className="h-3 w-3" />
              </Button>
              <div className="w-0 overflow-hidden transition-all duration-300 group-hover:w-16">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="w-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>

            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-6 w-6 opacity-40 hover:opacity-100 hover:scale-105 transition-all duration-200 ml-2"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </Card>

      <audio
        ref={audioRef}
        preload="metadata"
        onLoadStart={() => setCurrentTime(0)}
      />
    </div>
  );
});

BottomAudioPlayer.displayName = "BottomAudioPlayer";