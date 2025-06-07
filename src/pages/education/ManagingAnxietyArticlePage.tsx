import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert, Brain, MessageSquare, Users, Lightbulb, CheckCircle, Info } from "lucide-react";

const ManagingAnxietyArticlePage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-primary font-heading mb-3">
          <ShieldAlert className="inline-block w-10 h-10 mr-3 text-orange-500" />
          Mengelola Kecemasan: Panduan untuk Ketenangan Pikiran
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Pahami apa itu kecemasan, kenali gejalanya, dan pelajari strategi efektif untuk mengelolanya dalam kehidupan sehari-hari.
        </p>
      </header>

      <div className="space-y-10">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700 flex items-center">
              <Info className="w-7 h-7 mr-2" />
              Memahami Kecemasan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 text-justify">
            <p>
              Kecemasan adalah respons alami tubuh terhadap stres atau potensi bahaya. Ini adalah emosi yang ditandai dengan perasaan tegang, pikiran khawatir, dan perubahan fisik seperti peningkatan detak jantung atau keringat. Dalam kadar tertentu, kecemasan bisa bermanfaat, misalnya memotivasi kita untuk bersiap menghadapi ujian atau presentasi penting.
            </p>
            <p>
              Namun, ketika perasaan cemas menjadi berlebihan, terjadi terlalu sering, atau tidak sebanding dengan situasi yang dihadapi, hal itu dapat mengganggu kualitas hidup dan dikategorikan sebagai gangguan kecemasan. Penting untuk mengenali perbedaannya.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700 flex items-center">
              <Brain className="w-7 h-7 mr-2" />
              Mengenali Gejala Kecemasan
            </CardTitle>
            <CardDescription className="text-justify">Gejala kecemasan bisa bervariasi pada setiap orang, namun umumnya meliputi aspek fisik, pikiran, dan perilaku.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700 text-justify">
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-2">Gejala Fisik:</h4>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li>Detak jantung cepat atau berdebar-debar</li>
                <li>Napas pendek atau terengah-engah</li>
                <li>Pusing atau sensasi melayang</li>
                <li>Mulut kering, mual, atau gangguan pencernaan</li>
                <li>Gemetar atau berkeringat</li>
                <li>Ketegangan otot atau sakit kepala</li>
                <li>Kelelahan</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-2">Gejala Pikiran (Kognitif):</h4>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li>Khawatir berlebihan tentang masa lalu, sekarang, atau masa depan</li>
                <li>Pikiran negatif atau pesimis yang sulit dikendalikan</li>
                <li>Kesulitan berkonsentrasi atau pikiran kosong</li>
                <li>Merasa seperti akan kehilangan kendali atau menjadi gila</li>
                <li>Ketakutan akan penilaian orang lain</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-2">Gejala Perilaku:</h4>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li>Menghindari situasi yang memicu cemas</li>
                <li>Perilaku gelisah (misalnya, mondar-mandir, menggigit kuku)</li>
                <li>Mudah marah atau tersinggung</li>
                <li>Kesulitan tidur</li>
                <li>Mencari kepastian berulang kali</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-center font-semibold text-primary mb-2">
              Strategi Mengelola Kecemasan
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 py-8 md:px-10 space-y-6">
            <div className="p-4 border-l-4 border-teal-500 bg-teal-50 rounded-md">
              <h4 className="font-semibold text-teal-700 text-lg mb-2 flex items-center"><Lightbulb className="w-6 h-6 mr-2"/>Teknik Relaksasi</h4>
              <p className="text-gray-700 text-justify">Latihan seperti <Link to="/exercises/mindfulness-breathing" className="text-blue-600 hover:underline">pernapasan mindfulness</Link> atau <Link to="/exercises/progressive-muscle-relaxation" className="text-blue-600 hover:underline">relaksasi otot progresif</Link> dapat membantu menenangkan respons fisik terhadap kecemasan.</p>
            </div>
            <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-md">
              <h4 className="font-semibold text-green-700 text-lg mb-2 flex items-center"><CheckCircle className="w-6 h-6 mr-2"/>Pola Pikir Sehat (Dasar CBT)</h4>
              <p className="text-gray-700 text-justify">Identifikasi dan tantang pikiran negatif atau tidak realistis yang memicu kecemasan. Ganti dengan pikiran yang lebih seimbang dan positif. Pelajari lebih lanjut tentang <Link to="/education/cbt-introduction" className="text-blue-600 hover:underline">dasar-dasar CBT</Link>.</p>
            </div>
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-md">
              <h4 className="font-semibold text-blue-700 text-lg mb-2 flex items-center"><Users className="w-6 h-6 mr-2"/>Gaya Hidup Sehat</h4>
              <ul className="list-disc list-inside space-y-1 pl-4 text-gray-700 text-justify">
                <li>Olahraga teratur dapat melepaskan endorfin dan mengurangi ketegangan.</li>
                <li>Tidur yang cukup dan berkualitas sangat penting untuk kesehatan mental.</li>
                <li>Konsumsi makanan bergizi seimbang dan batasi kafein serta alkohol.</li>
              </ul>
            </div>
             <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-md">
              <h4 className="font-semibold text-purple-700 text-lg mb-2 flex items-center"><MessageSquare className="w-6 h-6 mr-2"/>Cari Dukungan Sosial</h4>
              <p className="text-gray-700 text-justify">Berbicara dengan teman, keluarga, atau bergabung dengan kelompok dukungan dapat membantu Anda merasa tidak sendirian dan mendapatkan perspektif baru.</p>
            </div>
          </CardContent>
        </Card>

        <Alert variant="default" className="shadow-lg border-orange-400">
          <ShieldAlert className="h-5 w-5 text-orange-600" />
          <AlertTitle className="font-semibold text-orange-700">Kapan Harus Mencari Bantuan Profesional?</AlertTitle>
          <AlertDescription className="text-gray-700 text-justify">
            Jika kecemasan Anda parah, berlangsung lama, sangat mengganggu aktivitas sehari-hari, atau jika Anda mulai memiliki pikiran untuk menyakiti diri sendiri, sangat penting untuk segera mencari bantuan dari profesional kesehatan mental seperti psikolog atau psikiater. Mereka dapat memberikan diagnosis yang tepat dan rencana perawatan yang sesuai.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default ManagingAnxietyArticlePage;
