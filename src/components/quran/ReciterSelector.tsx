import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

export interface Reciter {
  id: number;
  name: string;
  name_ar: string | null;
  identifier: string;
  language_code: string;
  created_at: string | null;
}

interface ReciterSelectorProps {
  selectedReciter: number | null;
  onReciterChange: (reciterId: number) => void;
  loading?: boolean;
}

export function ReciterSelector({ selectedReciter, onReciterChange, loading = false }: ReciterSelectorProps) {
  // Hardcoded reciters for now
  const reciters: Reciter[] = [
    {
      id: 1,
      name: "Abdul Rahman Al-Sudais",
      name_ar: "عبد الرحمن السديس",
      identifier: "abdurrahmaansudais",
      language_code: "ar",
      created_at: null
    },
    {
      id: 2,
      name: "Mishari Rashid Al-Afasy",
      name_ar: "مشاري راشد العفاسي",
      identifier: "alafasy",
      language_code: "ar",
      created_at: null
    }
  ];

  const isLoading = loading;
  const selectedReciterData = selectedReciter ? reciters.find(r => r.id === selectedReciter) : null;

  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-muted-foreground">Reciter</label>
      <Select
        value={selectedReciter?.toString() || ""}
        onValueChange={(value) => onReciterChange(parseInt(value))}
        disabled={isLoading}
      >
        <SelectTrigger className="h-8 text-xs">
          <SelectValue 
            placeholder={isLoading ? "Loading..." : "Select reciter"} 
          >
            {selectedReciterData && (
              <span className="truncate">
                {selectedReciterData.name}
              </span>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-[200px]">
          {reciters.map((reciter) => (
            <SelectItem key={reciter.id} value={reciter.id.toString()}>
              <div className="flex flex-col">
                <span className="font-medium">{reciter.name}</span>
                <span className="text-xs text-muted-foreground">{reciter.name_ar}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}