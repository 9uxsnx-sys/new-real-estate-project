import React, { useState, useEffect } from 'react';
import { HeroNavbar } from '../../ui';

/**
 * Hero Tablet Section
 * 
 * Full-screen hero with grey background container,
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

export const HeroTabletSection: React.FC<HeroTabletSectionProps> = ({
  lang = 'en',
  backgroundImage = '/home-page-images/desktop-hero-card.png',
  className = '',
}) => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 768);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isRTL = lang === 'ar';
  const content = getContent(lang);
  
  // Fixed sizes for tablet
  const textSize = 'text-5xl';
  const imageWidth = 400;
  const imageHeight = 300;

  return (
    <div className={`w-full min-h-screen bg-white ${className}`}>
      {/* Navbar */}
      <HeroNavbar isRTL={isRTL} />

      {/* Full-height section under navbar */}
      <div 
        className="w-full bg-neutral-200 flex flex-col"
        style={{ 
          height: 'calc(100vh - 64px)', 
          borderBottomLeftRadius: '60px', 
          borderBottomRightRadius: '60px' 
        }}
      >
        {/* Top Side - Title */}
        <div className="flex-1 flex items-center justify-center px-8 py-4">
          <div className={`flex flex-col text-wrap:balance ${isRTL ? 'text-right' : 'text-left'}`}>
            <h2 className={`text-neutral-900 tracking-[-0.06em] ${textSize} font-bold leading-[117%]`}>
              {content.headline1}
            </h2>
            <h2 className={`text-neutral-900 tracking-[-0.06em] ${textSize} font-bold leading-[117%]`}>
              {content.headline2}
            </h2>
            <h2 className={`text-neutral-900 opacity-50 tracking-[-0.06em] ${textSize} font-bold leading-[117%]`}>
              {content.headline3}
            </h2>
          </div>
        </div>

        {/* Bottom Side - Image */}
        <div className="flex-1 flex items-center justify-center px-8 pb-6">
          <div 
            className="rounded-3xl overflow-hidden"
            style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}
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
