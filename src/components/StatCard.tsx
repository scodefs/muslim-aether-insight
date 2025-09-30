import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
}

export function StatCard({ title, value, icon: Icon, description }: StatCardProps) {
  return (
    <Card className="transition-colors animate-scale-in overflow-hidden border-accent/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium truncate pr-2">{title}</CardTitle>
        <Icon className="h-4 w-4 text-accent flex-shrink-0" />
      </CardHeader>
      <CardContent>
        <div className="text-lg sm:text-2xl font-bold truncate">{value.toLocaleString()}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-tight">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}