import { Button } from "@/components/ui/button";
import { Brain, Heart, Shield, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section id="beranda" className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-background to-brand-teal/10 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-teal/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-brand-yellow/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight font-heading">
                <span className="text-primary">{t('find_peace')}</span>,{" "}
                <span className="text-secondary">{t('know_yourself')}</span>
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground font-heading">
                <span className="text-accent">{t('rise_with_us')}</span>
              </h2>
            </div>

            <p className="text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed max-w-2xl font-sans text-justify">
              {t('hero_description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/cek-kondisi-mental" className="w-full sm:w-auto">
                <Button
                  size="default"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg rounded-xl transition-all duration-300 transform hover:scale-105 font-sans w-full sm:w-auto"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  {t('start_check')}
                </Button>
              </a>

              <a href="/tentang-kami" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="default"
                  className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-semibold px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg rounded-xl transition-all duration-300 font-sans w-full sm:w-auto"
                >
                  {t('learn_more')}
                </Button>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4">
              <div className="flex items-center space-x-2 text-sm text-foreground/70">
                <Shield className="w-4 h-4 text-secondary" />
                <span>{t('privacy_protected')}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-foreground/70">
                <Users className="w-4 h-4 text-destructive" />
                <span>{t('partner_integration')}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-foreground/70">
                <Brain className="w-4 h-4 text-primary" />
                <span>{t('ai_supported')}</span>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative flex justify-center items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative w-full max-w-md">
              {/* Main illustration container */}
              <div className="relative bg-gradient-to-br from-background to-brand-orange/5 rounded-3xl p-8 shadow-xl border border-border/10">
                {/* Abstract mental health visualization */}
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-brand-teal to-brand-orange rounded-full flex items-center justify-center shadow-lg">
                      <Brain className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="h-3 bg-brand-orange/30 rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-gradient-to-r from-brand-orange to-brand-teal rounded-full"></div>
                    </div>
                    <div className="h-3 bg-brand-teal/30 rounded-full overflow-hidden">
                      <div className="h-full w-3/5 bg-gradient-to-r from-brand-teal to-brand-yellow rounded-full"></div>
                    </div>
                    <div className="h-3 bg-brand-yellow/30 rounded-full overflow-hidden">
                      <div className="h-full w-5/6 bg-gradient-to-r from-brand-yellow to-brand-orange rounded-full"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="aspect-square bg-gradient-to-br from-brand-teal/20 to-brand-orange/20 rounded-xl flex items-center justify-center">
                      <Heart className="w-6 h-6 text-brand-teal" />
                    </div>
                    <div className="aspect-square bg-gradient-to-br from-brand-orange/20 to-brand-yellow/20 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-brand-orange" />
                    </div>
                    <div className="aspect-square bg-gradient-to-br from-brand-yellow/20 to-brand-pink/20 rounded-xl flex items-center justify-center">
                      <Brain className="w-6 h-6 text-brand-yellow" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-brand-yellow rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-brand-pink rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-brand-yellow/10 border border-brand-yellow/30 rounded-xl p-4 sm:p-6 text-center">
            <p className="text-sm text-foreground/80 font-medium">
              <strong>{t('important_warning')}</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
