import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface Reciter {
  id: number;
  name: string;
  name_ar: string;
  identifier: string;
}

interface ReciterSelectorProps {
  selectedReciter: number | null;
  onReciterChange: (reciterId: number) => void;
}

export function ReciterSelector({ selectedReciter, onReciterChange }: ReciterSelectorProps) {
  const [reciters, setReciters] = useState<Reciter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReciters = async () => {
      try {
        const { data, error } = await supabase
          .from('reciters')
          .select('id, name, name_ar, identifier')
          .order('name');

        if (error) {
          console.error('Error fetching reciters:', error);
          return;
        }

        setReciters(data || []);
        
        // Set default reciter if none selected
        if (!selectedReciter && data && data.length > 0) {
          onReciterChange(data[0].id);
        }
      } catch (error) {
        console.error('Error fetching reciters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReciters();
  }, [selectedReciter, onReciterChange]);

  if (loading) {
    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">Reciter</Label>
        <div className="flex items-center justify-center h-10 border rounded-md">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="reciter-select" className="text-sm font-medium">
        Reciter
      </Label>
      <Select
        value={selectedReciter?.toString()}
        onValueChange={(value) => onReciterChange(parseInt(value))}
      >
        <SelectTrigger id="reciter-select">
          <SelectValue placeholder="Select a reciter" />
        </SelectTrigger>
        <SelectContent>
          {reciters.map((reciter) => (
            <SelectItem key={reciter.id} value={reciter.id.toString()}>
              <div className="flex flex-col">
                <span className="font-medium">{reciter.name}</span>
                <span className="text-sm text-muted-foreground">{reciter.name_ar}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}