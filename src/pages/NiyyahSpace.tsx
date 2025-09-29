import { useState } from 'react';
import { SurahGridSelector } from '@/components/niyyah/SurahGridSelector';
import { MemorizationSession } from '@/components/niyyah/MemorizationSession';
import { ProgressTracker } from '@/components/niyyah/ProgressTracker';
import { DailyGuidanceCards } from '@/components/niyyah/DailyGuidanceCards';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, BookOpen } from 'lucide-react';
import { useSurahs } from '@/hooks/useQuranData';

export default function NiyyahSpace() {
  const { surahs, loading } = useSurahs();
  const [selectedSurahId, setSelectedSurahId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('guidance');

  const handleSurahSelect = (surahId: number) => {
    setSelectedSurahId(surahId);
  };

  const handleBackToSelection = () => {
    setSelectedSurahId(null);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Reset memorization session when switching tabs
    if (value === 'guidance') {
      setSelectedSurahId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            Niyyah Space
          </h1>
          <p className="text-muted-foreground text-lg">
            Your comprehensive space for Quran memorization and daily spiritual guidance
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="guidance" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Daily Guidance
            </TabsTrigger>
            <TabsTrigger value="memorize" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Memorize Quran
            </TabsTrigger>
          </TabsList>

          <TabsContent value="guidance" className="space-y-8">
            <ProgressTracker />
            <DailyGuidanceCards />
          </TabsContent>

          <TabsContent value="memorize" className="space-y-8">
            <ProgressTracker />
            {!selectedSurahId ? (
              <SurahGridSelector 
                surahs={surahs}
                loading={loading}
                onSurahSelect={handleSurahSelect}
              />
            ) : (
              <MemorizationSession 
                surahId={selectedSurahId}
                onBack={handleBackToSelection}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}