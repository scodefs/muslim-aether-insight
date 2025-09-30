import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Video, FileText, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoCard } from "@/components/speakers/VideoCard";
import { dummySpeakers } from "@/data/speakersData";

export default function SpeakerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const speaker = dummySpeakers.find(s => s.id === id);

  if (!speaker) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Speaker Not Found</h1>
          <Button onClick={() => navigate('/speakers')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Speakers
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate('/speakers')}
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Speakers
      </Button>

      {/* Speaker Header */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Avatar className="h-32 w-32 ring-4 ring-primary/20">
          <AvatarImage src={speaker.image} alt={speaker.name} />
          <AvatarFallback className="text-2xl font-bold bg-primary/10">
            {speaker.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{speaker.name}</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {speaker.bio}
            </p>
          </div>
          
          <div className="flex gap-4">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5">
              <Video className="h-5 w-5 text-primary" />
              <span className="font-semibold">{speaker.videoCount}</span>
              <span className="text-sm text-muted-foreground">Videos</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
              <FileText className="h-5 w-5 text-secondary-foreground" />
              <span className="font-semibold">{speaker.transcriptionCount}</span>
              <span className="text-sm text-muted-foreground">Transcripts</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/50">
              <List className="h-5 w-5 text-accent-foreground" />
              <span className="font-semibold">{speaker.playlistCount}</span>
              <span className="text-sm text-muted-foreground">Playlists</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="videos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {speaker.videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="playlists" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {speaker.playlists.map((playlist) => (
              <Card key={playlist.id} className="group hover:shadow-lg transition-all duration-300 animate-scale-in">
                <CardHeader className="pb-3">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img
                      src={playlist.thumbnail}
                      alt={playlist.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CardTitle className="text-lg leading-tight line-clamp-2">
                    {playlist.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {playlist.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {playlist.videoCount} videos
                    </Badge>
                    <Button variant="outline" size="sm">
                      View Playlist
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}