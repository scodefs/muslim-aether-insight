import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export function QuranWordsLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  const populateQuranWords = async () => {
    setIsLoading(true);
    setProgress(0);
    setStatus("Starting QPC V4 word-by-word data population...");
    setIsComplete(false);

    try {
      const { data, error } = await supabase.functions.invoke('populate-quran-words');

      if (error) throw error;

      setProgress(100);
      setStatus(`Successfully loaded ${data.totalWords} words!`);
      setIsComplete(true);
      
      toast({
        title: "Success!",
        description: `QPC V4 word-by-word Quran data populated successfully. Total words: ${data.totalWords}`,
      });
    } catch (error) {
      console.error("Error populating QPC word data:", error);
      setStatus("Error loading data. Please check console for details.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to populate QPC word data. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>QPC V4 Word-by-Word Data</CardTitle>
        <CardDescription>
          Load the complete King Fahad Complex Uthmanic Script (QPC V4) word-by-word Quran data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading && (
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              {status}
            </p>
          </div>
        )}
        
        {isComplete && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <p className="text-sm font-medium">{status}</p>
          </div>
        )}
        
        {!isLoading && !isComplete && status && (
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm font-medium">{status}</p>
          </div>
        )}
        
        <Button 
          onClick={populateQuranWords} 
          disabled={isLoading || isComplete}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading Word Data...
            </>
          ) : isComplete ? (
            "Data Loaded Successfully"
          ) : (
            "Load QPC V4 Word Data"
          )}
        </Button>
        
        <p className="text-xs text-muted-foreground">
          This will populate the database with word-by-word Quran text in the King Fahad Complex Uthmanic Script format.
        </p>
      </CardContent>
    </Card>
  );
}
