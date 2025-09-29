import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trophy, Calendar, Target, BookOpen, Edit } from 'lucide-react';
import { useMemorizationProgress } from '@/hooks/useMemorizationProgress';

export function ProgressTracker() {
  const { getTotalProgress, getStreak, getDailyGoal, setDailyTarget } = useMemorizationProgress();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTarget, setNewTarget] = useState('');
  
  const totalProgress = getTotalProgress();
  const currentStreak = getStreak();
  const dailyGoal = getDailyGoal();

  const handleSaveTarget = () => {
    const target = parseInt(newTarget);
    if (target > 0 && target <= 50) {
      setDailyTarget(target);
      setIsDialogOpen(false);
      setNewTarget('');
    }
  };

  const isGoalMet = dailyGoal.completed >= dailyGoal.target;

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
      color: isGoalMet 
        ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400' 
        : 'bg-secondary/10 text-secondary-foreground',
      isClickable: true
    },
    {
      icon: Calendar,
      label: 'This Week',
      value: totalProgress.thisWeek,
      color: 'bg-muted text-muted-foreground'
    }
  ];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="border-border/50">
            <CardContent className="p-4 text-center">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mx-auto mb-2 relative`}>
                <stat.icon className="h-5 w-5" />
                {stat.isClickable && (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-primary/20 hover:bg-primary/30 rounded-full"
                        onClick={() => setNewTarget(dailyGoal.target.toString())}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Set Daily Goal</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="target">Daily Verse Target</Label>
                          <Input
                            id="target"
                            type="number"
                            min="1"
                            max="50"
                            value={newTarget}
                            onChange={(e) => setNewTarget(e.target.value)}
                            placeholder="Enter daily goal (1-50)"
                          />
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button 
                            onClick={handleSaveTarget}
                            disabled={!newTarget || parseInt(newTarget) < 1 || parseInt(newTarget) > 50}
                          >
                            Save Goal
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}