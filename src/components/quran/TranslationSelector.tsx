import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen } from "lucide-react";

interface TranslationSelectorProps {
  selectedTranslator: string;
  onTranslatorChange: (translator: string) => void;
}

const AVAILABLE_TRANSLATORS = [
  { value: "Sahih International", label: "Sahih International" },
  { value: "Hilali & Khan", label: "Hilali & Khan" }
];

export function TranslationSelector({ selectedTranslator, onTranslatorChange }: TranslationSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <BookOpen className="h-4 w-4 text-muted-foreground" />
      <Select value={selectedTranslator} onValueChange={onTranslatorChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select translation" />
        </SelectTrigger>
        <SelectContent>
          {AVAILABLE_TRANSLATORS.map((translator) => (
            <SelectItem key={translator.value} value={translator.value}>
              {translator.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}