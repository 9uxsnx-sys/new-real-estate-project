import React from 'react';
import { PropertiesButton, OutlineButton, HeroNavbar } from '../../ui';

/**
 * Hero Section (Mobile)
 * 
 * Full-screen hero with background image, large headline,
 * subtitle, and CTA buttons. Mobile-optimized.
 */
interface HeroContent {
  headline1: string;
  headline2: string;
  paragraph: string;
  projects: string;
  properties: string;
}

interface HeroMobileSectionProps {
  className?: string;
  lang?: string;
  backgroundImage?: string;
  content?: HeroContent;
  PropertiesButtonComponent?: React.ComponentType<{ text: string }> | null;
}

const defaultContent: HeroContent = {
  headline1: 'We build your trust',
  headline2: 'before we build your project',
  paragraph: 'Crafting premium residential, commercial, and professional spaces across Algiers and Boumerdes since 2013. Rooted in structural quality, refined locations, and enduring client partnerships.',
  projects: 'Projects',
  properties: 'Properties',
};

export const HeroMobileSection: React.FC<HeroMobileSectionProps> = ({
  className = '',
  lang = 'en',
  backgroundImage = 'https://framerusercontent.com/images/Yz08gMSk8HCg9OI0jQXkoDm7t7Y.png?width=1920&height=1080',
  content = defaultContent,
  PropertiesButtonComponent,
}) => {
  const isRTL = lang === 'ar';
  const PropertiesBtn = PropertiesButtonComponent || PropertiesButton;
  const fontStyle = { fontFamily: lang === 'ar' ? "'Noto Sans Arabic', sans-serif" : "'Plus Jakarta Sans', sans-serif" };

  return (
    <section className={`sm:hidden flex flex-col w-full h-screen bg-white overflow-hidden p-3 ${className}`}>
      {/* Navbar - at top */}
      <HeroNavbar isRTL={isRTL} />

      {/* Main Content - 50/50 split */}
      <div className="flex-1 flex flex-col">
        {/* Top Side - Text and Buttons */}
        <div className={`flex-1 flex flex-col justify-center ${isRTL ? 'items-end pr-6' : 'items-start pl-6'}`}>
          {/* Title & Subtitle */}
          <div className="flex flex-col gap-y-2 mb-4">
            <h1 
              className="text-neutral-900 tracking-[-0.06em] text-3xl font-medium leading-[117%]"
              style={fontStyle}
            >
              {content.headline1}
            </h1>
            <h2 
              className="text-neutral-900/60 font-medium tracking-[-0.06em] text-3xl leading-[117%]"
              style={fontStyle}
            >
              {content.headline2}
            </h2>

            <p 
              className="text-neutral-900/80 tracking-[-0.02em] text-sm leading-relaxed max-w-xs mt-2"
              style={fontStyle}
            >
              {content.paragraph}
            </p>
          </div>

          {/* Buttons Row */}
          <div className="flex items-center gap-x-3">
            <OutlineButton text={content.projects} />
            <div style={{ transform: 'scale(0.95)', transformOrigin: 'center' }}>
              <PropertiesBtn text={content.properties} />
            </div>
          </div>
        </div>

        {/* Bottom Side - Background Image */}
        <div className="h-1/2 flex items-end justify-center pb-3">
          <div className="w-full h-full rounded-3xl overflow-hidden">
            <img
              src={backgroundImage}
              alt=""
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
