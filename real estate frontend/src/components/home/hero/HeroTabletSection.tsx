import React from 'react';
import { NavbarDesktopSection } from '../navbar';

/**
 * Hero Tablet Section
 * 
 * Full-screen hero with white background container,
 * stacked layout: text on top, image below
 * Supports EN, FR, AR languages
 */

interface HeroTabletSectionProps {
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

export const HeroTabletSection: React.FC<HeroTabletSectionProps> = ({
  lang = 'en',
  backgroundImage = '/home-page-images/desktop-hero-card.png',
  className = '',
}) => {
  const isRTL = lang === 'ar';
  const content = getContent(lang);
  
  // Fixed sizes for tablet
  const imageHeight = 'calc(100vh - 492px)';

  return (
    <div className={`w-full min-h-screen bg-white ${className}`}>
      {/* Navbar */}
      <NavbarDesktopSection isRTL={isRTL} />

      {/* Full-height section under navbar */}
      <div 
        className="w-full bg-white flex flex-col"
        style={{ height: 'calc(100vh - 64px)' }}
      >
        {/* Title Section - Top */}
        <div className="flex-1 flex items-end px-6 pl-10 pb-10">
          <div className="flex flex-col text-left">
            <h2 className="text-neutral-900 tracking-[-0.06em] font-bold leading-[117%]" style={{ fontSize: '75px' }}>
              {content.headline1}
            </h2>
            <h2 className="text-neutral-900 tracking-[-0.06em] font-bold leading-[117%]" style={{ fontSize: '75px' }}>
              {content.headline2}
            </h2>
            <h2 className="text-neutral-900/50 tracking-[-0.06em] font-bold leading-[117%]" style={{ fontSize: '75px' }}>
              {content.headline3}
            </h2>
          </div>
        </div>

        {/* Image Section - Bottom */}
        <div className="flex-1 px-6 pb-6 flex items-start justify-center">
          <div 
            className="rounded-[40px] overflow-hidden w-full"
            style={{ height: imageHeight }}
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
