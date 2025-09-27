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
      <SelectTrigger className="w-full sm:w-[140px] hover:bg-accent/50">
        <SelectValue placeholder="Select verse" />
      </SelectTrigger>
      <SelectContent className="shadow-lg">
        <SelectItem value="all">All verses</SelectItem>
        {Array.from({ length: totalVerses }, (_, i) => i + 1).map((verse) => (
          <SelectItem key={verse} value={verse.toString()}>
            Verse {verse}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}