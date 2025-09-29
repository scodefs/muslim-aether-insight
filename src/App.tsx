import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { AppSidebar } from "@/components/AppSidebar";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";
import DailyGuidance from "./pages/DailyGuidance";
import Quran from "./pages/Quran";
import Speakers from "./pages/Speakers";
import SpeakerProfile from "./pages/SpeakerProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen w-full">
          <PanelGroup direction="horizontal">
            <Panel 
              defaultSize={20} 
              minSize={10} 
              maxSize={40}
              className="bg-sidebar border-r"
            >
              <AppSidebar />
            </Panel>
            <PanelResizeHandle className="w-1 bg-border hover:bg-accent-foreground/20 transition-colors" />
            <Panel defaultSize={80}>
              <div className="flex flex-col h-full">
                <header className="h-12 flex items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <div className="ml-4 text-sm font-medium text-muted-foreground">
                    Muslim AI Assistant
                  </div>
                </header>
                <main className="flex-1 overflow-hidden">
                  <Routes>
                    <Route path="/" element={<Chat />} />
                    <Route path="/daily-guidance" element={<DailyGuidance />} />
                    <Route path="/quran" element={<Quran />} />
                    <Route path="/speakers" element={<Speakers />} />
                    <Route path="/speakers/:id" element={<SpeakerProfile />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </Panel>
          </PanelGroup>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
