import { useState, useEffect } from 'react';

interface VerseProgress {
  surahId: number;
  verseNumber: number;
  memorizedAt: Date;
}

interface SurahProgress {
  surahId: number;
  memorizedVerses: number;
  lastAccessed: Date;
}

interface DailyGoal {
  target: number;
  completed: number;
  date: string;
}

const STORAGE_KEY = 'memorization-progress';
const STREAK_KEY = 'memorization-streak';
const DAILY_GOAL_KEY = 'daily-goal';

export function useMemorizationProgress() {
  const [progress, setProgress] = useState<VerseProgress[]>([]);
  const [streak, setStreak] = useState(0);
  const [dailyGoal, setDailyGoal] = useState<DailyGoal>({
    target: 3,
    completed: 0,
    date: new Date().toDateString()
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    const savedStreak = localStorage.getItem(STREAK_KEY);
    const savedDailyGoal = localStorage.getItem(DAILY_GOAL_KEY);

    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      setProgress(parsed.map((p: any) => ({
        ...p,
        memorizedAt: new Date(p.memorizedAt)
      })));
    }

    if (savedStreak) {
      setStreak(parseInt(savedStreak));
    }

    if (savedDailyGoal) {
      const parsed = JSON.parse(savedDailyGoal);
      const today = new Date().toDateString();
      
      if (parsed.date === today) {
        setDailyGoal(parsed);
      } else {
        // Reset daily goal for new day
        const newGoal = { target: parsed.target, completed: 0, date: today };
        setDailyGoal(newGoal);
        localStorage.setItem(DAILY_GOAL_KEY, JSON.stringify(newGoal));
      }
    }
  }, []);

  const saveProgress = (newProgress: VerseProgress[]) => {
    setProgress(newProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
  };

  const updateStreak = (newStreak: number) => {
    setStreak(newStreak);
    localStorage.setItem(STREAK_KEY, newStreak.toString());
  };

  const updateDailyGoal = (newGoal: DailyGoal) => {
    setDailyGoal(newGoal);
    localStorage.setItem(DAILY_GOAL_KEY, JSON.stringify(newGoal));
  };

  const markVerseMemorized = (surahId: number, verseNumber: number) => {
    const existingIndex = progress.findIndex(
      p => p.surahId === surahId && p.verseNumber === verseNumber
    );

    if (existingIndex === -1) {
      const newProgress = [...progress, {
        surahId,
        verseNumber,
        memorizedAt: new Date()
      }];
      saveProgress(newProgress);

      // Update daily goal
      const today = new Date().toDateString();
      if (dailyGoal.date === today) {
        const updatedGoal = {
          ...dailyGoal,
          completed: dailyGoal.completed + 1
        };
        updateDailyGoal(updatedGoal);

        // Check if goal is reached for the first time today
        if (updatedGoal.completed >= updatedGoal.target && dailyGoal.completed < dailyGoal.target) {
          // Update streak
          updateStreak(streak + 1);
        }
      }
    }
  };

  const getProgress = (surahId: number): SurahProgress => {
    const surahVerses = progress.filter(p => p.surahId === surahId);
    const lastAccessed = surahVerses.length > 0 
      ? new Date(Math.max(...surahVerses.map(v => v.memorizedAt.getTime())))
      : new Date();

    return {
      surahId,
      memorizedVerses: surahVerses.length,
      lastAccessed
    };
  };

  const getTotalProgress = () => {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const thisWeek = progress.filter(p => p.memorizedAt >= weekAgo).length;
    
    return {
      totalVerses: progress.length,
      thisWeek,
      totalSurahs: new Set(progress.map(p => p.surahId)).size
    };
  };

  const getStreak = () => streak;

  const getDailyGoal = () => dailyGoal;

  const setDailyTarget = (target: number) => {
    const updatedGoal = { ...dailyGoal, target };
    updateDailyGoal(updatedGoal);
  };

  return {
    markVerseMemorized,
    getProgress,
    getTotalProgress,
    getStreak,
    getDailyGoal,
    setDailyTarget
  };
}