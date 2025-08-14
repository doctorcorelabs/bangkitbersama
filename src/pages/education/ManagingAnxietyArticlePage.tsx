import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'; // Import Link
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert, Brain, MessageSquare, Users, Lightbulb, CheckCircle, Info } from "lucide-react";

const ManagingAnxietyArticlePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-primary font-heading mb-3">
          <ShieldAlert className="inline-block w-10 h-10 mr-3 text-orange-500" />
          {t('anxietyArticle.title')}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('anxietyArticle.subtitle')}
        </p>
      </header>

      <div className="space-y-10">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700 flex items-center">
              <Info className="w-7 h-7 mr-2" />
              {t('anxietyArticle.understanding.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 text-justify">
            <p>{t('anxietyArticle.understanding.p1')}</p>
            <p>{t('anxietyArticle.understanding.p2')}</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700 flex items-center">
              <Brain className="w-7 h-7 mr-2" />
              {t('anxietyArticle.symptoms.title')}
            </CardTitle>
            <CardDescription className="text-justify">{t('anxietyArticle.symptoms.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700 text-justify">
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-2">{t('anxietyArticle.symptoms.physical.title')}</h4>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li>{t('anxietyArticle.symptoms.physical.s1')}</li>
                <li>{t('anxietyArticle.symptoms.physical.s2')}</li>
                <li>{t('anxietyArticle.symptoms.physical.s3')}</li>
                <li>{t('anxietyArticle.symptoms.physical.s4')}</li>
                <li>{t('anxietyArticle.symptoms.physical.s5')}</li>
                <li>{t('anxietyArticle.symptoms.physical.s6')}</li>
                <li>{t('anxietyArticle.symptoms.physical.s7')}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-2">{t('anxietyArticle.symptoms.cognitive.title')}</h4>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li>{t('anxietyArticle.symptoms.cognitive.s1')}</li>
                <li>{t('anxietyArticle.symptoms.cognitive.s2')}</li>
                <li>{t('anxietyArticle.symptoms.cognitive.s3')}</li>
                <li>{t('anxietyArticle.symptoms.cognitive.s4')}</li>
                <li>{t('anxietyArticle.symptoms.cognitive.s5')}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-2">{t('anxietyArticle.symptoms.behavioral.title')}</h4>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li>{t('anxietyArticle.symptoms.behavioral.s1')}</li>
                <li>{t('anxietyArticle.symptoms.behavioral.s2')}</li>
                <li>{t('anxietyArticle.symptoms.behavioral.s3')}</li>
                <li>{t('anxietyArticle.symptoms.behavioral.s4')}</li>
                <li>{t('anxietyArticle.symptoms.behavioral.s5')}</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-center font-semibold text-primary mb-2">
              {t('anxietyArticle.strategies.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 py-8 md:px-10 space-y-6">
            <div className="p-4 border-l-4 border-teal-500 bg-teal-50 rounded-md">
              <h4 className="font-semibold text-teal-700 text-lg mb-2 flex items-center"><Lightbulb className="w-6 h-6 mr-2"/>{t('anxietyArticle.strategies.relaxation.title')}</h4>
              <p className="text-gray-700 text-justify">
                {t('anxietyArticle.strategies.relaxation.p1')}
                <Link to="/exercises/mindfulness-breathing" className="text-blue-600 hover:underline">{t('anxietyArticle.strategies.relaxation.link1')}</Link>
                {t('anxietyArticle.strategies.relaxation.p2')}
                <Link to="/exercises/progressive-muscle-relaxation" className="text-blue-600 hover:underline">{t('anxietyArticle.strategies.relaxation.link2')}</Link>
                {t('anxietyArticle.strategies.relaxation.p3')}
              </p>
            </div>
            <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-md">
              <h4 className="font-semibold text-green-700 text-lg mb-2 flex items-center"><CheckCircle className="w-6 h-6 mr-2"/>{t('anxietyArticle.strategies.mindset.title')}</h4>
              <p className="text-gray-700 text-justify">
                {t('anxietyArticle.strategies.mindset.p1')}
                <Link to="/education/cbt-introduction" className="text-blue-600 hover:underline">{t('anxietyArticle.strategies.mindset.link1')}</Link>.
              </p>
            </div>
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-md">
              <h4 className="font-semibold text-blue-700 text-lg mb-2 flex items-center"><Users className="w-6 h-6 mr-2"/>{t('anxietyArticle.strategies.lifestyle.title')}</h4>
              <ul className="list-disc list-inside space-y-1 pl-4 text-gray-700 text-justify">
                <li>{t('anxietyArticle.strategies.lifestyle.l1')}</li>
                <li>{t('anxietyArticle.strategies.lifestyle.l2')}</li>
                <li>{t('anxietyArticle.strategies.lifestyle.l3')}</li>
              </ul>
            </div>
             <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-md">
              <h4 className="font-semibold text-purple-700 text-lg mb-2 flex items-center"><MessageSquare className="w-6 h-6 mr-2"/>{t('anxietyArticle.strategies.social.title')}</h4>
              <p className="text-gray-700 text-justify">{t('anxietyArticle.strategies.social.p1')}</p>
            </div>
          </CardContent>
        </Card>

        <Alert variant="default" className="shadow-lg border-orange-400">
          <ShieldAlert className="h-5 w-5 text-orange-600" />
          <AlertTitle className="font-semibold text-orange-700">{t('anxietyArticle.professionalHelp.title')}</AlertTitle>
          <AlertDescription className="text-gray-700 text-justify">
            {t('anxietyArticle.professionalHelp.description')}
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default ManagingAnxietyArticlePage;
