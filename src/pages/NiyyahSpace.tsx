import { useState } from 'react';
import { SurahGridSelector } from '@/components/niyyah/SurahGridSelector';
import { MemorizationSession } from '@/components/niyyah/MemorizationSession';
import { ProgressTracker } from '@/components/niyyah/ProgressTracker';
import { DailyGuidanceCards } from '@/components/niyyah/DailyGuidanceCards';
import { useSurahs } from '@/hooks/useQuranData';

export default function NiyyahSpace() {
  const { surahs, loading } = useSurahs();
  const [selectedSurahId, setSelectedSurahId] = useState<number | null>(null);

  const handleSurahSelect = (surahId: number) => {
    setSelectedSurahId(surahId);
  };

  const handleBackToSelection = () => {
    setSelectedSurahId(null);
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

        <ProgressTracker />

        <DailyGuidanceCards />

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
      </div>
    </div>
  );
}