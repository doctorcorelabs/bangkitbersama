import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Zap, Activity, ShieldAlert, Lightbulb, CheckCircle, UserCheck, ArrowDownUp } from "lucide-react";

const ProgressiveMuscleRelaxationPage: React.FC = () => {
  const { t } = useTranslation();

  const muscleGroups = [
    { name: t('pmr.groups.hands.name'), instruction: t('pmr.groups.hands.instruction') },
    { name: t('pmr.groups.upperArms.name'), instruction: t('pmr.groups.upperArms.instruction') },
    { name: t('pmr.groups.forehead.name'), instruction: t('pmr.groups.forehead.instruction') },
    { name: t('pmr.groups.eyes.name'), instruction: t('pmr.groups.eyes.instruction') },
    { name: t('pmr.groups.mouth.name'), instruction: t('pmr.groups.mouth.instruction') },
    { name: t('pmr.groups.neck.name'), instruction: t('pmr.groups.neck.instruction') },
    { name: t('pmr.groups.chest.name'), instruction: t('pmr.groups.chest.instruction') },
    { name: t('pmr.groups.stomach.name'), instruction: t('pmr.groups.stomach.instruction') },
    { name: t('pmr.groups.back.name'), instruction: t('pmr.groups.back.instruction') },
    { name: t('pmr.groups.thighs.name'), instruction: t('pmr.groups.thighs.instruction') },
    { name: t('pmr.groups.calves.name'), instruction: t('pmr.groups.calves.instruction') },
    { name: t('pmr.groups.feet.name'), instruction: t('pmr.groups.feet.instruction') },
  ];

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-primary font-heading mb-3">
          <Activity className="inline-block w-10 h-10 mr-3 text-indigo-500" />
          {t('pmr.title')}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('pmr.subtitle')}
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:gap-12 mb-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700 flex items-center">
              <ArrowDownUp className="w-7 h-7 mr-2" />
              {t('pmr.whatIs.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 text-justify">
            <p>{t('pmr.whatIs.p1')}</p>
            <p>{t('pmr.whatIs.p2')}</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700 flex items-center">
              <Zap className="w-7 h-7 mr-2" />
              {t('pmr.benefits.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700">
            <ul className="list-disc list-inside space-y-2">
              <li className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>{t('pmr.benefits.b1')}</span></li>
              <li className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>{t('pmr.benefits.b2')}</span></li>
              <li className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>{t('pmr.benefits.b3')}</span></li>
              <li className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>{t('pmr.benefits.b4')}</span></li>
              <li className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>{t('pmr.benefits.b5')}</span></li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl mb-12">
        <CardHeader>
          <CardTitle className="text-3xl text-center font-semibold text-primary mb-2">
            {t('pmr.guide.title')}
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            {t('pmr.guide.subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 py-8 md:px-10">
          <Alert variant="default" className="mb-8 bg-blue-50 border-blue-200">
            <UserCheck className="h-5 w-5 text-blue-600" />
            <AlertTitle className="font-semibold text-blue-700">{t('pmr.preparation.title')}</AlertTitle>
            <AlertDescription className="text-gray-700 text-justify">
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>{t('pmr.preparation.p1')}</li>
                <li>{t('pmr.preparation.p2')}</li>
                <li>{t('pmr.preparation.p3')}</li>
                <li>{t('pmr.preparation.p4')}</li>
                <li>{t('pmr.preparation.p5')}</li>
              </ul>
            </AlertDescription>
          </Alert>
          
          <div className="space-y-6">
            {muscleGroups.map((group, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-indigo-50 transition-colors duration-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{t('pmr.groups.label', { index: index + 1 })}: {group.name}</h4>
                <p className="text-gray-600 text-justify">{group.instruction}</p>
                <p className="text-sm text-indigo-600 mt-2">{t('pmr.groups.focus')}</p>
              </div>
            ))}
          </div>

           <Alert variant="default" className="mt-10 bg-green-50 border-green-200">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <AlertTitle className="font-semibold text-green-700">{t('pmr.after.title')}</AlertTitle>
            <AlertDescription className="text-gray-700 text-justify">
              {t('pmr.after.description')}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card className="bg-yellow-50 border-yellow-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-yellow-700 flex items-center">
            <Lightbulb className="w-7 h-7 mr-2" />
            {t('pmr.tips.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-gray-700 text-justify">
          <p className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>{t('pmr.tips.t1')}</span></p>
          <p className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>{t('pmr.tips.t2')}</span></p>
          <p className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>{t('pmr.tips.t3')}</span></p>
          <p className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>{t('pmr.tips.t4')}</span></p>
        </CardContent>
      </Card>

      <Alert variant="destructive" className="mt-12 shadow-lg bg-red-50 border-red-200 text-red-700">
        <ShieldAlert className="h-5 w-5 text-red-700" />
        <AlertTitle className="font-semibold text-red-800">{t('pmr.warning.title')}</AlertTitle>
        <AlertDescription className="text-red-700 text-justify">
          {t('pmr.warning.description')}
        </AlertDescription>
      </Alert>

    </div>
  );
};

export default ProgressiveMuscleRelaxationPage;
