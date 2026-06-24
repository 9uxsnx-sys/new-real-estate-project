import React, { useState, useEffect } from 'react';
import { HeroNavbar } from '../../ui';

/**
 * Hero Mobile Section
 * 
 * Full-screen hero with white background container,
 * stacked layout: text on top, image below
 * Supports EN, FR, AR languages
 */

interface HeroMobileSectionProps {
  lang?: 'en' | 'fr' | 'ar';
  backgroundImage?: string;
  className?: string;
}

const getContent = (lang: string) => {
  const content = {
    en: {
      headline1: 'Building trust',
      headline2: 'Before building',
      headline3: 'your project',
    },
    fr: {
      headline1: 'Bâtir la confiance',
      headline2: 'Avant de bâtix',
      headline3: 'votre projet',
    },
    ar: {
      headline1: 'نبني ثقتك',
      headline2: 'قبل أن نبني',
      headline3: 'مشروعك',
    },
  };
  return content[lang as keyof typeof content] || content.en;
};

export const HeroMobileSection: React.FC<HeroMobileSectionProps> = ({
  lang = 'en',
  backgroundImage = '/home-page-images/desktop-hero-card.png',
  className = '',
}) => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 375);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isRTL = lang === 'ar';
  const content = getContent(lang);
  
  // Responsive text sizing
  const isVerySmallScreen = windowWidth <= 460;
  const isSmallScreen = windowWidth <= 635;
  const textSize = isVerySmallScreen ? 'text-5xl' : isSmallScreen ? 'text-6xl' : 'text-7xl';
  const imageHeight = isSmallScreen ? 'calc(100vh - 380px - 72px)' : 'calc(100vh - 420px - 72px)';

  return (
    <div className={`w-full min-h-screen bg-white ${className}`}>
      {/* Navbar */}
      <HeroNavbar isRTL={isRTL} />

      {/* Full-height section under navbar */}
      <div 
        className="w-full bg-white flex flex-col"
        style={{ height: 'calc(100vh - 64px)' }}
      >
        {/* Title Section - Top */}
        <div className="flex-1 flex items-end px-6" style={{ paddingBottom: '32px' }}>
          <div className="flex flex-col text-left" style={{ paddingLeft: '24px' }}>
            <h2 className={`${textSize} text-neutral-900 tracking-[-0.06em] font-bold leading-[117%]`}>
              {content.headline1}
            </h2>
            <h2 className={`${textSize} text-neutral-900 tracking-[-0.06em] font-bold leading-[117%]`}>
              {content.headline2}
            </h2>
            <h2 className={`${textSize} text-neutral-900/50 tracking-[-0.06em] font-bold leading-[117%]`}>
              {content.headline3}
            </h2>
          </div>
        </div>

        {/* Image Section - Bottom */}
        <div className="flex-1 px-6 flex items-start justify-center">
          <div 
            className="rounded-[40px] overflow-hidden"
            style={{ 
              width: 'calc(100vw - 48px)', 
              height: imageHeight, 
              marginBottom: '24px' 
            }}
          >
            <img
              src={backgroundImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
