import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { AppSidebar } from "@/components/AppSidebar";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";
import DailyGuidance from "./pages/DailyGuidance";
import Quran from "./pages/Quran";
import Speakers from "./pages/Speakers";
import SpeakerProfile from "./pages/SpeakerProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const isMobile = useIsMobile();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider defaultOpen={!isMobile}>
            <div className="min-h-screen flex w-full">
              <ResizablePanelGroup direction="horizontal" className="min-h-screen">
                <ResizablePanel
                  defaultSize={isMobile ? 0 : 20}
                  minSize={isMobile ? 0 : 4}
                  maxSize={20}
                  collapsible={true}
                  className="relative"
                >
                  <AppSidebar />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={isMobile ? 100 : 80} minSize={50}>
                  <div className="flex flex-col h-full w-full">
                    <header className="h-12 flex items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shrink-0">
                      <SidebarTrigger className="ml-4" />
                    </header>
                    <main className="flex-1 overflow-auto w-full">
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
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
