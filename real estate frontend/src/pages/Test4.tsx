import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavigationNew } from '@/components/layout';
import aboutImage from '@/assets/images/downtown-views-1.jpg';

export const Test4: React.FC = () => {
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
    if (isRTL) {
      parts = currentContent.paragraph.split('نحن');
    } else if (isFrench) {
      parts = currentContent.paragraph.split('nous');
    } else {
      parts = currentContent.paragraph.split('we');
    }
    
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index === 0 && (
          <img 
            src={aboutImage}
            alt=""
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
        )}
      </React.Fragment>
    ));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavigationNew />
      
      {/* About Us Section */}
      <section 
        className="py-24"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="max-w-7xl mx-auto w-full px-4 lg:px-6">
          {/* Header - Centered */}
          <div className="text-center mb-16 lg:mb-20">
            <span 
              className="inline-block text-xs font-semibold uppercase tracking-widest text-[#8B7355] mb-4"
              style={{ fontFamily }}
            >
              {currentContent.tag}
            </span>
            <h2 
              className="text-[32px] md:text-[40px] lg:text-[48px] font-semibold text-[rgb(44,44,44)] leading-[1.2] max-w-3xl mx-auto"
              style={{ fontFamily }}
            >
              {currentContent.title}
            </h2>
          </div>

          {/* Content Grid - 60% Text / 40% Image */}
          <div className={`grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 lg:gap-16 items-stretch ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Image Column */}
            <div className={isRTL ? 'order-1 lg:order-1' : 'order-2 lg:order-2'}>
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

            {/* Text Column */}
            <div className={isRTL ? 'order-2 lg:order-2' : 'order-1 lg:order-1'}>
              <p 
                className={`font-normal w-full ${isRTL ? 'text-right' : 'text-left'}`}
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
          </div>
        </div>
      </section>
    </div>
  );
};