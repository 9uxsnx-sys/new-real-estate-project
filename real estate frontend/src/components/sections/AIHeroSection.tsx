import React from 'react';
import { PropertiesButton, OutlineButton, HeroNavbar } from '../ui';

/**
 * AI Hero Section - Desktop Only
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

interface AIHeroSectionProps {
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

export const AIHeroSection: React.FC<AIHeroSectionProps> = ({
  backgroundImage = 'https://framerusercontent.com/images/Yz08gMSk8HCg9OI0jQXkoDm7t7Y.png?width=1920&height=1080',
  content = defaultContent,
  isRTL = false,
  PropertiesButtonComponent,
}) => {
  // Use RTL button for Arabic, regular for LTR
  const PropertiesBtn = PropertiesButtonComponent || PropertiesButton;
  
  return (
    <section className="hidden md:flex w-full h-screen bg-white overflow-hidden p-3">
      {/* Background Image */}
      <div className="absolute inset-3 rounded-3xl overflow-hidden">
        <img
          src={backgroundImage}
          alt=""
          className="w-full h-full object-cover rounded-[inherit]"
          crossOrigin="anonymous"
        />
      </div>

      {/* Navbar */}
      <div className="absolute top-3 left-3 right-3 z-20">
        <HeroNavbar isRTL={isRTL} />
      </div>

      {/* Content Container - Centered */}
      <div className={`relative z-10 flex flex-col items-center justify-center w-full h-full px-20 ${isRTL ? 'rtl' : ''}`}>
        {/* Title & Subtitle */}
        <div className="flex flex-col items-center gap-y-3 lg:gap-y-6 mb-4 lg:mb-8 px-6 lg:px-0">
          <h1 
            className="text-white text-center tracking-[-0.02em] text-5xl lg:text-6xl font-semibold leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {content.headline1}<br />
            <span className="text-white/75 font-light tracking-[-0.02em] text-5xl lg:text-5xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {content.headline2}
            </span>
          </h1>

          <p 
            className="text-white/90 text-center tracking-[-0.01em] text-base lg:text-lg leading-relaxed max-w-xl px-4 lg:px-0"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {content.paragraph}
          </p>
        </div>

        {/* Buttons Row */}
        <div className="flex items-center justify-center gap-x-4 md:pt-[25px] lg:pt-0">
          <OutlineButton text={content.projects} />
          <div style={{ transform: 'scale(0.95)', transformOrigin: 'center' }}>
            <PropertiesBtn text={content.properties} />
          </div>
        </div>
      </div>
    </section>
  );
};
