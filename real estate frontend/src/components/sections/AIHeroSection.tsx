import React from 'react';
import { PropertiesButton, OutlineButton } from '../ui';

/**
 * AI Hero Section - Desktop Only
 * 
 * Full-screen hero with background image, large headline,
 * subtitle, CTA buttons, and rating section.
 */
interface AIHeroSectionProps {
  backgroundImage?: string;
}

export const AIHeroSection: React.FC<AIHeroSectionProps> = ({
  backgroundImage = 'https://framerusercontent.com/images/Yz08gMSk8HCg9OI0jQXkoDm7t7Y.png?width=1920&height=1080',
}) => {
  return (
    <section className="hidden lg:flex w-full h-screen bg-white overflow-hidden p-3">
      {/* Background Image */}
      <div className="absolute inset-3 rounded-3xl overflow-hidden">
        <img
          src={backgroundImage}
          alt=""
          className="w-full h-full object-cover rounded-[inherit]"
          crossOrigin="anonymous"
        />
      </div>

      {/* Content Container - Centered */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-20">
        {/* Title & Subtitle */}
        <div className="flex flex-col items-center gap-y-6 mb-8">
          <h1 
            className="text-white text-center tracking-[-0.02em] text-6xl font-semibold leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            We build your trust<br />
            <span className="text-white/75 font-light tracking-[-0.02em]">
              before we build your project
            </span>
          </h1>

          <p 
            className="text-white/90 text-center tracking-[-0.01em] text-lg leading-relaxed max-w-xl"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Crafting premium residential, commercial, and professional spaces across Algiers and Boumerdes since 2013. Rooted in structural quality, refined locations, and enduring client partnerships.
          </p>
        </div>

        {/* Buttons Row */}
        <div className="flex items-center justify-center gap-x-4">
          <OutlineButton text="Projects" />
          <div style={{ transform: 'scale(0.95)', transformOrigin: 'center' }}>
            <PropertiesButton text="Properties" />
          </div>
        </div>
      </div>
    </section>
  );
};
