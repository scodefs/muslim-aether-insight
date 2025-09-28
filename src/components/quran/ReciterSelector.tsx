import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Reciter = Tables<'reciters'>;

interface ReciterSelectorProps {
  selectedReciter: number | null;
  onReciterChange: (reciterId: number) => void;
  loading?: boolean;
}

export function ReciterSelector({ selectedReciter, onReciterChange, loading = false }: ReciterSelectorProps) {
  const [reciters, setReciters] = useState<Reciter[]>([]);
  const [reciterLoading, setReciterLoading] = useState(true);

  useEffect(() => {
    async function fetchReciters() {
      try {
        const { data, error } = await supabase
          .from('reciters')
          .select('*')
          .order('id');

        if (error) throw error;
        setReciters(data || []);
      } catch (err) {
        console.error('Failed to fetch reciters:', err);
      } finally {
        setReciterLoading(false);
      }
    }

    fetchReciters();
  }, []);

  const isLoading = loading || reciterLoading;
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