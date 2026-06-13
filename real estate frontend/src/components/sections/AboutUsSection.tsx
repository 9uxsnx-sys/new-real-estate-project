import React from 'react';
import { useTranslation } from 'react-i18next';
import aboutImage from '@/assets/images/downtown-views-1.jpg';

interface AboutUsSectionProps {
  className?: string;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({ className = '' }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const isFrench = i18n.language === 'fr';

  // Content based on language
  const content = {
    en: {
      tag: 'ABOUT US',
      title: 'Who We Are',
      paragraph: `At our core, we redefine real estate by anchoring trust before building structures. Since 2013, whether you are seeking a premium apartment in Algiers, a strategic commercial space in Boumerdès, or a professional office environment, our dedicated property developments ensure exceptional quality, accessible milestones, and a secure investment journey.`
    },
    fr: {
      tag: 'À PROPOS',
      title: 'Qui Sommes-Nous',
      paragraph: `Au cœur de notre mission, nous redéfinissons la promotion immobilière en bâtissant votre confiance avant de construire vos projets. Depuis 2013, que vous recherchiez un appartement de haut standing à Alger, un local commercial stratégique à Boumerdès, ou des bureaux professionnels, notre expertise garantit une qualité d'exécution irréprochable et des facilités de paiement adaptées.`
    },
    ar: {
      tag: 'من نحن',
      title: 'من نحن',
      paragraph: `في جوهر رؤيتنا، نحن نضع مفهومًا جديدًا للترقية العقارية عبر بناء ثقتكم أولاً قبل بناء مشاريعكم. منذ عام 2013، وسواء كنتم تبحثون عن شقق سكنية فاخرة في الجزائر العاصمة، أو محلات تجارية بمواقع استراتيجية في بومرداس، أو مكاتب مهنية متطورة، فإن التزامنا يضمن لكم دائمًا أعلى معايير الجودة وتسهيلات مدروسة في الدفع.`
    }
  };

  const currentContent = isRTL ? content.ar : (isFrench ? content.fr : content.en);
  const fontFamily = isRTL ? 'Cairo, sans-serif' : 'Geist, sans-serif';

  // Split paragraph to insert pill after "we" or "nous" or "نحن"
  const getParagraphWithPill = () => {
    let parts;
    let wordBefore = '';
    
    if (isRTL) {
      wordBefore = 'نحن';
      parts = currentContent.paragraph.split(wordBefore);
    } else if (isFrench) {
      wordBefore = 'nous';
      parts = currentContent.paragraph.split(wordBefore);
    } else {
      wordBefore = 'we';
      parts = currentContent.paragraph.split(wordBefore);
    }
    
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index === 0 && (
          <>
            <span>{wordBefore}</span>
            <img 
              src={aboutImage}
              alt=""
              role="presentation"
              style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                height: '1.1em',
                width: 'auto',
                aspectRatio: '2.3 / 1',
                objectFit: 'cover',
                borderRadius: '999px',
                margin: '0 0.3em'
              }}
            />
          </>
        )}
      </React.Fragment>
    ));
  };

  return (
    <section 
      id="about-us"
      className={`py-16 md:py-20 lg:py-24 ${className}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto w-full px-6 md:px-8 lg:px-6">
        {/* Header - Centered */}
        <div className="text-center mb-10 md:mb-12 lg:mb-16">
          <span 
            className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3 md:mb-4"
            style={{ fontFamily }}
          >
            {currentContent.tag}
          </span>
          <h2 
            className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-[#111111] uppercase max-w-3xl mx-auto"
            style={{ fontFamily }}
          >
            {currentContent.title}
          </h2>
        </div>

        {/* Mobile/Tablet Layout - Stacked */}
        <div className="block lg:hidden">
          {/* Text - First on mobile */}
          <p 
            className={`text-xl md:text-2xl lg:text-2xl mb-6 md:mb-8 ${isRTL ? 'text-right' : 'text-left'}`}
            style={{ 
              fontFamily, 
              fontSize: '20px',
              lineHeight: '1.7', 
              color: '#1a1a1a' 
            }}
          >
            {getParagraphWithPill()}
          </p>
          
          {/* Image - Below text on mobile */}
          <img 
            src={aboutImage}
            alt="About Us"
            className="w-full h-[250px] md:h-[300px] object-cover rounded-2xl"
          />
        </div>

        {/* Desktop Layout - Grid 60% Text / 40% Image */}
        {!isRTL ? (
          <div className="hidden lg:block">
            <div className="grid grid-cols-[60%_40%] gap-12 items-stretch">
              {/* Text Column */}
              <div className="order-1">
                <p 
                  className="text-left"
                  style={{ 
                    fontFamily, 
                    fontSize: '24px', 
                    lineHeight: '1.65', 
                    color: '#1a1a1a', 
                    letterSpacing: '-0.01em' 
                  }}
                >
                  {getParagraphWithPill()}
                </p>
              </div>

              {/* Image Column */}
              <div className="order-2">
                <img 
                  src={aboutImage}
                  alt="About Us"
                  className="w-full object-cover rounded-3xl"
                  style={{
                    width: '400px',
                    height: '250px',
                    borderRadius: '24px'
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Arabic Desktop - flex-row-reverse to put Image LEFT and Text RIGHT */
          <div className="hidden lg:flex flex-row-reverse gap-12 items-start">
            {/* Image LEFT */}
            <img 
              src={aboutImage}
              alt="About Us"
              style={{
                width: '300px',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '16px'
              }}
            />
            {/* Text RIGHT */}
            <div className="flex-1 text-right">
              <p 
                style={{ 
                  fontFamily, 
                  fontSize: '24px', 
                  lineHeight: '1.65', 
                  color: '#1a1a1a', 
                  letterSpacing: '-0.01em',
                  marginTop: '22px'
                }}
              >
                {getParagraphWithPill()}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};