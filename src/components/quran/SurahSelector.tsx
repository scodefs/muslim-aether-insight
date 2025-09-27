import { Check, ChevronDown } from "lucide-react";
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
import { useState } from "react";
import { Surah } from "@/hooks/useQuranData";

interface SurahSelectorProps {
  selectedSurah: number | null;
  onSurahChange: (surahId: number) => void;
  surahs: Surah[];
  loading: boolean;
}

export function SurahSelector({ selectedSurah, onSurahChange, surahs, loading }: SurahSelectorProps) {
  const [open, setOpen] = useState(false);

  const selectedSurahData = surahs.find((surah) => surah.id === selectedSurah);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between hover:bg-primary/10 hover:text-primary border-none focus:ring-0 focus:ring-offset-0 text-foreground transition-colors"
        >
          {loading 
            ? "Loading..."
            : selectedSurah && selectedSurahData
            ? `${selectedSurahData.name_en} (${selectedSurahData.name_ar})`
            : "Select a Surah..."}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0 border-border bg-popover shadow-sm" align="start">
        <Command>
          <CommandInput placeholder="Search Surah..." className="border-none focus:ring-0" />
          <CommandList>
            <CommandEmpty>No Surah found.</CommandEmpty>
            <CommandGroup>
              {surahs.map((surah) => (
                <CommandItem
                  key={surah.id}
                  value={`${surah.name_en} ${surah.name_ar}`}
                  onSelect={() => {
                    onSurahChange(surah.id);
                    setOpen(false);
                  }}
                  className="hover:bg-primary/10 hover:text-primary data-[selected=true]:bg-primary/20 data-[selected=true]:text-primary cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-primary",
                      selectedSurah === surah.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{surah.name_en}</span>
                    <span className="text-sm opacity-70">{surah.name_ar}</span>
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