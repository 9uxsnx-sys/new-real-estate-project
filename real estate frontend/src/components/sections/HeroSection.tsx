import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import heroImage from '@/assets/images/downtown-views.jpg';

export const HeroSection: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-end">
        
        {/* Floating Card - Full height to navbar, pinned to bottom */}
        <div className="w-full px-[clamp(16px,2.54vw,64px)] pb-[clamp(12px,1.5vw,24px)]">
          <motion.div 
            className="h-[calc(100vh-clamp(56px,7vh,80px)-clamp(12px,1.5vw,24px))] rounded-[2rem] overflow-hidden relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img 
              src={heroImage} 
              alt="Hero" 
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay - stronger at bottom, lighter at top */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/5" />
            
            {/* Hero Title - Split layout */}
            <div className={`absolute bottom-0 left-0 right-0 px-[clamp(16px,2.54vw,64px)] pb-[65px] ${isRTL ? 'text-right' : 'text-left'}`}>
              
              {/* Desktop: Side by side layout */}
              <div className="hidden md:flex items-end gap-[25%]">
                {/* Left Title - 50% */}
                <div className="flex-1">
                  <h1 className="text-[80px] font-bold text-white leading-tight">
                    {isRTL 
                      ? <>نبني لك<br />أحلامك إلى الواقع</>
                      : (i18n.language === 'fr' 
                        ? <>Construisons Votre<br />Rêves En Réalité</>
                        : <>Building Your<br />Dreams Into Reality</>)
                    }
                  </h1>
                </div>
                
                {/* Right Paragraph - 25% */}
                <div className="w-[25%]">
                  <p className="text-white font-semibold text-[clamp(14px,1.3vw,20px)] leading-relaxed">
                    {isRTL 
                      ? 'اكتشف مساحات معيشة استثنائية مصممة لمن يقدرون الأناقة الراقية والجودة الخالدة. نحن نلتزم بتقديم أعلى معايير الجودة في كل مشروع، مع اهتمام مفصل بكل تفصيلة لضمان رضاك التام.'
                      : (i18n.language === 'fr' 
                        ? 'Découvrez des espaces de vie exceptionnels conçus pour ceux qui apprécient l\'élégance raffinée et la qualité intemporelle. Nous nous engageons à offrir les normes les plus élevées dans chaque projet.'
                        : 'Discover exceptional living spaces designed for those who appreciate refined elegance and timeless quality. We are committed to delivering the highest standards of excellence in every project.')
                    }
                  </p>
                </div>
              </div>
              
              {/* Tablet: Stacked layout */}
              <div className="hidden sm:flex md:hidden flex-col justify-center h-full px-[clamp(16px,2.54vw,64px)]">
                {/* Title */}
                <h1 className="text-[clamp(36px,7.5vw,56px)] font-bold text-white leading-tight mb-2">
                  {isRTL 
                    ? <>نبني لك<br />أحلامك إلى الواقع</>
                    : (i18n.language === 'fr' 
                      ? <>Construisons Votre<br />Rêves En Réalité</>
                      : <>Building Your<br />Dreams Into Reality</>)
                  }
                </h1>
                
                {/* Paragraph */}
                <p className="text-white font-semibold text-[clamp(16px,2.5vw,22px)] leading-relaxed max-w-[75%]">
                  {isRTL 
                    ? 'اكتشف مساحات معيشة استثنائية مصممة لمن يقدرون الأناقة الراقية والجودة الخالدة. نحن نلتزم بتقديم أعلى معايير الجودة في كل مشروع، مع اهتمام مفصل بكل تفصيلة لضمان رضاك التام.'
                    : (i18n.language === 'fr' 
                      ? 'Découvrez des espaces de vie exceptionnels conçus pour ceux qui apprécient l\'élégance raffinée et la qualité intemporelle. Nous nous engageons à offrir les normes les plus élevées dans chaque projet.'
                      : 'Discover exceptional living spaces designed for those who appreciate refined elegance and timeless quality. We are committed to delivering the highest standards of excellence in every project.')
                  }
                </p>
              </div>
              
              {/* Mobile: Stacked layout */}
              <div className="flex sm:hidden flex-col justify-end h-full px-[clamp(16px,2.54vw,64px)] pb-2">
                {/* Title */}
                <h1 className="text-[clamp(28px,8vw,40px)] font-bold text-white leading-tight mb-2">
                  {isRTL 
                    ? <>نبني لك<br />أحلامك إلى الواقع</>
                    : (i18n.language === 'fr' 
                      ? <>Construisons Votre<br />Rêves En Réalité</>
                      : <>Building Your<br />Dreams Into Reality</>)
                  }
                </h1>
                
                {/* Paragraph */}
                <p className="text-white font-semibold text-[clamp(13px,3.5vw,16px)] leading-relaxed max-w-[90%]">
                  {isRTL 
                    ? 'اكتشف مساحات معيشة استثنائية مصممة لمن يقدرون الأناقة الراقية والجودة الخالدة. نحن نلتزم بتقديم أعلى معايير الجودة في كل مشروع، مع اهتمام مفصل بكل تفصيلة لضمان رضاك التام.'
                    : (i18n.language === 'fr' 
                      ? 'Découvrez des espaces de vie exceptionnels conçus pour ceux qui apprécient l\'élégance raffinée et la qualité intemporelle. Nous nous engageons à offrir les normes les plus élevées dans chaque projet.'
                      : 'Discover exceptional living spaces designed for those who appreciate refined elegance and timeless quality. We are committed to delivering the highest standards of excellence in every project.')
                  }
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
