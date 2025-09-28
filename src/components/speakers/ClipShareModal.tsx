import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Scissors, 
  Download, 
  Share2, 
  Play, 
  Clock,
  Link,
  Twitter,
  Facebook
} from "lucide-react";
import { Video } from "@/data/speakersData";
import { useToast } from "@/hooks/use-toast";

interface ClipShareModalProps {
  video: Video;
  isOpen: boolean;
  onClose: () => void;
}

export function ClipShareModal({ video, isOpen, onClose }: ClipShareModalProps) {
  const [startTime, setStartTime] = useState([0]);
  const [endTime, setEndTime] = useState([60]);
  const [clipTitle, setClipTitle] = useState("");
  const { toast } = useToast();

  // Convert duration string to seconds for slider
  const durationParts = video.duration.split(':');
  const totalSeconds = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleGenerateClip = () => {
    toast({
      title: "Clip Generated!",
      description: `Clip created from ${formatTime(startTime[0])} to ${formatTime(endTime[0])}`,
    });
  };

  const handleDownloadClip = () => {
    toast({
      title: "Download Started",
      description: "Your clip is being downloaded...",
    });
  };

  const handleShareClip = (platform: string) => {
    const clipUrl = `https://example.com/clip/${video.id}?start=${startTime[0]}&end=${endTime[0]}`;
    navigator.clipboard.writeText(clipUrl);
    
    toast({
      title: "Link Copied!",
      description: `Clip link copied for ${platform} sharing`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scissors className="h-5 w-5" />
            Clip & Share Video
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Video Preview */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Video</h3>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?start=${startTime[0]}&end=${endTime[0]}`}
                title={video.title}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Full Duration: {video.duration}</span>
              <Badge variant="outline">
                Clip: {formatTime(endTime[0] - startTime[0])}
              </Badge>
            </div>
          </div>

          {/* Time Selection */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm">Select Clip Time Range</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <div className="flex items-center gap-2">
                  <Slider
                    value={startTime}
                    onValueChange={setStartTime}
                    max={totalSeconds - 1}
                    step={1}
                    className="flex-1"
                  />
                  <Badge variant="secondary">{formatTime(startTime[0])}</Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <div className="flex items-center gap-2">
                  <Slider
                    value={endTime}
                    onValueChange={setEndTime}
                    min={startTime[0] + 1}
                    max={totalSeconds}
                    step={1}
                    className="flex-1"
                  />
                  <Badge variant="secondary">{formatTime(endTime[0])}</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Clip Title */}
          <div className="space-y-2">
            <Label htmlFor="clipTitle">Clip Title (Optional)</Label>
            <Input
              id="clipTitle"
              placeholder="Enter a title for your clip..."
              value={clipTitle}
              onChange={(e) => setClipTitle(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={handleGenerateClip} className="flex-1">
                <Play className="h-4 w-4 mr-2" />
                Generate Clip
              </Button>
              <Button variant="outline" onClick={handleDownloadClip} className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Share Clip</h4>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShareClip("Direct Link")}
                  className="flex items-center gap-2"
                >
                  <Link className="h-4 w-4" />
                  Copy Link
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShareClip("Twitter")}
                  className="flex items-center gap-2"
                >
                  <Twitter className="h-4 w-4" />
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShareClip("Facebook")}
                  className="flex items-center gap-2"
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}