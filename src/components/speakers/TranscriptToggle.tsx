import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TranscriptToggleProps {
  transcript: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function TranscriptToggle({ transcript, isOpen, onToggle }: TranscriptToggleProps) {
  const { toast } = useToast();

  const handleCopyTranscript = () => {
    navigator.clipboard.writeText(transcript);
    toast({
      title: "Copied!",
      description: "Transcript copied to clipboard",
    });
  };

  const handleDownloadTranscript = () => {
    const element = document.createElement("a");
    const file = new Blob([transcript], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "transcript.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Downloaded!",
      description: "Transcript downloaded as text file",
    });
  };

  if (!isOpen) return null;

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-base">English Transcription</CardTitle>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyTranscript}
            className="h-8 w-8 p-0"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownloadTranscript}
            className="h-8 w-8 p-0"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64 w-full rounded-md border p-4">
          <div className="text-sm leading-relaxed whitespace-pre-wrap">
            {transcript}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}