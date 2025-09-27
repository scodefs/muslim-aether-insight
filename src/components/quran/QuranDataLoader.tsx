import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Database, CheckCircle } from "lucide-react";

export const QuranDataLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string>("");
  const { toast } = useToast();

  const populateQuranData = async () => {
    setIsLoading(true);
    setProgress(0);
    setStatus("Starting Quran data population...");

    try {
      const { data, error } = await supabase.functions.invoke('populate-quran', {
        body: {}
      });

      if (error) {
        throw error;
      }

      setProgress(100);
      setStatus("Complete! All Quran data has been loaded successfully.");
      
      toast({
        title: "Success!",
        description: `${data.message} - ${data.totalSurahs} Surahs populated`,
      });
      
    } catch (error) {
      console.error('Error populating Quran data:', error);
      setStatus("Error occurred during data population.");
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to populate Quran data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Quran Data Loader
        </CardTitle>
        <CardDescription>
          Load complete Quran data (all 114 Surahs with translations)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {progress > 0 && progress < 100 && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground">{status}</p>
          </div>
        )}
        
        {progress === 100 && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm">{status}</span>
          </div>
        )}
        
        <Button 
          onClick={populateQuranData}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading Quran Data...
            </>
          ) : (
            "Populate Complete Quran Data"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};