import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Brain, MessageCircle, Zap, Users, Lightbulb, CheckCircle, Info, BookOpen, HelpCircle } from "lucide-react";

const CBTIntroductionPage: React.FC = () => {
  const { t } = useTranslation();

  const principles = [
    t('cbtArticle.principles.p1'),
    t('cbtArticle.principles.p2'),
    t('cbtArticle.principles.p3'),
    t('cbtArticle.principles.p4'),
    t('cbtArticle.principles.p5')
  ];

  const issues = [
    t('cbtArticle.issues.i1'), t('cbtArticle.issues.i2'), t('cbtArticle.issues.i3'),
    t('cbtArticle.issues.i4'), t('cbtArticle.issues.i5'), t('cbtArticle.issues.i6'),
    t('cbtArticle.issues.i7'), t('cbtArticle.issues.i8'), t('cbtArticle.issues.i9'),
    t('cbtArticle.issues.i10'), t('cbtArticle.issues.i11'), t('cbtArticle.issues.i12')
  ];

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-primary font-heading mb-3">
          <BookOpen className="inline-block w-10 h-10 mr-3 text-purple-500" />
          {t('cbtArticle.title')}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('cbtArticle.subtitle')}
        </p>
      </header>

      <div className="space-y-10">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700 flex items-center">
              <Info className="w-7 h-7 mr-2" />
              {t('cbtArticle.whatIs.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 text-justify">
            <p>{t('cbtArticle.whatIs.p1')}</p>
            <p>{t('cbtArticle.whatIs.p2')}</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700 flex items-center">
              <Brain className="w-7 h-7 mr-2" />
              {t('cbtArticle.principles.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700 text-justify">
            <ul className="list-disc list-inside space-y-2">
              {principles.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" />
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{item}</ReactMarkdown>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-center font-semibold text-primary mb-2">
              {t('cbtArticle.howItWorks.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 py-8 md:px-10 space-y-4 text-gray-700 text-justify">
            <p>{t('cbtArticle.howItWorks.p1')}</p>
            <div className="text-center my-6">
              <p className="font-semibold text-lg">{t('cbtArticle.howItWorks.model')}</p>
            </div>
            <p>{t('cbtArticle.howItWorks.example')}</p>
            <ul className="list-decimal list-inside space-y-2 pl-4">
              <li><strong>{t('cbtArticle.howItWorks.thoughtLabel')}:</strong> {t('cbtArticle.howItWorks.thought')}</li>
              <li><strong>{t('cbtArticle.howItWorks.emotionLabel')}:</strong> {t('cbtArticle.howItWorks.emotion')}</li>
              <li><strong>{t('cbtArticle.howItWorks.behaviorLabel')}:</strong> {t('cbtArticle.howItWorks.behavior')}</li>
              <li><strong>{t('cbtArticle.howItWorks.sensationLabel')}:</strong> {t('cbtArticle.howItWorks.sensation')}</li>
            </ul>
            <p>{t('cbtArticle.howItWorks.p2')}</p>
             <Alert variant="default" className="mt-6 bg-teal-50 border-teal-200">
                <Lightbulb className="h-5 w-5 text-teal-600" />
            <AlertTitle className="font-semibold text-teal-700">{t('cbtArticle.howItWorks.altThoughtLabel')}</AlertTitle>
            <AlertDescription className="text-gray-700 text-justify">
             {t('cbtArticle.howItWorks.altThought')}
            </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700 flex items-center">
              <Zap className="w-7 h-7 mr-2" />
              {t('cbtArticle.issues.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700 text-justify">
            <p>{t('cbtArticle.issues.p1')}</p>
            <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pl-4">
              {issues.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700 flex items-center">
              <MessageCircle className="w-7 h-7 mr-2" />
              {t('cbtArticle.techniques.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 text-justify">
            <p>{t('cbtArticle.techniques.p1')}</p>
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-1">{t('cbtArticle.techniques.t1.title')}</h4>
              <p>{t('cbtArticle.techniques.t1.description')}</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-1">{t('cbtArticle.techniques.t2.title')}</h4>
              <p>{t('cbtArticle.techniques.t2.description')}</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-1">{t('cbtArticle.techniques.t3.title')}</h4>
              <p>{t('cbtArticle.techniques.t3.description')}</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-1">{t('cbtArticle.techniques.t4.title')}</h4>
              <p>{t('cbtArticle.techniques.t4.description')}</p>
            </div>
          </CardContent>
        </Card>

        <Alert variant="default" className="shadow-lg border-purple-400">
          <HelpCircle className="h-5 w-5 text-purple-600" />
          <AlertTitle className="font-semibold text-purple-700">{t('cbtArticle.journey.title')}</AlertTitle>
          <AlertDescription className="text-gray-700 text-justify">
            {t('cbtArticle.journey.description')}
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default CBTIntroductionPage;
