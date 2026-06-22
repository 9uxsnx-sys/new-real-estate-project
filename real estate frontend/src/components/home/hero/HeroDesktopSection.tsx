import React from 'react';
import { PropertiesButton, OutlineButton, HeroNavbar } from '../../ui';

/**
 * Hero Section (Desktop)
 * 
 * Full-screen hero with background image, large headline,
 * subtitle, and CTA buttons.
 */
interface HeroContent {
  headline1: string;
  headline2: string;
  paragraph: string;
  projects: string;
  properties: string;
}

interface HeroDesktopSectionProps {
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

export const HeroDesktopSection: React.FC<HeroDesktopSectionProps> = ({
  className = '',
  lang = 'en',
  backgroundImage = 'https://framerusercontent.com/images/Yz08gMSk8HCg9OI0jQXkoDm7t7Y.png?width=1920&height=1080',
  content = defaultContent,
  isRTL: isRTLProp = false,
  PropertiesButtonComponent,
}) => {
  const isRTL = isRTLProp || lang === 'ar';
  const PropertiesBtn = PropertiesButtonComponent || PropertiesButton;
  const fontStyle = { fontFamily: lang === 'ar' ? "'Noto Sans Arabic', sans-serif" : "'Plus Jakarta Sans', sans-serif" };

  return (
    <section className={`hidden md:flex flex-col w-full h-screen bg-white overflow-hidden p-3 ${className}`}>
      {/* Navbar - at top */}
      <HeroNavbar isRTL={isRTL} />

      {/* Main Content - 50/50 split */}
      <div className="flex-1 flex">
        {/* Left Side - Text and Buttons */}
        <div className="w-1/2 flex flex-col items-center justify-center">
          {/* Title & Subtitle */}
          <div className="flex flex-col gap-y-2 lg:gap-y-4 mb-6 lg:mb-8 px-8">
            <div className="flex flex-col gap-y-2 lg:gap-y-4">
              <h1 
                className="text-neutral-900 tracking-[-0.06em] text-5xl md:text-6xl lg:text-7xl font-medium leading-[117%] text-center text-wrap:balance"
                style={fontStyle}
              >
                {content.headline1}
              </h1>
              <h2 
                className="text-neutral-900/60 font-medium tracking-[-0.06em] text-5xl md:text-6xl lg:text-7xl leading-[117%] text-center text-wrap:balance"
                style={fontStyle}
              >
                {content.headline2}
              </h2>
            </div>

            <p 
              className="text-slate-500 tracking-[-0.02em] text-base md:text-lg leading-relaxed max-w-lg text-center mx-auto"
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
        <div className="w-1/2 flex items-end justify-end pb-6 pr-6 pt-[15px] pl-5">
          <div className="w-full h-full rounded-2xl overflow-hidden">
            <img
              src={backgroundImage}
              alt=""
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
              style={{ borderRadius: '37px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
