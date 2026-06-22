import React from 'react';
import { PropertiesButton, OutlineButton, HeroNavbar } from '../../ui';

/**
 * Hero Section (Tablet)
 * 
 * Full-screen hero with background image, large headline,
 * subtitle, and CTA buttons. Tablet-optimized.
 */
interface HeroContent {
  headline1: string;
  headline2: string;
  paragraph: string;
  projects: string;
  properties: string;
}

interface HeroTabletSectionProps {
  className?: string;
  lang?: string;
  backgroundImage?: string;
  content?: HeroContent;
  isRTL?: boolean;
  PropertiesButtonComponent?: React.ComponentType<{ text: string }> | null;
}

const defaultContent: HeroContent = {
  headline1: 'We build your trust',
  headline2: 'before we build your project',
  paragraph: 'Crafting premium residential, commercial, and professional spaces across Algiers and Boumerdes since 2013. Rooted in structural quality, refined locations, and enduring client partnerships.',
  projects: 'Projects',
  properties: 'Properties',
};

export const HeroTabletSection: React.FC<HeroTabletSectionProps> = ({
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
    <section className={`hidden sm:flex md:hidden flex-col w-full h-screen bg-white overflow-hidden p-3 ${className}`}>
      {/* Navbar - at top */}
      <HeroNavbar isRTL={isRTL} />

      {/* Main Content - 50/50 split */}
      <div className="flex-1 flex">
        {/* Left Side - Text and Buttons */}
        <div className={`w-1/2 flex flex-col justify-center ${isRTL ? 'items-end pr-8' : 'items-start pl-8'}`}>
          {/* Title & Subtitle */}
          <div className="flex flex-col gap-y-4 mb-6">
            <h1 
              className="text-neutral-900 tracking-[-0.06em] text-4xl font-medium leading-[117%]"
              style={fontStyle}
            >
              {content.headline1}<br />
              <span className="text-neutral-900/60 font-medium tracking-[-0.06em] text-4xl leading-[117%]" style={fontStyle}>
                {content.headline2}
              </span>
            </h1>

            <p 
              className="text-neutral-900/80 tracking-[-0.02em] text-base leading-relaxed max-w-md"
              style={fontStyle}
            >
              {content.paragraph}
            </p>
          </div>

          {/* Buttons Row */}
          <div className="flex items-center gap-x-4">
            <OutlineButton text={content.projects} />
            <div style={{ transform: 'scale(0.95)', transformOrigin: 'center' }}>
              <PropertiesBtn text={content.properties} />
            </div>
          </div>
        </div>

        {/* Right Side - Background Image */}
        <div className="w-1/2 flex items-end justify-end pb-3">
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
