import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Smile, ShieldAlert, Bed, Zap, Utensils, Target, UserCheck, MessageCircleWarning, Users } from "lucide-react";
import ReactMarkdown from 'react-markdown';

// Definisi skor untuk setiap pilihan jawaban (umum)
// cqXo1: 0, cqXo2: 1, cqXo3: 2, cqXo4: 3
const optionScores: { [key: string]: number } = {
  'o1': 0, // Tidak pernah sama sekali / Tidak sulit sama sekali
  'o2': 1, // Beberapa hari / Agak sulit
  'o3': 2, // Lebih dari separuh hari / Cukup sulit
  'o4': 3, // Hampir setiap hari / Sangat sulit
};

// Definisi domain dan pertanyaan yang masuk ke dalamnya
// Menambahkan properti ikon ke definisi domain
const questionDomains: { [key: string]: { name: string; questionIds: string[], maxScore: number; IconComponent: React.ElementType } } = {
  mood: { name: 'Suasana Hati & Minat', questionIds: ['cq1', 'cq2'], maxScore: 6, IconComponent: Smile },
  anxiety: { name: 'Kecemasan', questionIds: ['cq3', 'cq4'], maxScore: 6, IconComponent: ShieldAlert },
  sleep: { name: 'Pola Tidur', questionIds: ['cq5'], maxScore: 3, IconComponent: Bed },
  energy: { name: 'Energi & Kelelahan', questionIds: ['cq6'], maxScore: 3, IconComponent: Zap },
  appetite: { name: 'Nafsu Makan', questionIds: ['cq7'], maxScore: 3, IconComponent: Utensils },
  concentration: { name: 'Konsentrasi', questionIds: ['cq8'], maxScore: 3, IconComponent: Target },
  selfEsteem: { name: 'Perasaan Terhadap Diri Sendiri', questionIds: ['cq9'], maxScore: 3, IconComponent: UserCheck },
  disturbingThoughts: { name: 'Pikiran yang Mengganggu', questionIds: ['cq10'], maxScore: 3, IconComponent: MessageCircleWarning },
  socialFunctioning: { name: 'Fungsi Sosial & Pekerjaan', questionIds: ['cq11'], maxScore: 3, IconComponent: Users },
};

interface InterpretationResult {
  domainName: string;
  score: number;
  maxScore: number;
  category: 'Rendah' | 'Sedang' | 'Tinggi' | 'Sangat Tinggi';
  message: string;
  IconComponent: React.ElementType;
}

const getRuleBasedMessages = (results: InterpretationResult[]): string[] => {
  const messages: string[] = [];
  const getCategory = (domainName: string): InterpretationResult['category'] | undefined => {
    return results.find(r => r.domainName === domainName)?.category;
  };

  const anxietyCategory = getCategory('Kecemasan');
  const sleepCategory = getCategory('Pola Tidur');
  const moodCategory = getCategory('Suasana Hati & Minat');
  const energyCategory = getCategory('Energi & Kelelahan');

  // Rule 1: Kecemasan Tinggi & Pola Tidur Terganggu
  if ((anxietyCategory === 'Tinggi' || anxietyCategory === 'Sangat Tinggi') &&
      (sleepCategory === 'Tinggi' || sleepCategory === 'Sangat Tinggi')) {
    messages.push("Kami melihat tingkat kecemasan Anda tinggi dan pola tidur Anda juga menunjukkan adanya masalah. Kedua hal ini seringkali saling terkait. Mengelola stres dan kecemasan di siang hari, serta menciptakan rutinitas tidur yang menenangkan, mungkin dapat membantu memperbaiki kualitas tidur Anda.");
  }

  // Rule 2: Suasana Hati Buruk & Energi Rendah
  if ((moodCategory === 'Tinggi' || moodCategory === 'Sangat Tinggi') &&
      (energyCategory === 'Tinggi' || energyCategory === 'Sangat Tinggi')) {
    messages.push("Tampaknya suasana hati Anda sedang kurang baik dan ini mungkin juga memengaruhi tingkat energi Anda. Perasaan sedih atau kurang minat yang berkepanjangan dapat menguras energi. Aktivitas fisik ringan atau melakukan hobi yang Anda sukai, meskipun terasa sulit, terkadang bisa membantu meningkatkan suasana hati dan energi secara bertahap.");
  }
  
  // Rule 3: Fungsi Sosial Terganggu & Pikiran Mengganggu Tinggi
  const socialFunctioningCategory = getCategory('Fungsi Sosial & Pekerjaan');
  const disturbingThoughtsCategory = getCategory('Pikiran yang Mengganggu');
  if ((socialFunctioningCategory === 'Tinggi' || socialFunctioningCategory === 'Sangat Tinggi') &&
      (disturbingThoughtsCategory === 'Sangat Tinggi')) {
    messages.push("Kesulitan dalam fungsi sosial dan pekerjaan yang Anda alami bersamaan dengan pikiran yang mengganggu pada tingkat sangat tinggi memerlukan perhatian serius. Kombinasi ini bisa sangat memberatkan. Sangat penting untuk segera mencari bantuan profesional untuk mendapatkan dukungan dan strategi penanganan yang tepat.");
  }


  return messages;
};

const calculateInterpretation = (answers: { [key: string]: string }): InterpretationResult[] => {
  const results: InterpretationResult[] = [];

  for (const domainKey in questionDomains) {
    const domainInfo = questionDomains[domainKey];
    let domainScore = 0;
    domainInfo.questionIds.forEach(questionId => {
      const answerId = answers[questionId]; 
      if (answerId) {
        const optionKey = answerId.slice(-2); 
        domainScore += optionScores[optionKey] || 0;
      }
    });

    let category: InterpretationResult['category'];
    let message = '';
    const percentage = (domainInfo.maxScore > 0) ? (domainScore / domainInfo.maxScore) * 100 : 0;

    if (domainKey === 'disturbingThoughts') {
      if (domainScore >= 2) category = 'Sangat Tinggi';
      else if (domainScore === 1) category = 'Sedang';
      else category = 'Rendah';
    } else {
      if (percentage <= 33) category = 'Rendah';
      else if (percentage <= 66) category = 'Sedang';
      else category = 'Tinggi';
    }
    
    switch (category) {
      case 'Rendah':
        message = `Skor Anda untuk ${domainInfo.name.toLowerCase()} menunjukkan tingkat yang rendah. Ini adalah hal yang positif dan menunjukkan bahwa aspek ini dalam kondisi baik saat ini. Pertahankan kebiasaan sehat yang mendukung kondisi ini.`;
        break;
      case 'Sedang':
        message = `Anda melaporkan beberapa gejala terkait ${domainInfo.name.toLowerCase()} yang berada pada tingkat sedang. Ini adalah area yang mungkin memerlukan perhatian lebih. Cobalah untuk mengidentifikasi pemicu atau situasi yang mungkin berkontribusi dan pertimbangkan strategi koping sederhana. Jika berlanjut, memantau perkembangan bisa bermanfaat.`;
        break;
      case 'Tinggi':
        message = `Hasil Anda menunjukkan tingkat ${domainInfo.name.toLowerCase()} yang cukup signifikan. Penting untuk tidak mengabaikan ini. Mempertimbangkan untuk berbicara dengan teman tepercaya, anggota keluarga, atau mencari informasi lebih lanjut dari sumber yang kredibel bisa menjadi langkah awal yang baik. Jika gejala ini mengganggu aktivitas sehari-hari, berkonsultasi dengan profesional sangat dianjurkan.`;
        break;
      case 'Sangat Tinggi':
        if (domainKey === 'disturbingThoughts') {
          message = `Skor Anda untuk Pikiran yang Mengganggu berada pada tingkat yang sangat tinggi. Pikiran untuk melukai diri sendiri atau merasa lebih baik mati adalah hal yang sangat serius dan membutuhkan perhatian segera. Mohon jangan abaikan ini. Segera hubungi layanan darurat (misalnya, 119 di Indonesia) atau hotline kesehatan mental tepercaya. Bantuan profesional sangat penting dan tersedia untuk Anda. Anda tidak sendirian.`;
        } else {
          message = `Skor Anda untuk ${domainInfo.name.toLowerCase()} berada pada tingkat yang sangat tinggi. Ini menandakan adanya tekanan yang signifikan pada aspek ini. Sangat penting untuk mencari dukungan. Jika Anda merasa sangat tertekan, kewalahan, atau membutuhkan bantuan segera, jangan ragu untuk menghubungi profesional kesehatan mental atau layanan dukungan darurat yang tersedia. Anda tidak harus melalui ini sendirian.`;
        }
        break;
    }

    results.push({
      domainName: domainInfo.name,
      score: domainScore,
      maxScore: domainInfo.maxScore,
      category,
      message,
      IconComponent: domainInfo.IconComponent,
    });
  }
  return results;
};

const comprehensiveQuestions = [
  // Suasana Hati & Minat
  {
    id: 'cq1',
    text: 'Dalam 2 minggu terakhir, seberapa sering Anda merasa sedih, murung, atau putus asa?',
    options: [
      { id: 'cq1o1', text: 'Tidak pernah sama sekali' },
      { id: 'cq1o2', text: 'Beberapa hari' },
      { id: 'cq1o3', text: 'Lebih dari separuh hari' },
      { id: 'cq1o4', text: 'Hampir setiap hari' },
    ],
  },
  {
    id: 'cq2',
    text: 'Dalam 2 minggu terakhir, seberapa sering Anda kehilangan minat atau kesenangan dalam melakukan hal-hal yang biasanya Anda nikmati?',
    options: [
      { id: 'cq2o1', text: 'Tidak pernah sama sekali' },
      { id: 'cq2o2', text: 'Beberapa hari' },
      { id: 'cq2o3', text: 'Lebih dari separuh hari' },
      { id: 'cq2o4', text: 'Hampir setiap hari' },
    ],
  },
  // Kecemasan
  {
    id: 'cq3',
    text: 'Dalam 2 minggu terakhir, seberapa sering Anda merasa gugup, cemas, atau sangat tegang?',
    options: [
      { id: 'cq3o1', text: 'Tidak pernah sama sekali' },
      { id: 'cq3o2', text: 'Beberapa hari' },
      { id: 'cq3o3', text: 'Lebih dari separuh hari' },
      { id: 'cq3o4', text: 'Hampir setiap hari' },
    ],
  },
  {
    id: 'cq4',
    text: 'Dalam 2 minggu terakhir, seberapa sering Anda tidak mampu menghentikan atau mengendalikan rasa khawatir?',
    options: [
      { id: 'cq4o1', text: 'Tidak pernah sama sekali' },
      { id: 'cq4o2', text: 'Beberapa hari' },
      { id: 'cq4o3', text: 'Lebih dari separuh hari' },
      { id: 'cq4o4', text: 'Hampir setiap hari' },
    ],
  },
  // Pola Tidur
  {
    id: 'cq5',
    text: 'Dalam 2 minggu terakhir, seberapa sering Anda mengalami kesulitan untuk tidur (sulit terlelap, sering terbangun, atau tidur terlalu dini)?',
    options: [
      { id: 'cq5o1', text: 'Tidak pernah sama sekali' },
      { id: 'cq5o2', text: 'Beberapa hari' },
      { id: 'cq5o3', text: 'Lebih dari separuh hari' },
      { id: 'cq5o4', text: 'Hampir setiap hari' },
    ],
  },
  // Energi & Kelelahan
  {
    id: 'cq6',
    text: 'Dalam 2 minggu terakhir, seberapa sering Anda merasa lelah atau kekurangan energi?',
    options: [
      { id: 'cq6o1', text: 'Tidak pernah sama sekali' },
      { id: 'cq6o2', text: 'Beberapa hari' },
      { id: 'cq6o3', text: 'Lebih dari separuh hari' },
      { id: 'cq6o4', text: 'Hampir setiap hari' },
    ],
  },
  // Nafsu Makan
  {
    id: 'cq7',
    text: 'Dalam 2 minggu terakhir, seberapa sering Anda mengalami perubahan nafsu makan (berkurang atau berlebih)?',
    options: [
      { id: 'cq7o1', text: 'Tidak pernah sama sekali' },
      { id: 'cq7o2', text: 'Beberapa hari' },
      { id: 'cq7o3', text: 'Lebih dari separuh hari' },
      { id: 'cq7o4', text: 'Hampir setiap hari' },
    ],
  },
  // Konsentrasi
  {
    id: 'cq8',
    text: 'Dalam 2 minggu terakhir, seberapa sering Anda kesulitan berkonsentrasi pada sesuatu, seperti membaca koran atau menonton televisi?',
    options: [
      { id: 'cq8o1', text: 'Tidak pernah sama sekali' },
      { id: 'cq8o2', text: 'Beberapa hari' },
      { id: 'cq8o3', text: 'Lebih dari separuh hari' },
      { id: 'cq8o4', text: 'Hampir setiap hari' },
    ],
  },
  // Perasaan terhadap Diri Sendiri
  {
    id: 'cq9',
    text: 'Dalam 2 minggu terakhir, seberapa sering Anda merasa buruk tentang diri sendiri — atau bahwa Anda adalah seorang yang gagal atau telah mengecewakan diri sendiri atau keluarga Anda?',
    options: [
      { id: 'cq9o1', text: 'Tidak pernah sama sekali' },
      { id: 'cq9o2', text: 'Beberapa hari' },
      { id: 'cq9o3', text: 'Lebih dari separuh hari' },
      { id: 'cq9o4', text: 'Hampir setiap hari' },
    ],
  },
  // Pikiran yang Mengganggu
  {
    id: 'cq10',
    text: 'Dalam 2 minggu terakhir, seberapa sering Anda terganggu oleh pikiran bahwa Anda lebih baik mati atau ingin melukai diri sendiri dengan cara apapun?',
    options: [
      { id: 'cq10o1', text: 'Tidak pernah sama sekali' },
      { id: 'cq10o2', text: 'Beberapa hari' },
      { id: 'cq10o3', text: 'Lebih dari separuh hari' },
      { id: 'cq10o4', text: 'Hampir setiap hari' },
    ],
    // Catatan: Pertanyaan ini sensitif. Jika jawaban mengarah pada risiko, perlu ada tindak lanjut yang jelas (misal, info hotline darurat).
  },
   // Fungsi Sosial
  {
    id: 'cq11',
    text: 'Dalam 2 minggu terakhir, sejauh mana masalah-masalah ini (jika ada) menyulitkan Anda dalam melakukan pekerjaan, mengurus rumah tangga, atau bergaul dengan orang lain?',
    options: [
      { id: 'cq11o1', text: 'Tidak sulit sama sekali' },
      { id: 'cq11o2', text: 'Agak sulit' },
      { id: 'cq11o3', text: 'Cukup sulit' },
      { id: 'cq11o4', text: 'Sangat sulit' },
    ],
  },
];

const MentalHealthCheckPage: React.FC = () => {
  const navigate = useNavigate();
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [interpretationResults, setInterpretationResults] = useState<InterpretationResult[]>([]);
  const [ruleBasedMessages, setRuleBasedMessages] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [aiInterpretation, setAiInterpretation] = useState<string | null>(null);
  const [isAILoading, setIsAILoading] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);


  const handleStartCheck = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setInterpretationResults([]);
    setRuleBasedMessages([]); // Reset rule-based messages
    setAiInterpretation(null); // Reset AI interpretation
    setAiError(null); // Reset AI error
    setIsAILoading(false); // Reset AI loading state
    setShowResults(false);
  };

  const handleAnswerChange = (questionId: string, answerId: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answerId,
    }));
  };

  const handleNextQuestion = () => {
    if (!answers[comprehensiveQuestions[currentQuestionIndex]?.id] && currentQuestionIndex < comprehensiveQuestions.length) {
       alert("Mohon pilih salah satu jawaban untuk melanjutkan.");
       return;
    }

    if (currentQuestionIndex < comprehensiveQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Pesan penyemangat setiap 3 pertanyaan (misalnya setelah pertanyaan ke-3, ke-6, dst.)
      // Indeks dimulai dari 0, jadi currentQuestionIndex + 1 adalah nomor pertanyaan aktual
      if ((currentQuestionIndex + 1) % 3 === 0 && (currentQuestionIndex + 1) < comprehensiveQuestions.length) {
        toast.success("Kerja bagus! Terus lanjutkan.", {
          description: `Anda sudah menjawab ${currentQuestionIndex + 1} pertanyaan.`,
          duration: 2000,
        });
      }
    } else {
      toast.info("Hampir selesai...", {
        description: "Menyiapkan hasil pemeriksaan Anda.",
        duration: 2500,
      });
      console.log('Kuesioner Selesai. Jawaban akhir:', answers);
      const results = calculateInterpretation(answers);
      const dynamicMessages = getRuleBasedMessages(results);
      setInterpretationResults(results);
      setRuleBasedMessages(dynamicMessages);
      setShowResults(true); 
      setCurrentQuestionIndex(comprehensiveQuestions.length); 
    }
  };

  const currentQuestion = comprehensiveQuestions[currentQuestionIndex]; 

  const handleGoToHome = () => {
    navigate('/');
  };

  const handleFetchAIInterpretation = async () => {
    if (interpretationResults.length === 0) {
      toast.error("Tidak ada hasil untuk dianalisis oleh AI.");
      return;
    }
    setIsAILoading(true);
    setAiError(null);
    setAiInterpretation(null);

    try {
      const response = await fetch('/.netlify/functions/getAIInterpretation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(interpretationResults),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Gagal mendapatkan interpretasi AI (Status: ${response.status})`);
      }

      setAiInterpretation(data.interpretation);
      toast.success("Analisis AI berhasil dimuat!");

    } catch (error: any) {
      console.error("Error fetching AI interpretation:", error);
      setAiError(error.message || "Terjadi kesalahan saat mengambil analisis AI.");
      toast.error(error.message || "Gagal memuat analisis AI.");
    } finally {
      setIsAILoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 flex flex-col items-center justify-center"> {/* Dihapus min-h-screen dan bg-gradient karena sudah di MainLayout */}
      <Card className="w-full max-w-3xl shadow-xl rounded-lg"> {/* Diubah max-w-2xl menjadi max-w-3xl */}
        <CardHeader className="bg-teal-600 text-white p-6 rounded-t-lg">
          <CardTitle className="text-3xl font-bold text-center">Pemeriksaan Kondisi Mental Awal</CardTitle>
          {!quizStarted && (
            <CardDescription className="text-center text-teal-100 mt-2">
              Jawab beberapa pertanyaan berikut untuk mendapatkan gambaran awal mengenai kondisi kesehatan mental Anda.
              Proses ini bersifat anonim dan hasilnya bukan merupakan diagnosis medis.
            </CardDescription>
          )}
           {quizStarted && !showResults && currentQuestion && (
             <CardDescription className="text-center text-teal-100 mt-2">
                Pertanyaan {currentQuestionIndex + 1} dari {comprehensiveQuestions.length}
             </CardDescription>
           )}
            {showResults && (
             <CardDescription className="text-center text-teal-100 mt-2">
                Berikut adalah ringkasan hasil pemeriksaan Anda:
             </CardDescription>
           )}
        </CardHeader>
        {quizStarted && !showResults && currentQuestionIndex < comprehensiveQuestions.length && comprehensiveQuestions[currentQuestionIndex] && (
          <Progress 
            value={((currentQuestionIndex + 1) / comprehensiveQuestions.length) * 100} 
            className="w-[90%] mx-auto my-4 h-2" // Menggunakan my-4 untuk margin atas dan bawah, memastikan tidak ada bg color di sini
            indicatorClassName="bg-orange-500"
          />
        )}
        <CardContent className="p-6 md:p-8 min-h-[300px]">
          {!quizStarted ? (
            <div className="space-y-6">
              <p className="text-center text-gray-700 text-lg">
                Pemeriksaan ini bertujuan untuk membantu Anda memahami gambaran awal kondisi mental Anda.
              </p>
              <div className="p-4 border border-teal-200 rounded-md bg-teal-50">
                <h3 className="font-semibold text-teal-700 mb-2">Mengapa Pemeriksaan Ini Penting?</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                  <li>Membantu Anda lebih sadar akan kondisi emosional saat ini.</li>
                  <li>Memberikan langkah awal untuk mencari dukungan jika diperlukan.</li>
                  <li>Mendorong refleksi diri yang positif.</li>
                </ul>
              </div>
              <p className="text-xs text-center text-gray-500">
                Semua informasi yang Anda berikan akan dijaga kerahasiaannya. Hasil ini bukan diagnosis medis.
              </p>
            </div>
          ) : !showResults && currentQuestion ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-700 mb-6 text-lg text-center">{currentQuestion.text}</p>
                <RadioGroup
                  value={answers[currentQuestion.id] || ""}
                  onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option) => (
                    <div 
                      key={option.id} 
                      className="flex items-center space-x-3 p-3 border rounded-md hover:bg-teal-50 transition-all duration-150 ease-in-out cursor-pointer focus-within:ring-2 focus-within:ring-teal-500" 
                      onClick={() => handleAnswerChange(currentQuestion.id, option.id)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleAnswerChange(currentQuestion.id, option.id);}}
                      tabIndex={0} // Make div focusable
                    >
                      <RadioGroupItem 
                        value={option.id} 
                        id={option.id} 
                        className="border-gray-400 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
                      />
                      <Label htmlFor={option.id} className="font-normal text-gray-700 flex-1 cursor-pointer">{option.text}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </motion.div>
            </AnimatePresence>
          ) : showResults ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Hasil Pemeriksaan Anda</h2>
              
              {interpretationResults.length > 0 && (
                <div className="my-6">
                  <ChartContainer 
                    config={{
                      score: { label: "Skor", color: "hsl(var(--chart-1))" },
                    }} 
                    className="mx-auto aspect-video max-h-[350px]"
                  >
                    <BarChart 
                      accessibilityLayer 
                      data={interpretationResults.map(r => ({ name: r.domainName, score: r.score, maxScore: r.maxScore }))}
                      layout="vertical"
                      margin={{ left: 20, right: 20, top: 5, bottom: 20 }}
                    >
                      <CartesianGrid horizontal={false} vertical={true} strokeDasharray="3 3" />
                      <XAxis type="number" dataKey="score" domain={[0, 'dataMax + 1']} allowDecimals={false} />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        tickLine={false} 
                        axisLine={false} 
                        width={150} 
                        tick={{ fontSize: 12 }} 
                        interval={0}
                      />
                      <RechartsTooltip
                        cursor={{ fill: 'hsl(var(--muted))' }}
                        content={<ChartTooltipContent indicator="dot" />}
                      />
                      <Bar dataKey="score" fill="var(--color-score)" radius={4} barSize={20} />
                    </BarChart>
                  </ChartContainer>
                </div>
              )}

              {interpretationResults.map(res => (
                <div key={res.domainName} className="p-4 border rounded-md bg-white shadow">
                  <h3 className="font-semibold text-lg text-teal-700 flex items-center">
                    {res.IconComponent && <res.IconComponent className="w-5 h-5 mr-2 text-teal-600" />}
                    {res.domainName}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Skor: {res.score} dari {res.maxScore} | Kategori: <span className={`font-medium ${
                      res.category === 'Tinggi' ? 'text-orange-600' : 
                      res.category === 'Sangat Tinggi' ? 'text-red-700' :
                      res.category === 'Sedang' ? 'text-yellow-600' : 'text-green-600'
                    }`}>{res.category}</span>
                  </p>
                  <p className="mt-1 text-gray-700 text-sm text-justify">{res.message}</p>
                </div>
              ))}

              {ruleBasedMessages.length > 0 && (
                <div className="mt-6 p-4 border-l-4 border-blue-500 bg-blue-50 rounded-md shadow">
                  <h4 className="font-semibold text-lg text-blue-700 mb-2">Catatan Tambahan Untuk Anda:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    {ruleBasedMessages.map((msg, index) => (
                      <li key={index} className="text-sm text-gray-700 text-justify">{msg}</li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="text-xs text-center text-gray-500 pt-4">
                Ingatlah bahwa hasil ini adalah gambaran awal dan bukan merupakan diagnosis medis. Jika Anda merasa khawatir atau membutuhkan dukungan lebih lanjut, jangan ragu untuk berkonsultasi dengan profesional kesehatan mental.
              </p>

              {/* Bagian untuk AI Interpretation */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                {!aiInterpretation && !isAILoading && !aiError && (
                  <div className="flex flex-col items-center text-center">
                    <p className="text-gray-600 mb-4">
                      Ingin mendapatkan pandangan lebih mendalam dari asisten AI kami mengenai hasil Anda?
                    </p>
                    <Button
                      onClick={handleFetchAIInterpretation}
                      disabled={isAILoading}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      {isAILoading ? 'Memproses Analisis AI...' : 'Dapatkan Analisis AI Lebih Lanjut'}
                    </Button>
                  </div>
                )}
                {isAILoading && (
                  <div className="text-center py-4">
                    <p className="text-indigo-600 animate-pulse">Memuat analisis dari AI, mohon tunggu...</p>
                    {/* Anda bisa menambahkan spinner di sini */}
                  </div>
                )}
                {aiError && (
                  <div className="mt-4 p-4 border-l-4 border-red-500 bg-red-50 rounded-md shadow">
                    <h4 className="font-semibold text-red-700 mb-1">Gagal Memuat Analisis AI</h4>
                    <p className="text-sm text-red-600">{aiError}</p>
                    <Button 
                      onClick={handleFetchAIInterpretation} 
                      variant="link" 
                      className="text-red-600 hover:text-red-800 p-0 h-auto mt-2 text-sm"
                    >
                      Coba lagi
                    </Button>
                  </div>
                )}
                {aiInterpretation && (
                  <div className="mt-4 p-4 border-l-4 border-indigo-500 bg-indigo-50 rounded-md shadow">
                    <h4 className="font-semibold text-lg text-indigo-700 mb-2">Analisis Tambahan dari Asisten AI:</h4>
                    <div className="text-sm text-gray-700 space-y-2 prose prose-sm max-w-none text-justify">
                      <ReactMarkdown>{aiInterpretation}</ReactMarkdown>
                    </div>
                    <p className="text-xs text-indigo-600 mt-3 italic">
                      Harap diingat: Analisis ini dihasilkan oleh AI dan bertujuan untuk memberikan wawasan tambahan, bukan sebagai pengganti nasihat profesional.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
             <p className="text-center text-gray-500">Memuat...</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center p-6 bg-gray-50 rounded-b-lg min-h-[76px]">
          {!quizStarted && (
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-md"
              onClick={handleStartCheck}
            >
              Mulai Pemeriksaan
            </Button>
          )}
          {quizStarted && !showResults && currentQuestion && (
             <Button 
              size="lg" 
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-md"
              onClick={handleNextQuestion}
            >
              {currentQuestionIndex < comprehensiveQuestions.length - 1 ? 'Selanjutnya' : 'Lihat Hasil'}
            </Button>
          )}
           {showResults && (
            <div className="flex space-x-4">
              <Button 
                size="lg" 
                variant="outline"
                className="border-teal-600 text-teal-600 hover:bg-teal-50 hover:text-teal-700 font-semibold py-3 px-8 rounded-md"
                onClick={handleGoToHome}
              >
                Kembali ke Beranda
              </Button>
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-md"
                onClick={handleStartCheck} // Untuk memulai lagi
              >
                Ulangi Pemeriksaan
              </Button>
              {/* Tombol baru untuk navigasi ke Rencana Aksi Personal */}
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-md"
                onClick={() => {
                  // Membuat ringkasan untuk Rencana Aksi Personal
                  let summary = "Berdasarkan hasil pemeriksaan kondisi mental saya:\n";
                  interpretationResults.forEach(res => {
                    summary += `- ${res.domainName}: Skor ${res.score}/${res.maxScore} (Kategori: ${res.category}). ${res.message}\n`;
                  });
                  if (ruleBasedMessages.length > 0) {
                    summary += "\nCatatan Tambahan:\n";
                    ruleBasedMessages.forEach(msg => {
                      summary += `- ${msg}\n`;
                    });
                  }
                  if (aiInterpretation) {
                    summary += `\nAnalisis Tambahan dari Asisten AI:\n${aiInterpretation}\n`;
                  }

                  // Create a clean version of interpretationResults for navigation state
                  const cleanInterpretationResults = interpretationResults.map(res => ({
                    domainName: res.domainName,
                    score: res.score,
                    maxScore: res.maxScore,
                    category: res.category,
                    message: res.message 
                    // IconComponent is omitted as it's not clonable
                  }));

                  navigate('/rencana-aksi-personal', { 
                    state: { 
                      assessmentSummary: summary,
                      rawResults: cleanInterpretationResults // Pass the clean results
                    } 
                  });
                }}
              >
                Dapatkan Rencana Aksi Personal
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default MentalHealthCheckPage;
