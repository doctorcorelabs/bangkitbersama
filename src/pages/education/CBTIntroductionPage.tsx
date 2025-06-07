import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Brain, MessageCircle, Zap, Users, Lightbulb, CheckCircle, Info, BookOpen, HelpCircle } from "lucide-react";

const CBTIntroductionPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-primary font-heading mb-3">
          <BookOpen className="inline-block w-10 h-10 mr-3 text-purple-500" />
          Pengantar Terapi Perilaku Kognitif (CBT)
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Pahami dasar-dasar CBT, bagaimana cara kerjanya, dan bagaimana terapi ini dapat membantu Anda mengubah pola pikir dan perilaku.
        </p>
      </header>

      <div className="space-y-10">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700 flex items-center">
              <Info className="w-7 h-7 mr-2" />
              Apa itu Terapi Perilaku Kognitif (CBT)?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 text-justify">
            <p>
              Terapi Perilaku Kognitif (Cognitive Behavioral Therapy - CBT) adalah jenis terapi psikologis (psikoterapi) yang telah terbukti efektif untuk berbagai masalah kesehatan mental, termasuk depresi, gangguan kecemasan, masalah penggunaan zat, gangguan makan, dan masalah hubungan.
            </p>
            <p>
              CBT didasarkan pada gagasan bahwa pikiran, perasaan, sensasi fisik, dan tindakan kita saling berhubungan. Pikiran negatif dan perasaan dapat menjebak kita dalam lingkaran setan. CBT bertujuan untuk membantu Anda memutus lingkaran ini dengan mengidentifikasi dan mengubah pola pikir (kognisi) dan perilaku negatif atau tidak membantu.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700 flex items-center">
              <Brain className="w-7 h-7 mr-2" />
              Prinsip Dasar CBT
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700 text-justify">
            <ul className="list-disc list-inside space-y-2">
              {[
                "**Fokus pada Saat Ini:** CBT lebih berfokus pada masalah dan solusi di masa kini daripada menggali masa lalu secara ekstensif.",
                "**Terstruktur dan Berorientasi Tujuan:** Sesi CBT biasanya terstruktur, dengan agenda dan tujuan yang jelas yang disepakati bersama antara terapis dan klien.",
                "**Kolaboratif:** Terapis dan klien bekerja sama sebagai tim untuk memahami masalah dan mengembangkan strategi.",
                "**Mengajarkan Keterampilan:** CBT bertujuan untuk membekali Anda dengan keterampilan praktis yang dapat Anda gunakan dalam kehidupan sehari-hari untuk mengatasi tantangan.",
                "**Berbasis Bukti:** Efektivitas CBT didukung oleh banyak penelitian ilmiah."
              ].map((item, index) => (
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
              Bagaimana CBT Bekerja? Model Kognitif
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 py-8 md:px-10 space-y-4 text-gray-700 text-justify">
            <p>
              CBT bekerja berdasarkan model kognitif, yang menyatakan bahwa bukan situasi itu sendiri yang menentukan bagaimana perasaan kita, melainkan bagaimana kita menginterpretasikan atau memikirkan situasi tersebut.
            </p>
            <div className="text-center my-6">
              <p className="font-semibold text-lg">Situasi → Pikiran Otomatis → Reaksi (Emosi, Perilaku, Sensasi Fisik)</p>
            </div>
            <p>
              Sebagai contoh: Bayangkan Anda tidak diundang ke sebuah acara oleh teman.
            </p>
            <ul className="list-decimal list-inside space-y-2 pl-4">
              <li><strong>Pikiran Otomatis Negatif:</strong> "Mereka tidak menyukaiku," "Aku pasti membosankan."</li>
              <li><strong>Emosi yang Timbul:</strong> Sedih, cemas, marah.</li>
              <li><strong>Perilaku:</strong> Menarik diri, tidak menghubungi teman tersebut.</li>
              <li><strong>Sensasi Fisik:</strong> Perut tidak nyaman, dada sesak.</li>
            </ul>
            <p>
              CBT membantu Anda mengidentifikasi pikiran otomatis negatif ini, mengevaluasi keakuratannya, dan menggantinya dengan pikiran yang lebih realistis dan membantu.
            </p>
             <Alert variant="default" className="mt-6 bg-teal-50 border-teal-200">
                <Lightbulb className="h-5 w-5 text-teal-600" />
            <AlertTitle className="font-semibold text-teal-700">Contoh Pikiran Alternatif:</AlertTitle>
            <AlertDescription className="text-gray-700 text-justify">
             "Mungkin mereka lupa, atau acaranya memang untuk kelompok kecil. Saya bisa bertanya baik-baik atau merencanakan hal lain dengan mereka lain waktu."
            </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700 flex items-center">
              <Zap className="w-7 h-7 mr-2" />
              Masalah yang Dapat Dibantu CBT
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700 text-justify">
            <p>CBT efektif untuk berbagai kondisi, termasuk:</p>
            <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pl-4">
              <li>Depresi</li>
              <li>Gangguan Kecemasan Umum (GAD)</li>
              <li>Gangguan Panik</li>
              <li>Fobia (misalnya, fobia sosial, agorafobia)</li>
              <li>Gangguan Stres Pasca-Trauma (PTSD)</li>
              <li>Gangguan Obsesif-Kompulsif (OCD)</li>
              <li>Gangguan Makan</li>
              <li>Masalah Tidur (Insomnia)</li>
              <li>Manajemen Stres</li>
              <li>Masalah Hubungan</li>
              <li>Manajemen Kemarahan</li>
              <li>Nyeri Kronis</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700 flex items-center">
              <MessageCircle className="w-7 h-7 mr-2" />
              Contoh Teknik CBT Sederhana
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 text-justify">
            <p>Berikut beberapa teknik dasar yang sering digunakan dalam CBT:</p>
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-1">1. Jurnal Pikiran (Thought Record)</h4>
              <p>Mencatat situasi, pikiran otomatis yang muncul, emosi yang dirasakan, dan kemudian mencoba merumuskan respons alternatif yang lebih seimbang.</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-1">2. Restrukturisasi Kognitif</h4>
              <p>Mengidentifikasi distorsi kognitif (pola pikir negatif yang tidak akurat, seperti overgeneralisasi atau catastrophizing) dan belajar untuk menantang serta mengubahnya.</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-1">3. Aktivasi Perilaku (Behavioral Activation)</h4>
              <p>Mendorong partisipasi dalam aktivitas yang menyenangkan atau memberikan rasa pencapaian, terutama untuk mengatasi depresi dan penarikan diri.</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-1">4. Paparan Bertahap (Graded Exposure)</h4>
              <p>Secara bertahap dan sistematis menghadapi situasi atau objek yang ditakuti untuk mengurangi kecemasan dan fobia.</p>
            </div>
          </CardContent>
        </Card>

        <Alert variant="default" className="shadow-lg border-purple-400">
          <HelpCircle className="h-5 w-5 text-purple-600" />
          <AlertTitle className="font-semibold text-purple-700">CBT adalah Perjalanan Kolaboratif</AlertTitle>
          <AlertDescription className="text-gray-700 text-justify">
            Meskipun artikel ini memberikan pengantar, CBT paling efektif bila dilakukan dengan bimbingan terapis terlatih. Terapis dapat membantu Anda menerapkan teknik-teknik ini secara personal dan mendalam. Jika Anda merasa membutuhkan dukungan, jangan ragu untuk mencari profesional.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default CBTIntroductionPage;
