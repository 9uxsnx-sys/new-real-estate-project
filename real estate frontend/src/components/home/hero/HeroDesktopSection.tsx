import React from 'react';
import { HeroNavbar } from '../../ui';

/**
 * Hero Desktop Section
 * 
 * Full-screen hero with grey background container,
 * split layout: text on left, image on right
 * Supports EN, FR, AR languages
 */

interface HeroDesktopSectionProps {
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
      projects: 'Projects',
      properties: 'Properties',
    },
    fr: {
      headline1: 'Bâtir la confiance',
      headline2: 'Avant de bâtir',
      headline3: 'votre projet',
      projects: 'Projets',
      properties: 'Propriétés',
    },
    ar: {
      headline1: 'نبني ثقتك',
      headline2: 'قبل أن نبني',
      headline3: 'مشروعك',
      projects: 'المشاريع',
      properties: 'العقارات',
    },
  };
  return content[lang as keyof typeof content] || content.en;
};

export const HeroDesktopSection: React.FC<HeroDesktopSectionProps> = ({
  lang = 'en',
  backgroundImage = '/home-page-images/desktop-hero-card.png',
  className = '',
}) => {
  const isRTL = lang === 'ar';
  const content = getContent(lang);

  return (
    <div className={`w-full min-h-screen bg-white ${className}`}>
      {/* Navbar */}
      <HeroNavbar isRTL={isRTL} />

      {/* Full-height section under navbar */}
      <div 
        className="w-full bg-neutral-200 flex"
        style={{ 
          height: 'calc(100vh - 64px)', 
          borderBottomLeftRadius: '60px', 
          borderBottomRightRadius: '60px' 
        }}
      >
        {/* Left Side - 50% - Text */}
        <div className="w-1/2 flex items-center justify-center">
          <div className={`flex flex-col text-wrap:balance ${isRTL ? 'text-right' : 'text-left'}`}>
            <h2 className="text-neutral-900 tracking-[-0.06em] text-8xl font-bold leading-[117%] xl:text-7xl">
              {content.headline1}
            </h2>
            <h2 className="text-neutral-900 tracking-[-0.06em] text-8xl font-bold leading-[117%] xl:text-7xl">
              {content.headline2}
            </h2>
            <h2 className="text-neutral-900 opacity-50 tracking-[-0.06em] text-8xl font-bold leading-[117%] xl:text-7xl">
              {content.headline3}
            </h2>
          </div>
        </div>

        {/* Right Side - 50% - Image */}
        <div className="w-1/2 flex items-center justify-center">
          <div 
            className="w-[700px] h-[600px] rounded-3xl overflow-hidden xl:w-[600px] xl:h-[500px]"
            style={{ 
              direction: isRTL ? 'rtl' : 'ltr'
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
