import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Volume2, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function AudioDataLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string>('');
  const [isComplete, setIsComplete] = useState(false);

  const populateAudioData = async () => {
    setIsLoading(true);
    setProgress(0);
    setStatus('Initializing audio data population...');
    setIsComplete(false);

    try {
      // Update progress incrementally
      setProgress(10);
      setStatus('Connecting to Quran audio API...');

      const { data, error } = await supabase.functions.invoke('populate-quran');

      if (error) {
        console.error('Error invoking function:', error);
        throw new Error(error.message || 'Failed to populate audio data');
      }

      setProgress(50);
      setStatus('Fetching audio URLs from both reciters...');

      // Simulate progress updates
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(75);
      setStatus('Storing audio URLs in database...');

      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(100);
      setStatus('Audio data population completed successfully!');
      setIsComplete(true);

      toast.success('Audio data populated successfully!', {
        description: 'All verses now have audio URLs from both Abdul Rahman Al-Sudais and Mishari Rashid Al-Afasy'
      });

    } catch (error) {
      console.error('Error populating audio data:', error);
      toast.error('Failed to populate audio data', {
        description: error instanceof Error ? error.message : 'An unknown error occurred'
      });
      setStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Volume2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">Audio Data Loader</CardTitle>
            <CardDescription>
              Load complete Quran audio data for both reciters (12,472 total verses with recitation by Abdul Rahman Al-Sudais and Mishari Rashid Al-Afasy)
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {isLoading && (
          <div className="space-y-3">
            <Progress value={progress} className="w-full" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
              <span>{status}</span>
            </div>
          </div>
        )}

        {isComplete && (
          <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
            <CheckCircle className="h-4 w-4" />
            <span>{status}</span>
          </div>
        )}

        {!isLoading && !isComplete && status && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle className="h-4 w-4" />
            <span>{status}</span>
          </div>
        )}

        <Button
          onClick={populateAudioData}
          disabled={isLoading}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
          size="lg"
        >
          {isLoading ? 'Populating Audio Data...' : 'Populate Complete Audio Data'}
        </Button>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>• This will fetch audio URLs for all Quranic verses from both reciters</p>
          <p>• Audio recitation by Abdul Rahman Al-Sudais and Mishari Rashid Al-Afasy</p>
          <p>• Process may take a few minutes to complete</p>
          <p>• This will add 6,236 additional verses for Al-Afasy (total: 12,472 verses)</p>
        </div>
      </CardContent>
    </Card>
  );
}