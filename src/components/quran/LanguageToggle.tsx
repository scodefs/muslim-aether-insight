import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

interface LanguageToggleProps {
  language: "english" | "arabic";
  onLanguageChange: (language: "english" | "arabic") => void;
}

export function LanguageToggle({ language, onLanguageChange }: LanguageToggleProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onLanguageChange(language === "english" ? "arabic" : "english")}
      className="flex items-center gap-2"
    >
      <Languages className="h-4 w-4" />
      {language === "english" ? "عربي" : "English"}
    </Button>
  );
}