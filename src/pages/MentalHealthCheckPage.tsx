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
import { useIsMobile } from '@/hooks/use-mobile';
import { useTranslation } from 'react-i18next';

// Definisi skor untuk setiap pilihan jawaban (umum)
// cqXo1: 0, cqXo2: 1, cqXo3: 2, cqXo4: 3
const optionScores: { [key: string]: number } = {
  'o1': 0, // Tidak pernah sama sekali / Tidak sulit sama sekali
  'o2': 1, // Beberapa hari / Agak sulit
  'o3': 2, // Lebih dari separuh hari / Cukup sulit
  'o4': 3, // Hampir setiap hari / Sangat sulit
};

const MentalHealthCheckPage: React.FC = () => {
  const { t, i18n } = useTranslation();
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
  const isMobile = useIsMobile();

  const questionDomains: { [key: string]: { name: string; questionIds: string[], maxScore: number; IconComponent: React.ElementType } } = {
    mood: { name: t('domain_mood'), questionIds: ['cq1', 'cq2'], maxScore: 6, IconComponent: Smile },
    anxiety: { name: t('domain_anxiety'), questionIds: ['cq3', 'cq4'], maxScore: 6, IconComponent: ShieldAlert },
    sleep: { name: t('domain_sleep'), questionIds: ['cq5'], maxScore: 3, IconComponent: Bed },
    energy: { name: t('domain_energy'), questionIds: ['cq6'], maxScore: 3, IconComponent: Zap },
    appetite: { name: t('domain_appetite'), questionIds: ['cq7'], maxScore: 3, IconComponent: Utensils },
    concentration: { name: t('domain_concentration'), questionIds: ['cq8'], maxScore: 3, IconComponent: Target },
    selfEsteem: { name: t('domain_self_esteem'), questionIds: ['cq9'], maxScore: 3, IconComponent: UserCheck },
    disturbingThoughts: { name: t('domain_disturbing_thoughts'), questionIds: ['cq10'], maxScore: 3, IconComponent: MessageCircleWarning },
    socialFunctioning: { name: t('domain_social_functioning'), questionIds: ['cq11'], maxScore: 3, IconComponent: Users },
  };
  
  interface InterpretationResult {
    domainName: string;
    score: number;
    maxScore: number;
    category: 'Low' | 'Medium' | 'High' | 'Very High';
    message: string;
    IconComponent: React.ElementType;
  }
  
  const getRuleBasedMessages = (results: InterpretationResult[]): string[] => {
    const messages: string[] = [];
    const getCategory = (domainName: string): InterpretationResult['category'] | undefined => {
      return results.find(r => r.domainName === domainName)?.category;
    };
  
    const anxietyCategory = getCategory(t('domain_anxiety'));
    const sleepCategory = getCategory(t('domain_sleep'));
    const moodCategory = getCategory(t('domain_mood'));
    const energyCategory = getCategory(t('domain_energy'));
  
    // Rule 1: Kecemasan Tinggi & Pola Tidur Terganggu
    if ((anxietyCategory === 'High' || anxietyCategory === 'Very High') &&
        (sleepCategory === 'High' || sleepCategory === 'Very High')) {
      messages.push(t('rule_anxiety_sleep'));
    }
  
    // Rule 2: Suasana Hati Buruk & Energi Rendah
    if ((moodCategory === 'High' || moodCategory === 'Very High') &&
        (energyCategory === 'High' || energyCategory === 'Very High')) {
      messages.push(t('rule_mood_energy'));
    }
    
    // Rule 3: Fungsi Sosial Terganggu & Pikiran Mengganggu Tinggi
    const socialFunctioningCategory = getCategory(t('domain_social_functioning'));
    const disturbingThoughtsCategory = getCategory(t('domain_disturbing_thoughts'));
    if ((socialFunctioningCategory === 'High' || socialFunctioningCategory === 'Very High') &&
        (disturbingThoughtsCategory === 'Very High')) {
      messages.push(t('rule_social_thoughts'));
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
        if (domainScore >= 2) category = 'Very High';
        else if (domainScore === 1) category = 'Medium';
        else category = 'Low';
      } else {
        if (percentage <= 33) category = 'Low';
        else if (percentage <= 66) category = 'Medium';
        else category = 'High';
      }
      
      switch (category) {
        case 'Low':
          message = t('interp_low', { domain: domainInfo.name.toLowerCase() });
          break;
        case 'Medium':
          message = t('interp_medium', { domain: domainInfo.name.toLowerCase() });
          break;
        case 'High':
          message = t('interp_high', { domain: domainInfo.name.toLowerCase() });
          break;
        case 'Very High':
          if (domainKey === 'disturbingThoughts') {
            message = t('interp_very_high_disturbing');
          } else {
            message = t('interp_very_high_general', { domain: domainInfo.name.toLowerCase() });
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
      text: t('q1_text'),
      options: [
        { id: 'cq1o1', text: t('q_option_never') },
        { id: 'cq1o2', text: t('q_option_several_days') },
        { id: 'cq1o3', text: t('q_option_more_than_half') },
        { id: 'cq1o4', text: t('q_option_nearly_every_day') },
      ],
    },
    {
      id: 'cq2',
      text: t('q2_text'),
      options: [
        { id: 'cq2o1', text: t('q_option_never') },
        { id: 'cq2o2', text: t('q_option_several_days') },
        { id: 'cq2o3', text: t('q_option_more_than_half') },
        { id: 'cq2o4', text: t('q_option_nearly_every_day') },
      ],
    },
    // Kecemasan
    {
      id: 'cq3',
      text: t('q3_text'),
      options: [
        { id: 'cq3o1', text: t('q_option_never') },
        { id: 'cq3o2', text: t('q_option_several_days') },
        { id: 'cq3o3', text: t('q_option_more_than_half') },
        { id: 'cq3o4', text: t('q_option_nearly_every_day') },
      ],
    },
    {
      id: 'cq4',
      text: t('q4_text'),
      options: [
        { id: 'cq4o1', text: t('q_option_never') },
        { id: 'cq4o2', text: t('q_option_several_days') },
        { id: 'cq4o3', text: t('q_option_more_than_half') },
        { id: 'cq4o4', text: t('q_option_nearly_every_day') },
      ],
    },
    // Pola Tidur
    {
      id: 'cq5',
      text: t('q5_text'),
      options: [
        { id: 'cq5o1', text: t('q_option_never') },
        { id: 'cq5o2', text: t('q_option_several_days') },
        { id: 'cq5o3', text: t('q_option_more_than_half') },
        { id: 'cq5o4', text: t('q_option_nearly_every_day') },
      ],
    },
    // Energi & Kelelahan
    {
      id: 'cq6',
      text: t('q6_text'),
      options: [
        { id: 'cq6o1', text: t('q_option_never') },
        { id: 'cq6o2', text: t('q_option_several_days') },
        { id: 'cq6o3', text: t('q_option_more_than_half') },
        { id: 'cq6o4', text: t('q_option_nearly_every_day') },
      ],
    },
    // Nafsu Makan
    {
      id: 'cq7',
      text: t('q7_text'),
      options: [
        { id: 'cq7o1', text: t('q_option_never') },
        { id: 'cq7o2', text: t('q_option_several_days') },
        { id: 'cq7o3', text: t('q_option_more_than_half') },
        { id: 'cq7o4', text: t('q_option_nearly_every_day') },
      ],
    },
    // Konsentrasi
    {
      id: 'cq8',
      text: t('q8_text'),
      options: [
        { id: 'cq8o1', text: t('q_option_never') },
        { id: 'cq8o2', text: t('q_option_several_days') },
        { id: 'cq8o3', text: t('q_option_more_than_half') },
        { id: 'cq8o4', text: t('q_option_nearly_every_day') },
      ],
    },
    // Perasaan terhadap Diri Sendiri
    {
      id: 'cq9',
      text: t('q9_text'),
      options: [
        { id: 'cq9o1', text: t('q_option_never') },
        { id: 'cq9o2', text: t('q_option_several_days') },
        { id: 'cq9o3', text: t('q_option_more_than_half') },
        { id: 'cq9o4', text: t('q_option_nearly_every_day') },
      ],
    },
    // Pikiran yang Mengganggu
    {
      id: 'cq10',
      text: t('q10_text'),
      options: [
        { id: 'cq10o1', text: t('q_option_never') },
        { id: 'cq10o2', text: t('q_option_several_days') },
        { id: 'cq10o3', text: t('q_option_more_than_half') },
        { id: 'cq10o4', text: t('q_option_nearly_every_day') },
      ],
    },
     // Fungsi Sosial
    {
      id: 'cq11',
      text: t('q11_text'),
      options: [
        { id: 'cq11o1', text: t('q11_option_not_difficult') },
        { id: 'cq11o2', text: t('q11_option_somewhat_difficult') },
        { id: 'cq11o3', text: t('q11_option_quite_difficult') },
        { id: 'cq11o4', text: t('q11_option_very_difficult') },
      ],
    },
  ];

  const formatYAxisTick = (tickItem: string) => {
    if (isMobile && tickItem.length > 12) {
      return `${tickItem.substring(0, 11)}...`;
    }
    return tickItem;
  };

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
       alert(t('please_select_answer'));
       return;
    }

    if (currentQuestionIndex < comprehensiveQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      if ((currentQuestionIndex + 1) % 3 === 0 && (currentQuestionIndex + 1) < comprehensiveQuestions.length) {
        toast.success(t('toast_great_job'), {
          description: t('toast_answered_questions', { count: currentQuestionIndex + 1 }),
          duration: 2000,
        });
      }
    } else {
      toast.info(t('toast_finishing_up'), {
        description: t('toast_preparing_results'),
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
      const response = await fetch('https://get-all-interpretation-worker.daivanfebrijuansetiya.workers.dev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          results: interpretationResults,
          language: i18n.language,
        }),
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
    <div className="container mx-auto py-12 px-4 flex flex-col items-center justify-center">
      <Card className="w-full max-w-3xl shadow-xl rounded-lg">
        <CardHeader className="bg-teal-600 text-white p-6 rounded-t-lg">
          <CardTitle className="text-3xl font-bold text-center">{t('mh_check_title')}</CardTitle>
          {!quizStarted && (
            <CardDescription className="text-center text-teal-100 mt-2">
              {t('mh_check_intro')}
            </CardDescription>
          )}
           {quizStarted && !showResults && currentQuestion && (
             <CardDescription className="text-center text-teal-100 mt-2">
                {t('mh_check_question_progress', { current: currentQuestionIndex + 1, total: comprehensiveQuestions.length })}
             </CardDescription>
           )}
            {showResults && (
             <CardDescription className="text-center text-teal-100 mt-2">
                {t('mh_check_results_summary')}
             </CardDescription>
           )}
        </CardHeader>
        {quizStarted && !showResults && currentQuestionIndex < comprehensiveQuestions.length && comprehensiveQuestions[currentQuestionIndex] && (
          <Progress 
            value={((currentQuestionIndex + 1) / comprehensiveQuestions.length) * 100} 
            className="w-[90%] mx-auto my-4 h-2"
            indicatorClassName="bg-orange-500"
          />
        )}
        <CardContent className="p-6 md:p-8 min-h-[300px]">
          {!quizStarted ? (
            <div className="space-y-6">
              <p className="text-center text-gray-700 text-lg">
                {t('mh_check_intro')}
              </p>
              <div className="p-4 border border-teal-200 rounded-md bg-teal-50">
                <h3 className="font-semibold text-teal-700 mb-2">{t('mh_check_why_important')}</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                  <li>{t('mh_check_why_1')}</li>
                  <li>{t('mh_check_why_2')}</li>
                  <li>{t('mh_check_why_3')}</li>
                </ul>
              </div>
              <p className="text-xs text-center text-gray-500">
                {t('mh_check_confidentiality')}
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
                      tabIndex={0}
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
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">{t('your_examination_results')}</h2>
              
              {interpretationResults.length > 0 && (
                <div className="my-6">
                  <ChartContainer 
                    config={{
                      score: { label: t('score'), color: "hsl(var(--chart-1))" },
                    }}
                    className={`mx-auto ${isMobile ? 'h-[380px] w-full' : 'aspect-video max-h-[350px]'}`}
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
                        width={isMobile ? 100 : 150}
                        tick={{ fontSize: isMobile ? 10 : 12 }}
                        interval={0}
                        tickFormatter={formatYAxisTick}
                      />
                      <RechartsTooltip
                        cursor={{ fill: 'hsl(var(--muted))' }}
                        content={<ChartTooltipContent indicator="dot" />}
                      />
                      <Bar dataKey="score" fill="var(--color-score)" radius={4} barSize={isMobile ? 16 : 20} />
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
                    {t('score')}: {res.score} {t('of')} {res.maxScore} | {t('category')}: <span className={`font-medium ${
                      res.category === 'High' ? 'text-orange-600' : 
                      res.category === 'Very High' ? 'text-red-700' :
                      res.category === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>{t(`category_${res.category.toLowerCase().replace(' ', '_')}`)}</span>
                  </p>
                  <p className="mt-1 text-gray-700 text-sm text-justify">{res.message}</p>
                </div>
              ))}

              {ruleBasedMessages.length > 0 && (
                <div className="mt-6 p-4 border-l-4 border-blue-500 bg-blue-50 rounded-md shadow">
                  <h4 className="font-semibold text-lg text-blue-700 mb-2">{t('additional_notes')}</h4>
                  <ul className="list-disc list-inside space-y-2">
                    {ruleBasedMessages.map((msg, index) => (
                      <li key={index} className="text-sm text-gray-700 text-justify">{msg}</li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="text-xs text-center text-gray-500 pt-4">
                {t('mh_check_confidentiality')}
              </p>

              <div className="mt-8 pt-6 border-t border-gray-200">
                {!aiInterpretation && !isAILoading && !aiError && (
                  <div className="flex flex-col items-center text-center">
                    <p className="text-gray-600 mb-4">
                      {t('ai_analysis_prompt')}
                    </p>
                    <Button
                      onClick={handleFetchAIInterpretation}
                      disabled={isAILoading}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      {isAILoading ? t('processing_ai_analysis') : t('get_ai_analysis')}
                    </Button>
                  </div>
                )}
                {isAILoading && (
                  <div className="text-center py-4">
                    <p className="text-indigo-600 animate-pulse">{t('loading_ai_analysis')}</p>
                  </div>
                )}
                {aiError && (
                  <div className="mt-4 p-4 border-l-4 border-red-500 bg-red-50 rounded-md shadow">
                    <h4 className="font-semibold text-red-700 mb-1">{t('ai_analysis_failed')}</h4>
                    <p className="text-sm text-red-600">{aiError}</p>
                    <Button 
                      onClick={handleFetchAIInterpretation} 
                      variant="link" 
                      className="text-red-600 hover:text-red-800 p-0 h-auto mt-2 text-sm"
                    >
                      {t('try_again')}
                    </Button>
                  </div>
                )}
                {aiInterpretation && (
                  <div className="mt-4 p-4 border-l-4 border-indigo-500 bg-indigo-50 rounded-md shadow">
                    <h4 className="font-semibold text-lg text-indigo-700 mb-2">{t('ai_additional_analysis')}</h4>
                    <div className="text-sm text-gray-700 space-y-2 prose prose-sm max-w-none text-justify">
                      <ReactMarkdown>{aiInterpretation}</ReactMarkdown>
                    </div>
                    <p className="text-xs text-indigo-600 mt-3 italic">
                      {t('ai_disclaimer')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
             <p className="text-center text-gray-500">{t('loading')}</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center p-6 bg-gray-50 rounded-b-lg min-h-[76px]">
          {!quizStarted && (
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-md"
              onClick={handleStartCheck}
            >
              {t('start_examination')}
            </Button>
          )}
          {quizStarted && !showResults && currentQuestion && (
             <Button 
              size="lg" 
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-md"
              onClick={handleNextQuestion}
            >
              {currentQuestionIndex < comprehensiveQuestions.length - 1 ? t('next') : t('view_results')}
            </Button>
          )}
           {showResults && (
            <div className="flex flex-col space-y-4 items-center sm:flex-row sm:space-y-0 sm:space-x-4 sm:items-stretch">
              <Button 
                size="lg" 
                variant="outline"
                className="border-teal-600 text-teal-600 hover:bg-teal-50 hover:text-teal-700 font-semibold py-3 px-8 rounded-md w-full sm:w-auto"
                onClick={handleGoToHome}
              >
                {t('back_to_home')}
              </Button>
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-md w-full sm:w-auto"
                onClick={handleStartCheck}
              >
                {t('retake_examination')}
              </Button>
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-md w-full sm:w-auto"
                onClick={() => {
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

                  const cleanInterpretationResults = interpretationResults.map(res => ({
                    domainName: res.domainName,
                    score: res.score,
                    maxScore: res.maxScore,
                    category: res.category,
                    message: res.message 
                  }));

                  navigate('/rencana-aksi-personal', { 
                    state: { 
                      assessmentSummary: summary,
                      rawResults: cleanInterpretationResults
                    } 
                  });
                }}
              >
                {t('get_personal_action_plan')}
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default MentalHealthCheckPage;
