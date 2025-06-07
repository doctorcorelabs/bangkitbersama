import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react"; // Added useState
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MentalHealthCheckPage from "./pages/MentalHealthCheckPage";
import RencanaAksiPersonalPage from "./pages/RencanaAksiPersonalPage"; // Added import
import MindfulnessBreathingPage from "./pages/exercises/MindfulnessBreathingPage";
import ProgressiveMuscleRelaxationPage from "./pages/exercises/ProgressiveMuscleRelaxationPage";
import ManagingAnxietyArticlePage from "./pages/education/ManagingAnxietyArticlePage";
import CBTIntroductionPage from "./pages/education/CBTIntroductionPage";
import TentangKamiPage from "./pages/TentangKamiPage"; // Added import
import EdukasiPage from "./pages/EdukasiPage"; // Added import
import MainLayout from "./components/layouts/MainLayout";
import ChatbotUI from "./components/ChatbotUI"; // Will be created next

const queryClient = new QueryClient();

const App = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const toggleChatbot = () => setIsChatbotOpen(!isChatbotOpen);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout toggleChatbot={toggleChatbot} />}>
              <Route path="/" element={<Index />} />
              <Route path="/cek-kondisi-mental" element={<MentalHealthCheckPage />} />
            <Route path="/rencana-aksi-personal" element={<RencanaAksiPersonalPage />} /> {/* Added route */}
            <Route path="/exercises/mindfulness-breathing" element={<MindfulnessBreathingPage />} />
            <Route path="/exercises/progressive-muscle-relaxation" element={<ProgressiveMuscleRelaxationPage />} />
            <Route path="/education/managing-anxiety" element={<ManagingAnxietyArticlePage />} />
            <Route path="/education/cbt-introduction" element={<CBTIntroductionPage />} />
            <Route path="/tentang-kami" element={<TentangKamiPage />} /> {/* Added route */}
            <Route path="/edukasi" element={<EdukasiPage />} /> {/* Added route */}
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          {/* NotFound page can be outside MainLayout if it has a different structure */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      {isChatbotOpen && <ChatbotUI isChatOpen={isChatbotOpen} onChatClose={toggleChatbot} />}
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
