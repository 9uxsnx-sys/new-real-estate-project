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

  return (
    <section className={`hidden sm:flex md:hidden flex-col w-full h-screen bg-white overflow-hidden p-3 ${className}`}>
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

      {/* Content Container - Centered over image */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center px-14 ${isRTL ? 'rtl' : ''}`} style={{ paddingTop: '56px' }}>
        {/* Title & Subtitle */}
        <div className="flex flex-col items-center gap-y-4 mb-6 px-4">
          <h1 
            className="text-white text-center tracking-[-0.02em] text-4xl font-semibold leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {content.headline1}<br />
            <span className="text-white/75 font-light tracking-[-0.02em] text-4xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {content.headline2}
            </span>
          </h1>

          <p 
            className="text-white/90 text-center tracking-[-0.01em] text-base leading-relaxed max-w-lg"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {content.paragraph}
          </p>
        </div>

        {/* Buttons Row */}
        <div className="flex items-center justify-center gap-x-4">
          <OutlineButton text={content.projects} />
          <div style={{ transform: 'scale(0.95)', transformOrigin: 'center' }}>
            <PropertiesBtn text={content.properties} />
          </div>
        </div>
      </div>
    </section>
  );
};
