import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    <Select value={selectedTranslator} onValueChange={onTranslatorChange}>
      <SelectTrigger className="w-full sm:w-[180px] hover:bg-primary/10 hover:text-primary border-none focus:ring-0 focus:ring-offset-0 text-foreground">
        <SelectValue placeholder="Select translation" />
      </SelectTrigger>
      <SelectContent className="border-border bg-popover shadow-sm">
        {AVAILABLE_TRANSLATORS.map((translator) => (
          <SelectItem key={translator.value} value={translator.value} className="hover:bg-primary/10 hover:text-primary focus:bg-primary/20 focus:text-primary cursor-pointer">
            {translator.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}