import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { quranData } from "@/data/quranData";
import { useState } from "react";

interface SurahSelectorProps {
  selectedSurah: string;
  onSurahChange: (surahId: string) => void;
}

export function SurahSelector({ selectedSurah, onSurahChange }: SurahSelectorProps) {
  const [open, setOpen] = useState(false);

  const selectedSurahData = quranData.surahs.find((surah) => surah.id === selectedSurah);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between hover:bg-accent/50 border-none rounded-none"
        >
          {selectedSurah
            ? `${selectedSurahData?.name} (${selectedSurahData?.arabicName})`
            : "Select a Surah..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 border-none rounded-none shadow-lg">
        <Command>
          <CommandInput placeholder="Search Surah..." />
          <CommandList>
            <CommandEmpty>No Surah found.</CommandEmpty>
            <CommandGroup>
              {quranData.surahs.map((surah) => (
                <CommandItem
                  key={surah.id}
                  value={`${surah.name} ${surah.arabicName}`}
                  onSelect={() => {
                    onSurahChange(surah.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedSurah === surah.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{surah.name}</span>
                    <span className="text-sm text-muted-foreground">{surah.arabicName}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}