import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
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
        <SidebarProvider>
          <div className="min-h-screen w-full">
            <ResizablePanelGroup direction="horizontal" className="h-screen">
              <ResizablePanel 
                defaultSize={20} 
                minSize={10} 
                maxSize={25}
                className="min-w-0"
              >
                <AppSidebar />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={80} className="flex flex-col">
                <header className="h-12 flex items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <SidebarTrigger className="ml-4" />
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
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
