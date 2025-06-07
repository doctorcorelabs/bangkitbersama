import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, Wind, Smile, Brain, Clock, Lightbulb, CheckCircle } from "lucide-react";

const MindfulnessBreathingPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-primary font-heading mb-3">
          <Wind className="inline-block w-10 h-10 mr-3 text-teal-500" />
          Latihan Pernapasan Mindfulness
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Temukan ketenangan dan fokus melalui latihan pernapasan sederhana yang bisa Anda lakukan di mana saja dan kapan saja.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700 flex items-center">
              <Brain className="w-7 h-7 mr-2" />
              Apa itu Pernapasan Mindfulness?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 text-justify">
            <p>
              Pernapasan mindfulness adalah praktik memusatkan perhatian secara penuh pada sensasi napas Anda saat ini, tanpa menghakimi. Ini bukan tentang mengubah cara Anda bernapas, melainkan mengamati proses alami pernapasan Anda.
            </p>
            <p>
              Dengan melatih kesadaran pada napas, Anda melatih pikiran untuk lebih tenang, fokus, dan hadir sepenuhnya pada momen saat ini.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700 flex items-center">
              <Zap className="w-7 h-7 mr-2" />
              Manfaat Latihan Ini
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700">
            <ul className="list-disc list-inside space-y-2">
              <li className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>Mengurangi stres dan kecemasan.</span></li>
              <li className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>Meningkatkan fokus dan konsentrasi.</span></li>
              <li className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>Membantu menenangkan sistem saraf.</span></li>
              <li className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>Meningkatkan kesadaran diri (self-awareness).</span></li>
              <li className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>Dapat membantu meningkatkan kualitas tidur.</span></li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-12 shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl text-center font-semibold text-primary mb-2">
            Langkah-langkah Latihan
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Ikuti langkah-langkah sederhana ini untuk memulai.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 py-8 md:px-10">
          <div className="space-y-8">
            {[
              {
                step: 1,
                title: "Temukan Posisi Nyaman",
                description: "Duduklah dengan nyaman di kursi dengan punggung tegak namun bahu rileks. Anda juga bisa berbaring jika itu lebih nyaman. Pastikan Anda tidak akan terganggu selama beberapa menit.",
                icon: <Smile className="w-8 h-8 text-teal-600" />
              },
              {
                step: 2,
                title: "Pejamkan Mata (Opsional)",
                description: "Pejamkan mata Anda dengan lembut. Jika Anda tidak nyaman memejamkan mata, cukup arahkan pandangan Anda ke bawah dengan lembut, sekitar satu meter di depan Anda, tanpa fokus pada apapun.",
                icon: <Clock className="w-8 h-8 text-teal-600" /> // Placeholder, consider better icon
              },
              {
                step: 3,
                title: "Amati Napas Anda",
                description: "Alihkan perhatian Anda ke napas. Rasakan sensasi udara yang masuk dan keluar dari tubuh Anda. Perhatikan di mana Anda paling merasakan napas: mungkin di lubang hidung, tenggorokan, dada, atau perut.",
                icon: <Wind className="w-8 h-8 text-teal-600" />
              },
              {
                step: 4,
                title: "Jangan Mengubah, Hanya Amati",
                description: "Tidak perlu mengubah cara Anda bernapas. Biarkan napas mengalir secara alami. Tugas Anda hanyalah mengamati, menjadi saksi dari setiap tarikan dan hembusan napas.",
                icon: <Lightbulb className="w-8 h-8 text-teal-600" /> // Placeholder
              },
              {
                step: 5,
                title: "Kembali Saat Pikiran Berkelana",
                description: "Pikiran Anda pasti akan berkelana – ini sangat normal. Saat Anda menyadari pikiran Anda tidak lagi pada napas, akui ke mana pikiran itu pergi, lalu dengan lembut kembalikan perhatian Anda ke sensasi napas.",
                icon: <Brain className="w-8 h-8 text-teal-600" />
              },
              {
                step: 6,
                title: "Lakukan Selama Beberapa Menit",
                description: "Mulailah dengan 3-5 menit. Anda bisa menggunakan timer jika mau. Seiring waktu, Anda bisa menambah durasinya jika merasa nyaman.",
                icon: <Clock className="w-8 h-8 text-teal-600" />
              },
              {
                step: 7,
                title: "Akhiri dengan Lembut",
                description: "Setelah selesai, luangkan waktu sejenak untuk memperhatikan bagaimana perasaan tubuh dan pikiran Anda. Buka mata Anda perlahan (jika terpejam) dan bawa kesadaran ini ke aktivitas Anda selanjutnya.",
                icon: <Smile className="w-8 h-8 text-teal-600" />
              }
            ].map((item) => (
              <div key={item.step} className="flex items-start space-x-6 p-4 rounded-lg hover:bg-teal-50 transition-colors duration-200">
                <div className="flex-shrink-0 mt-1 bg-teal-100 p-3 rounded-full">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-1">Langkah {item.step}: {item.title}</h4>
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
            Tips Tambahan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-gray-700 text-justify">
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" />
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {"**Konsistensi adalah kunci.** Lebih baik berlatih beberapa menit setiap hari daripada lama tapi jarang."}
              </ReactMarkdown>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" />
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {"**Bersikaplah lembut pada diri sendiri.** Tidak ada 'cara yang salah' dalam bermindfulness. Proses belajar adalah bagiannya."}
              </ReactMarkdown>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0" />
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {"Anda bisa melakukan latihan ini **kapan saja** Anda merasa butuh jeda atau merasa stres."}
              </ReactMarkdown>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default MindfulnessBreathingPage;
