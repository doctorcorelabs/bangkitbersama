
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Clock, Shield } from "lucide-react";

const EmergencySection = () => {
  const emergencyContacts = [
    {
      name: "Hotline Kesehatan Jiwa Kemenkes",
      number: "021-500-454",
      description: "Layanan konsultasi kesehatan mental 24/7",
      availability: "24 Jam",
      type: "call"
    },
    {
      name: "layanan SEJIWA",
      number: "119 ext 8",
      description: "Dukungan untuk pencegahan bunuh diri",
      availability: "24 Jam",
      type: "call"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-destructive mr-2" />
            <span className="text-destructive font-semibold uppercase tracking-wide font-sans">Bantuan Darurat</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-heading">
            Bantuan <span className="text-destructive">Segera</span> Tersedia
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed font-sans">
            Jika Anda atau seseorang yang Anda kenal sedang mengalami krisis mental atau memiliki 
            pikiran untuk menyakiti diri sendiri, jangan ragu untuk mencari bantuan segera.
          </p>
        </div>

        {/* Emergency Notice */}
        <div className="bg-gradient-to-r from-destructive/20 to-destructive/10 border-l-4 border-destructive rounded-r-xl p-6 mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col items-center text-center space-y-3 sm:flex-row sm:items-start sm:text-left sm:space-x-4 sm:space-y-0">
            <div className="w-8 h-8 bg-destructive rounded-full flex items-center justify-center flex-shrink-0 sm:mt-1">
              <Phone className="w-4 h-4 text-destructive-foreground" />
            </div>
            <div>
              <h3 className="text-md sm:text-lg font-bold text-foreground mb-2 font-heading">Situasi Darurat?</h3>
              <p className="text-sm sm:text-base text-foreground/80 mb-4 font-sans">
                Jika Anda berada dalam bahaya langsung atau memiliki pikiran untuk menyakiti diri sendiri, 
                segera hubungi nomor darurat atau pergi ke unit gawat darurat terdekat.
              </p>
              <Button
                size="default"
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold font-sans w-full sm:w-auto sm:size-lg"
              >
                <Phone className="w-4 h-4 mr-2" />
                Hubungi 112 (Darurat Nasional)
              </Button>
            </div>
          </div>
        </div>

        {/* Emergency Contacts Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {emergencyContacts.map((contact, index) => (
            <Card 
              key={contact.name}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card animate-fade-in"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                      {contact.type === 'call' ? (
                        <Phone className="w-5 h-5 text-primary-foreground" />
                      ) : (
                        <MessageCircle className="w-5 h-5 text-primary-foreground" />
                      )}
                    </div>
                    <CardTitle className="text-base sm:text-lg font-bold text-card-foreground font-heading">{contact.name}</CardTitle>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-secondary bg-secondary/10 px-2 py-1 rounded-full">
                    <Clock className="w-3 h-3" />
                    <span className="font-medium font-sans">24/7</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-card-foreground/70 font-sans text-sm sm:text-base">{contact.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-base sm:text-lg text-card-foreground font-sans">{contact.number}</p>
                    <p className="text-sm text-card-foreground/60 font-sans">{contact.availability}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-sans"
                  >
                    {contact.type === 'call' ? 'Hubungi' : 'Kirim Pesan'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="bg-gradient-to-br from-brand-orange/5 to-brand-yellow/5 rounded-2xl p-8 text-center animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <h3 className="text-2xl font-bold text-foreground mb-4 font-heading">Butuh Dukungan Lebih Lanjut?</h3>
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto font-sans">
            Tim dukungan BangkitBersama juga siap membantu Anda menemukan profesional kesehatan mental 
            yang tepat dan memberikan panduan langkah selanjutnya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.halodoc.com/tanya-dokter/kategori/psikolog-klinis"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-auto px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg font-semibold font-sans"
            >
              Psikolog
            </a>
            <a
              href="https://www.halodoc.com/tanya-dokter/kategori/psikiater"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-secondary-foreground h-auto px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg font-semibold font-sans"
            >
              Psikiater
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencySection;
