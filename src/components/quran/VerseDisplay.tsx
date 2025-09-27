import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Surah, Verse } from "@/data/quranData";

interface VerseDisplayProps {
  surah: Surah | null;
  selectedVerse: number | null;
}

export function VerseDisplay({ surah, selectedVerse }: VerseDisplayProps) {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Verse copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  if (!surah) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <div className="p-4 bg-muted/20 rounded-lg inline-block">
            <div className="text-4xl mb-2">📖</div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Select a Surah</h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              Choose a Surah from the dropdown above to begin reading the Quran
            </p>
          </div>
        </div>
      </div>
    );
  }

  const versesToDisplay = selectedVerse 
    ? surah.verses.filter(verse => verse.number === selectedVerse)
    : surah.verses;

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4 max-w-4xl mx-auto">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl font-bold">
            {surah.name} ({surah.arabicName})
          </h2>
          {selectedVerse && (
            <p className="text-muted-foreground">Verse {selectedVerse}</p>
          )}
        </div>

        <div className="space-y-4">
          {versesToDisplay.map((verse) => (
            <VerseCard
              key={verse.number}
              verse={verse}
              onCopy={copyToClipboard}
            />
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}

interface VerseCardProps {
  verse: Verse;
  onCopy: (text: string) => void;
}

function VerseCard({ verse, onCopy }: VerseCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow animate-fade-in relative">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary">{verse.number}</span>
          </div>
          
          <div className="flex-1 space-y-3">
            <p 
              className="leading-relaxed text-right text-xl font-medium"
              dir="rtl"
            >
              {verse.arabic}
            </p>
            
            <p 
              className="text-sm text-muted-foreground leading-relaxed"
              dir="ltr"
            >
              {verse.english}
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 h-8 w-8 opacity-60 hover:opacity-100 transition-opacity"
          onClick={() => onCopy(`Verse ${verse.number}\n\n${verse.arabic}\n\n${verse.english}`)}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}