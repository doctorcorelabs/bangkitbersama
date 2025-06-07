import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom"; // Import Link
import { Loader2 } from "lucide-react"; // For loading spinner
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Define InterpretationResult interface locally as it's used for location.state.rawResults
// This should ideally be in a shared types file if used in multiple places.
interface InterpretationResult {
  domainName: string;
  score: number;
  maxScore: number;
  category: 'Rendah' | 'Sedang' | 'Tinggi' | 'Sangat Tinggi';
  // message: string; // Not strictly needed for theme extraction here
  // IconComponent: React.ElementType; // Not strictly needed for theme extraction here
}

const RencanaAksiPersonalPage = () => {
  const [assessmentSummaryText, setAssessmentSummaryText] = useState("");
  const [inputText, setInputText] = useState(""); // This will now be for user's additional input
  const [generatedPlan, setGeneratedPlan] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [displayedResources, setDisplayedResources] = useState<typeof availableResources>([]);
  const abortControllerRef = useRef<AbortController | null>(null);
  const location = useLocation();

  const availableResources = [
    { id: 'mindfulness-breathing', name: "Latihan Pernapasan Mindfulness", path: "/exercises/mindfulness-breathing", relevantThemes: ["kecemasan", "stres", "pola tidur", "suasana hati & minat"] },
    { id: 'progressive-muscle-relaxation', name: "Latihan Relaksasi Otot Progresif", path: "/exercises/progressive-muscle-relaxation", relevantThemes: ["kecemasan", "stres", "pola tidur"] },
    { id: 'managing-anxiety-article', name: "Artikel Mengelola Kecemasan", path: "/education/managing-anxiety", relevantThemes: ["kecemasan", "stres", "pikiran yang mengganggu"] },
    { id: 'cbt-introduction-article', name: "Panduan Pengantar CBT", path: "/education/cbt-introduction", relevantThemes: ["kecemasan", "stres", "suasana hati & minat", "pikiran yang mengganggu"] }
  ];

  useEffect(() => {
    if (location.state?.assessmentSummary) {
      setAssessmentSummaryText(location.state.assessmentSummary);
      setInputText(""); 
    }

    if (location.state?.rawResults) {
      const results = location.state.rawResults as InterpretationResult[];
      const themesFromAssessment = results
        .filter(res => res.category === 'Tinggi' || res.category === 'Sangat Tinggi')
        .map(res => res.domainName.toLowerCase());
      
      if (themesFromAssessment.length > 0) {
        const uniqueThemes = [...new Set(themesFromAssessment)];
        localStorage.setItem('userPersonalizedThemes', JSON.stringify(uniqueThemes));
        console.log('Personalized themes saved to localStorage:', uniqueThemes);
      } else {
        // If no high-scoring domains, clear any previous themes or set to empty
        localStorage.removeItem('userPersonalizedThemes'); 
      }
      // Update displayed resources based on themes
      const storedThemesRaw = localStorage.getItem('userPersonalizedThemes');
      const personalizedThemes: string[] = storedThemesRaw ? JSON.parse(storedThemesRaw) : [];

      let resourcesToShow = [];
      if (personalizedThemes.length > 0) {
        resourcesToShow = availableResources.filter(resource => 
          resource.relevantThemes.some(theme => personalizedThemes.includes(theme))
        );
        if (resourcesToShow.length === 0) {
          // Fallback: if no specific match, show all or a default set. For now, show all.
          // Or, to show none if no specific match: resourcesToShow = [];
          resourcesToShow = availableResources; 
        }
      } else {
        // If no themes in localStorage, show all resources as a default
        resourcesToShow = availableResources;
      }
      setDisplayedResources(resourcesToShow);
    } else {
      // If no rawResults (e.g. user navigated directly), show all resources
      setDisplayedResources(availableResources);
    }
  }, [location.state]);

  const workerUrl = "https://ai-action-plan-worker.daivanfebrijuansetiya.workers.dev/api/generate-action-plan";

  const handleGeneratePlan = async () => {
    const combinedInput = `${assessmentSummaryText ? `Ringkasan Hasil Asesmen Sebelumnya:\n${assessmentSummaryText}\n\n` : ''}Input Tambahan Pengguna:\n${inputText}`;
    
    if (!inputText.trim() && !assessmentSummaryText.trim()) {
      setError("Mohon masukkan deskripsi situasi atau perasaan Anda, atau pastikan ada hasil asesmen sebelumnya.");
      return;
    }
    if (!inputText.trim() && assessmentSummaryText.trim()) {
      // If only assessment summary is present and user input is empty,
      // we might want to confirm if they want to proceed or add more details.
      // For now, we'll proceed if there's at least some text.
      // Or, we can enforce user input:
      // setError("Mohon tambahkan deskripsi tambahan mengenai situasi atau perasaan Anda saat ini.");
      // return;
    }


    setIsLoading(true);
    setError(null);
    setGeneratedPlan(""); // Clear previous plan

    // Abort previous request if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch(workerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputText: combinedInput.trim() }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Gagal memproses respons error dari server."}));
        throw new Error(
          `Server error: ${response.status} ${response.statusText}. ${errorData.error || errorData.details || ""}`
        );
      }

      if (!response.body) {
        throw new Error("Tidak ada respons stream dari server.");
      }

      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
      let accumulatedText = "";

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        accumulatedText += value;
        setGeneratedPlan(accumulatedText);
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Fetch aborted');
        setError("Proses dibatalkan.");
      } else {
        console.error("Error generating plan:", err);
        setError(err.message || "Terjadi kesalahan saat membuat rencana aksi.");
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
      setError("Pembuatan rencana dibatalkan.");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-2 text-primary font-heading">
          Rencana Aksi Personal Anda
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          Deskripsikan situasi, perasaan, atau tantangan yang sedang Anda hadapi.
          AI akan membantu membuatkan rencana aksi yang dipersonalisasi untuk Anda.
        </p>

        <div className="space-y-6">
          {assessmentSummaryText && (
            <Card className="bg-slate-50">
              <CardHeader>
                <CardTitle className="text-lg text-slate-700">Ringkasan Hasil Pemeriksaan Anda Sebelumnya</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap text-sm text-slate-600 p-3 bg-slate-100 rounded-md max-h-60 overflow-y-auto">
                  {assessmentSummaryText}
                </pre>
              </CardContent>
            </Card>
          )}

          <div>
            <label htmlFor="userInput" className="block text-sm font-medium text-gray-700 mb-1">
              {assessmentSummaryText ? "Tambahkan detail atau fokus spesifik Anda di sini:" : "Deskripsikan situasi, perasaan, atau tantangan Anda:"}
            </label>
            <Textarea
              id="userInput"
              placeholder="Contoh: Saya ingin fokus mengatasi kesulitan tidur dan rasa cemas berlebih saat presentasi di kantor..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={5}
              className="resize-none"
              disabled={isLoading}
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={handleGeneratePlan}
              disabled={isLoading || (!inputText.trim() && !assessmentSummaryText.trim())}
              className="w-full sm:w-auto flex-grow"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Membuat Rencana...
                </>
              ) : (
                "Buat Rencana Aksi"
              )}
            </Button>
            {isLoading && (
              <Button
                onClick={handleCancel}
                variant="outline"
                className="w-full sm:w-auto"
              >
                Batal
              </Button>
            )}
          </div>
        </div>

        {generatedPlan && !isLoading && (
          <div className="mt-8 p-6 border rounded-lg bg-card shadow">
            <h2 className="text-2xl font-semibold mb-4 text-primary font-heading">Rencana Aksi Anda:</h2>
            <div
              className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-card-foreground text-justify" // Added text-justify
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  a: ({node, ...props}: any) => {
                    const href = props.href || "";
                    if (href.startsWith('app://exercise/')) {
                      const path = href.replace('app://exercise/', '/exercises/');
                      return <Link to={path} {...props} className="text-blue-600 hover:text-blue-800 underline" />;
                    } else if (href.startsWith('app://education/')) {
                      const path = href.replace('app://education/', '/education/');
                      return <Link to={path} {...props} className="text-blue-600 hover:text-blue-800 underline" />;
                    }
                    // Default behavior for external links
                    return <a {...props} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-800 underline" />;
                  }
                }}
              >
                {generatedPlan}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {generatedPlan && !isLoading && displayedResources.length > 0 && (
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Sumber Daya Terkait yang Mungkin Membantu:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {displayedResources.map(resource => (
                <Link to={resource.path} key={resource.id} className="w-full">
                  <Button variant="outline" className="w-full justify-start text-left h-auto py-3 px-4">
                    {/* Icon can be added here later if desired */}
                    {resource.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RencanaAksiPersonalPage;
