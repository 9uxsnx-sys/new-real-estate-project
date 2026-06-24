import React from 'react';
import { HeroNavbar } from '../components/ui';
import '../i18n';

/**
 * DEV PAGE 3 - Isolated Hero testing page
 * This page is completely isolated from the main website
 * Route: /dev3
 */

export const Dev3: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Navbar */}
      <HeroNavbar isRTL={false} />

      {/* Full-height section under navbar */}
      <div 
        className="w-full bg-neutral-200 flex"
        style={{ height: 'calc(100vh - 64px)', borderBottomLeftRadius: '60px', borderBottomRightRadius: '60px' }}
      >
        {/* Left Side - 50% */}
        <div className="w-1/2 flex items-center justify-center">
          {/* Title Container - centered */}
          <div className="flex flex-col text-left text-wrap:balance">
            <h2 className="text-neutral-900 tracking-[-0.06em] text-8xl font-bold leading-[117%]">
              Building trust
            </h2>
            <h2 className="text-neutral-900 tracking-[-0.06em] text-8xl font-bold leading-[117%]">
              Before building
            </h2>
            <h2 className="text-neutral-900/50 tracking-[-0.06em] text-8xl font-bold leading-[117%]">
              your project
            </h2>
          </div>
        </div>

        {/* Right Side - 50% */}
        <div className="w-1/2 flex items-center justify-center">
          {/* Square Image Card - centered */}
          <div className="w-[700px] h-[600px] rounded-3xl overflow-hidden">
            <img
              src="/home-page-images/desktop-hero-card.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
