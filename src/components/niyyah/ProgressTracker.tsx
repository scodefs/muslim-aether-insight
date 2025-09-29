import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Calendar, Target, BookOpen } from 'lucide-react';
import { useMemorizationProgress } from '@/hooks/useMemorizationProgress';

export function ProgressTracker() {
  const { getTotalProgress, getStreak, getDailyGoal } = useMemorizationProgress();
  
  const totalProgress = getTotalProgress();
  const currentStreak = getStreak();
  const dailyGoal = getDailyGoal();

  const stats = [
    {
      icon: BookOpen,
      label: 'Total Verses',
      value: totalProgress.totalVerses,
      color: 'bg-primary/10 text-primary'
    },
    {
      icon: Trophy,
      label: 'Current Streak',
      value: `${currentStreak} days`,
      color: 'bg-accent/10 text-accent'
    },
    {
      icon: Target,
      label: 'Daily Goal',
      value: `${dailyGoal.completed}/${dailyGoal.target}`,
      color: 'bg-secondary/10 text-secondary-foreground'
    },
    {
      icon: Calendar,
      label: 'This Week',
      value: totalProgress.thisWeek,
      color: 'bg-muted text-muted-foreground'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="border-border/50">
          <CardContent className="p-4 text-center">
            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mx-auto mb-2`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}