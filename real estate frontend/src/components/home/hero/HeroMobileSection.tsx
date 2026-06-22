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

  return (
    <section className={`sm:hidden flex flex-col w-full h-screen bg-white overflow-hidden p-3 ${className}`}>
      {/* Navbar - at top */}
      <HeroNavbar isRTL={isRTL} />

      {/* Background Image - with rounded corners */}
      <div className="flex-1 relative rounded-3xl overflow-hidden">
        <img
          src={backgroundImage}
          alt=""
          className="w-full h-full object-cover"
          crossOrigin="anonymous"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-3 bg-gradient-to-b from-black/30 via-transparent to-black/50 rounded-3xl" style={{ top: '48px' }} />

      {/* Content Container - Bottom aligned */}
      <div className={`absolute inset-0 flex flex-col items-center justify-end px-6 pb-16 ${isRTL ? 'rtl' : ''}`} style={{ paddingTop: '48px' }}>
        {/* Title & Subtitle */}
        <div className="flex flex-col items-center gap-y-3 mb-6 text-center">
          <h1 
            className="text-white tracking-[-0.02em] text-[2.25rem] font-semibold leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {content.headline1}
          </h1>
          <h2 
            className="text-white/75 font-light tracking-[-0.02em] text-[1.75rem] leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {content.headline2}
          </h2>

          <p 
            className="text-white/90 tracking-[-0.01em] text-sm leading-relaxed max-w-[85%] mt-2"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {content.paragraph}
          </p>
        </div>

        {/* Buttons Row - Full width */}
        <div className="flex items-center justify-center w-full gap-x-3 gap-y-3">
          <div className="flex-1">
            <OutlineButton text={content.projects} />
          </div>
          <div className="flex-1" style={{ transform: 'scale(0.95)', transformOrigin: 'center' }}>
            <PropertiesBtn text={content.properties} />
          </div>
        </div>
      </div>
    </section>
  );
};
