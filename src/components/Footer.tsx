import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-brand-slate text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8">
          {/* Brand */}
          <div className="space-y-4 flex flex-col items-center text-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-teal to-brand-orange rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-heading">{t('footer_brand')}</span>
            </div>
            <p className="text-white/70 leading-relaxed font-sans max-w-md">
              {t('footer_description')}
            </p>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-white/60 text-sm font-sans text-center">
              {t('footer_copyright')}
            </div>
          </div>
        </div>

        {/* Important Disclaimer */}
        <div className="bg-brand-yellow/10 border border-brand-yellow/30 rounded-xl p-6 mt-8">
          <p className="text-sm text-white/80 text-center font-medium font-sans">
            <strong>{t('important_warning')}</strong>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
