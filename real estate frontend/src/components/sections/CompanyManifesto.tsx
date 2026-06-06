import React from 'react';
import { useTranslation } from 'react-i18next';

interface CompanyManifestoProps {
  className?: string;
}

export const CompanyManifesto: React.FC<CompanyManifestoProps> = ({ className = '' }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const manifestoContent = {
    en: {
      tag: 'CORPORATE PHILOSOPHY',
      lines: [
        'With a firm commitment to architectural excellence,',
        'we develop modern residential and commercial landmarks',
        'that bring long-term structural value, trust, and quality',
        'to families and businesses across Algeria.'
      ]
    },
    fr: {
      tag: 'NOTRE MANIFESTE',
      lines: [
        "Avec un engagement ferme pour l'excellence architecturale,",
        'nous développons des projets résidentiels et commerciaux modernes',
        "qui apportent une valeur durable, de la confiance et de la qualité",
        "aux familles et aux entreprises à travers l'Algérie."
      ]
    },
    ar: {
      tag: 'فلسفتنا العقارية',
      lines: [
        'بالتزام راسخ بالتميز المعماري والإتقان،',
        'نقوم بتطوير مشاريع سكنية وتجارية حديثة',
        'تمنح عملائنا قيمة مستدامة، ثقة، وجودة حقيقية',
        'للعائلات والشركات في جميع أنحاء الجزائر.'
      ]
    }
  };

  const content = isRTL ? manifestoContent.ar : (i18n.language === 'fr' ? manifestoContent.fr : manifestoContent.en);
  const fontFamily = isRTL ? 'Cairo, sans-serif' : 'Geist, sans-serif';

  return (
    <section 
      className={`py-32 lg:py-40 bg-white ${className}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center space-y-5">
        {/* Tag */}
        <span 
          className="inline-block text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-gray-400 mb-6"
          style={{ fontFamily }}
        >
          {content.tag}
        </span>

        {/* Lines - Each line in its own block, no wrapping on all screens */}
        <div className="space-y-[2vw] lg:space-y-5">
          {content.lines.map((line, index) => (
            <div 
              key={index}
              className="block text-[4.8vw] sm:text-[4vw] md:text-[3.5vw] lg:text-[42px] font-semibold tracking-[-0.02em] leading-[1.3] text-[#111111] text-center whitespace-nowrap"
              style={{ 
                fontFamily, 
                textAlign: 'center',
                margin: '0 auto',
                display: 'block'
              }}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};