import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  Users, 
  ListMusic, 
  FileText, 
  BookOpen, 
  ScrollText, 
  Library, 
  UserCheck, 
  FolderOpen 
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// Dummy data for charts
const monthlyData = [
  { month: "Jan", hours: 45 },
  { month: "Feb", hours: 52 },
  { month: "Mar", hours: 48 },
  { month: "Apr", hours: 61 },
  { month: "May", hours: 55 },
  { month: "Jun", hours: 67 },
];

const tagData = [
  { tag: "Quran", hours: 120 },
  { tag: "Hadith", hours: 95 },
  { tag: "Fiqh", hours: 78 },
  { tag: "Seerah", hours: 65 },
  { tag: "Tafsir", hours: 52 },
];

const chartConfig = {
  hours: {
    label: "Hours",
    color: "hsl(var(--chart-1))",
  },
};

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of Islamic content and transcription statistics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Speakers"
          value={211}
          icon={Users}
          description="Islamic scholars and speakers"
        />
        <StatCard
          title="Playlists"
          value={9366}
          icon={ListMusic}
          description="Organized content collections"
        />
        <StatCard
          title="Media Files"
          value={457699}
          icon={FileText}
          description="Audio and video content"
        />
        <StatCard
          title="Hadith Books"
          value={6}
          icon={BookOpen}
          description="Classical hadith collections"
        />
        <StatCard
          title="Hadiths"
          value={34084}
          icon={ScrollText}
          description="Individual hadith narrations"
        />
        <StatCard
          title="Shamela Books"
          value={8492}
          icon={Library}
          description="Digital Islamic library"
        />
        <StatCard
          title="Shamela Authors"
          value={3163}
          icon={UserCheck}
          description="Classical and modern scholars"
        />
        <StatCard
          title="Categories"
          value={40}
          icon={FolderOpen}
          description="Subject classifications"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Transcribed Hours per Month</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="var(--color-hours)" 
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Transcribed Hours by Tag</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tagData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tag" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="hours" 
                    fill="var(--color-hours)" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}