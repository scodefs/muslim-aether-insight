import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";
import Quran from "./pages/Quran";
import NiyyahSpace from "./pages/NiyyahSpace";
import Speakers from "./pages/Speakers";
import SpeakerProfile from "./pages/SpeakerProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <header className="h-12 flex items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <SidebarTrigger className="ml-4" />
                <div className="mr-4">
                  <ThemeToggle />
                </div>
              </header>
              <main className="flex-1 overflow-hidden">
            <Routes>
              <Route path="/" element={<Chat />} />
              <Route path="/quran" element={<Quran />} />
              <Route path="/niyyah-space" element={<NiyyahSpace />} />
              <Route path="/speakers" element={<Speakers />} />
              <Route path="/speakers/:id" element={<SpeakerProfile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
