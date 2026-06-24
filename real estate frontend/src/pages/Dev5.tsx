import React from 'react';
import { HeroNavbar } from '../components/ui';
import '../i18n';

/**
 * DEV PAGE 5 - Arabic Hero testing page
 * Route: /dev5
 * RTL layout: Image on left, text on right
 */

export const Dev5: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Navbar - RTL */}
      <HeroNavbar isRTL={true} />

      {/* Full-height section under navbar */}
      <div 
        className="w-full bg-neutral-200 flex"
        style={{ height: 'calc(100vh - 64px)', borderBottomLeftRadius: '60px', borderBottomRightRadius: '60px' }}
      >
        {/* Left Side - 50% - Image (for Arabic) */}
        <div className="w-1/2 flex items-center justify-center">
          {/* Image Card - centered */}
          <div className="w-[700px] h-[600px] rounded-3xl overflow-hidden">
            <img
              src="/home-page-images/desktop-hero-card.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side - 50% - Text (for Arabic) */}
        <div className="w-1/2 flex items-center justify-center">
          {/* Title Container - right aligned */}
          <div className="flex flex-col text-right text-wrap:balance" dir="rtl">
            <h2 className="text-neutral-900 tracking-[-0.06em] text-8xl font-bold leading-[117%]">
              نبني ثقتك
            </h2>
            <h2 className="text-neutral-900 tracking-[-0.06em] text-8xl font-bold leading-[117%]">
              قبل أن نبني
            </h2>
            <h2 className="text-neutral-500 tracking-[-0.06em] text-8xl font-bold leading-[117%]">
              مشروعك
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
