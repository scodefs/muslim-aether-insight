import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Video, FileText, List } from "lucide-react";
import { Speaker } from "@/data/speakersData";
import { useNavigate } from "react-router-dom";

interface SpeakerCardProps {
  speaker: Speaker;
}

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  const navigate = useNavigate();

  const handleSpeakerClick = () => {
    navigate(`/speakers/${speaker.id}`);
  };

  return (
    <Card className="group transition-all duration-300 cursor-pointer animate-scale-in overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-20 w-20 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
            <AvatarImage src={speaker.image} alt={speaker.name} />
            <AvatarFallback className="text-lg font-semibold bg-primary/10">
              {speaker.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="text-center space-y-1">
            <h3 className="font-semibold text-lg leading-tight">{speaker.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{speaker.bio}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center space-y-1 p-2 rounded-lg bg-primary/5">
            <Video className="h-4 w-4 text-primary" />
            <Badge variant="secondary" className="text-xs px-2 py-1">
              {speaker.videoCount}
            </Badge>
            <span className="text-xs text-muted-foreground">Videos</span>
          </div>
          
          <div className="flex flex-col items-center space-y-1 p-2 rounded-lg bg-secondary/50">
            <FileText className="h-4 w-4 text-secondary-foreground" />
            <Badge variant="secondary" className="text-xs px-2 py-1">
              {speaker.transcriptionCount}
            </Badge>
            <span className="text-xs text-muted-foreground">Transcripts</span>
          </div>
          
          <div className="flex flex-col items-center space-y-1 p-2 rounded-lg bg-accent/50">
            <List className="h-4 w-4 text-accent-foreground" />
            <Badge variant="secondary" className="text-xs px-2 py-1">
              {speaker.playlistCount}
            </Badge>
            <span className="text-xs text-muted-foreground">Playlists</span>
          </div>
        </div>
        
        <Button 
          onClick={handleSpeakerClick}
          className="w-full transition-all"
          size="sm"
        >
          View Speaker Page
        </Button>
      </CardContent>
    </Card>
  );
}