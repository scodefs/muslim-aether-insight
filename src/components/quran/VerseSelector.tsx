import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VerseSelectorProps {
  totalVerses: number;
  selectedVerse: number | null;
  onVerseChange: (verse: number | null) => void;
}

export function VerseSelector({ totalVerses, selectedVerse, onVerseChange }: VerseSelectorProps) {
  return (
    <Select
      value={selectedVerse?.toString() || "all"}
      onValueChange={(value) => {
        onVerseChange(value === "all" ? null : parseInt(value));
      }}
    >
      <SelectTrigger className="w-full sm:w-[140px] hover:bg-primary/10 hover:text-primary border-none focus:ring-0 focus:ring-offset-0 text-foreground">
        <SelectValue placeholder="Select verse" />
      </SelectTrigger>
      <SelectContent className="border-border bg-popover shadow-sm">
        <SelectItem value="all" className="hover:bg-primary/10 hover:text-primary focus:bg-primary/20 focus:text-primary cursor-pointer">All verses</SelectItem>
        {Array.from({ length: totalVerses }, (_, i) => i + 1).map((verse) => (
          <SelectItem key={verse} value={verse.toString()} className="hover:bg-primary/10 hover:text-primary focus:bg-primary/20 focus:text-primary cursor-pointer">
            Verse {verse}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}