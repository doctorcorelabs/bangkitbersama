
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  MessageSquare, 
  Target, 
  Users, 
  BookOpen, 
  Stethoscope,
  ChevronRight,
  Sparkles
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      id: "screening",
      icon: Brain,
      title: "Skrining Cepat & Adaptif",
      description: "Mulailah perjalanan kesehatan mental Anda dengan skrining awal yang cerdas dan adaptif. Sistem kami menggunakan kecerdasan buatan untuk mengajukan pertanyaan yang relevan dengan kondisi Anda, memastikan proses skrining yang personal dan efisien. Hasil skrining ini akan menjadi dasar untuk rekomendasi dan rencana aksi yang disesuaikan.",
      details: "Dapatkan pemahaman awal mengenai kondisi mental Anda melalui serangkaian pertanyaan yang dirancang secara klinis dan disajikan dalam format percakapan yang nyaman dan mudah diikuti.",
      color: "primary", // Green
      gradient: "from-primary/10 to-secondary/5"
    },
    {
      id: "analysis",
      icon: MessageSquare,
      title: "Analisis Mendalam dengan AI",
      description: "Manfaatkan kekuatan analisis Natural Language Processing (NLP) untuk menggali pemahaman yang lebih mendalam tentang pola pikir dan dinamika emosi Anda. Fitur jurnal interaktif kami membantu Anda merefleksikan pengalaman sehari-hari, sementara AI bekerja di latar belakang untuk mendeteksi sentimen, mengekstraksi tema kunci, dan mengidentifikasi potensi distorsi kognitif.",
      details: "AI kami secara otomatis menganalisis entri jurnal Anda untuk memberikan wawasan berharga mengenai tren emosi, tema yang sering muncul dalam pikiran Anda, serta membantu mengenali pola pikir yang mungkin kurang membantu.",
      color: "primary", // Green
      gradient: "from-primary/10 to-secondary/5"
    },
    {
      id: "action-plan",
      icon: Target,
      title: "Rencana Aksi Personal",
      description: "Berdasarkan hasil skrining dan analisis mendalam, BangkitBersama menyusun rencana aksi yang dipersonalisasi khusus untuk Anda. Rencana ini mencakup rekomendasi konten edukatif, latihan mandiri berbasis bukti seperti Cognitive Behavioral Therapy (CBT) dan mindfulness, serta fitur pelacak suasana hati (mood tracker) untuk mendukung proses pemulihan yang terstruktur dan berkelanjutan.",
      details: "Akses berbagai latihan praktis seperti teknik CBT untuk mengubah pola pikir negatif, latihan mindfulness untuk meningkatkan kesadaran diri, dan pantau perkembangan suasana hati Anda secara berkala.",
      color: "primary", // Green
      gradient: "from-primary/10 to-secondary/5"
    },
    {
      id: "education",
      icon: BookOpen,
      title: "Edukasi Kesehatan Mental",
      description: "Tingkatkan pemahaman Anda tentang kesehatan mental melalui perpustakaan konten edukatif kami yang kaya dan mudah diakses. Kami menyediakan beragam artikel informatif, video menarik, dan infografis yang dirancang untuk menjelaskan berbagai topik kesehatan mental secara komprehensif namun tetap ringan dan mudah dicerna.",
      details: "Pelajari lebih lanjut tentang berbagai kondisi mental, strategi pengelolaan stres, tips menjaga kesejahteraan emosional, dan cara efektif untuk melawan stigma negatif seputar kesehatan mental.",
      color: "primary", // Green
      gradient: "from-primary/10 to-secondary/5"
    },
    {
      id: "professional",
      icon: Stethoscope,
      title: "Hubungan dengan Profesional",
      description: "Jika Anda memerlukan dukungan lebih lanjut, BangkitBersama memfasilitasi Anda untuk terhubung dengan jaringan psikolog dan konselor profesional yang terverifikasi. Kami juga membantu menyiapkan ringkasan kondisi Anda berdasarkan data di aplikasi untuk mempermudah sesi konsultasi awal Anda, sehingga Anda bisa mendapatkan bantuan yang tepat dengan lebih cepat.",
      details: "Jelajahi direktori profesional kami, manfaatkan fitur penjadwalan sesi konsultasi, dan dapatkan ringkasan data kesehatan mental Anda secara otomatis untuk dibagikan kepada profesional pilihan Anda.",
      color: "primary", // Green
      gradient: "from-primary/10 to-secondary/5"
    }
  ];

  return (
    <section id="cek-kondisi" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-accent mr-2" />
            <span className="text-accent font-semibold uppercase tracking-wide font-sans">Fitur Utama</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-heading">
            Perjalanan Kesehatan Mental yang <span className="text-primary">Terpersonalisasi</span>
          </h2>
          <p className="text-base sm:text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed font-sans">
            Dari skrining awal hingga tatalaksana, kami hadir sebagai teman perjalanan digital yang 
            memberdayakan Anda dengan dukungan AI yang cerdas dan empati yang mendalam.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-16">
          {features.map((feature, index) => {
            let cardSpecificClasses = 'col-span-full md:col-span-2 lg:col-span-2';
            if (features.length === 5) {
              if (index === 3) { // 4th item
                cardSpecificClasses += ' lg:col-start-2';
              } else if (index === 4) { // 5th item
                cardSpecificClasses += ' md:col-start-2 lg:col-start-4';
              }
            }
            return (
            <Card 
              key={feature.id}
              className={`bg-${feature.color}/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in group ${cardSpecificClasses}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="space-y-4">
                <div className={`w-12 h-12 bg-${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl font-bold text-foreground font-heading">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-sm sm:text-base text-foreground/70 leading-relaxed font-sans text-justify">
                  {feature.description}
                </CardDescription>
                <p className="text-xs sm:text-sm text-foreground/60 font-sans text-justify">{feature.details}</p>
              </CardContent>
            </Card>
          );
        })}
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 sm:p-8 md:p-12 text-primary-foreground shadow-2xl">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 font-heading">
              Siap Memulai Perjalanan Anda?
            </h3>
            <p className="text-base sm:text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto font-sans">
              Ambil langkah pertama menuju pemahaman diri yang lebih baik. 
              Skrining awal hanya membutuhkan 5-10 menit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/cek-kondisi-mental"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-base sm:text-lg font-semibold ring-offset-background transition-all duration-300 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background text-primary hover:bg-background/90 px-6 py-3 sm:px-8 sm:py-4 font-sans w-full sm:w-auto"
              >
                <Brain className="w-5 h-5 mr-2" />
                Mulai Skrining Sekarang
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
