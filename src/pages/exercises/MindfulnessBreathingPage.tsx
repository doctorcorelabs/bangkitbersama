import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, Wind, Smile, Brain, Clock, Lightbulb, CheckCircle } from "lucide-react";

const MindfulnessBreathingPage: React.FC = () => {
  const { t } = useTranslation();

  const steps = [
    {
      step: 1,
      title: t('mindfulness.steps.1.title'),
      description: t('mindfulness.steps.1.description'),
      icon: <Smile className="w-8 h-8 text-teal-600" />
    },
    {
      step: 2,
      title: t('mindfulness.steps.2.title'),
      description: t('mindfulness.steps.2.description'),
      icon: <Clock className="w-8 h-8 text-teal-600" />
    },
    {
      step: 3,
      title: t('mindfulness.steps.3.title'),
      description: t('mindfulness.steps.3.description'),
      icon: <Wind className="w-8 h-8 text-teal-600" />
    },
    {
      step: 4,
      title: t('mindfulness.steps.4.title'),
      description: t('mindfulness.steps.4.description'),
      icon: <Lightbulb className="w-8 h-8 text-teal-600" />
    },
    {
      step: 5,
      title: t('mindfulness.steps.5.title'),
      description: t('mindfulness.steps.5.description'),
      icon: <Brain className="w-8 h-8 text-teal-600" />
    },
    {
      step: 6,
      title: t('mindfulness.steps.6.title'),
      description: t('mindfulness.steps.6.description'),
      icon: <Clock className="w-8 h-8 text-teal-600" />
    },
    {
      step: 7,
      title: t('mindfulness.steps.7.title'),
      description: t('mindfulness.steps.7.description'),
      icon: <Smile className="w-8 h-8 text-teal-600" />
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-primary font-heading mb-3">
          <Wind className="inline-block w-10 h-10 mr-3 text-teal-500" />
          {t('mindfulness.title')}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('mindfulness.subtitle')}
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700 flex items-center">
              <Brain className="w-7 h-7 mr-2" />
              {t('mindfulness.whatIs.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 text-justify">
            <p>{t('mindfulness.whatIs.p1')}</p>
            <p>{t('mindfulness.whatIs.p2')}</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700 flex items-center">
              <Zap className="w-7 h-7 mr-2" />
              {t('mindfulness.benefits.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700">
            <ul className="list-disc list-inside space-y-2">
              <li className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>{t('mindfulness.benefits.b1')}</span></li>
              <li className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>{t('mindfulness.benefits.b2')}</span></li>
              <li className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>{t('mindfulness.benefits.b3')}</span></li>
              <li className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>{t('mindfulness.benefits.b4')}</span></li>
              <li className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>{t('mindfulness.benefits.b5')}</span></li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-12 shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl text-center font-semibold text-primary mb-2">
            {t('mindfulness.steps.title')}
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            {t('mindfulness.steps.subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 py-8 md:px-10">
          <div className="space-y-8">
            {steps.map((item) => (
              <div key={item.step} className="flex items-start space-x-6 p-4 rounded-lg hover:bg-teal-50 transition-colors duration-200">
                <div className="flex-shrink-0 mt-1 bg-teal-100 p-3 rounded-full">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-1">{t('mindfulness.steps.stepLabel', { step: item.step })}: {item.title}</h4>
                  <p className="text-gray-600 text-justify">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-12 bg-teal-50 border-teal-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-teal-700 flex items-center">
            <Lightbulb className="w-7 h-7 mr-2" />
            {t('mindfulness.tips.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-gray-700 text-justify">
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" />
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {t('mindfulness.tips.t1')}
              </ReactMarkdown>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" />
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {t('mindfulness.tips.t2')}
              </ReactMarkdown>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" />
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {t('mindfulness.tips.t3')}
              </ReactMarkdown>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default MindfulnessBreathingPage;
