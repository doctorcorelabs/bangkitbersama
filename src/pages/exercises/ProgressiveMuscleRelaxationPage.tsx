import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Zap, Activity, ShieldAlert, Lightbulb, CheckCircle, UserCheck, ArrowDownUp } from "lucide-react";

const ProgressiveMuscleRelaxationPage: React.FC = () => {
  const muscleGroups = [
    { name: "Tangan dan Lengan Bawah", instruction: "Kepalkan tangan Anda sekuat mungkin selama 5-7 detik, rasakan ketegangannya. Lalu, lepaskan perlahan selama 10-15 detik, rasakan relaksasinya." },
    { name: "Lengan Atas (Bisep)", instruction: "Tekuk lengan Anda dan tegangkan otot bisep (seperti mengangkat beban) selama 5-7 detik. Lepaskan perlahan." },
    { name: "Dahi", instruction: "Angkat alis Anda setinggi mungkin, tahan selama 5-7 detik. Lepaskan perlahan." },
    { name: "Mata dan Pipi", instruction: "Pejamkan mata Anda sekuat mungkin dan kerutkan pipi Anda selama 5-7 detik. Lepaskan perlahan." },
    { name: "Mulut dan Rahang", instruction: "Buka mulut Anda selebar mungkin, atau katupkan rahang Anda dengan kuat (pilih salah satu) selama 5-7 detik. Lepaskan perlahan." },
    { name: "Leher dan Bahu", instruction: "Angkat bahu Anda ke arah telinga setinggi mungkin, tahan selama 5-7 detik. Lepaskan perlahan. Atau, tarik dagu ke dada, rasakan peregangan di leher belakang." },
    { name: "Dada", instruction: "Tarik napas dalam-dalam dan tahan, rasakan ketegangan di dada Anda selama 5-7 detik. Hembuskan napas perlahan dan lepaskan ketegangan." },
    { name: "Perut", instruction: "Tarik perut Anda ke dalam sekuat mungkin, tahan selama 5-7 detik. Lepaskan perlahan." },
    { name: "Punggung", instruction: "Lengkungkan punggung Anda sedikit (jika nyaman), tahan selama 5-7 detik. Lepaskan perlahan." },
    { name: "Paha", instruction: "Kencangkan otot paha Anda sekuat mungkin selama 5-7 detik. Lepaskan perlahan." },
    { name: "Betis", instruction: "Arahkan jari-jari kaki Anda ke atas (ke arah lutut) untuk menegangkan otot betis, tahan selama 5-7 detik. Lepaskan perlahan." },
    { name: "Kaki dan Jari Kaki", instruction: "Lengkungkan jari-jari kaki Anda ke bawah sekuat mungkin, tahan selama 5-7 detik. Lepaskan perlahan." },
  ];

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-primary font-heading mb-3">
          <Activity className="inline-block w-10 h-10 mr-3 text-indigo-500" />
          Latihan Relaksasi Otot Progresif (PMR)
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Lepaskan ketegangan fisik dan mental dengan teknik relaksasi otot progresif yang terstruktur.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:gap-12 mb-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700 flex items-center">
              <ArrowDownUp className="w-7 h-7 mr-2" />
              Apa itu Relaksasi Otot Progresif?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 text-justify">
            <p>
              Relaksasi Otot Progresif (PMR) adalah teknik relaksasi mendalam yang dikembangkan oleh Dr. Edmund Jacobson pada awal abad ke-20. Teknik ini melibatkan proses sistematis menegangkan kelompok otot tertentu di tubuh Anda, menahannya sejenak, lalu melepaskan ketegangan tersebut.
            </p>
            <p>
              Dengan fokus pada perbedaan sensasi antara ketegangan dan relaksasi, Anda belajar untuk lebih menyadari dan melepaskan ketegangan fisik yang seringkali tidak disadari, yang pada gilirannya dapat membantu menenangkan pikiran.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700 flex items-center">
              <Zap className="w-7 h-7 mr-2" />
              Manfaat Latihan PMR
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700">
            <ul className="list-disc list-inside space-y-2">
              <li className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>Mengurangi ketegangan otot kronis.</span></li>
              <li className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>Membantu mengatasi insomnia dan meningkatkan kualitas tidur.</span></li>
              <li className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>Menurunkan gejala kecemasan dan stres.</span></li>
              <li className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>Dapat membantu mengurangi nyeri tertentu (misalnya, sakit kepala tegang).</span></li>
              <li className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>Meningkatkan kesadaran tubuh.</span></li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl mb-12">
        <CardHeader>
          <CardTitle className="text-3xl text-center font-semibold text-primary mb-2">
            Panduan Latihan Relaksasi Otot Progresif
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Ikuti urutan ini, fokus pada setiap kelompok otot.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 py-8 md:px-10">
          <Alert variant="default" className="mb-8 bg-blue-50 border-blue-200">
            <UserCheck className="h-5 w-5 text-blue-600" />
            <AlertTitle className="font-semibold text-blue-700">Persiapan Sebelum Memulai</AlertTitle>
            <AlertDescription className="text-gray-700 text-justify">
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Cari tempat yang tenang dan nyaman di mana Anda tidak akan terganggu selama 15-20 menit.</li>
                <li>Kenakan pakaian yang longgar dan nyaman.</li>
                <li>Anda bisa duduk di kursi yang mendukung punggung Anda atau berbaring.</li>
                <li>Lepaskan kacamata atau lensa kontak jika Anda menggunakannya.</li>
                <li>Ambil beberapa napas dalam dan perlahan untuk memulai.</li>
              </ul>
            </AlertDescription>
          </Alert>
          
          <div className="space-y-6">
            {muscleGroups.map((group, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-indigo-50 transition-colors duration-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Kelompok Otot {index + 1}: {group.name}</h4>
                <p className="text-gray-600 text-justify">{group.instruction}</p>
                <p className="text-sm text-indigo-600 mt-2">Fokus pada perbedaan sensasi antara tegang dan rileks.</p>
              </div>
            ))}
          </div>

           <Alert variant="default" className="mt-10 bg-green-50 border-green-200">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <AlertTitle className="font-semibold text-green-700">Setelah Selesai</AlertTitle>
            <AlertDescription className="text-gray-700 text-justify">
              Setelah menyelesaikan semua kelompok otot, nikmati perasaan relaksasi total selama beberapa menit. Perhatikan bagaimana tubuh Anda terasa lebih ringan dan pikiran lebih tenang. Buka mata perlahan dan kembali ke aktivitas Anda dengan perasaan segar.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card className="bg-yellow-50 border-yellow-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-yellow-700 flex items-center">
            <Lightbulb className="w-7 h-7 mr-2" />
            Tips Penting
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-gray-700 text-justify">
          <p className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>Jangan menahan napas saat menegangkan otot, tetaplah bernapas secara normal.</span></p>
          <p className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>Tegangkan otot secukupnya, jangan sampai terasa sakit.</span></p>
          <p className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>Jika Anda memiliki kondisi medis tertentu atau cedera, konsultasikan dengan dokter sebelum mencoba latihan ini.</span></p>
          <p className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>Lakukan secara rutin untuk mendapatkan manfaat maksimal.</span></p>
        </CardContent>
      </Card>

      <Alert variant="destructive" className="mt-12 shadow-lg bg-red-50 border-red-200 text-red-700">
        <ShieldAlert className="h-5 w-5 text-red-700" />
        <AlertTitle className="font-semibold text-red-800">Perhatian</AlertTitle>
        <AlertDescription className="text-red-700 text-justify">
          Latihan ini bertujuan untuk relaksasi umum. Jika Anda mengalami nyeri kronis, ketegangan parah, atau kondisi medis lain, selalu konsultasikan dengan profesional kesehatan sebelum memulai program latihan baru.
        </AlertDescription>
      </Alert>

    </div>
  );
};

export default ProgressiveMuscleRelaxationPage;
