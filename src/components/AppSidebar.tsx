import { MessageSquare, Heart, BookOpen } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const items = [
  { title: "AI Chat", url: "/", icon: MessageSquare },
  { title: "Daily Guidance", url: "/daily-guidance", icon: Heart },
  { title: "Quran", url: "/quran", icon: BookOpen },
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <div className="flex flex-col h-full p-4">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-sidebar-foreground">
          Muslim AI Assistant
        </h2>
      </div>
      
      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.url);
          
          return (
            <NavLink
              key={item.title}
              to={item.url}
              end={item.url === "/"}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                active 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}