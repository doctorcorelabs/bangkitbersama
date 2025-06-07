import { Button } from "@/components/ui/button";
import { Brain, CheckCircle, Lightbulb, Users, ShieldAlert, ArrowRight } from "lucide-react";

const TentangKamiPage = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 font-sans">
      {/* Header Section */}
      <header className="text-center mb-12 lg:mb-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary font-heading mb-4">
          Tentang BangkitBersama
        </h1>
        <p className="text-xl sm:text-2xl text-foreground/80 max-w-3xl mx-auto">
          Perjalanan Anda Menuju Ketenangan dan Pemahaman Diri Dimulai Di Sini.
        </p>
      </header>

      {/* Section 1: Selamat Datang */}
      <section className="mb-12 lg:mb-16 p-6 bg-background rounded-lg shadow-sm">
        <h2 className="text-3xl font-semibold text-secondary font-heading mb-4">Selamat Datang di BangkitBersama</h2>
        <p className="text-lg text-foreground/80 leading-relaxed">
          BangkitBersama adalah teman perjalanan digital Anda yang dirancang untuk memberdayakan Anda dalam memahami kondisi mental, 
          mengambil langkah proaktif menuju kesejahteraan, dan merasa tidak sendirian. Misi kami adalah menyediakan alat bantu 
          yang mudah diakses, informatif, dan berbasis bukti untuk mendukung kesehatan mental Anda.
        </p>
      </section>

      {/* Section 2: Mengapa Kesehatan Mental Itu Penting? */}
      <section className="mb-12 lg:mb-16 p-6 bg-background rounded-lg shadow-sm">
        <h2 className="text-3xl font-semibold text-secondary font-heading mb-4">Mengapa Kesehatan Mental Itu Penting?</h2>
        <p className="text-lg text-foreground/80 leading-relaxed mb-4">
          Di tengah dinamika kehidupan modern, menjaga kesehatan mental sama pentingnya dengan menjaga kesehatan fisik. 
          Stres, kecemasan, dan tekanan hidup dapat memengaruhi kualitas hidup kita secara keseluruhan. BangkitBersama hadir 
          sebagai solusi proaktif untuk membantu Anda mengenali tanda-tanda awal, memahami diri lebih baik, dan mengakses 
          sumber daya yang tepat.
        </p>
      </section>

      {/* Section 3: Tujuan Utama Kami */}
      <section className="mb-12 lg:mb-16 p-6 bg-background rounded-lg shadow-sm">
        <h2 className="text-3xl font-semibold text-secondary font-heading mb-6">Tujuan Utama Kami</h2>
        <ul className="space-y-4">
          {[
            { icon: <CheckCircle className="w-6 h-6 text-primary mr-3" />, text: "Memberikan pemahaman mendalam tentang berbagai aspek kondisi mental melalui informasi yang akurat dan mudah dicerna." },
            { icon: <CheckCircle className="w-6 h-6 text-primary mr-3" />, text: "Mendorong langkah-langkah proaktif menuju kesejahteraan mental dengan menyediakan alat skrining awal dan rekomendasi yang dipersonalisasi." },
            { icon: <CheckCircle className="w-6 h-6 text-primary mr-3" />, text: "Menyediakan dukungan agar Anda tidak merasa sendirian dalam perjalanan kesehatan mental Anda, menghubungkan Anda dengan informasi dan sumber daya yang relevan." },
            { icon: <CheckCircle className="w-6 h-6 text-primary mr-3" />, text: "Menawarkan akses mudah ke alat bantu dan latihan berbasis bukti yang dapat diintegrasikan dalam rutinitas harian Anda." },
          ].map((item, index) => (
            <li key={index} className="flex items-start text-lg text-foreground/80">
              {item.icon}
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 4: Fitur Unggulan BangkitBersama */}
      <section className="mb-12 lg:mb-16 p-6 bg-background rounded-lg shadow-sm">
        <h2 className="text-3xl font-semibold text-secondary font-heading mb-8 text-center">Fitur Unggulan BangkitBersama</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Fitur: Cek Kondisi Mental */}
          <div className="p-6 border border-border/20 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <Brain className="w-8 h-8 text-primary mr-3" />
              <h3 className="text-2xl font-semibold text-primary font-heading">Cek Kondisi Mental</h3>
            </div>
            <p className="text-foreground/80 mb-2">
              Alat skrining awal untuk membantu Anda memahami kondisi emosional dan mental Anda saat ini.
            </p>
            <p className="text-sm text-foreground/70">
              <strong>Cara Kerja:</strong> Melalui serangkaian pertanyaan yang divalidasi secara klinis, didukung oleh AI untuk interpretasi awal, memberikan Anda gambaran umum tentang area yang mungkin memerlukan perhatian lebih.
            </p>
          </div>

          {/* Fitur: Rencana Aksi Personal */}
          <div className="p-6 border border-border/20 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <Lightbulb className="w-8 h-8 text-primary mr-3" />
              <h3 className="text-2xl font-semibold text-primary font-heading">Rencana Aksi Personal</h3>
            </div>
            <p className="text-foreground/80 mb-2">
              Rekomendasi langkah-langkah konkret dan personal yang dapat Anda ambil berdasarkan hasil cek kondisi Anda.
            </p>
            <p className="text-sm text-foreground/70">
              <strong>Cara Kerja:</strong> AI kami menganalisis hasil skrining Anda dan menyarankan aktivitas, latihan (seperti Mindfulness Breathing, Progressive Muscle Relaxation), atau artikel edukasi yang relevan untuk mendukung perjalanan Anda.
            </p>
          </div>

          {/* Fitur: Pustaka Edukasi */}
          <div className="p-6 border border-border/20 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <Users className="w-8 h-8 text-primary mr-3" />
              <h3 className="text-2xl font-semibold text-primary font-heading">Pustaka Edukasi</h3>
            </div>
            <p className="text-foreground/80 mb-2">
              Kumpulan artikel, panduan, dan informasi terkurasi mengenai berbagai aspek kesehatan mental.
            </p>
            <p className="text-sm text-foreground/70">
              <strong>Cara Kerja:</strong> Konten yang mudah diakses, ditulis oleh para ahli, dan dirancang untuk meningkatkan literasi mental Anda, mencakup topik seperti mengelola kecemasan, pengenalan CBT, dan lainnya.
            </p>
          </div>
          
          {/* Fitur: Darurat */}
          <div className="p-6 border border-border/20 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <ShieldAlert className="w-8 h-8 text-destructive mr-3" />
              <h3 className="text-2xl font-semibold text-destructive font-heading">Informasi Darurat</h3>
            </div>
            <p className="text-foreground/80 mb-2">
              Akses cepat ke informasi kontak darurat atau panduan pertolongan pertama pada krisis mental.
            </p>
            <p className="text-sm text-foreground/70">
              <strong>Cara Kerja:</strong> Menyediakan informasi kontak penting layanan profesional atau langkah-langkah yang bisa diambil saat situasi mendesak. (Catatan: Fitur ini adalah untuk informasi, bukan pengganti layanan darurat profesional).
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Bagaimana BangkitBersama Bekerja (Mekanisme) */}
      <section className="mb-12 lg:mb-16 p-6 bg-background rounded-lg shadow-sm">
        <h2 className="text-3xl font-semibold text-secondary font-heading mb-6 text-center">Mekanisme Kerja BangkitBersama</h2>
        <ol className="space-y-4 list-decimal list-inside text-lg text-foreground/80">
          <li><strong>Mulai dengan Cek Kondisi:</strong> Jawab serangkaian pertanyaan reflektif untuk mendapatkan gambaran awal kondisi mental Anda.</li>
          <li><strong>Dapatkan Interpretasi Awal:</strong> Sistem AI kami akan memberikan interpretasi non-diagnostik berdasarkan jawaban Anda.</li>
          <li><strong>Terima Rencana Aksi Personal:</strong> Dapatkan rekomendasi aktivitas, artikel, atau latihan yang disesuaikan dengan kebutuhan Anda.</li>
          <li><strong>Jelajahi Pustaka Edukasi:</strong> Tingkatkan pemahaman Anda tentang kesehatan mental melalui konten terkurasi.</li>
          <li><strong>Lakukan Latihan Terpandu:</strong> Praktikkan teknik relaksasi dan mindfulness yang tersedia untuk membantu mengelola stres dan emosi.</li>
          <li><strong>Ambil Langkah Selanjutnya:</strong> Gunakan informasi dari BangkitBersama sebagai panduan untuk mencari bantuan profesional jika diperlukan.</li>
        </ol>
        {/* Visual: Diagram Alur (Placeholder) */}
        <div className="mt-8 p-4 border border-dashed border-border/30 rounded-lg text-center text-foreground/60">
          [Visualisasi Diagram Alur Mekanisme Kerja BangkitBersama akan ditempatkan di sini]
        </div>
      </section>

      {/* Section 6: Teknologi & Kepercayaan */}
      <section className="mb-12 lg:mb-16 p-6 bg-background rounded-lg shadow-sm">
        <h2 className="text-3xl font-semibold text-secondary font-heading mb-4">Teknologi, Kepercayaan, dan Privasi Anda</h2>
        <p className="text-lg text-foreground/80 leading-relaxed mb-3">
          Kami menggunakan teknologi AI secara bertanggung jawab untuk memberikan interpretasi awal dan personalisasi. 
          Alat skrining kami didasarkan pada instrumen yang divalidasi secara klinis.
        </p>
        <p className="text-lg text-foreground/80 leading-relaxed">
          Keamanan dan privasi data Anda adalah prioritas utama kami. Kami menerapkan standar keamanan yang ketat untuk melindungi informasi pribadi Anda. 
          Ingatlah bahwa BangkitBersama adalah alat bantu dan edukasi, bukan pengganti diagnosis atau layanan profesional.
        </p>
      </section>

      {/* Section 7: Ajakan Bertindak */}
      <section className="text-center p-6 bg-gradient-to-r from-primary to-secondary rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-primary-foreground font-heading mb-4">Siap Memulai Perjalanan Anda?</h2>
        <p className="text-lg text-primary-foreground/90 mb-6 max-w-xl mx-auto">
          Ambil langkah pertama menuju pemahaman diri dan ketenangan batin. BangkitBersama siap mendampingi Anda.
        </p>
        <Button
          size="lg"
          variant="outline"
          className="bg-background text-primary hover:bg-background/90 border-background font-semibold px-8 py-3 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
          onClick={() => window.location.href = '/cek-kondisi-mental'}
        >
          Mulai Cek Kondisi Sekarang <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </section>
    </div>
  );
};

export default TentangKamiPage;
