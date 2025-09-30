import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Eye, FileText, Scissors } from "lucide-react";
import { Video } from "@/data/speakersData";
import { TranscriptToggle } from "./TranscriptToggle";
import { ClipShareModal } from "./ClipShareModal";

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  const [showTranscript, setShowTranscript] = useState(false);
  const [showClipModal, setShowClipModal] = useState(false);

  return (
    <>
      <Card className="group transition-all duration-300 overflow-hidden animate-scale-in border-accent/20">
        <CardHeader className="pb-3">
          <div className="aspect-video bg-muted rounded-lg overflow-hidden relative group">
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}`}
              title={video.title}
              className="w-full h-full"
              allowFullScreen
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Play className="h-12 w-12 text-white" />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <CardTitle className="text-lg leading-tight line-clamp-2">
              {video.title}
            </CardTitle>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{video.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{video.views} views</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {video.publishedAt}
              </Badge>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTranscript(!showTranscript)}
              className="flex-1"
            >
              <FileText className="h-4 w-4 mr-2" />
              Transcript
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowClipModal(true)}
              className="flex-1"
            >
              <Scissors className="h-4 w-4 mr-2" />
              Clip & Share
            </Button>
          </div>
          
          {showTranscript && (
            <TranscriptToggle 
              transcript={video.transcript}
              isOpen={showTranscript}
              onToggle={() => setShowTranscript(!showTranscript)}
            />
          )}
        </CardContent>
      </Card>
      
      <ClipShareModal
        video={video}
        isOpen={showClipModal}
        onClose={() => setShowClipModal(false)}
      />
    </>
  );
}